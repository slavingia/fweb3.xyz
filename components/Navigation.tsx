import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import ENSLookup from "./ENSLookup";
import TokenBalance from "./TokenBalance";
import { GameContext } from "../context";
import { useContext } from "react";
export const Navigation = () => {
  const { active, account } = useWeb3React();
  const { query } = useRouter();
  const { completedTiles, hasWonGame, polygonData } = useContext(GameContext);
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
