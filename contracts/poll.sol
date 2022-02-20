// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC20Interface {
  function balanceOf(address whom) view public returns (uint);
}

contract Poll {
  address private tokenAddress;
  address public owner;
  address payable[] public yesVoters;
  address payable[] public noVoters;

  constructor() {
    owner = msg.sender;
  }

  function hasTokens(address voter) view public returns (bool) {
    return ERC20Interface(voter).balanceOf(tokenAddress) >= 100 * 10**18;
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
