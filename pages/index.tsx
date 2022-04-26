import Head from "next/head";
import cn from "classnames";

import {
  DotContent,
  DotKey,
  DotProps,
  IGameTaskState,
  IRouterQuery,
} from "../types";
import { TokenBalance } from "../components/TokenBalance";
import { useGameState } from "../hooks/useGameState";
import { GameFinish } from "../components/GameFinish";
import { Account } from "../components/Account";
import { ENSLookup } from "../components/ENSLookup";
import { getTrophyColor } from "../lib";
import { useRouter } from "next/router";

const dotContent: Record<DotKey, DotContent> = {
  [DotKey.isConnected]: {
    id: DotKey.isConnected,
    position: 0,
    toolTip: "Connect your wallet",
  },
  [DotKey.hasTokens]: {
    id: DotKey.hasTokens,
    position: 1,
    toolTip: "Use the faucet to get 300 $FWEB3 tokens",
  },
  [DotKey.hasUsedFaucet]: {
    id: DotKey.hasUsedFaucet,
    position: 2,
    toolTip: "Use the faucet to get 0.042 $MATIC",
  },
  [DotKey.hasSentTokens]: {
    id: DotKey.hasSentTokens,
    position: 3,
    toolTip: "Send 100 $FWEB3 tokens to someone",
  },
  [DotKey.hasMintedNFT]: {
    id: DotKey.hasMintedNFT,
    position: 4,
    toolTip: "Mint a Fweb3 NFT",
  },
  [DotKey.hasBurnedTokens]: {
    id: DotKey.hasBurnedTokens,
    position: 5,
    toolTip: "Burn at least one $FWEB3 token",
  },
  [DotKey.hasSwappedTokens]: {
    id: DotKey.hasSwappedTokens,
    position: 6,
    toolTip: "Swap a $FWEB3 token for some $MATIC",
  },
  [DotKey.hasVotedInPoll]: {
    id: DotKey.hasVotedInPoll,
    position: 7,
    toolTip: "Vote on a Fweb3 poll",
  },
  [DotKey.hasDeployedContract]: {
    id: DotKey.hasDeployedContract,
    position: 8,
    toolTip: "Write and deploy a smart contract",
  },
};

const orderedDots = Object.keys(dotContent).reduce((list, key) => {
  const dot = dotContent[key];
  list[dot.position] = dot;
  return list;
}, []);

const Dot: React.FC<DotProps> = ({
  toolTip,
  position,
  completed,
  activeDot,
  setActiveDot,
  hideDot,
}) => {
  return (
    <div
      onClick={() => setActiveDot(position)}
      className={cn("game-tile", {
        completed: completed,
        active: activeDot === position,
        hidden: hideDot,
      })}
    >
      <div className="tooltip">{toolTip}</div>
    </div>
  );
};

const calcCompletionStates = (
  isConnected: boolean,
  wallet: string,
  gameTaskState: IGameTaskState
): number[] => {
  return [
    isConnected || wallet ? 1 : 0,
    gameTaskState?.["hasEnoughTokens"] ? 1 : 0,
    gameTaskState?.["hasUsedFaucet"] ? 1 : 0,
    gameTaskState?.["hasSentTokens"] ? 1 : 0,
    gameTaskState?.["hasMintedNFT"] ? 1 : 0,
    gameTaskState?.["hasBurnedTokens"] ? 1 : 0,
    gameTaskState?.["hasSwappedTokens"] ? 1 : 0,
    gameTaskState?.["hasVotedInPoll"] ? 1 : 0,
    gameTaskState?.["hasDeployedContract"] ? 1 : 0,
  ];
};

export default function Home() {
  const { query }: { query: IRouterQuery } = useRouter();
  const {
    account,
    isConnected,
    trophyId,
    hasWonGame,
    activeDot,
    setActiveDot,
    gameTaskState,
    chainId,
    triedToEagerConnect,
  } = useGameState();

  const gameTileCompletionStates: number[] = calcCompletionStates(
    isConnected,
    query.wallet,
    gameTaskState
  );

  const completedTiles: number = gameTileCompletionStates.reduce((acc, cur) => {
    return (acc += cur);
  }, 0);

  let shareText: string = "Fweb3";
  let shareImageUrl: string = "https://fweb3.xyz/fweb3.png";

  if (hasWonGame || parseInt(trophyId) >= 1) {
    const trophyColor: string = getTrophyColor(trophyId);
    shareText = "🏆 I won a " + trophyColor + " trophy in Fweb3!";
    shareImageUrl = "https://fweb3.xyz/fweb_yearone_" + trophyColor + ".png";
  }
  return (
    <div>
      <Head>
        <title>{query.wallet ? query.wallet : "Fweb3"}</title>
        <meta name="description" content="Learn and build web3" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build web3" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build web3" property="og:description" />
        <meta content={shareImageUrl} property="og:image" />
        <meta content="Fweb3" property="twitter:title" />
        <meta content={shareImageUrl} property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <h1>fweb3</h1>

        <p>
          {hasWonGame ? (
            "🏆"
          ) : (
            <>
              <strong>{Math.round((completedTiles / 9) * 100)}%</strong>{" "}
              complete
            </>
          )}
        </p>

        {query.wallet !== undefined &&
          query.wallet !== account &&
          query.wallet.length > 0 && (
            <a
              href={"https://polygonscan.com/address/" + query.wallet}
              target="_blank"
              rel="noreferrer"
            >
              <p>
                <ENSLookup address={query.wallet} />
              </p>
            </a>
          )}

        {isConnected || query.wallet ? (
          <TokenBalance
            balance={gameTaskState?.["tokenBalance"]}
            symbol="FWEB3"
          />
        ) : (
          <div>0 FWEB3</div>
        )}
      </nav>

      <main>
        <section>
          <div className="game-grid">
            <div
              className={cn("chest", {
                open: !!hasWonGame,
              })}
            ></div>
            {orderedDots.map(({ id, toolTip, link, position }) => {
              return (
                <Dot
                  key={id}
                  id={id}
                  completed={hasWonGame || !!gameTileCompletionStates[position]}
                  link={link}
                  position={position}
                  toolTip={toolTip}
                  activeDot={activeDot}
                  setActiveDot={setActiveDot}
                  hideDot={hasWonGame}
                />
              );
            })}
          </div>

          <a
            className="share-button"
            onClick={() => {
              let gameTiles = document.getElementsByClassName("game-tile");
              let completedGameTiles = [];
              let finalShareText;

              for (let i = 0; i < gameTiles.length; i++) {
                completedGameTiles.push(
                  gameTiles[i].classList.contains("completed") || hasWonGame
                    ? 1
                    : 0
                );
              }

              if (hasWonGame) {
                finalShareText =
                  `${shareText} @fweb3_\n\nhttps://fweb3.xyz?wallet=` +
                  (account ? account : query.wallet) +
                  `&won=${trophyId}`;
              } else {
                finalShareText = `${shareText} @fweb3_ ${completedGameTiles.reduce(
                  (a, b) => a + b
                )}/9\n\n`;

                for (let i = 0; i < gameTiles.length; i++) {
                  finalShareText += completedGameTiles[i] ? "🟣" : "⚫️";

                  if (i % 3 == 2 && i != gameTiles.length - 1) {
                    finalShareText += "\n";
                  }
                }
              }

              if (navigator.share) {
                navigator.share({
                  text: finalShareText,
                });
              } else {
                window.open(
                  "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(finalShareText)
                );
              }
            }}
          >
            {hasWonGame ? "Share your win" : "Share your progress"}
          </a>
        </section>
        <section>
          {completedTiles === 9 && activeDot == -1 && (
            <div>
              {query.wallet && (
                <h2>
                  <ENSLookup address={query.wallet} />
                </h2>
              )}
              <GameFinish />
            </div>
          )}
          {(activeDot === -1 || activeDot === 0) && completedTiles !== 9 && (
            <>
              <h2>Learn and build in web3.</h2>
              <p>
                There are 9 dots to light up by doing things on a blockchain (in
                this case, Polygon). Once you light them all up, you win
                additional $FWEB3 tokens and a commemorative NFT.
              </p>
            </>
          )}
          {activeDot === 0 && (
            <>
              <p>
                To get started, click the pulsing button, install MetaMask if
                you haven&apos;t already, and login.
              </p>
              <p>
                If you&apos;re new, take your seed phrase and stick it in Apple
                Notes. It&apos;s good enough for now.
              </p>
              <p style={{ color: "#f55" }}>
                Note: there&apos;s lots of phishing happening out there! Our
                code is{" "}
                <a
                  href="https://github.com/slavingia/fweb3.xyz"
                  target="_blank"
                  rel="noreferrer"
                >
                  open source
                </a>{" "}
                so you can make sure it&apos;s safe. We only use MetaMask to get
                your wallet address.
              </p>
            </>
          )}
          {activeDot === 1 && (
            <>
              <h2>Receive tokens (for free!)</h2>
              <p>
                <a
                  href="https://discord.gg/pNSFNfyVxA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join our Discord
                </a>{" "}
                and use the #fweb3-faucet to receive 300 $FWEB3 tokens by
                specifying your wallet address.
              </p>
              <p>That&apos;s enough to complete all the tasks in the game.</p>
              <p>
                Don&apos;t see your tokens? Double check that your wallet is
                connected to the Polygon Network.
              </p>
              <p>
                Once you receive them, use the #collabland-join channel to
                verify your ownership and see the rest of the channels on
                Discord.
              </p>
            </>
          )}
          {activeDot === 2 && (
            <>
              <h2>Receive gas using tokens (for free!)</h2>
              <p>
                <a
                  href="https://discord.gg/pNSFNfyVxA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join our Discord
                </a>{" "}
                and use the #matic-faucet to receive .0420 $MATIC. You&apos;ll
                need the 300 $FWEB3 tokens from the fweb3 faucet in order to use
                it.
              </p>
            </>
          )}
          {activeDot === 3 && (
            <>
              <h2>Use gas to send tokens</h2>
              <p>This one&apos;s easy!</p>
              <p>Use MetaMask to send 100 FWEB3 tokens to someone.</p>
            </>
          )}
          {activeDot === 4 && (
            <>
              <h2>Mint an NFT</h2>
              <p>
                Go to{" "}
                <a
                  href="https://polygonscan.com/address/0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B#writeContract"
                  target="_blank"
                  rel="noreferrer"
                >
                  our diamond NFT smart contract
                </a>{" "}
                and mint yourself a Diamond NFT that will last forever.
              </p>
              <p>
                To mint yourself a unique diamond, pick a number of your choice
                and enter it in the “mint” function.
              </p>
              <p style={{ color: "#f55" }}>
                If the gas is too high, it means that diamond is already taken.
                Please try a new one!
              </p>
              <p>
                This will show up in your OpenSea shortly, which you can see
                here:{" "}
                <a
                  href="https://opensea.io/account"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://opensea.io/account
                </a>
              </p>
            </>
          )}
          {activeDot === 5 && (
            <>
              <h2>Burn a token</h2>
              <p>
                Do this by sending at least 1 $FWEB3 token to:{" "}
                <pre>0x000000000000000000000000000000000000dead</pre>
              </p>
              <p>
                This is kind of like throwing a dollar bill in a river. It
                won&apos;t be reflected in the totalSupply function universally,
                but there is a paper trail that you effectively destroyed one
                token. Deflation!
              </p>
            </>
          )}
          {activeDot === 6 && (
            <>
              <h2>Swap a token</h2>
              <p>
                Go to Uniswap to swap 1 $FWEB3 token for some more MATIC:{" "}
                <a
                  href="https://app.uniswap.org/#/swap?chain=polygon"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://app.uniswap.org/#/swap?chain=polygon
                </a>
                .
              </p>
              <p>
                If it doesn&apos;t appear, that means you need to import the
                FWEB3 token into Uniswap.
              </p>
            </>
          )}
          {activeDot === 7 && (
            <>
              <h2>Vote in a proposal with your tokens</h2>
              <p>
                Use our poll contract to vote yes or no. You&apos;ll need at
                least 100 $FWEB3 tokens in order to do this.
              </p>
              <p>
                <a
                  href="https://polygonscan.com/address/0x718ad63821a6a3611Ceb706f15971ee029812365#writeContract"
                  target="_blank"
                  rel="noreferrer"
                >
                  0x718ad63821a6a3611Ceb706f15971ee029812365
                </a>
              </p>
              <p>What question are you answering? Who knows!</p>
            </>
          )}
          {activeDot === 8 && (
            <>
              <h2>Create your own token</h2>
              <p>
                This is the final step. You&apos;re going to deploy your own
                code to the Polygon blockchain, just like we had to do to make
                this game.
              </p>
              <p>
                So far, you have interfaced with **three** smart contracts we
                have deployed:
              </p>
              <ol>
                <li>The ERC20 token for the 10,000,000 $FWEB3 tokens</li>
                <li>The ERC721 token for the Diamond NFT</li>
                <li>The scratch-made smart contract of the poll above</li>
              </ol>
              <p>
                Now you will deploy one of your own. Need help? Check out{" "}
                <a
                  href="https://www.notion.so/fweb3/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3c526735ae074b88838ad7b467545614"
                  target="_blank"
                  rel="noreferrer"
                >
                  this video
                </a>{" "}
                we made.
              </p>
            </>
          )}
          {!gameTileCompletionStates[0] && !query.wallet && (
            <div>
              <p>
                It&apos;s free to play. Login with MetaMask to get started
                (you&apos;ll be prompted to install it if you don&apos;t have it
                already):
              </p>
              <p>
                {triedToEagerConnect && (
                  <Account triedToEagerConnect={triedToEagerConnect} />
                )}
              </p>
              {chainId !== undefined && chainId !== 137 && !query.wallet && (
                <p style={{ color: "#f55" }}>
                  Switch to Polygon via MetaMask to play this game.
                </p>
              )}
            </div>
          )}
          {completedTiles !== 9 && (
            <p style={{ color: "#fff", fontWeight: "bold" }}>
              Stuck? Click the dots to the left to see further instructions, or
              check out the Walkthrough below.
            </p>
          )}
        </section>
      </main>
      <footer>
        <a
          href="https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7"
          target="_blank"
          rel="noreferrer"
        >
          Walkthrough
        </a>
        <a
          href="https://discord.gg/pNSFNfyVxA"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
        <a
          href="https://github.com/slavingia/fweb3.xyz/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
