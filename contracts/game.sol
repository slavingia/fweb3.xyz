// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Game is Ownable {
  IERC20 private _token;
  address [] judges;

  struct playerDetails {
    bool isSeekingVerification;
    bool hasBeenVerifiedToWin;
    bool hasWon;
    address judgeApprovedBy;
  }
  mapping(address => playerDetails) private players;

  event PlayerSeeksVerification(address indexed _player);
  event PlayerVerifiedToWin(address indexed _player, address indexed _judge);
  event PlayerWon(address indexed player);

  constructor(IERC20 token) {
    _token = token;
  }

  modifier judgeOnly {
    require(isJudge(msg.sender), "Not a judge");
    _;
  }

  function isJudge(address judge) view public returns (bool) {
    bool contains = false;
    for (uint i = 0; i < judges.length; i++) {
      if (judge == judges[i]) {
        contains = true;
      }
    }
    return contains;
  }

  function hasTokens(address player) view public returns (bool) {
    return _token.balanceOf(player) >= 100 * 10**18;
  }

  function hasEnoughTokens(address player) view public returns (bool) {
    return _token.balanceOf(player) >= 1000 * 10**18;
  }

  function hasBeenVerifiedToWin(address player) view public returns (bool) {
    return players[player].hasBeenVerifiedToWin;
  }

  function hasNotWonBefore(address player) view public returns (bool) {
    return !players[player].hasWon;
  }

  function seekVerification() public {
    require(hasTokens(msg.sender), "Not enough tokens");
    players[msg.sender].isSeekingVerification = true;
    emit PlayerSeeksVerification(msg.sender);
  }

  function win() public {
    require(hasTokens(msg.sender), "Not enough tokens");
    require(hasBeenVerifiedToWin(msg.sender), "Not verified by a judge");
    require(hasNotWonBefore(msg.sender), "Have won before");
    if (!hasEnoughTokens(msg.sender)) {
      (bool sent, ) = (msg.sender).call{ value: 1000 * (10*18) }("");
      require(sent, "Failed to send Ether");
    }
    players[msg.sender].hasWon = true;
    emit PlayerWon(msg.sender);
  }

  function verifyPlayer(address player) public judgeOnly {
    removePlayerFromSeekingVerification(player);
    players[player].hasBeenVerifiedToWin = true;
    emit PlayerVerifiedToWin(player, msg.sender);
  }

  function rejectWinner(address player) public judgeOnly {
    removePlayerFromSeekingVerification(player);
  }

  function addJudge(address judge) public onlyOwner {
    require(!isJudge(judge), "Already a judge");
    judges.push(payable(judge));
  }

  function removeJudge(address judge) public onlyOwner {
    for (uint i = 0; i < judges.length; i++) {
      if (judge == judges[i]) {
        delete judges[i];
      }
    }
  }

  function getJudges() view public returns(address [] memory) {
    return judges;
  }

  function removePlayerFromSeekingVerification(address player) internal {
    players[player].isSeekingVerification = false;
  }
}
