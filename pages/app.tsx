import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from 'next/image'
import Account from "../components/Account";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";

const FWEB3_TOKEN_ADDRESS = "0x95cd50f9d591630db85d95c932bbc704dc0ae92a";

function App() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build Web3 in February" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build Web3 in February" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build Web3 in February" property="og:description" />
        <meta content="https://fweb3.xyz/fweb3.png" property="og:image" />
        <meta content="Fweb3 – Learn and build Web3 in February" property="twitter:title" />
        <meta content="https://fweb3.xyz/fweb3.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>

      <main>
        <section>
          <h1>
            <Image src="/fweb3.svg" width="200" height="41" alt="Fweb3" />
          </h1>

          <p>Welcome! If you&apos;re here to check how many $FWEB3 tokens you have, you&apos;ve come to the right place.</p>

          <p>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </p>

          {isConnected && (
            <div>
              <TokenBalance tokenAddress={FWEB3_TOKEN_ADDRESS} symbol="FWEB3" />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
