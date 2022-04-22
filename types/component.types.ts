// Interfaces are preferred to types these days for their added features
// https://stackoverflow.com/a/37233777
export interface Address {
  address: string | string[];
}

export interface TrophyProps {
  trophyId: string;
}

export interface IAccountProps {
  triedToEagerConnect: boolean;
}

export interface ITokenBalanceProps {
  balance: string;
  symbol: string;
}

export interface IAddressProp {
  address: string | string[];
}

export interface ITileStates {
  completedTiles: number;
  gameTileCompletionStates: number[];
}

export interface DotProps extends DotContent {
  completed: boolean;
  activeDot: number;
  setActiveDot: (dot: number) => void;
  hideDot: boolean;
}
export interface DotContent {
  id: string;
  position: number;
  toolTip: string;
  link?: string;
}

export enum DotKey {
  isConnected = "isConnected",
  hasTokens = "hasTokens",
  hasUsedFaucet = "hasUsedFaucet",
  hasSentTokens = "hasSentTokens",
  hasMintedNFT = "hasMintedNFT",
  hasBurnedTokens = "hasBurnedTokens",
  hasSwappedTokens = "hasSwappedTokens",
  hasVotedInPoll = "hasVotedInPoll",
  hasDeployedContract = "hasDeployedContract",
}
