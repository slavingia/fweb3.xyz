export type PolygonData = {
  tokenBalance: number;
  hasEnoughTokens: boolean;
  hasUsedFaucet: boolean;
  hasSentTokens: boolean;
  hasMintedNFT: boolean;
  hasBurnedTokens: boolean;
  hasSwappedTokens: boolean;
  hasVotedInPoll: boolean;
  hasDeployedContract: boolean;
  hasWonGame?: boolean;
  trophyId?: number;
};

export type PolygonWalletQuery = {
  debug?: string | boolean;
  wallet?: string;
  account?: string;
};

export type TileStates = {
  completedTiles: number;
  gameTileCompletionStates: number[];
};
