// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Fweb3 is ERC721 {
  constructor() ERC721("Fweb3 NFT", "FW3NFT") {}

  function toString(uint256 value) internal pure returns (string memory) {
    if (value == 0) {
        return "0";
    }
    uint256 temp = value;
    uint256 digits;
    while (temp != 0) {
        digits++;
        temp /= 10;
    }
    bytes memory buffer = new bytes(digits);
    while (value != 0) {
        digits -= 1;
        buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
        value /= 10;
    }
    return string(buffer);
  }

  function random(string memory input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(input)));
  }

  function getHue(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked(toString(tokenId))));
    uint256 hue = rand % 360;
    return string(hue);
  }

  function getSaturation(uint256 tokenId) public view returns (string memory) {
    uint256 rand = random(string(abi.encodePacked(toString(tokenId))));
    uint256 saturation = rand % 100;
    return string(saturation);
  }

  function getBackgroundColor(uint256 tokenId) public view returns (string memory) {
    bytes32 val = bytes32(tokenId);
    bytes memory hx = "0123456789ABCDEF";
    bytes memory str = new bytes(51);

    for (uint i = 17; i < 20; i++) {
      str[i*2] = hx[uint(uint8(val[i + 12] >> 4))];
      str[1+i*2] = hx[uint(uint8(val[i + 12] & 0x0f))];
    }

    return string(str);
  }

  function tokenURI(uint256 tokenId) override public view returns (string memory) {
    string[17] memory parts;
    string memory hueAndSaturation = string(abi.encodePacked(getHue(tokenId), ",", getSaturation(tokenId)));
    string memory backgroundColor = getBackgroundColor(tokenId);

    parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="#';
    parts[1] = backgroundColor;
    parts[2] = '"><polygon style="fill:hsl(';
    parts[3] = hueAndSaturation;
    parts[4] = '%,79%);" points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "/><g><polygon style="fill:hsl(';
    parts[5] = hueAndSaturation;
    parts[6] = '%,82%);" points="97.786,12.53 170.663,146.172 0,146.172"/><polygon style="fill:hsl(';
    parts[7] = hueAndSaturation;
    parts[8] = '%,82%);" points="414.217,12.53 341.327,146.172 255.995,12.53"/><polygon style="fill:hsl(';
    parts[9] = hueAndSaturation;
    parts[10] = '%,82%);" points="341.327,146.172 255.995,499.467 170.663,146.172"/></g><g><polygon style="fill:hsl(';
    parts[11] = hueAndSaturation;
    parts[12] = '%,94%);" points="414.217,12.53 511.99,146.172 341.327,146.172"/><polygon style="fill:hsl(';
    parts[13] = hueAndSaturation;
    parts[14] = '%,94%);" points="255.995,12.53 341.327,146.172 170.663,146.172"/><polygon style="fill:hsl(';
    parts[15] = hueAndSaturation;
    parts[16] = '%,94%);" points="170.663,146.172 255.995,499.467 0,146.172"/></g></svg>';

    string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));
    output = string(abi.encodePacked(output, parts[9], parts[10], parts[11], parts[12], parts[13], parts[14], parts[15], parts[16]));

    string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Fweb3 NFT", "description": "This NFT represents your participation in Fweb3.", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
    output = string(abi.encodePacked('data:application/json;base64,', json));

    return output;
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
