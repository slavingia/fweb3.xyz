import {
  validateRequest,
  checkHasWonGame,
  currentWalletGameState,
} from "../validators";
import {
  fetchERC20Txs,
  fetchNftsTxs,
  fetchTrophyTransactions,
  fetchWalletsTxs,
  fetchWalletTokenBalance,
} from "../api";

import mockRawTrophyTx from "../__mocks__/trophyTsx.json";
import mockRawWalletBalance from "../__mocks__/walletBalance.json";
import mockWalletTxs from "../__mocks__/walletsTxs.json";
import mockERC20Txs from "../__mocks__/erc20Txs.json";
import mockRawNFTsTx from "../__mocks__/nftsTx.json";

jest.mock("../api");
jest.spyOn(console, "debug").mockImplementation(() => {});

const constantsMock = jest.requireMock("../../constants");

jest.mock("../../constants", () => ({
  POLYGON_API_KEY: "foo",
  GENESYS_ADDRESS: "0x0000000000000000000000000000000000000000",
  MATIC_FAUCET_ADDRESSES: [
    "0x67806adca0fd8825da9cddc69b9ba8837a64874b",
    "0xe995b21d94638d81ae5123a65fc369f6aea429bc",
  ],
  SWAP_ROUTER_ADDRESS: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
  POLL_ADDRESS: "0x718ad63821a6a3611Ceb706f15971ee029812365",
  FWEB3_FAUCET_ADDRESS: "unknown",
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("validators", () => {
  describe("request validator", () => {
    it("throws if no method defined on request", () => {
      expect(() => {
        validateRequest();
      }).toThrow("No request to validate");
    });
    it("throws if not a GET", () => {
      expect(() => {
        validateRequest({ method: "foo" });
      }).toThrow("Unsupported request method");
    });
    it("throws if missing params", () => {
      expect(() => {
        validateRequest({ method: "GET", query: null });
      }).toThrow("Missing request params");
      expect(() => {
        validateRequest({ method: "GET", query: { wallet_address: null } });
      }).toThrow("Missing request params");
    });
    it("throws if no api key is defined", () => {
      expect(() => {
        constantsMock.POLYGON_API_KEY = null;
        validateRequest({ method: "GET", query: { wallet_address: "foo" } });
      }).toThrow("missing api key");
    });
    it("debug logs if bad api response", async () => {
      global.process.env.DEBUG = true;
      const badResponse = {
        status: "0",
        message: "some bad response",
        result: null,
      };
      fetchERC20Txs.mockReturnValue(badResponse);
      fetchNftsTxs.mockReturnValue(badResponse);
      fetchTrophyTransactions.mockReturnValue(badResponse);
      fetchWalletsTxs.mockReturnValue(badResponse);
      fetchWalletTokenBalance.mockReturnValue(badResponse);

      await checkHasWonGame("a wallet address");
      await currentWalletGameState("a wallet address");

      const mockCalls = console.debug.mock.calls;

      expect(console.debug).toHaveBeenCalledTimes(6);
      expect(mockCalls[0][0].includes("trophyTxs")).toBeTruthy();
      expect(mockCalls[1][0].includes("walletTokenBalance")).toBeTruthy();
      expect(mockCalls[2][0].includes("walletTxs")).toBeTruthy();
      expect(mockCalls[3][0].includes("erc20Txs")).toBeTruthy();
      expect(mockCalls[4][0].includes("walletTokenBalance")).toBeTruthy();
      expect(mockCalls[5][0].includes("nftsTxs")).toBeTruthy();
    });
    it("return true if valid", () => {
      constantsMock.POLYGON_API_KEY = "foo";
      const actual = validateRequest({
        method: "GET",
        query: { wallet_address: "foo" },
      });
      expect(actual).toBeTruthy();
    });
  });
  describe("win check", () => {
    it("sets winning game state when trophyId is present", async () => {
      fetchTrophyTransactions.mockReturnValue(mockRawTrophyTx);
      fetchWalletTokenBalance.mockReturnValue(mockRawWalletBalance);
      const expected = {
        hasWonGame: true,
        tokenBalance: "33867000000000000000000",
        trophyId: "19",
      };
      const actual = await checkHasWonGame("foo");
      expect(actual).toEqual(expected);
    });
    it("returns falsy is not a winner", async () => {
      fetchTrophyTransactions.mockReturnValue({ status: "1" });
      fetchWalletTokenBalance.mockReturnValue(mockRawWalletBalance);
      const actual = await checkHasWonGame("foo");
      expect(actual).toBeFalsy();
    });
  });
  describe("current game state", () => {
    it("gets current game state", async () => {
      fetchWalletsTxs.mockReturnValue(mockWalletTxs);
      fetchERC20Txs.mockReturnValue(mockERC20Txs);
      fetchWalletTokenBalance.mockReturnValue(mockRawWalletBalance);
      fetchNftsTxs.mockReturnValue(mockRawNFTsTx);
      const expected = {
        hasBurnedTokens: false,
        hasDeployedContract: true,
        hasEnoughTokens: true,
        hasMintedNFT: true,
        hasSentTokens: false,
        hasSwappedTokens: true,
        hasEnoughTokens: true,
        hasUsedFaucet: false,
        hasVotedInPoll: true,
        tokenBalance: "33867000000000000000000",
      };
      const actual = await currentWalletGameState(
        "0xb15A3D29eFe51baaC8d3cd2f4F747B843FeAdA7d"
      );
      expect(actual).toEqual(expected);
    });
  });
});
