// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Poll {
  IERC20 private _token;
  address public owner;
  address payable[] public yesVoters;
  address payable[] public noVoters;

  constructor(IERC20 token) {
    owner = msg.sender;
    _token = token;
  }

  function hasTokens(address voter) view public returns (bool) {
    return _token.balanceOf(voter) >= 100 * 10**18;
  }

  function voteYes() public payable {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens to vote");
    yesVoters.push(payable(msg.sender));
  }

  function voteNo() public payable {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens to vote");
    noVoters.push(payable(msg.sender));
  }

  function getNumVoters() public view returns (uint) {
    return yesVoters.length + noVoters.length;
  }

  function getYesPercentageByPoll() public view returns (uint) {
    return yesVoters.length * 100 / getNumVoters();
  }

  function getNoPercentageByPoll() public view returns (uint) {
    return noVoters.length * 100 / getNumVoters();
  }
}
