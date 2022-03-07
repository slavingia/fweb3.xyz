import useENSName from "../hooks/useENSName";

import type { Address } from "./types";

export const ENSLookup = ({ address }: Address) => {
  return <>{useENSName(address)}</>;
};
