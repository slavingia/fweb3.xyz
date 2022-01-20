import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build Web3 in Fweb3" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build Web3 in Fweb3" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build Web3 in Fweb3" property="og:description" />
        <meta content="https://fweb3.xyz/fweb3.png" property="og:image" />
        <meta content="Learn and build Web3 in Fweb3" property="twitter:title" />
        <meta content="Learn and build Web3 in Fweb3" property="twitter:description" />
        <meta content="https://fweb3.xyz/fweb3.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Image src="/fweb3.svg" width="200" height="41" />
        </h1>
      </main>
    </div>
  )
}
