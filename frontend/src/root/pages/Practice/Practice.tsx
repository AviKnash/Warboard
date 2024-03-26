import { generateParagraph } from "@/lib/utils";
import GeneratedWords from "./GeneratedWords";
import CountDownTimer from "./CountDownTimer";
import RestartButton from "./RestartButton";
import Results from "./Results";
import UserTyped from "./UserTyped";
import WordsContainer from "./WordsContainer";

const words = await generateParagraph();

const Practice = () => {
  return (
    <>
      <CountDownTimer timeLeft={30} />
      <WordsContainer >
        <GeneratedWords words={words} className="text-2xl"  />
        <UserTyped className="absolute inset-0 text-2xl"  userInput={words} />
      </WordsContainer>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={() => null}
      />
      <Results
        className="mt-10"
        errors={0}
        accuracyPercentage={100}
        total={200}
      />
    </>
  );
};

export default Practice;
