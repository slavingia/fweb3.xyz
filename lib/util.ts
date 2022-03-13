import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits, commify } from "@ethersproject/units";

export const fetcher = async (uri: string, config = null): Promise<any> => {
  const res = await fetch(uri, config);
  return res.json();
};

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 0
): string =>
  commify(parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay));

export const parseBalanceToNum = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 0
): number =>
  parseInt(parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay));

export const getTrophyColor = (trophyId: string): string => {
  const trophyInt = parseInt(trophyId);
  if (trophyInt <= 333) {
    return "gold";
  } else if (trophyInt <= 3333) {
    return "silver";
  }
  return "copper";
};

export const sleep = (milliseconds): void => {
  const date: number = Date.now();
  let currentDate: number = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
