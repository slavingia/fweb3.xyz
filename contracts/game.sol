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

  function hasTokens(address player) view public returns (bool) {
    return _token.balanceOf(player) >= 100 * 10**18;
  }

  function hasVoted(address player) view public returns (bool) {
    return _poll.hasVoted(player);
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

  function win() public {
    require(hasTokens(msg.sender), "Need 100 FWEB3 tokens");
    // 2. Using the MATIC faucet
    // 3. Sending 100 tokens
    // 4. Minting NFT
    // 5. Burning
    // 6. Swapping
    require(hasVoted(msg.sender), "Need to have voted");
    // 8. Deploying a smart contract
    winners.push(payable(msg.sender));
    // send 10,000 FWEB3 tokens
  }

  function getNumWinners() public view returns (uint) {
    return winners.length;
  }
}