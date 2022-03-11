import { GameTaskState } from "./types";
export const TROPHY_NFT_ADDRESS = "0x2a0493dee4f4b5e4b595326f0e73645f6f493923";
export const FWEB3_TOKEN_ADDRESS = "0x4a14ac36667b574b08443a15093e417db909d7a3";
export const GENESYS_ADDRESS = "0x0000000000000000000000000000000000000000";
export const BURN_ADDRESS = `${GENESYS_ADDRESS}burn`;
export const FWEB3_FAUCET_ADDRESS = ""; // FIXME
export const MATIC_FAUCET_ADDRESS =
  "0x67806adca0fd8825da9cddc69b9ba8837a64874b";
export const SWAP_ROUTER_ADDRESS = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
export const POLL_ADRESS = "0x718ad63821a6a3611ceb706f15971ee029812365";
export const NFT_ADDRESS = "0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B";
export const { POLYGON_API_KEY } = process.env;

export const COLORS = {
  pinkish: "#ff95ee",
};

export const DEFAULT_GAME_STATE: GameTaskState = {
  tokenBalance: 0,
  hasEnoughTokens: true,
  hasUsedFweb3Faucet: true,
  hasUsedMaticFaucet: true,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
  trophyId: -1,
};

export const WON_GAME_STATE = {
  tokenBalance: 0,
  hasEnoughTokens: true,
  hasUsedFweb3Faucet: true,
  hasUsedMaticFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasDeployedContract: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasMintedNFT: true,
};

export const GAME_TASKS = [
  null, // Naturalize Index
  "hasEnoughTokens",
  "hasMintedNFT",
  "hasUsedFweb3Faucet",
  "hasUsedMaticFaucet",
  "hasSwappedTokens",
  "hasDeployedContract",
  "hasVotedInPoll",
  "hasSentTokens",
  "hasBurnedTokens",
];
