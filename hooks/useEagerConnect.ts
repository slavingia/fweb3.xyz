import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "../lib";

export default function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React<Web3ReactContextInterface>();

  const [tried, setTried] = useState<boolean>(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
