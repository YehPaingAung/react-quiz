import React from "react";
import { useQNAs } from "../hooks/QNAContextProvider";

export const FinishScreen = () => {
  const { points, maxPossiblePoints, highScore, dispatch } = useQNAs();
  const percentage = Math.floor((points / maxPossiblePoints) * 100);

  return (
    <main className="main">
      <p className="result">
        <span>😎</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </main>
  );
};
