import { getDefaultProvider } from "ethers";
import { useState, useEffect } from "react";

/**
 * Does a reverse ENS lookup on the supplied address
 * @param address Ethereum address string
 * @returns the ENS name associated with the address, or the address if no ENS
 */
export default function useENSName(address: string | string[]) {
  const mainnetProvider = getDefaultProvider();
  // for some reason query.wallet has a string | string[] type
  let walletAddress: string = Array.isArray(address) ? address[0] : address;
  // set to the wallet address in case there is no associated ENS
  const [ENSName, setENSName] = useState(walletAddress);

  useEffect(() => {
    if (mainnetProvider) {
      let stale = false;

      mainnetProvider.lookupAddress(walletAddress).then((name) => {
        if (!stale && typeof name === "string") {
          setENSName(name); // update to actual ENS name if found
        }
      });

      return () => {
        stale = true;
      };
    }
  }, [walletAddress, mainnetProvider]);

  return ENSName;
}
