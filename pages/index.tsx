import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Account from "../components/Account";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalanceToNum } from "../util";

const FWEB3_TOKEN_ADDRESS = "0x4a14ac36667b574b08443a15093e417db909d7a3";

export default function Home() {
  const { account, library, active } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;
  const { data } = useTokenBalance(account, FWEB3_TOKEN_ADDRESS);

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
        <Account triedToEagerConnect={triedToEagerConnect} />
        {isConnected && (
          <TokenBalance tokenAddress={FWEB3_TOKEN_ADDRESS} symbol="FWEB3" />
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
            <div className={"game-tile " + (isConnected ? "completed" : "")}>
              <div className="tooltip">
                Auth your wallet
              </div>
            </div>
            <a href="https://discord.gg/XgqAHhUe">
              <div className={"game-tile " + (parseBalanceToNum(data ?? 0) >= 100 ? "completed" : "")}>
                <div className="tooltip">
                  Get 100 $FWEB3 tokens
                </div>
              </div>
            </a>
            <a href="https://polygonscan.com/address/0x67806adca0fD8825DA9cddc69b9bA8837A64874b#writeContract">
              <div className="game-tile">
                <div className="tooltip">
                  Use the faucet to get .1 $MATIC
                </div>
              </div>
            </a>
            <div className="game-tile">
              <div className="tooltip">
                Send 100 $FWEB3 tokens to someone
              </div>
            </div>
            <div className="game-tile">
              <div className="tooltip">
                Mint a Fweb3 NFT
              </div>
            </div>
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
        </section>
      </main>
      <footer>
        <a href="https://polygonscan.com/address/0x4a14ac36667b574b08443a15093e417db909d7a3#code">Token smart contract</a>
        <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
        <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
      </footer>
    </div>
  )
}
