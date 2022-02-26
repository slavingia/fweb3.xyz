// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface Game {
  function isWinner(address player) view external returns (bool);
}

contract Fweb3TrophyNFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address private _gameAddress;

  constructor(
    address gameAddress
  ) ERC721("Fweb3 2022 Trophy NFT", "FWEB3TROPHYNFT") {
    _gameAddress = gameAddress;
  }

  mapping (address => uint) public ownerCount;

  function isWinner(address player) view public returns (bool) {
    Game game = Game(_gameAddress);
    return game.isWinner(player);
  }

  function tokenURI(uint256 tokenId) override public pure returns (string memory) {
    string memory tier;
    string memory url;

    if (tokenId <= 1000) {
      tier = "Gold";
      url = "https://ipfs.io/ipfs/QmYSbJd7ivjrRteXygXiGWck2JHJqPTcAfourK5D6bL7zZ";
    } else if (tokenId <= 9000) {
      tier = "Silver";
      url = "https://ipfs.io/ipfs/QmWf4zTTEayJmWCkKtgHwBK6PmD7yXwDvENKT5gJspLG8C";
    } else {
      tier = "Bronze";
      url = "https://ipfs.io/ipfs/QmQJBa9wFqB5hWWK7iFrReEwBPfubWjGAmH9Vbb9dMTCay";
    }

    string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Fweb3 ', tier, 'Trophy NFT", "description": "This NFT represents winning Fweb3 2022.", "image": "', url, '"}'))));
    string memory output = string(abi.encodePacked('data:application/json;base64,', json));

    return output;
  }

  function mint() public {
    require(ownerCount[msg.sender] == 0, 'Each address may mint only one NFT');
    require(isWinner(msg.sender), "Not a winner");
    _tokenIds.increment();
    ownerCount[msg.sender]++;
    _safeMint(_msgSender(), _tokenIds.current());
  }
}

library Base64 {
    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(input, 0x3F))), 0xFF))
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}
