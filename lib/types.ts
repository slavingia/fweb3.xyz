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
