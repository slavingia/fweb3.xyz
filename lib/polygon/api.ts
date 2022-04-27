import type {
  IPolygonDataResponse,
  IPolygonBalanceResponse,
} from "../../types";
import { fetcher, sleep } from "../util";
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  walletsInternalTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from "./endpoints";

// Because of our polygon rate limiting we need to
// Sleep for 200ms between calls - totaling ~1s

export const fetchWalletTokenBalance = async (
  walletAddress: string
): Promise<IPolygonBalanceResponse> => {
  sleep(200);
  return fetcher(walletsTokenBalanceURI(walletAddress));
};

export const fetchTrophyTransactions = async (
  walletAddress: string
): Promise<IPolygonDataResponse> => {
  sleep(200);
  return fetcher(trophyCheckURI(walletAddress));
};

export const fetchWalletsTxs = async (
  walletAddress: string
): Promise<IPolygonDataResponse> => {
  sleep(200);
  return fetcher(walletsTxsURI(walletAddress));
};

export const fetchWalletsInternalTxs = async (
  walletAddress: string
): Promise<IPolygonDataResponse> => {
  sleep(200);
  return fetcher(walletsInternalTxsURI(walletAddress));
};

export const fetchERC20Txs = async (
  walletAddress: string
): Promise<IPolygonDataResponse> => {
  sleep(200);
  return fetcher(erc20TxsURI(walletAddress));
};

export const fetchNftsTxs = async (
  walletAddress: string
): Promise<IPolygonDataResponse> => {
  sleep(200);
  return fetcher(nftTxsURI(walletAddress));
};
