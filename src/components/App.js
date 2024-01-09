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
import { useQNAs } from "../hooks/QNAContextProvider";

function App() {
  const { status } = useQNAs();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
