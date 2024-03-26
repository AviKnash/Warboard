import GeneratedWords from "./GeneratedWords";
import CountDownTimer from "./CountDownTimer";
import RestartButton from "./RestartButton";
import Results from "./Results";
import UserTyped from "./UserTyped";
import WordsContainer from "./WordsContainer";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage } from "@/lib/utils";

const Practice = () => {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <>
      <CountDownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} className="text-2xl" />
        <UserTyped
          className="absolute inset-0 text-2xl"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
      <Results
      state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors,totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

export default Practice;
