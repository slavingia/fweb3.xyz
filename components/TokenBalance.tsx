import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import { parseBalance } from "../util";

type TokenBalanceProps = {
  tokenAddress: string;
  symbol: string;
};

const TokenBalance = ({ tokenAddress, symbol }: TokenBalanceProps) => {
  const { account, chainId } = useWeb3React<Web3Provider>();
  const { data } = useTokenBalance(account, tokenAddress);

  if (chainId !== 1) {
    return (
      <p>
        {`Switch to Ethereum Mainnet to see your ${symbol} tokens`}
      </p>
    )
  }

  return (
    <p>
      {`You have ${parseBalance(data ?? 0)} ${symbol} tokens!`}
    </p>
  );
};

export default TokenBalance;
