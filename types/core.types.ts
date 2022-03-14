export interface IGameTaskState
  extends Partial<IGameWinState>,
    IERC20GameTasks,
    IWalletTXGameTasks {
  tokenBalance: string;
  hasEnoughTokens: boolean;
  hasDeployedContract: boolean;
  hasMintedNFT: boolean;
}

export interface IERC20GameTasks {
  hasSentTokens: boolean;
  hasBurnedTokens: boolean;
}

export interface IWalletTXGameTasks {
  hasEnoughTokens: boolean;
  hasUsedFaucet: boolean;
  hasSwappedTokens: boolean;
  hasDeployedContract: boolean;
  hasVotedInPoll: boolean;
}

interface IGameWinState {
  hasWonGame: boolean;
  trophyId: string;
}

export interface IAPIQuery {
  debug?: string;
  wallet_address?: string;
  account?: string;
}

interface IPolygonResponseBase {
  status: string;
  message: string;
  apiCall?: string;
}
export interface IPolygonDataResponse extends IPolygonResponseBase {
  result: IPolygonData[];
}

export interface IPolygonBalanceResponse extends IPolygonResponseBase {
  result: string;
}

export interface IPolygonData {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenID?: string;
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

export interface IAppColors {
  [key: string]: string;
}

export interface IRouterQuery {
  won?: string;
  debug?: string;
  wallet?: string;
}
