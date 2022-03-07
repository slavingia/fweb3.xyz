import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

export const ShareLink = ({ hasWonGame, shareText, trophyId }) => {
  const { account } = useWeb3React();
  const { query } = useRouter();
  return (
    <a
      className="share-button"
      onClick={() => {
        const gameTiles = document.getElementsByClassName("game-tile");
        const completedGameTiles = [];
        let finalShareText;

        for (let i = 0; i < gameTiles.length; i++) {
          completedGameTiles.push(
            gameTiles[i].classList.contains("completed") || hasWonGame ? 1 : 0
          );
        }

        if (hasWonGame) {
          finalShareText =
            `${shareText} @fweb3_\n\nhttps://fweb3.xyz?wallet=` +
            (account ? account : query.wallet) +
            `&won=${trophyId}`;
        } else {
          finalShareText = `${shareText} @fweb3_ ${completedGameTiles.reduce(
            (a, b) => a + b
          )}/9\n\n`;

          for (let i = 0; i < gameTiles.length; i++) {
            finalShareText += completedGameTiles[i] ? "🟣" : "⚫️";

            if (i % 3 == 2 && i != gameTiles.length - 1) {
              finalShareText += "\n";
            }
          }
        }

        if (navigator.share) {
          navigator.share({
            text: finalShareText,
          });
        } else {
          window.open(
            "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(finalShareText)
          );
        }
      }}
    >
      {hasWonGame ? "Share your win" : "Share your progress"}
    </a>
  );
};
