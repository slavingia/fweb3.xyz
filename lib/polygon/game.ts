import { checkHasWonGame, currentWalletGameState } from "./validators";
import { DEFAULT_GAME_STATE, GAME_TASKS } from "../constants";
import { GameTaskState, GameWinState } from "./../types";

export const fetchCurrentGameState = async (
  walletAddress: string
): Promise<GameTaskState | GameWinState> => {
  const wonGameState = await checkHasWonGame(walletAddress);
  if (wonGameState && wonGameState.trophyId) {
    return wonGameState;
  }
  return currentWalletGameState(walletAddress);
};

export const fetchDebugGameState = (debugItems: string): GameTaskState => {
  const items: string[] = debugItems.split("");
  const enabledState = {
    ...DEFAULT_GAME_STATE,
  };
  items.forEach((item) => (enabledState[GAME_TASKS[parseInt(item)]] = true));
  return enabledState;
};
