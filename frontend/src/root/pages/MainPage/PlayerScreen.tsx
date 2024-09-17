import { GameProps } from "@/types";
import TypingParagraph from "../../components/Game/TypingParagraph";


const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
  typingErrors
}: GameProps) => {



  return (
    <div
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
    >
      {gameStatus === "not-started" ? (
        <div className="flex-grow">
          <h1 className="text-6xl">{name}</h1>
        </div>
      ) : (
        <>
          <div className= "flex-grow h-full">

            <TypingParagraph typingErrors={typingErrors} ioInstance={ioInstance} paragraph={paragraph} />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerScreen;
