import useSwr from "swr";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import { parseBalanceToNum } from "../util";
import { useRouter } from "next/router";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import React, { useEffect, useState } from "react";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import cn from "classnames";

const fetcher = (url) => fetch(url).then((res) => res.json());

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, account, setError } = useWeb3React();

  const { isWeb3Available, startOnboarding, stopOnboarding } =
    useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [_connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <button
        className="pulse"
        onClick={
          isWeb3Available
            ? () => {
                setConnecting(true);

                activate(injected, undefined, true).catch((error) => {
                  // ignore the error if it is a user rejected request
                  if (error instanceof UserRejectedRequestError) {
                    setConnecting(false);
                  } else {
                    setError(error);
                  }
                });
              }
            : startOnboarding
        }
      >
        Connect your wallet
      </button>
    );
  }
};

type DotContent = {
  id: string;
  position: number;
  toolTip: string;
  link: string;
};

enum DotKey {
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

const dotContent: Record<DotKey, DotContent> = {
  [DotKey.isConnected]: {
    id: DotKey.isConnected,
    position: 0,
    toolTip: "Connect your wallet",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#191c2bd41ffc41b3a47a239d7cfa7346",
  },
  [DotKey.hasTokens]: {
    id: DotKey.hasTokens,
    position: 1,
    toolTip: "Get 100 $FWEB3 tokens",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#33e99118e0ae497bac26e5b62f629684",
  },
  [DotKey.hasUsedFaucet]: {
    id: DotKey.hasUsedFaucet,
    position: 2,
    toolTip: "Use the faucet to get .1 $MATIC",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#b9f3a9b9f2c645fb82e9633a2e44ca19",
  },
  [DotKey.hasSentTokens]: {
    id: DotKey.hasSentTokens,
    position: 3,
    toolTip: "Send 100 $FWEB3 tokens to someone",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#dfbd8c7587504d72b93cfa9b1ed3d822",
  },
  [DotKey.hasMintedNFT]: {
    id: DotKey.hasMintedNFT,
    position: 4,
    toolTip: "Mint a Fweb3 NFT",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#1683ea6108ae41e49a6cfa3a30fdc0a7",
  },
  [DotKey.hasBurnedTokens]: {
    id: DotKey.hasBurnedTokens,
    position: 5,
    toolTip: "Burn at least one $FWEB3 token",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#50bdb9a3ed904aa58b0e71979e7f52d6",
  },
  [DotKey.hasSwappedTokens]: {
    id: DotKey.hasSwappedTokens,
    position: 6,
    toolTip: "Swap a $FWEB3 token for some $MATIC",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#de8d1ab1d12f408b96b9f4d7156b3959",
  },
  [DotKey.hasVotedInPoll]: {
    id: DotKey.hasVotedInPoll,
    position: 7,
    toolTip: "Vote on a Fweb3 poll",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#f9d992dc1327486eba0e417f53ac7753",
  },
  [DotKey.hasDeployedContract]: {
    id: DotKey.hasDeployedContract,
    position: 8,
    toolTip: "Write and deploy a smart contract",
    link: "https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#034d12e44d9e4ee693a193dc4b1e7ab0",
  },
};

const orderedDots = Object.keys(dotContent).reduce((list, key) => {
  const dot = dotContent[key];
  list[dot.position] = dot;
  return list;
}, []);

type DotProps = DotContent & {
  gameTileCompletionStates: number[],
  activeDot: number,
  setActiveDot: (dot: number) => void,
};

const Dot: React.FC<DotProps> = ({
  toolTip,
  position,
  gameTileCompletionStates,
  activeDot,
  setActiveDot,
}) => {
  return (
    <div
      onClick={() => setActiveDot(position)}
      className={cn("game-tile", {
        completed: !!gameTileCompletionStates[position],
        active: activeDot === position,
      })}
    >
      <div className="tooltip">{toolTip}</div>
    </div>
  );
};

export default function Home() {
  const { query } = useRouter();

  const { account, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [activeDot, setActiveDot] = useState(-1);

  let polygonData, completedTiles = 0, gameTileCompletionStates = [];

  useEffect(() => {
    console.log(localStorage);
    if (localStorage.getItem("gameState") === "won") {
      polygonData = [1, 1, 1, 1, 1, 1, 1, 1, 1];
      completedTiles = 9;
    } else {
      const { data: polygonData } = useSwr(
        `/api/polygon?wallet_address=${query.wallet ? query.wallet : account}`,
        fetcher,
        { revalidateOnFocus: false }
      );

      gameTileCompletionStates = [
        isConnected || query.wallet ? 1 : 0,
        parseBalanceToNum((polygonData && polygonData["tokenBalance"]) ?? 0) >= 100
          ? 1
          : 0,
        polygonData && polygonData["hasUsedFaucet"] ? 1 : 0,
        polygonData && polygonData["hasSentTokens"] ? 1 : 0,
        polygonData && polygonData["hasMintedNFT"] ? 1 : 0,
        polygonData && polygonData["hasBurnedTokens"] ? 1 : 0,
        polygonData && polygonData["hasSwappedTokens"] ? 1 : 0,
        polygonData && polygonData["hasVotedInPoll"] ? 1 : 0,
        polygonData && polygonData["hasDeployedContract"] ? 1 : 0,
      ];

      completedTiles = 0;
      for (let i = 0; i < gameTileCompletionStates.length; i++) {
        completedTiles += gameTileCompletionStates[i];
      }

      if (completedTiles === 9) {
        localStorage.setItem("gameState", "won");
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build web3" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build web3" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build web3" property="og:description" />
        <meta content="https://fweb3.xyz/fweb3.png" property="og:image" />
        <meta content="Fweb3 – Learn and build web3" property="twitter:title" />
        <meta content="https://fweb3.xyz/fweb3.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <h1>fweb3</h1>

        <p>
          <strong>{Math.round((completedTiles / 9) * 100)}%</strong> complete
        </p>

        {query.wallet !== undefined &&
          query.wallet !== account &&
          query.wallet.length > 0 && (
            <a
              href={"https://polygonscan.com/address/" + query.wallet}
              target="_blank"
              rel="noreferrer"
            >
              <p style={{ color: "#fff" }}>{query.wallet}</p>
            </a>
          )}

        {isConnected || query.wallet ? (
          <TokenBalance
            balance={polygonData && polygonData["tokenBalance"]}
            symbol="FWEB3"
          />
        ) : (
          <div>0 FWEB3</div>
        )}
      </nav>

      <main>
        <section>
          <div className="game-grid">
            {orderedDots.map(({ id, toolTip, link, position }) => {
              return (
                <Dot
                  key={id}
                  id={id}
                  gameTileCompletionStates={gameTileCompletionStates}
                  link={link}
                  position={position}
                  toolTip={toolTip}
                  activeDot={activeDot}
                  setActiveDot={setActiveDot}
                />
              );
            })}
          </div>

          <a
            className="share-button"
            onClick={() => {
              let gameTiles = document.getElementsByClassName("game-tile");
              let completedGameTiles = [];
              for (let i = 0; i < gameTiles.length; i++) {
                completedGameTiles.push(
                  gameTiles[i].classList.contains("completed")
                );
              }

              let shareText = `Fweb3 ${completedGameTiles.reduce(
                (a, b) => a + b
              )}/9\n\n`;

              for (let i = 0; i < gameTiles.length; i++) {
                shareText += completedGameTiles[i] ? "🟣" : "⚫️";

                if (i % 3 == 2 && i != gameTiles.length - 1) {
                  shareText += "\n";
                }
              }

              if (navigator.share) {
                navigator.share({
                  text: shareText,
                });
              } else {
                window.open(
                  "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(shareText)
                );
              }
            }}
          >
            Share your progress
          </a>
        </section>
        <section>
          {(activeDot === -1 || activeDot === 0) && (
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
              <p>To get started, click the pulsing button, install MetaMask if you haven&apos;t already, and login.</p>
              <p>If you&apos;re new, I would recommend taking your seed phrase and sticking it in Apple Notes. It&apos;s good enough for now.</p>
            </>
          )}
          {activeDot === 1 && (
            <>
              <h2>Receive tokens (for free!)</h2>
              <p><a href="https://discord.gg/azzGB8MJB2">Join our Discord</a> and ask in #token-requests for 222 $FWEB3 tokens.</p>
              <p>Please specify your wallet address when you do so! That&apos;s enough to complete all the tasks in the game.</p>
              <p>Once you receive them, use the #collabland-join channel to verify your ownership and see the rest of the channels on Discord.</p>
            </>
          )}
          {activeDot === 2 && (
            <>
              <h2>Receive gas using tokens (for free!)</h2>
              <p>Use our faucet to receive .1 MATIC. You&apos;ll need at least 100 $FWEB3 tokens in order to do this.</p>
              <p style={{color: "#f55"}}>Note that using the faucet directly will cost some gas, which you don&apos;t have yet! So...</p>
              <p>Use this website we built to use it for free: <a href="https://fweb3-matic-faucet.netlify.app/">https://fweb3-matic-faucet.netlify.app/</a></p>
            </>
          )}
          {activeDot === 3 && (
            <>
              <h2>Use gas to send tokens</h2>
              <p>Use MetaMask to send tokens to someone.</p>
            </>
          )}
          {activeDot === 4 && (
            <>
              <h2>Mint an NFT</h2>
              <p>Go to <a href="https://polygonscan.com/address/0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B#writeContract">our diamond NFT smart contract</a> and mint yourself a Diamond NFT that will last forever.</p>
              <p>To mint yourself a unique diamond, pick a number of your choice and enter it in the “mint” function.</p>
              <p style={{color: "#f55"}}>If the gas is too high, it means that diamond is already taken. Please try a new one!</p>
              <p>This will show up in your OpenSea shortly, which you can see here: <a href="https://opensea.io/account">https://opensea.io/account</a></p>
            </>
          )}
          {activeDot === 5 && (
            <>
              <h2>Burn a token</h2>
              <p>Do this by sending at least 1 $FWEB3 token to: <pre>0x000000000000000000000000000000000000dead</pre></p>
              <p>This is kind of like throwing a dollar bill in a river. It won&apos;t be reflected in the totalSupply function universally, but there is a paper trail that you effectively destroyed one token. Deflation!</p>
            </>
          )}
          {activeDot === 6 && (
            <>
              <h2>Swap a token</h2>
              <p>Go to Uniswap to swap 1 $FWEB3 token for some more MATIC: <a href="https://app.uniswap.org/#/swap?chain=polygon">https://app.uniswap.org/#/swap?chain=polygon</a>.</p>
              <p>If it doesn&apos;t appear, that means you need to import the FWEB3 token into Uniswap.</p>
            </>
          )}
          {activeDot === 7 && (
            <>
              <h2>Vote in a proposal with your tokens</h2>
              <p>Use our poll contract to vote yes or no. You&apos;ll need at least 100 $FWEB3 tokens in order to do this.</p>
              <p><a href="https://polygonscan.com/address/0x718ad63821a6a3611Ceb706f15971ee029812365#writeContract">https://polygonscan.com/address/0x718ad63821a6a3611Ceb706f15971ee029812365#writeContract</a></p>
              <p>What question are you answering? Who knows!</p>
            </>
          )}
          {activeDot === 8 && (
            <>
              <h2>Create your own token</h2>
              <p>This is the final step. You’re going to deploy your own code to the Polygon blockchain, just like we had to do to make this game.</p>
              <p>So far, you have interfaced with **three** smart contracts we have deployed:</p>
              <ol>
                <li>The ERC20 token for the 10,000,000 FWEB3 tokens</li>
                <li>The ERC721 token for the Diamond NFT</li>
                <li>The scratch-made smart contract of the poll above</li>
              </ol>
              <p>Now you will deploy one of your own. Need help? Check out <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#669ca4319ed646c683f4098e71505ead">this video</a> we made.</p>
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
                <Account triedToEagerConnect={triedToEagerConnect} />
              </p>
              {chainId !== undefined && chainId !== 137 && !query.wallet && (
                <p style={{ color: "#f55" }}>
                  Switch to Polygon via MetaMask to play this game.
                </p>
              )}
            </div>
          )}
          {(completedTiles === 9 && !query.wallet && activeDot == -1) && (
            <div>
              <p>
                <strong style={{ color: "white" }}>
                  You&apos;ve completed all the dots!
                </strong>
              </p>
              <p>
                Click{" "}
                <a href="https://polygonscan.com/address/0xc6c5f7b1a27528dd6f34ef164377965114bfa7d9#writeContract">
                  here
                </a>{" "}
                and click Write under seekVerification.
              </p>
              <p>
                Then, ping #finish-line in Discord with your Fweb3 profile URL:
                https://fweb3.xyz?wallet={account}
              </p>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a href="https://s-h-l.notion.site/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0">
          Walkthrough
        </a>
        <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
        <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
      </footer>
    </div>
  );
}
