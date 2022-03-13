import {
  fetchWalletTokenBalance,
  fetchTrophyTransactions,
  fetchWalletsTxs,
  fetchERC20Txs,
  fetchNftsTxs,
} from "../api";
import { fetcher, sleep } from "../../util";
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from "../endpoints";

jest.mock("../../util");
jest.mock("../endpoints");

sleep.mockReturnValue(null);

afterEach(() => {
  jest.clearAllMocks();
});

describe("polygon api", () => {
  describe("calls fetcher with correct uri", () => {
    it("token balance", () => {
      walletsTokenBalanceURI.mockReturnValue("balance");
      fetchWalletTokenBalance("foobar");
      expect(fetcher).toHaveBeenCalledWith("balance");
    });
    it("trophy transactions", () => {
      trophyCheckURI.mockReturnValue("trophy");
      fetchTrophyTransactions("foobar");
      expect(fetcher).toHaveBeenCalledWith("trophy");
    });
    it("wallet transactions", () => {
      walletsTxsURI.mockReturnValue("wallet");
      fetchWalletsTxs("foobar");
      expect(fetcher).toHaveBeenCalledWith("wallet");
    });
    it("erc20 transactions", () => {
      erc20TxsURI.mockReturnValue("erc20");
      fetchERC20Txs("foobar");
      expect(fetcher).toHaveBeenCalledWith("erc20");
    });
    it("nft transactions", () => {
      nftTxsURI.mockReturnValue("nft");
      fetchNftsTxs("foobar");
      expect(fetcher).toHaveBeenCalledWith("nft");
    });
  });
});
