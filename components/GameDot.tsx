import { useContext } from "react";
import cn from "classnames";

import { GameContext } from "../pages/_app";
import type { DotProps } from "./types";

export const GameDot: React.FC<DotProps> = ({
  id,
  toolTip,
  position,
  hideDot,
}) => {
  const { activeDot, hasWonGame, gameTileCompletionStates, setActiveDot } =
    useContext(GameContext);
  return (
    <div
      key={id}
      onClick={() => setActiveDot(position)}
      className={cn("game-tile", {
        completed: hasWonGame || !!gameTileCompletionStates[position],
        active: activeDot === position,
        hidden: hideDot,
      })}
    >
      <div className="tooltip">{toolTip}</div>
    </div>
  );
};
