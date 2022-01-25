import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>
            <Image src="/fweb3.svg" width="200" height="41" />
          </h1>
          <p>
            Spend the month of February learning and building Web3 with me.
          </p>
          <p>
            To join <a href="https://discord.com/invite/dNvYpeg2RC">the Discord</a> where I'll be livestreaming as I go, you'll need 100 <a href="https://etherscan.io/address/0x95cd50f9d591630db85d95c932bbc704dc0ae92a">$FWEB3</a> tokens. Get them by <a href="https://forms.gle/CAmcLmTd6zwoaroy6">providing your email and wallet address</a>.
          </p>
          <p>
            Inside, there will be challenges to help you learn about and build Web3 alongside me. If you complete them all by the end of Feb, you will receive additional tokens.
          </p>
          <p>
            And we will do it all again next year!
          </p>
          <p>See you soon,
            <br /><a href="https://twitter.com/shl">@shl</a>
          </p>
        </section>
      </main>
    </div>
  )
}
