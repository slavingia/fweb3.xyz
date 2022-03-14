import { IAPIRequestQueryParams } from "./../../types/core.types";
import { NextApiRequest, NextApiResponse } from "next";
import { NEXT_PUBLIC_DEBUG_ENABLE_DOTS } from "../../lib/constants";
import type { IRequestValidationResponse, IGameTaskState } from "../../types";
import {
  fetchCurrentGameState,
  fetchDebugGameState,
  validateRequest,
} from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { debug, wallet_address: walletAddress }: IAPIRequestQueryParams =
      req.query;
    const { status, error }: IRequestValidationResponse = validateRequest(req);

    if (status !== 200) {
      return res.status(status).json(error);
    }

    if (NEXT_PUBLIC_DEBUG_ENABLE_DOTS) {
      const debugTaskState: IGameTaskState = await fetchDebugGameState(
        NEXT_PUBLIC_DEBUG_ENABLE_DOTS
      );
      return res.json(debugTaskState);
    }
    const gameTaskState: IGameTaskState = await fetchCurrentGameState(
      walletAddress
    );
    return res.json(gameTaskState);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Internal server error");
  }
}
