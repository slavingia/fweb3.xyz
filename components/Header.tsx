import { useRouter } from "next/router";
import { useContext } from "react";
import Head from "next/head";

import { GameContext } from "../pages/_app";

export const Header = () => {
  const { shareImageUrl } = useContext(GameContext);
  const { query } = useRouter();
  return (
    <Head>
      <title>{query.wallet ? query.wallet : "Fweb3"}</title>
      <meta name="description" content="Learn and build web3" />
      <link rel="icon" href="/icon.png" />
      <meta content="Learn and build web3" name="description" />
      <meta content="Fweb3" property="og:title" />
      <meta content="Learn and build web3" property="og:description" />
      <meta content={shareImageUrl} property="og:image" />
      <meta content="Fweb3" property="twitter:title" />
      <meta content={shareImageUrl} property="twitter:image" />
      <meta property="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};
