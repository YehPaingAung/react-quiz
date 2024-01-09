import React from "react";
import { useQNAs } from "../hooks/QNAContextProvider";

export const Progress = () => {
  const { index, numQuestions, points, maxPossiblePoints, answer } = useQNAs();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
};
