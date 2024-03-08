import { useState } from "react";
import useWords from "./useWords";
import useTypings from "./useTyping";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 10;

const useGame = () => {
  const [state, setState] = useState<State>("start");
  const { words, updatedWords } = useWords(NUMBER_OF_WORDS);
  const { typed, cursor,clearTyped,resetTotalTyped,totalTyped} = useTypings(state !== "finish")

  return { state, words, typed };
};

export default useGame;
