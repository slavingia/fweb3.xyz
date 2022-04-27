import { getAddress } from "ethers/lib/utils";

import type {
  IRequestValidationResponse,
  IPolygonBalanceResponse,
  IPolygonDataResponse,
  IWalletTXGameTasks,
  IERC20GameTasks,
  IGameTaskState,
  IPolygonData,
  IAPIRequest,
} from "../../types";
import {
  FAUCET_ADDRESSES,
  DEFAULT_WON_GAME_STATE,
  SWAP_ROUTER_ADDRESS,
  POLYGON_API_KEY,
  GENESYS_ADDRESS,
  POLL_ADDRESS,
  BURN_ADDRESS,
  DEBUG_ENABLE,
} from "../constants";
import {
  fetchTrophyTransactions,
  fetchWalletTokenBalance,
  fetchWalletsTxs,
  fetchWalletsInternalTxs,
  fetchERC20Txs,
  fetchNftsTxs,
} from "./api";

export const validateRequest = (
  req: IAPIRequest
): IRequestValidationResponse => {
  try {
    const { wallet_address: walletAddress, debug } = req.query;
    if (req.method !== "GET") {
      return {
        error: "Bad request type",
        status: 400,
      };
    } else if (!POLYGON_API_KEY) {
      return {
        error: "Missing required environment vars",
        status: 500,
      };
    } else if (!debug && !walletAddress) {
      return {
        error: "Missing query params",
        status: 400,
      };
    }
    // ethers.utils throws if bad address
    getAddress(walletAddress);
    return {
      status: 200,
      error: null,
    };
  } catch (e) {
    const error = e.message.includes("invalid address")
      ? "Malformatted address"
      : "An unknown error occured";
    return {
      status: 400,
      error,
    };
  }
};

export const checkHasWonGame = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchTrophyTransactions(
    walletAddress
  );
  _checkStatus({ ...rawResult, apiCall: "trophyTxs" });
  const { result: trophyTxs }: { result: IPolygonData[] } = rawResult;
  const tokenBalance: string = await _walletBalance(walletAddress);
  const trophy =
    trophyTxs?.filter((tx) => tx.from === GENESYS_ADDRESS)[0] || null;

  if (!trophy) {
    return null;
  }

  return {
    ...DEFAULT_WON_GAME_STATE,
    tokenBalance,
    hasWonGame: true,
    trophyId: trophy.tokenID,
  };
};

export const currentWalletGameState = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const walletTxCompletedItems: IWalletTXGameTasks =
    await _checkWalletTxCompletedItems(walletAddress);
  const erc20CompletedItems: IERC20GameTasks = await _checkERC20CompletedItems(
    walletAddress
  );
  const tokenBalance: string = await _walletBalance(walletAddress);
  return {
    ...walletTxCompletedItems,
    ...erc20CompletedItems,
    tokenBalance,
    hasEnoughTokens: parseInt(tokenBalance) >= 100,
    hasMintedNFT: await _checkHasMintedNTF(walletAddress),
  };
};

export const _walletBalance = async (
  walletAddress: string
): Promise<string> => {
  const rawResult: IPolygonBalanceResponse = await fetchWalletTokenBalance(
    walletAddress
  );
  _checkStatus({ ...rawResult, apiCall: "walletTokenBalance" });
  const { result: walletBalance }: { result: string } = rawResult;
  return walletBalance ? walletBalance : "0";
};

export const _checkHasMintedNTF = async (
  walletAddress: string
): Promise<boolean> => {
  const rawResult: IPolygonDataResponse = await fetchNftsTxs(walletAddress);
  _checkStatus({ ...rawResult, apiCall: "nftsTxs" });
  const { result: nftsTx }: { result: IPolygonData[] } = rawResult;
  return nftsTx?.filter((tx) => tx.from === GENESYS_ADDRESS).length >= 1;
};

const _checkWalletTxCompletedItems = async (
  walletAddress: string
): Promise<IWalletTXGameTasks> => {
  const rawResult: IPolygonDataResponse = await fetchWalletsTxs(walletAddress);
  _checkStatus({ ...rawResult, apiCall: "walletTxs" });
  const rawResult2: IPolygonDataResponse = await fetchWalletsInternalTxs(
    walletAddress
  );
  _checkStatus({ ...rawResult2, apiCall: "walletInternalTxs" });
  const { result: walletsTxs }: { result: IPolygonData[] } = rawResult;
  const { result: walletsInternalTxs }: { result: IPolygonData[] } = rawResult2;
  return {
    hasEnoughTokens: _checkHasUsedFweb3Faucet(walletsTxs),
    hasUsedFaucet: _checkHasUsedMaticFaucet(walletsInternalTxs),
    hasSwappedTokens: _checkHasSwappedTokens(walletsTxs),
    hasDeployedContract: _checkHasDeployedContract(walletsTxs),
    hasVotedInPoll: _checkHasVotedInPoll(walletsTxs),
  };
};

// FIX ME check both matic and fweb3 faucets
const _checkHasUsedFweb3Faucet = (walletsTxs: IPolygonData[]): boolean => {
  const faucetAddress1 = FAUCET_ADDRESSES[0].toLowerCase();
  const faucetAddress2 = FAUCET_ADDRESSES[1].toLowerCase();
  const newFweb3Faucet = "0x32Ba4765d6538944ef4324E55B94797a422C72F9";
  const newMaticFaucet = "0x351050Ac0AdC9bff0622c1c0525b3322C328517f";

  return (
    walletsTxs?.filter(
      (tx) =>
        tx.to.toLowerCase() === faucetAddress1.toLowerCase() ||
        tx.to.toLowerCase() === faucetAddress2.toLowerCase() ||
        tx.to.toLowerCase() === newFweb3Faucet.toLowerCase() ||
        tx.to.toLowerCase() === newMaticFaucet.toLowerCase()
    ).length >= 1
  );
};

const _checkHasUsedMaticFaucet = (walletsTxs: IPolygonData[]): boolean => {
  const newFweb3Faucet = "0x32Ba4765d6538944ef4324E55B94797a422C72F9";
  const newMaticFaucet = "0x351050Ac0AdC9bff0622c1c0525b3322C328517f";

  return (
    walletsTxs?.filter(
      (tx) =>
        tx.from.toLowerCase() === FAUCET_ADDRESSES[0].toLowerCase() ||
        tx.from === FAUCET_ADDRESSES[1].toLowerCase() ||
        tx.from === newMaticFaucet.toLowerCase() ||
        tx.from === newFweb3Faucet.toLowerCase()
    ).length >= 1
  );
};

const _checkHasSwappedTokens = (walletsTxs: IPolygonData[]): boolean => {
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === SWAP_ROUTER_ADDRESS.toLowerCase()
    ).length >= 1
  );
};
const _checkHasDeployedContract = (walletsTxs: IPolygonData[]): boolean => {
  return walletsTxs?.filter((tx) => tx.to === "").length >= 1;
};

const _checkHasVotedInPoll = (walletsTxs: IPolygonData[]): boolean => {
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === POLL_ADDRESS.toLowerCase()
    ).length >= 1
  );
};

const _checkERC20CompletedItems = async (
  walletAddress: string
): Promise<IERC20GameTasks> => {
  const rawResult: IPolygonDataResponse = await fetchERC20Txs(walletAddress);
  _checkStatus({ ...rawResult, apiCall: "erc20Txs" });
  const { result: erc20Txs }: { result: IPolygonData[] } = rawResult;
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(erc20Txs, walletAddress),
  };
};

const _validateHasSentTokens = (
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      parseInt(tx.value) >= 100 * 10 ** 18
    );
  });
  return found?.length >= 1;
};

const _validateHasBurnedTokens = (
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      tx.to.toLowerCase() === BURN_ADDRESS.toLowerCase() &&
      parseInt(tx.value) > 0
    );
  });
  return found?.length >= 1;
};

const _checkStatus = ({
  status,
  message,
  result,
  apiCall,
}: IPolygonDataResponse | IPolygonBalanceResponse) => {
  if (DEBUG_ENABLE && (!status || status !== "1")) {
    const json = JSON.stringify({ status, message, result }, null, 2);
    console.debug(`Bad Polygon API Response: ${apiCall}\n${json}`);
  }
};
