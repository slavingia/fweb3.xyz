// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Poll {
  IERC20 private _token;
  IERC20 private _poll;
  address public owner;
  address payable[] winners;

  constructor(IERC20 token, IERC20 poll) {
    owner = msg.sender;
    _token = token;
    _poll = poll;
  }

  function hasTokens(address winner) view public returns (bool) {
    return _token.balanceOf(winner) >= 100 * 10**18;
  }

  function hasVoted(address winner) view public returns (bool) {
    return _poll.hasVoted(winner) >= 100 * 10**18;
  }

  function hasWon(address winner) view public returns (bool) {
    bool contains = false;
    for (uint i = 0; i < winners.length; i++) {
      if (winner == winners[i]) {
        contains = true;
      }
    }
    return contains;
  }

  function win() public {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens");
    require(hasVoted(msg.sender), "Need to have voted");
    winners.push(payable(msg.sender));
  }

  function getNumWinners() public view returns (uint) {
    return winners.length;
  }
}
