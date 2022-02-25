import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { parseBalance } from "../util";

type TokenBalanceProps = {
  balance: number;
  symbol: string;
};

const TokenBalance = ({ balance, symbol }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();

  return <p>{`${parseBalance(balance ?? 0)} ${symbol}`}</p>;
};

export default TokenBalance;
