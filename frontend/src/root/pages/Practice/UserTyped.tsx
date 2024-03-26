import Cursor from "@/root/components/Game/Cursor";
import Character from "./Character";

const UserTyped = ({
  userInput,
  words,
  className,
}: {
  userInput: string;
  words:string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} actual={char} expected={words[index]} />;
      })}
      <Cursor />
    </div>
  );
};

export default UserTyped;
