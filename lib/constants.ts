import type { IAppColors, IGameTaskState } from "../types";

export const TROPHY_NFT_ADDRESS: string =
  "0x2a0493dee4f4b5e4b595326f0e73645f6f493923";
export const FWEB3_TOKEN_ADDRESS: string =
  "0x4a14ac36667b574b08443a15093e417db909d7a3";
export const GENESYS_ADDRESS: string =
  "0x0000000000000000000000000000000000000000";
export const BURN_ADDRESS: string =
  "0x000000000000000000000000000000000000dead";
export const FWEB3_FAUCET_ADDRESS: string =
  "0x67806adca0fd8825da9cddc69b9ba8837a64874b"; // FIXME
export const FAUCET_ADDRESSES: string[] = [
  "0x67806adca0fd8825da9cddc69b9ba8837a64874b",
  "0xe995b21d94638d81ae5123a65fc369f6aea429bc",
];
export const SWAP_ROUTER_ADDRESS: string =
  "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
export const POLL_ADDRESS: string =
  "0x718ad63821a6a3611Ceb706f15971ee029812365";
export const NFT_ADDRESS: string = "0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B";

export const NEXT_PUBLIC_DEBUG_ENABLE_DOTS =
  process.env.NEXT_PUBLIC_DEBUG_ENABLE_DOTS;
export const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const DEBUG_ENABLE = process.env.DEBUG_ENABLE;

export const COLORS: IAppColors = {
  pinkish: "#ff95ee",
};

export const DEFAULT_GAME_STATE: IGameTaskState = {
  tokenBalance: "0",
  hasEnoughTokens: false,
  hasUsedFaucet: false,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
  trophyId: "0",
};

export const DEFAULT_WON_GAME_STATE: IGameTaskState = {
  tokenBalance: "0",
  hasEnoughTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasDeployedContract: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasMintedNFT: true,
  trophyId: "0",
};

export const GAME_TASKS: string[] = [
  null, // Naturalize Index
  "hasEnoughTokens",
  "hasEnoughTokens",
  "hasUsedFaucet",
  "hasSentTokens",
  "hasMintedNFT",
  "hasBurnedTokens",
  "hasSwappedTokens",
  "hasVotedInPoll",
  "hasDeployedContract",
];
