// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Poll {
  IERC20 private _token;
  address public owner;
  address payable[] public yesVoters;
  address payable[] public voters;

  constructor(IERC20 token) {
    owner = msg.sender;
    _token = token;
  }

  function hasTokens(address voter) view public returns (bool) {
    return _token.balanceOf(voter) >= 100 * 10**18;
  }

  function hasVoted(address voter) view public returns (bool) {
    bool contains = false;
    for (uint i = 0; i < voters.length; i++) {
      if (voter == voters[i]) {
        contains = true;
      }
    }
    return contains;
  }

  function voteYes() public {
    require(!hasVoted(msg.sender), "You already voted");
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens to vote");
    yesVoters.push(payable(msg.sender));
    voters.push(payable(msg.sender));
  }

  function voteNo() public {
    require(!hasVoted(msg.sender), "You already voted");
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens to vote");
    voters.push(payable(msg.sender));
  }

  function getNumVoters() public view returns (uint) {
    return voters.length;
  }

  function getYesPercentage() public view returns (uint) {
    return yesVoters.length * 100 / getNumVoters();
  }
}
