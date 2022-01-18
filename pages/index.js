import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build web3 in Feb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fweb3
        </h1>
      </main>
    </div>
  )
}
