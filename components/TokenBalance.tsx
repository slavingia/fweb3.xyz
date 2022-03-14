import type { ITokenBalanceProps } from "../types";
import { parseBalance } from "../lib/util";

export const TokenBalance = ({ balance, symbol }: ITokenBalanceProps) => {
  return <p>{`${parseBalance(balance ?? "0")} ${symbol}`}</p>;
};
