import Cursor from "./Cursor";

interface UserInputProps {
  userInput: string;
  words: string;
  className?: string;
}

const UserInput = ({ userInput, words, className }: UserInputProps) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={index} actual={char} expected={words[index]} />;
      })}
      <Cursor />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";
  console.log({isCorrect, isWhiteSpace})
  const textClassName =
    isCorrect && !isWhiteSpace
      ? "text-blue-800"
      : !isCorrect && isWhiteSpace
      ? "bg-red"
      : "text-red";

  return <span className={textClassName}>{expected}</span>;
};

export default UserInput;
