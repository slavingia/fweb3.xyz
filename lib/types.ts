export interface GameTaskState
  extends Partial<GameWinState>,
    ERC20GameTasks,
    WalletTXGameTasks {
  tokenBalance: number;
  hasEnoughTokens: boolean;
  hasDeployedContract: boolean;
  hasMintedNFT: boolean;
}

export interface ERC20GameTasks {
  hasSentTokens: boolean;
  hasBurnedTokens: boolean;
}

export interface WalletTXGameTasks {
  hasUsedFweb3Faucet: boolean;
  hasUsedMaticFaucet: boolean;
  hasSwappedTokens: boolean;
  hasDeployedContract: boolean;
  hasVotedInPoll: boolean;
}

export interface GameWinState {
  hasWonGame: boolean;
  trophyId: number;
}

export interface PolygonWalletQuery {
  debug?: string | boolean;
  wallet?: string;
  account?: string;
}

export interface TileStates {
  completedTiles: number;
  gameTileCompletionStates: number[];
}
