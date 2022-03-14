import {
  TROPHY_NFT_ADDRESS,
  FWEB3_TOKEN_ADDRESS,
  NFT_ADDRESS,
  POLYGON_API_KEY,
} from "../constants";

const POLYGON_BASE_URL = "https://api.polygonscan.com/api";

// Internal Endpoints

// const _isDebugEnabled = ({ debug }: IPolygonWalletQuery): boolean =>
//   debug && debug !== "undefined" && debug !== undefined;

// const _selectAddressToUse = ({ account, wallet }: IPolygonWalletQuery) =>
//   wallet ? wallet : account;

// export const polygonWalletURI = (query: IPolygonWalletQuery): string => {
//   const walletToUse = _selectAddressToUse(query);
//   if (!walletToUse) throw new Error("no wallet or address specified");
//   return `/api/polygon?wallet_address=${walletToUse}${
//     _isDebugEnabled(query) ? `&debug=${query.debug}` : ""
//   }`;
// };

// External Endpoints

export const walletsTokenBalanceURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokenbalance&contractaddress=${FWEB3_TOKEN_ADDRESS}&address=${walletAddress}&tag=latest&apikey=${POLYGON_API_KEY}`;
};

export const trophyCheckURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokennfttx&contractaddress=${TROPHY_NFT_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`;
};

export const walletsTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`;
};

export const erc20TxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokentx&contractaddress=${FWEB3_TOKEN_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`;
};

export const nftTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokennfttx&contractaddress=${NFT_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`;
};
