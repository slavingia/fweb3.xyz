const { POLYGON_API_KEY } = process.env;

const POLYGON_BASE_URL = "https://api.polygonscan.com/api";
const TOKEN_CONTRACT_ADDRESS = "0x4a14AC36667B574B08443a15093e417dB909D7a3";
const NFT_ADDRESS = "0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B";

// Internal Endpoints

interface PolygonWalletQuery {
  debug?: string | boolean;
  wallet?: string;
  account?: string;
}

const _isDebugEnabled = ({ debug }: PolygonWalletQuery): boolean =>
  debug && debug !== "undefined" && debug !== undefined;
const _selectAddressToUse = ({ account, wallet }: PolygonWalletQuery) =>
  ((wallet && wallet) || account) ?? false;

export const polygonWalletURI = (query: PolygonWalletQuery): string => {
  const wallet = _selectAddressToUse(query);
  if (!wallet) return "";
  return `/api/polygon?wallet_address=${wallet}${
    _isDebugEnabled(query) ? "&debug=true" : ""
  }`;
};

// External Endpoints

export const walletsTokenBalanceURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokenbalance&contractaddress=${TOKEN_CONTRACT_ADDRESS}&address=${walletAddress}&tag=latest&apikey=${POLYGON_API_KEY}`;
};

const TROPHY_NFT_CONTRACT_ADDRESS =
  "0x2a0493dee4f4b5e4b595326f0e73645f6f493923";
export const trophyCheckURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokennfttx&contractaddress=${TROPHY_NFT_CONTRACT_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`;
};

//   "https://api.polygonscan.com/api?module=account&action=txlist&address=" +
//     req.query.wallet_address +
//     "&startblock=0&endblock=99999999&sort=asc&apikey=" +
//     process.env.POLYGON_API_KEY

export const walletsTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`;
};

//   "https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x4a14ac36667b574b08443a15093e417db909d7a3&address=" +
//     req.query.wallet_address +
//     "&startblock=0&endblock=99999999&sort=asc&apikey=" +
//     process.env.POLYGON_API_KEY

export const erc20TxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokentx&contractaddress=${TOKEN_CONTRACT_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`;
};

//   "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B&address=" +
//     req.query.wallet_address +
//     "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=" +
//     process.env.POLYGON_API_KEY

export const nftTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_URL}?module=account&action=tokennfttx&contractaddress=${NFT_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`;
};
