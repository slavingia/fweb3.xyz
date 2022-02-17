// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Fweb3 is ERC721 {
    constructor() ERC721("Fweb3", "FWEB3") {}

    function random(string memory input) internal pure returns (uint256) {
      return uint256(keccak256(abi.encodePacked(input)));
    }

    function getHue(uint256 tokenId) public view returns (string memory) {
      uint256 rand = random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
      uint256 hue = rand % 360;
      return string(abi.encodePacked(hue);
    }

    function getSaturation(uint256 tokenId) public view returns (string memory) {
      uint256 rand = random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
      uint256 saturation = rand % 100;
      return string(abi.encodePacked(saturation);
    }

    function getBackgroundColor(uint256 tokenId) public view returns (string memory) {
      bytes32 val = bytes32(tokenId);
      bytes memory hx = "0123456789ABCDEF";
      bytes memory str = new bytes(51);

      for (uint i = 17; i < 20; i++) {
        str[i*2] = hx[uint(uint8(val[i + 12] >> 4))];
        str[1+i*2] = hx[uint(uint8(val[i + 12] & 0x0f))];
      }

      return string(abi.encodePacked("#", str));
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
      string[12] memory parts;
      string memory hue = getHue(tokenId);
      string memory saturation = getSaturation(tokenId);
      string memory backgroundColor = getBackgroundColor(tokenId);

      parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 512 512"><rect width="100%" height="100%" fill="' + backgroundColor + '">';
      parts[1] = '<polygon style="fill:hsl(' + hue + ',' + saturation + '%,79%);" points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "/>';
      parts[2] = '<g>';
      parts[3] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,82%);" points="97.786,12.53 170.663,146.172 0,146.172 	"/>';
      parts[4] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,82%);" points="414.217,12.53 341.327,146.172 255.995,12.53 	"/>';
      parts[5] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,82%);" points="341.327,146.172 255.995,499.467 170.663,146.172 	"/>';
      parts[6] = '</g>';
      parts[7] = '<g>';
      parts[8] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,94%);" points="414.217,12.53 511.99,146.172 341.327,146.172 	"/>';
      parts[9] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,94%);" points="255.995,12.53 341.327,146.172 170.663,146.172 	"/>';
      parts[10] = '  <polygon style="fill:hsl(' + hue + ',' + saturation + '%,94%);" points="170.663,146.172 255.995,499.467 0,146.172 	"/>';
      parts[11] = '</g></svg>';

      string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));
      output = string(abi.encodePacked(output, parts[9], parts[10], parts[11]));

      string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Fweb3 NFT', toString(tokenId), '", "description": "This NFT represents your participation in Fweb3.", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
      output = string(abi.encodePacked('data:application/json;base64,', json));

      return output;
    }
  }
}