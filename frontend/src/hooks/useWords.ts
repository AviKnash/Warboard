import { generateParagraph } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const useWords = () => {
  const [words, setWords] = useState<string>("");

  const updateWords = useCallback(async () => {
    try {
      const wordsGen = await generateParagraph();
      setWords(wordsGen);
    } catch (error) {
      // Handle error if necessary
      console.error("Error generating paragraph:", error);
    }
  }, []);

  useEffect(() => {
    console.log("ehhlo!")
    updateWords();
  }, [updateWords]);

  console.log(words);

  return { words, updateWords };
};

export default useWords;
