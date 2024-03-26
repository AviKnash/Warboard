import Cursor from "@/root/components/Game/Cursor";
import Character from "./Character";

const UserTyped = ({
  userInput,
  className,
}: {
  userInput: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} char={char} />;
      })}
      <Cursor />
    </div>
  );
};

export default UserTyped;
