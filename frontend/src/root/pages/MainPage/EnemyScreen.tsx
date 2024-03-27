import EnemyTypingParagraph from "../../components/Game/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";


const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
  gameStatus,
}: EnemyGameProps) => {
  return (
    <div
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
  
    >

      <div className="flex-grow">
        {gameStatus === "not-started" ? (
          <h1 className="text-6xl text-end font-serif">{name}</h1>
        ) : (
          <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
        )}
      </div>
    </div>
  );
};

export default EnemyScreen;
