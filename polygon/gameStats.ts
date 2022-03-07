import { PolygonData, TileStates } from "./types";

const _getGameCompleteionStates = (polygonData: PolygonData): number[] => {
  return [
    polygonData && polygonData["hasEnoughTokens"] ? 1 : 0,
    polygonData && polygonData["hasUsedFaucet"] ? 1 : 0,
    polygonData && polygonData["hasSentTokens"] ? 1 : 0,
    polygonData && polygonData["hasMintedNFT"] ? 1 : 0,
    polygonData && polygonData["hasBurnedTokens"] ? 1 : 0,
    polygonData && polygonData["hasSwappedTokens"] ? 1 : 0,
    polygonData && polygonData["hasVotedInPoll"] ? 1 : 0,
    polygonData && polygonData["hasDeployedContract"] ? 1 : 0,
  ];
};

export const getTileStates = (polygonData: PolygonData): TileStates => {
  const gameTileCompletionStates = _getGameCompleteionStates(polygonData);
  let completedTiles = 0;
  for (let i = 0; i < gameTileCompletionStates.length; i++) {
    completedTiles += gameTileCompletionStates[i];
  }
  return {
    completedTiles,
    gameTileCompletionStates,
  };
};
