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
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>
            <Image src="/fweb3.svg" width="200" height="41" />
          </h1>
          <p>
            Fweb3 begins on February 1.
          </p>
          <p>
            <a href="https://forms.gle/CAmcLmTd6zwoaroy6">Provide your email and wallet address</a> to be airdropped 300 <a href="https://etherscan.io/address/0x95cd50f9d591630db85d95c932bbc704dc0ae92a">$FWEB3</a> tokens before launch.
          </p>
          <p>
            Only 100 tokens will be required to participate in <a href="https://discord.com/invite/dNvYpeg2RC">the Fweb3 community</a>, which will contain challenges that will help you learn about and build Web3.
          </p>
          <p>
            If you complete them all by the end of February, you will get additional tokens. You’ll need a certain amount of tokens to participate next year, determined by the community.
          </p>

          <p>See you in there soon!</p>
        </section>
      </main>
    </div>
  )
}
