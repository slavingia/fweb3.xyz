import { NextApiRequest, NextApiResponse } from "next";

import {
  validateRequest,
  fetchDebugGameState,
  fetchCurrentGameState,
  IGameTaskState,
  IGameWinState,
} from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { debug, wallet_address: walletAddress } = req.query;
    // Throws if invalid
    validateRequest(req);

    if (debug) {
      const debugStr: string = Array.isArray(debug) ? debug[0] : debug;
      return res.json(fetchDebugGameState(debugStr));
    }
    const strWallet: string = Array.isArray(walletAddress)
      ? walletAddress[0]
      : walletAddress;
    const currentGameState: IGameTaskState | IGameWinState =
      await fetchCurrentGameState(strWallet);
    return res.json(currentGameState);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Something went wrong");
  }
}
