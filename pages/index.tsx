import Head from "next/head";
import Image from 'next/image'

export default function Home() {
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <section>
          <h1>
            <Image src="/fweb3.svg" width="120" height="41" alt="Fweb3" />
          </h1>
          <p>
            Spend the month of February learning and building Web3.
          </p>
          <p>Provide <a href="https://forms.gle/CAmcLmTd6zwoaroy6">your email and wallet address</a> to get 300 $FWEB3 tokens–100 are required to enter the Discord.
          </p>
          <p>
            In the Discord, there will be challenges to help you learn about and build Web3 alongside me. If you complete them all by the end of Feb, you will receive additional tokens.
          </p>
          <p>See you soon,
            <br /><a href="https://twitter.com/shl">@shl</a>
          </p>
          <ul className="links">
            <li>
              <a href="https://etherscan.io/address/0x95cd50f9d591630db85d95c932bbc704dc0ae92a#code">Token smart contract</a>
            </li>
            <li>
              <a href="https://discord.gg/dNvYpeg2RC">Discord</a>
            </li>
            <li>
              <a href="https://github.com/slavingia/fweb3.xyz/issues">GitHub</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}
