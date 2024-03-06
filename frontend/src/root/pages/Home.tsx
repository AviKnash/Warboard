import { useEffect, useRef, useState } from "react";
import wordArray from "../../constants/words";
import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";

const wordLength = wordArray.length;

const randomWord = (words: string[], totalLength: number) => {
  const randomIndex = Math.floor(Math.random() * totalLength);

  return words[randomIndex];
};

const printSentence = () => {
  const sentenceDivs = [];

  for (let i = 0; i < 100; i++) {
    const newWord = randomWord(wordArray, wordLength);

    const wordDiv = (
        <div className="inline-block mx-1" key={i}>
          {newWord.split('').map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
      );

    sentenceDivs.push(wordDiv);
  }

  return sentenceDivs;
};



const GamePage = () => {
    const sentenceRef = useRef(printSentence());
    const sentence = sentenceRef.current;
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedLetter = event.key.toLowerCase();
      setPressedKey(pressedLetter);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  console.log(pressedKey)

  return (
    <>
      <div className="grid grid-cols-2">
        <EnemyScreen sentence={sentence} />

        <PlayerScreen sentence={sentence} pressedKey={pressedKey}/>
      </div>
    </>
  );
};

export default GamePage;
