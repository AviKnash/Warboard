import wordArray from "../../constants/words";
import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";

const wordLength = wordArray.length;

const randomWord = (words: string[], totalLength: number) => {
  const randomIndex = Math.floor(Math.random() * totalLength);

  return words[randomIndex];
};

const printSentence = () => {
  let sentence = "";

  for (let i = 0; i < 100; i++) {
    const newWord = randomWord(wordArray, wordLength);

    sentence += newWord + " ";
  }

  return sentence.trim();
};

const GamePage = () => {
  const sentence = printSentence();

  return (
    <>
      <div className="grid grid-cols-2">
        <EnemyScreen sentence={sentence} />

        <PlayerScreen sentence={sentence} />
      </div>
    </>
  );
};

export default GamePage;
