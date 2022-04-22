import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSwr from "swr";

import type { IGameTaskState, IRouterQuery } from "../types";
import useEagerConnect from "./useEagerConnect";
import { fetcher } from "../lib";

const enabledDots = process.env.NEXT_PUBLIC_DEBUG_ENABLE_DOTS;
const nodeEnv = process.env.NODE_ENV;

// Debug should not be public facing
const _allowDebug = (): boolean => {
  return nodeEnv !== "production" && !!enabledDots;
};

const _getWalletAddress = (wallet, account): string => {
  return wallet ?? account;
};

export const useGameState = () => {
  const {
    account,
    chainId,
    error: web3Error,
    library,
    active,
    activate,
    setError,
  } = useWeb3React<Web3ReactContextInterface>();
  const {
    query: { wallet },
  }: { query: IRouterQuery } = useRouter();
  const [activeDot, setActiveDot] = useState<number>(-1);
  const triedToEagerConnect: boolean = useEagerConnect();

  const walletAddress: string = _getWalletAddress(wallet, account);

  const apiUri: string = `/api/polygon?wallet_address=${walletAddress}${
    _allowDebug() ? `&debug=${enabledDots}` : ""
  }`;

  const { data: gameTaskState, error: swrError } = useSwr<
    IGameTaskState,
    Error
  >(wallet || account ? apiUri : null, fetcher, { revalidateOnFocus: false });

  const isConnected: boolean = typeof account === "string" && !!library;
  const hasWonGame: boolean = gameTaskState?.["hasWonGame"];

  // TrophyId will always exist. It will be 0 / falsy if they dont have one
  const trophyId: string = gameTaskState?.["trophyId"];

  useEffect(() => {
    if (web3Error || swrError) {
      const errors: Error[] = [];
      web3Error && errors.push(web3Error);
      swrError && errors.push(swrError);
      console.debug(errors);
    }
  }, [web3Error, swrError]);

  return {
    active,
    activate,
    account,
    chainId,
    triedToEagerConnect,
    trophyId,
    library,
    isConnected,
    hasWonGame,
    activeDot,
    setActiveDot,
    gameTaskState,
    swrError,
    walletAddress,
    // loading: // FIXME: global loading state
    error: web3Error, // FIXME: Proper clientside error handing
    setError,
  };
};
