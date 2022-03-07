import { useWeb3React } from "@web3-react/core";

const CHAIN_MAP = {
  1: "ethereum",
  3: "ropstein",
  4: "rinkeby",
  80001: "mumbai",
  137: "polygon",
};

const _getNetworkName = (id) => {
  return CHAIN_MAP[id] || "unknown";
};

export const Footer = () => {
  const { chainId } = useWeb3React();
  const network = _getNetworkName(chainId);
  return (
    <footer>
      <a
        href="https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7"
        target="_blank"
        rel="noreferrer"
      >
        Walkthrough
      </a>
      <a href="https://discord.gg/pNSFNfyVxA" target="_blank" rel="noreferrer">
        Discord
      </a>
      <a
        href="https://github.com/slavingia/fweb3.xyz/issues"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      {network !== "unknown" && <p>Connected To {network}</p>}
    </footer>
  );
};
