import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { createContext } from "react";

import getLibrary from "../utils/getLibrary";

import "../styles/globals.css";

export type GameState = {
  polygonData?: object;
  activeDot: number;
  setActiveDot: (idx: number) => void;
  hasWonGame: boolean;
  completedTiles?: number;
  gameTileCompletionStates: number[];
  trophyId?: number;
  shareImageUrl: string;
  shareText: string;
};

const defaultGameState: GameState = {
  polygonData: {},
  activeDot: -1,
  setActiveDot: () => {},
  hasWonGame: false,
  completedTiles: 0,
  gameTileCompletionStates: [],
  trophyId: null,
  shareImageUrl: "",
  shareText: "",
};

export const GameContext = createContext(defaultGameState);

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
