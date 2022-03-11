import { fetcher, sleep } from "../util";
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from "./endpoints";

// Sleep for 200ms between calls to get around the 1s rate limiting

export const fetchWalletTokenBalance = async (
  walletAddress: string
): Promise<any> => {
  sleep(200);
  return fetcher(walletsTokenBalanceURI(walletAddress));
};

export const fetchTrophyTransactions = async (
  walletAddress: string
): Promise<any> => {
  sleep(200);
  return fetcher(trophyCheckURI(walletAddress));
};

export const fetchWalletsTxs = async (walletAddress: string): Promise<any> => {
  sleep(200);
  return fetcher(walletsTxsURI(walletAddress));
};

export const fetchERC20Txs = async (walletAddress: string): Promise<any> => {
  sleep(200);
  return fetcher(erc20TxsURI(walletAddress));
};

export const fetchNftsTxs = async (walletAddress: string): Promise<any> => {
  sleep(200);
  return fetcher(nftTxsURI(walletAddress));
};
