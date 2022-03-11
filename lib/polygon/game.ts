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
  if (!debugItems) {
    return { ...DEFAULT_GAME_STATE };
  }
  const items: string[] = debugItems.split("");
  const enabledState = {
    ...DEFAULT_GAME_STATE,
  };
  items.map((item, idx) => (enabledState[GAME_TASKS[idx + 1]] = true));
  return enabledState;
};
