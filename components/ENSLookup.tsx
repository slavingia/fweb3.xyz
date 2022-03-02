import useENSName from "../hooks/useENSName";

type Address = {
  address: string | string[];
};

const ENSLookup = ({ address }: Address) => {
  return <>{useENSName(address)}</>;
};

export default ENSLookup;
