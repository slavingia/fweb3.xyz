// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from "../../polygon";

const { POLYGON_API_KEY } = process.env;
const GENESYS_ADDRESS = "0x0000000000000000000000000000000000000000";
const BURN_ADDRESS = `${GENESYS_ADDRESS}burn`;
const FAUCET_ADDRESS = "0x67806adca0fd8825da9cddc69b9ba8837a64874b";
const SWAP_ROUTER_ADDRESS = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
const POLL_ADRESS = "0x718ad63821a6a3611ceb706f15971ee029812365";

const _defaultCompletionState = {
  tokenBalance: 100,
  hasEnoughTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
  trophyId: 0,
};

const _validateReq = (req, res) => {
  if (!req?.query?.wallet_address) {
    res.status(400).json("missing params");
    return;
  }
  if (!POLYGON_API_KEY) {
    res.status(500).json("missing api key");
    return;
  }
  return true;
};

export default async function handler(req, res) {
  try {
    if (req.query.off) {
      res.json(_defaultCompletionState);
      return;
    }
    const { wallet_address: walletAddress } = req.query;
    const isvalidRequest = _validateReq(req, res);
    if (isvalidRequest) {
      const { result: trophyTxs } = await fetchTrophyTransactions(
        walletAddress
      );
      const foundTrophiesForWallet = trophyTxs.filter(
        (tx) => tx.from === GENESYS_ADDRESS
      );

      const walletsTrophy = foundTrophiesForWallet[0];
      // if they've won already ditch out
      if (walletsTrophy) {
        res.json({
          hasWonGame: true,
          trophyId: walletsTrophy.tokenID,
        });
        return;
      }
      const { result: walletBalance } = await fetchWalletTokenBalance(
        walletAddress
      );
      const hasEnoughTokens = walletBalance >= 100;
      const { result: walletsTxs } = await fetchWalletsTxs(walletAddress);
      // FIXME wrap in single maps to one object
      const hasUsedFaucet =
        walletsTxs.filter((tx) => tx.to === FAUCET_ADDRESS).length >= 1;
      const hasSwappedTokens =
        walletsTxs.filter((tx) => tx.from === SWAP_ROUTER_ADDRESS).length >= 1;
      const hasDeployedContract =
        walletsTxs.filter((tx) => tx.to === "").length >= 1;
      const hasVotedInPoll =
        walletsTxs.filter((tx) => tx.to === POLL_ADRESS).length >= 1;
      const { result: erc20Txs } = await fetchERC20Txs(walletAddress);
      const hasSentTokens = _validateHasSentTokens(erc20Txs, walletAddress);
      const hasBurnedTokens = _validateHasBurnedTokens(erc20Txs, walletAddress);
      const { result: nftsTx } = await fetchNftsTxs(walletAddress);
      const hasMintedNFT =
        nftsTx.filter((tx) => tx.from === GENESYS_ADDRESS).length >= 1;
      res.json({
        hasEnoughTokens,
        hasUsedFaucet,
        hasSentTokens,
        hasSwappedTokens,
        hasDeployedContract,
        hasVotedInPoll,
        hasBurnedTokens,
        hasMintedNFT,
      });
      return;
    }
  } catch (e) {
    console.error(e);
    return {
      data: [],
      error: e.message,
    };
  }
}

export const fetcher = async (uri) => {
  const res = await fetch(uri);
  return res.json();
};

const fetchWalletTokenBalance = async (walletAddress) => {
  return fetcher(walletsTokenBalanceURI(walletAddress));
};

const fetchTrophyTransactions = async (walletAddress) => {
  return fetcher(trophyCheckURI(walletAddress));
};

const fetchWalletsTxs = async (walletAddress: string) => {
  return fetcher(walletsTxsURI(walletAddress));
};

const fetchERC20Txs = async (walletAddress: string) => {
  return fetcher(erc20TxsURI(walletAddress));
};

const fetchNftsTxs = async (walletAddress: string) => {
  const url = nftTxsURI(walletAddress);
  console.log(url);
  return fetcher(url);
};

const _validateHasSentTokens = (txs, walletAddress) => {
  const found = txs.filter((tx) => {
    return (
      tx.value &&
      tx.from === walletAddress &&
      parseInt(tx.value) >= 100 * 10 ** 18
    );
  });
  return found.length >= 1;
};

const _validateHasBurnedTokens = (txs, walletAddress) => {
  const found = txs.filter((tx) => {
    return (
      tx.value &&
      tx.from === walletAddress &&
      tx.to === BURN_ADDRESS &&
      parseInt(tx.value) > 0
    );
  });
  return found.length >= 1;
};
