import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";

import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import useEagerConnect from "../hooks/useEagerConnect";
import { injected } from "../utils/connectors";

export const ConnectWalletButton = () => {
  const { active, error, activate, account, setError } = useWeb3React();
  const [connecting, setConnecting] = useState(false);
  const triedToEagerConnect = useEagerConnect();
  const { isWeb3Available, startOnboarding, stopOnboarding } =
    useMetaMaskOnboarding();

  // manage connecting state for injected connector
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const handleActivate = async () => {
    try {
      setConnecting(true);
      await activate(injected, undefined, true);
      setConnecting(false);
    } catch (e) {
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    }
  };

  const shouldRenderButton =
    error || !triedToEagerConnect || typeof account !== "string";

  return shouldRenderButton ? (
    <button
      className="pulse"
      onClick={isWeb3Available ? handleActivate : startOnboarding}
    >
      {connecting ? "connecting..." : "Connect your wallet"}
    </button>
  ) : null;
};
