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

import { MOCK_WALLET_ADDRESS } from "../__mocks__/mockWalletAddress";
import mockRawWalletBalance from "../__mocks__/walletBalance.json";
import mockRawTrophyTx from "../__mocks__/trophyTsx.json";
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
    it("error response if not a GET", () => {
      const { status, error } = validateRequest({ method: "POST", query: {} });
      expect(status).toBe(400);
      expect(error).toBe("Bad request type");
    });
    it("error response if missing params", () => {
      const { status, error } = validateRequest({ method: "GET", query: {} });
      expect(status).toBe(400);
      expect(error).toBe("Missing query params");
    });
    it("error response if no api key is defined", () => {
      constantsMock.POLYGON_API_KEY = null;
      const { status, error } = validateRequest({ method: "GET", query: {} });
      expect(status).toBe(500);
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
    it("error response if malformed walletAddress", () => {
      constantsMock.POLYGON_API_KEY = "foo";
      const { status, error } = validateRequest({
        method: "GET",
        query: { wallet_address: "foo" },
      });
      expect(error).toBe("Malformatted address");
    });
    it("sends success object if correctly formatted address", () => {
      constantsMock.POLYGON_API_KEY = "foo";
      const { status, error } = validateRequest({
        method: "GET",
        query: { wallet_address: MOCK_WALLET_ADDRESS },
      });
      expect(status).toBe(200);
      expect(error).toBeFalsy();
    });
  });
  describe("check win state", () => {
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
  describe("check game state", () => {
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
