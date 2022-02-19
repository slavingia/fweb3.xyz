import useSwr from 'swr';
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalanceToNum } from "../util";
import { useRouter } from "next/router";

const FWEB3_TOKEN_ADDRESS = "0x4a14ac36667b574b08443a15093e417db909d7a3";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { query } = useRouter();

  const { account, library, active, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;
  const { data: tokenBalance } = useTokenBalance(account, FWEB3_TOKEN_ADDRESS);

  const { data: polygonData, error } = useSwr(`/api/polygon?wallet_address=${query.wallet ? query.wallet : account}`, fetcher);

  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build web3 in February" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build web3 in February" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build web3 in February" property="og:description" />
        <meta content="https://fweb3.xyz/fweb3.png" property="og:image" />
        <meta content="Fweb3 – Learn and build web3 in February" property="twitter:title" />
        <meta content="https://fweb3.xyz/fweb3.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav>
        <h1>
          fweb3
        </h1>

        {chainId !== 137 && (
          <p style={{color: "#f55"}}>Switch to Polygon via MetaMask to play this game.</p>
        )}

        {query.wallet !== account && (
          <p style={{color: "#fff"}}>{query.wallet}</p>
        )}

        {isConnected ? (
          <TokenBalance tokenAddress={FWEB3_TOKEN_ADDRESS} symbol="FWEB3" />
        ) : (
          <div>0 FWEB3</div>
        )}
      </nav>

      <main>
        <section>
          <p>
            Spend the month of February learning and building web3.
          </p>
          <p>
            Complete these challenges by the end of Feb to receive additional tokens:
          </p>

          <div className="game-grid">
            <Account triedToEagerConnect={triedToEagerConnect} />
            <a href="https://discord.gg/XgqAHhUe">
              <div className={"game-tile " + (parseBalanceToNum(tokenBalance ?? 0) >= 100 ? "completed" : "")}>
                <div className="tooltip">
                  Get 100 $FWEB3 tokens
                </div>
              </div>
            </a>
            <a href="https://polygonscan.com/address/0x67806adca0fD8825DA9cddc69b9bA8837A64874b#writeContract">
              <div className={"game-tile " + (polygonData && polygonData["hasUsedFaucet"] ? "completed" : "")}>
                <div className="tooltip">
                  Use the faucet to get .1 $MATIC
                </div>
              </div>
            </a>
            <div className={"game-tile " + (polygonData && polygonData["hasSentTokens"] ? "completed" : "")}>
              <div className="tooltip">
                Send 100 $FWEB3 tokens to someone
              </div>
            </div>
            <a href="https://polygonscan.com/address/0xdc58b1b2fa7569bb12d8a74f99437a5b3f6c7dea#writeContract">
            <div className={"game-tile " + (polygonData && polygonData["hasMintedNFT"] ? "completed" : "")}>
                <div className="tooltip">
                  Mint the Fweb3 NFT
                </div>
              </div>
            </a>
            <div className="game-tile">
              <div className="tooltip">
                Burn at least one $FWEB3 token
              </div>
            </div>
            <div className="game-tile">
              <div className="tooltip">
                Vote on a Fweb3 proposal
              </div>
            </div>
            <div className="game-tile">
              <div className="tooltip">
                Swap $FWEB3 tokens for something else
              </div>
            </div>
            <div className="game-tile">
              <div className="tooltip">
                Mint your own money; ship your own ERC-20 token
              </div>
            </div>
          </div>

          <button className="mint disabled">
            Get 1,000 additional FWEB3 tokens + NFT
          </button>

          <button className="share-button" onClick={() => {
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
            Share
          </button>
        </section>
      </main>
      <footer>
        <a href="https://s-h-l.notion.site/Fweb3-4929b587926b42ed966a53d9ac9bc6bf">Notion</a>
        <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
        <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
      </footer>
    </div>
  )
}
