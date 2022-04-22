import useENSName from "../hooks/useENSName";
import type { IAddressProp } from "../types";

export const ENSLookup = ({ address }: IAddressProp) => {
  return <>{useENSName(address)}</>;
};
