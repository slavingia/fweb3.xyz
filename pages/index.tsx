import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";

import { ActiveDotInfo } from "../components/ActiveDotInfo";
import { Navigation } from "../components/Navigation";
import { getTileStates } from "../polygon/gameStats";
import { GameChest } from "../components/GameChest";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GameContext, GameState } from "../pages/_app";

const trophyColor = (trophyId) => {
  switch (trophyId) {
    case trophyId <= 333:
      return "gold";
    case trophyId <= 3333:
      return "silver";
    default:
      return "copper";
  }
};

const getShareText = (trophyId) => {
  return trophyId
    ? `🏆 I won a ${trophyColor(trophyId)} trophy in Fweb3!`
    : "Fweb3";
};

const getShareImageUrl = (trophyId) => {
  return trophyId
    ? `https://fweb3.xyz/fweb_yearone_${trophyColor(trophyId)}.png`
    : "https://fweb3.xyz/fweb3.png";
};

export default function Home() {
  const [gameTileCompletionStates, setGameTileCompletionStates] = useState([]);
  const [completedTiles, setCompletedTiles] = useState(0);
  const [polygonData, setPolgonData] = useState(null);
  const [activeDot, setActiveDot] = useState(-1);
  const { active, account } = useWeb3React();

  useEffect(() => {
    (async () => {
      if (active && account) {
        const dataURI = `/api/polygon?wallet_address=${account}&off=true`;
        const res = await fetch(dataURI);
        const polygonData = await res.json();
        setPolgonData(polygonData);
        const { completedTiles, gameTileCompletionStates } =
          getTileStates(polygonData);
        setCompletedTiles(completedTiles);
        setGameTileCompletionStates(gameTileCompletionStates);
      }
    })();
  }, [active, account]);

  const hasWonGame = polygonData && polygonData["hasWonGame"];
  const trophyId = (polygonData && polygonData.trophyId) || null;

  const gameState: GameState = {
    polygonData,
    activeDot,
    setActiveDot,
    hasWonGame,
    completedTiles,
    gameTileCompletionStates,
    trophyId,
    shareImageUrl: getShareImageUrl(trophyId),
    shareText: getShareText(trophyId),
  };

  return (
    <GameContext.Provider value={gameState}>
      <div>
        <Header />
        <Navigation />
        <main>
          <GameChest />
          <ActiveDotInfo />
        </main>
        <Footer />
      </div>
    </GameContext.Provider>
  );
}
