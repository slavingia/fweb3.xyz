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
          <div>
            <TokenBalance tokenAddress={FWEB3_TOKEN_ADDRESS} symbol="FWEB3" />
          </div>
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
                Connect your ETH wallet
              </div>
            </div>
            <div className={"game-tile " + (parseBalanceToNum(data ?? 0) >= 100 ? "completed" : "")}>
              <div className="tooltip">
                Get 100 Fweb3 tokens (on Ethereum mainnet or Polygon), needed to join the Discord
              </div>
            </div>
            <div className="game-tile">
              <div className="tooltip">
                Send 100 tokens to someone on Polygon
              </div>
            </div>
            <div className="game-tile">
            </div>
            <div className="game-tile">
            </div>
            <div className="game-tile">
            </div>
            <div className="game-tile">
            </div>
            <div className="game-tile">
            </div>
            <div className="game-tile">
            </div>
          </div>

          <button className="mint disabled">
            Get 1,000 additional FWEB3 tokens + NFT
          </button>
        </section>
      </main>
      <footer>
        <a href="https://etherscan.io/address/0x95cd50f9d591630db85d95c932bbc704dc0ae92a#code">Token smart contract</a>
        <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
        <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
      </footer>
    </div>
  )
}
