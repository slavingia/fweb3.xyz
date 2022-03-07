export type DotContent = {
  id: string;
  position: number;
  toolTip: string;
  link: string;
};

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

export type DotProps = DotContent & {
  key: string | number;
  completed: boolean;
  activeDot: number;
  setActiveDot: (dot: number) => void;
  hideDot: boolean;
};
