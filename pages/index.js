import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build Web3 in Fweb3" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fweb3
        </h1>
      </main>
    </div>
  )
}
