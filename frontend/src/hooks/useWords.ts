import { generateParagraph } from "@/lib/utils";
import { useCallback, useState } from "react";

const generatedWords = await generateParagraph();
const useWords = () => {
  const [words, setWords] = useState<string>(generatedWords);

  const updateWords = useCallback(() => {
    setWords(generatedWords);
  }, []);

  return { words, updateWords };
};
export default useWords;
