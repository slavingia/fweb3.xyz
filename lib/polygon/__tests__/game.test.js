import { checkHasWonGame, currentWalletGameState } from "../validators";
import { fetchCurrentGameState, fetchDebugGameState } from "../game";
import { DEFAULT_GAME_STATE } from "../../constants";

jest.mock("../validators");

describe("the game", () => {
  it("fetches current game state", async () => {
    checkHasWonGame.mockReturnValue(false);
    currentWalletGameState.mockReturnValue(DEFAULT_GAME_STATE);
    const actual = await fetchCurrentGameState();
    expect(actual).toBe(DEFAULT_GAME_STATE);
  });
  it("sends back a winner game state", async () => {
    checkHasWonGame.mockReturnValue({ ...DEFAULT_GAME_STATE, trophyId: "100" });
    const actual = await fetchCurrentGameState();
    expect(actual).toEqual({ ...DEFAULT_GAME_STATE, trophyId: "100" });
  });
  it("returns default state when no debug flag passed", () => {
    const actual = fetchDebugGameState();
    expect(actual).toEqual(DEFAULT_GAME_STATE);
  });
  it("switches game state with debug flag", () => {
    const actual = fetchDebugGameState("111");
    expect(actual).toEqual({
      ...DEFAULT_GAME_STATE,
      hasUsedFaucet: true,
      hasEnoughTokens: true,
    });
  });
});
