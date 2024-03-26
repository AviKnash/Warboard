import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountDownTimer from "./useCountDownTimer";
import useUserTyping from "./useUserTyping";
import { countErrors } from "@/lib/utils";

const COUNTDOWN_SECONDS = 30;
export type State = "start" | "run" | "finish";

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords();
  const { timeLeft, startCountDown, resetCountDown } =
    useCountDownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } =
    useUserTyping(state !== "finish");
  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown]);

  useEffect(() => {
    if (!timeLeft && state === "run") {
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  const restart = useCallback(() => {
    resetCountDown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountDown, resetTotalTyped]);

  console.log(state)

  return { state, words, typed, errors, restart, timeLeft, totalTyped };
};

export default useEngine;
