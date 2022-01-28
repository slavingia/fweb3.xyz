require("@nomiclabs/hardhat-etherscan");

module.exports = {
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/c567d660059a425ab573c43f92bca19b"
    }
  },
  solidity: "0.8.11",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
