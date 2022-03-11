import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import styled from "styled-components";

import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { useGameState } from "../hooks/useGameState";
import { injected } from "../lib/connectors";
import { IAccountProps } from "./types";
import { COLORS } from "../lib/constants";

const Button = styled.button`
  border-radius: 99px;
  text-decoration: none;
  display: inline;
  padding: 15px 30px;
  margin-top: 2rem;
  background: ${COLORS.pinkish};
  color: black;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(255, 149, 238, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
`;

const RejectedError = styled.p`
  color: red;
`;

export const Account = ({ triedToEagerConnect }: IAccountProps) => {
  const { active, error, activate, account, setError } = useGameState();
  const [connecting, setConnecting] = useState(false);
  const [userRejected, setUserRejected] = useState(false);
  const { isWeb3Available, startOnboarding, stopOnboarding } =
    useMetaMaskOnboarding();

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const handleActivate = async () => {
    try {
      if (isWeb3Available) {
        setConnecting(true);
        await activate(injected, undefined, true);
        setConnecting(false);
      } else {
        await startOnboarding();
        setConnecting(false);
      }
    } catch (e) {
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
        // FIXME: Show rejected message to user
      } else {
        setError(error);
        setConnecting(false);
      }
    }
  };

  const shouldRenderButton =
    !error && triedToEagerConnect && typeof account !== "string";

  if (userRejected) {
    return <RejectedError>User Rejected Request</RejectedError>;
  }

  return shouldRenderButton ? (
    <Button onClick={handleActivate}>
      {connecting ? "connecting..." : "Connect your wallet"}
    </Button>
  ) : null;
};
