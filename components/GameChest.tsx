import { useContext } from "react";
import cn from "classnames";

import { DotContent, DotKey, DotProps } from "./types";
import { GameContext } from "../pages/_app";
import { ShareLink } from "./ShareLink";
import { GameDot } from "./GameDot";

const dotContent: Record<DotKey, DotContent> = {
  [DotKey.isConnected]: {
    id: DotKey.isConnected,
    position: 0,
    toolTip: "Connect your wallet",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#ce289ff87e18455b9f9054fbe63691e4",
  },
  [DotKey.hasTokens]: {
    id: DotKey.hasTokens,
    position: 1,
    toolTip: "Get 100 $FWEB3 tokens",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#4f53243dd1cd45008eb9152a881aa360",
  },
  [DotKey.hasUsedFaucet]: {
    id: DotKey.hasUsedFaucet,
    position: 2,
    toolTip: "Use the faucet to get .1 $MATIC",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#f0e9ac0f5b2e4ad9be50cdcbed465985",
  },
  [DotKey.hasSentTokens]: {
    id: DotKey.hasSentTokens,
    position: 3,
    toolTip: "Send 100 $FWEB3 tokens to someone",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#339af791f3a24b41a971cf64292fd780",
  },
  [DotKey.hasMintedNFT]: {
    id: DotKey.hasMintedNFT,
    position: 4,
    toolTip: "Mint a Fweb3 NFT",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#31e6fd5efc8040d3b7bf2fdeefeb10c8",
  },
  [DotKey.hasBurnedTokens]: {
    id: DotKey.hasBurnedTokens,
    position: 5,
    toolTip: "Burn at least one $FWEB3 token",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#15ffc723113448b6948636c6dc03d714",
  },
  [DotKey.hasSwappedTokens]: {
    id: DotKey.hasSwappedTokens,
    position: 6,
    toolTip: "Swap a $FWEB3 token for some $MATIC",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#36b4bef4912e435db74e0bcc803cd73e",
  },
  [DotKey.hasVotedInPoll]: {
    id: DotKey.hasVotedInPoll,
    position: 7,
    toolTip: "Vote on a Fweb3 poll",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3935569b82774761865e72d4e53e50c4",
  },
  [DotKey.hasDeployedContract]: {
    id: DotKey.hasDeployedContract,
    position: 8,
    toolTip: "Write and deploy a smart contract",
    link: "https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3c526735ae074b88838ad7b467545614",
  },
};

const orderedDots = Object.keys(dotContent).reduce((list, key) => {
  const dot = dotContent[key];
  list[dot.position] = dot;
  return list;
}, []);

export const GameChest = () => {
  const { hasWonGame, trophyId, shareText } = useContext(GameContext);

  return (
    <section>
      <div className="game-grid">
        <div
          className={cn("chest", {
            open: !!hasWonGame,
          })}
        ></div>
        {orderedDots.map(GameDot)}
      </div>
      <ShareLink
        hasWonGame={hasWonGame}
        shareText={shareText}
        trophyId={trophyId}
      />
    </section>
  );
};
