import useSwr from "swr";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import { parseBalanceToNum } from "../util";
import { useRouter } from "next/router";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";

const FWEB3_TOKEN_ADDRESS = "0x4a14ac36667b574b08443a15093e417db909d7a3";

const fetcher = (url) => fetch(url).then((res) => res.json());

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { query } = useRouter();

  const { active, error, activate, account, setError } =
    useWeb3React();

  const {
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
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
      <button className="pulse" onClick={isWeb3Available ? (
        () => {
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
      ) : startOnboarding}>
        Connect your wallet
      </button>
    );
  }
};

export default function Home() {
  const { query } = useRouter();

  const { account, library, active, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const { data: polygonData, error } = useSwr(
    `/api/polygon?wallet_address=${query.wallet ? query.wallet : account}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  let gameTileCompletionStates = [
    (isConnected || query.wallet) ? 1 : 0,
    parseBalanceToNum((polygonData && polygonData["tokenBalance"]) ?? 0) >= 100 ? 1 : 0,
    polygonData && polygonData["hasUsedFaucet"] ? 1 : 0,
    polygonData && polygonData["hasSentTokens"] ? 1 : 0,
    polygonData && polygonData["hasMintedNFT"] ? 1 : 0,
    polygonData && polygonData["hasBurnedTokens"] ? 1 : 0,
    polygonData && polygonData["hasSwappedTokens"] ? 1 : 0,
    polygonData && polygonData["hasVotedInPoll"] ? 1 : 0,
    polygonData && polygonData["hasDeployedContract"] ? 1 : 0
  ];

  let completedTiles = 0;
  for (let i = 0; i < gameTileCompletionStates.length; i++) {
    completedTiles += gameTileCompletionStates[i];
  }

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
        <h1>
          fweb3
        </h1>

        <p>
          <strong>{Math.round(completedTiles / 9 * 100)}%</strong> complete
        </p>

        {query.wallet !== undefined && query.wallet !== account && query.wallet.length > 0 && (
          <p style={{color: "#fff"}}>{query.wallet}</p>
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
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#191c2bd41ffc41b3a47a239d7cfa7346">
              <div className={"game-tile " + (gameTileCompletionStates[0] ? "completed" : "")}>
                <div className="tooltip">
                  Connect your wallet
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#33e99118e0ae497bac26e5b62f629684">
              <div className={"game-tile " + (gameTileCompletionStates[1] ? "completed" : "")}>
                <div className="tooltip">
                  Get 100 $FWEB3 tokens
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#b9f3a9b9f2c645fb82e9633a2e44ca19">
              <div className={"game-tile " + (gameTileCompletionStates[2] ? "completed" : "")}>
                <div className="tooltip">
                  Use the faucet to get .1 $MATIC
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#dfbd8c7587504d72b93cfa9b1ed3d822">
              <div className={"game-tile " + (gameTileCompletionStates[3] ? "completed" : "")}>
                <div className="tooltip">
                  Send 100 $FWEB3 tokens to someone
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#1683ea6108ae41e49a6cfa3a30fdc0a7">
              <div className={"game-tile " + (gameTileCompletionStates[4] ? "completed" : "")}>
                <div className="tooltip">
                  Mint a Fweb3 NFT
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#50bdb9a3ed904aa58b0e71979e7f52d6">
              <div className={"game-tile " + (gameTileCompletionStates[5] ? "completed" : "")}>
                <div className="tooltip">
                  Burn at least one $FWEB3 token
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#de8d1ab1d12f408b96b9f4d7156b3959">
              <div className={"game-tile " + (gameTileCompletionStates[6] ? "completed" : "")}>
                <div className="tooltip">
                  Swap a $FWEB3 token for some $MATIC
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#f9d992dc1327486eba0e417f53ac7753">
              <div className={"game-tile " + (gameTileCompletionStates[7] ? "completed" : "")}>
                <div className="tooltip">
                  Vote on a Fweb3 poll
                </div>
              </div>
            </a>
            <a href="https://www.notion.so/s-h-l/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0#034d12e44d9e4ee693a193dc4b1e7ab0">
              <div className={"game-tile " + (gameTileCompletionStates[8] ? "completed" : "")}>
                <div className="tooltip">
                  Write and deploy a smart contract
                </div>
              </div>
            </a>
          </div>

          <a className="share-button" onClick={() => {
            let gameTiles = document.getElementsByClassName("game-tile");
            let completedGameTiles = [];
            for (let i = 0; i < gameTiles.length; i++) {
              completedGameTiles.push(gameTiles[i].classList.contains("completed"));
            }

            let shareText = `Fweb3 ${ completedGameTiles.reduce((a, b) => a + b) }/9\n\n`;

            for (let i = 0; i < gameTiles.length; i++) {
              shareText += completedGameTiles[i] ? "🟣" : "⚫️";

              if (i % 3 == 2 && i != gameTiles.length - 1) {
                shareText += "\n";
              }
            }

            if (navigator.share) {
              navigator.share({
                text: shareText
              });
            } else {
              window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText));
            }
          }}>
            Share your progress
          </a>
        </section>
        <section>
          <h2>Learn and build in web3.</h2>
          <p>There are 9 dots to light up by doing things on a blockchain (in this case, Polygon). Once you light them all up, you win additional $FWEB3 tokens and a commemorative NFT.</p>
          {!gameTileCompletionStates[0] && !query.wallet && (
            <div>
              <p>It&apos;s free to play. Login with MetaMask to get started (you&apos;ll be prompted to install it if you don&apos;t have it already):</p>
              <p>
                <Account triedToEagerConnect={triedToEagerConnect} />
              </p>
              {(chainId !== undefined && chainId !== 137 && !query.wallet) && (
                <p style={{color: "#f55"}}>Switch to Polygon via MetaMask to play this game.</p>
              )}
            </div>
          )}
          {completedTiles === 9 && !query.wallet && (
            <div>
              <p><strong style={{color: "white"}}>You&apos;ve completed all the dots!</strong></p>
              <p>
                Click <a href="https://polygonscan.com/address/0xc6c5f7b1a27528dd6f34ef164377965114bfa7d9#writeContract">here</a> and click Write under seekVerification.
              </p>
              <p>
                Then, ping #finish-line in Discord with your Fweb3 profile URL:
                fweb3.xyz?wallet={ account }</p>
            </div>
          )}
        </section>
      </main>
      <footer>
        <a href="https://s-h-l.notion.site/Walkthrough-058a7ba0a8fe4d798370e4f6a5fda8b0">Walkthrough</a>
        <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
        <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
      </footer>
    </div>
  )
}
