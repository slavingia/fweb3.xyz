import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useContext } from "react";

import { GameContext } from "../pages/_app";
import TokenBalance from "./TokenBalance";
import { ENSLookup } from "./ENSLookup";

export const Navigation = () => {
  const { completedTiles, hasWonGame, polygonData } = useContext(GameContext);
  const { active, account } = useWeb3React();
  const { query } = useRouter();

  return (
    <nav>
      <h1>fweb3</h1>
      <p>
        {hasWonGame ? (
          "🏆"
        ) : (
          <>
            <strong>{Math.round((completedTiles / 9) * 100)}%</strong> complete
          </>
        )}
      </p>

      {query.wallet !== undefined &&
        query.wallet !== account &&
        query.wallet.length > 0 && (
          <a
            href={"https://polygonscan.com/address/" + query.wallet}
            target="_blank"
            rel="noreferrer"
          >
            <p style={{ color: "#fff" }}>
              <ENSLookup address={query.wallet} />
            </p>
          </a>
        )}

      {active || query.wallet ? (
        <TokenBalance
          balance={polygonData && polygonData["tokenBalance"]}
          symbol="FWEB3"
        />
      ) : (
        <div>0 FWEB3</div>
      )}
    </nav>
  );
};
