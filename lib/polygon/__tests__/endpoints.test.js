import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from "../endpoints";

jest.mock("../../constants", () => ({
  POLYGON_API_KEY: "foobar",
  FWEB3_TOKEN_ADDRESS: "bazbang",
  TROPHY_NFT_ADDRESS: "kerplunk",
  NFT_ADDRESS: "pewpow",
}));

describe("endpoints", () => {
  describe("external api", () => {
    it("wallet token balance uri", () => {
      const expected =
        "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=bazbang&address=foo&tag=latest&apikey=foobar";
      const actual = walletsTokenBalanceURI("foo");
      expect(actual).toBe(expected);
    });
    it("trophy check uri", () => {
      const expected =
        "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=kerplunk&address=foo&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=foobar";
      const actual = trophyCheckURI("foo");
      expect(actual).toBe(expected);
    });
    it("wallets tx uri", () => {
      const expected =
        "https://api.polygonscan.com/api?module=account&action=txlist&address=foo&startblock=0&endblock=99999999&sort=asc&apikey=foobar";
      const actual = walletsTxsURI("foo");
      expect(actual).toBe(expected);
    });
    it("erc20 uri", () => {
      const expected =
        "https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=bazbang&address=foo&startblock=0&endblock=99999999&sort=asc&apikey=foobar";
      const actual = erc20TxsURI("foo");
      expect(actual).toBe(expected);
    });
    it("nfts uri", () => {
      const expected =
        "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=pewpow&address=foo&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=foobar";
      const actual = nftTxsURI("foo");
      expect(actual).toBe(expected);
    });
  });
});
