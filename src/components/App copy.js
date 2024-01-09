import { createContext, useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { StartScreen } from "./StartScreen";
import { Progress } from "./Progress";
import { Question } from "./Question";
import { Footer } from "./Footer";
import { Timer } from "./Timer";
import { NextButton } from "./NextButton";
import { FinishScreen } from "./FinishScreen";

const initialState = {
  questions: [],

  //loading, error, ready, active, finish
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const QNAContext = createContext();

  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <QNAContext.Provider
        value={{
          numQuestions,
          dispatch,
          index,
          points,
          maxPossiblePoints,
          answer,
          questions: questions[index],
          highScore,
        }}
      >
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />

              <Footer>
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finish" && (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
              highScore={highScore}
            />
          )}
        </Main>
      </QNAContext.Provider>
    </div>
  );
}

export default App;
