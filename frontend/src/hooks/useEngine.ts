import { useState } from "react";
import useWords from "./useWords";

const useEngine = () => {
  const [state, setState] = useState("start");
  const { words, updateWords } = useWords();

  return { state,words };
};

export default useEngine;
