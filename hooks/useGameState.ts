import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useRouter, NextRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import useSwr from "swr";

import useEagerConnect from "./useEagerConnect";
import { IPolygonData } from "../types";

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<IPolygonData> => {
  const res = await fetch(input, init);
  return res.json();
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
  const [activeDot, setActiveDot] = useState<number>(-1);
  const triedToEagerConnect: boolean = useEagerConnect();
  const { query }: NextRouter = useRouter();

  const walletAddressToUse: string | string[] = query.wallet
    ? query.wallet
    : account;
  const apiUri: string = `/api/polygon?wallet_address=${walletAddressToUse}${
    query.debug ?? `&debug=${query.debug}`
  }`;

  const { data: polygonData, error: swrError } = useSwr<IPolygonData, Error>(
    query.wallet || account ? apiUri : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const isConnected: boolean = typeof account === "string" && !!library;
  const hasWonGame: boolean = polygonData && polygonData["hasWonGame"];
  // FIXME
  const trophyId: any = query.won
    ? query.won
    : polygonData && polygonData["trophyId"];

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
    query,
    trophyId,
    isConnected,
    hasWonGame,
    activeDot,
    setActiveDot,
    polygonData,
    swrError,
    walletAddressToUse,
    error: web3Error, // FIXME
    setError,
  };
};
