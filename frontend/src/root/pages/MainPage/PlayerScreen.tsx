import { GameProps } from "@/types";
import TypingParagraph from "../../components/Game/TypingParagraph";
import { useEffect, useState } from "react";


const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
  typingErrors
}: GameProps) => {

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!name) return;

    const timer = setInterval(() => {
      if (deleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText.length === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % name.length);
        }
      } else {
        // Typing text
        setDisplayedText(() => name.slice(0, index + 1));
        if (index < name.length - 1) {
          setIndex((prev) => prev + 1);
        } else {
          setDeleting(true);
        }
      }
    }, 300); 

    return () => clearInterval(timer);
  }, [index, name, deleting, displayedText]);

  return (
    <div
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
    >
      {gameStatus === "not-started" ? (
        <div className="flex-grow">
          <h1 className="text-6xl">{displayedText}</h1>
        </div>
      ) : (
        <>
          <div className="flex-grow h-full">
            <TypingParagraph typingErrors={typingErrors} ioInstance={ioInstance} paragraph={paragraph} />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerScreen;
