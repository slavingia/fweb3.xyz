import { useContext } from "react";
import { DotProps } from "./types";
import { GameContext } from "../context";
import cn from "classnames";

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
