import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { useEffect, useState } from "react";
import { GameContext } from "../context";
import type { AppProps } from "next/app";

import getLibrary from "../getLibrary";
import "../styles/globals.css";
import useSWR from "swr";
import { getTileStates } from "../polygon/gameStats";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
