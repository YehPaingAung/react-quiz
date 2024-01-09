import React from "react";
import { Options } from "./Options";
import { useQNAs } from "../hooks/QNAContextProvider";

export const Question = () => {
  const { questions, index } = useQNAs();

  const question = questions.at(index);
  return (
    <div className="main">
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};
