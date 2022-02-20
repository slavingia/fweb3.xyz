// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Poll {
  address public owner;
  address payable[] public yesVoters;
  address payable[] public noVoters;

  constructor() {
    owner = msg.sender;
  }

  function hasTokens(address voter) private view returns(bool) {
    ERC20 instance = ERC20("0x4a14ac36667b574b08443a15093e417db909d7a3");
    return (instance.balanceOf(voter) >= 100 * 10**18);
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
