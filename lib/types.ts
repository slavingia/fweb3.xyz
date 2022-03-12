export interface IGameTaskState
  extends Partial<IGameWinState>,
    IERC20GameTasks,
    IWalletTXGameTasks {
  tokenBalance: number;
  hasEnoughTokens: boolean;
  hasDeployedContract: boolean;
  hasMintedNFT: boolean;
}

export interface IERC20GameTasks {
  hasSentTokens: boolean;
  hasBurnedTokens: boolean;
}

export interface IWalletTXGameTasks {
  hasUsedFweb3Faucet: boolean;
  hasUsedMaticFaucet: boolean;
  hasSwappedTokens: boolean;
  hasDeployedContract: boolean;
  hasVotedInPoll: boolean;
}

export interface IGameWinState {
  hasWonGame: boolean;
  trophyId: number;
}

export interface IPolygonWalletQuery {
  debug?: string | boolean;
  wallet?: string;
  account?: string;
}

export interface ITileStates {
  completedTiles: number;
  gameTileCompletionStates: number[];
}
// {

//   "tokenID": "666",
//   "tokenName": "Fweb3 Diamond NFT",
//   "tokenSymbol": "FWEB3DIAMONDNFT",
//   "tokenDecimal": "0",
//   "transactionIndex": "79",
//   "gas": "103743",
//   "gasPrice": "30069785502",
//   "gasUsed": "69162",
//   "cumulativeGasUsed": "9506477",
//   "input": "deprecated",
//   "confirmations": "678701"
// }

export interface IPolygonAPIResponse extends IPolygonCoreResponse {}

// erc20 ex
export interface IPolygonCoreResponse {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

interface INFTsTxResponse {
  tokenID: string;
}
