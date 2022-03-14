import { IAPIQuery } from "./../../types/core.types";
import { NextApiRequest, NextApiResponse } from "next";

import {
  validateRequest,
  fetchDebugGameState,
  fetchCurrentGameState,
} from "../../lib";
import type { IGameTaskState } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const enabledDots: string = process.env.NEXT_PUBLIC_DEBUG_ENABLE_DOTS;
    const { debug, wallet_address: walletAddress }: IAPIQuery = req.query;
    // Throws if invalid
    validateRequest(req);

    if (enabledDots && debug) {
      const fetchedfetchedGameState = await fetchDebugGameState(enabledDots);
      return res.json(fetchedfetchedGameState);
    }

    const strWallet: string = Array.isArray(walletAddress)
      ? walletAddress[0]
      : walletAddress;

    const currentGameState: IGameTaskState = await fetchCurrentGameState(
      strWallet
    );

    return res.json(currentGameState);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Something went wrong");
  }
}
