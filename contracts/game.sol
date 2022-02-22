// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Game is Ownable {
  IERC20 private _token;
  address [] judges;
  address payable[] playersSeekingVerification;
  address payable[] playersApprovedToWin;
  address payable[] winners;

  event PlayerSeeksVerification(address indexed _player);
  event PlayerApprovedToWin(address indexed _player, address indexed _judge);
  event PlayerWon(address indexed player);

  constructor(IERC20 token) {
    _token = token;
  }

  modifier judgeOnly {
    require(isJudge(msg.sender), "Must be a judge");
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

  function hasTooManyTokens(address player) view public returns (bool) {
    return _token.balanceOf(player) >= 1000 * 10**18;
  }

  function hasBeenApprovedToWin(address player) view public returns (bool) {
    bool contains = false;
    for (uint i = 0; i < playersApprovedToWin.length; i++) {
      if (player == playersApprovedToWin[i]) {
        contains = true;
      }
    }
    return contains;
  }

  function hasNotWonBefore(address player) view public returns (bool) {
    return !hasWon(player);
  }

  function seekVerification() public {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens");
    require(!hasTooManyTokens(msg.sender), "Need less than 1,000 FWEB3 tokens");
    playersSeekingVerification.push(payable(msg.sender));
    emit PlayerSeeksVerification(msg.sender);
  }

  function win() public {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens");
    require(!hasTooManyTokens(msg.sender), "Need less than 1,000 FWEB3 tokens");
    require(hasBeenApprovedToWin(msg.sender), "Need to have been approved by a judge");
    require(hasNotWonBefore(msg.sender), "Need to have not won before");
    (bool sent, ) = (msg.sender).call{ value: 1000 * (10*18) }("");
    require(sent, "Failed to send Ether");
    winners.push(payable(msg.sender));
    emit PlayerWon(msg.sender);
  }

  function approveWinner(address player) public judgeOnly {
    removePlayerFromSeekingVerification(player);
    playersApprovedToWin.push(payable(player));
    emit PlayerApprovedToWin(player, msg.sender);
  }

  function rejectWinner(address player) public {
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

  function getPlayersSeekingVerification() view public returns (address payable[] memory) {
    return playersSeekingVerification;
  }

  function getNumWinners() view public returns (uint) {
    return winners.length;
  }

  function hasWon(address player) view public returns (bool) {
    bool contains = false;
    for (uint i = 0; i < winners.length; i++) {
      if (player == winners[i]) {
        contains = true;
      }
    }
    return contains;
  }

  function removePlayerFromSeekingVerification(address player) internal {
    for (uint i = 0; i < playersSeekingVerification.length; i++) {
      if (player == playersSeekingVerification[i]) {
        delete playersSeekingVerification[i];
      }
    }
  }
}
