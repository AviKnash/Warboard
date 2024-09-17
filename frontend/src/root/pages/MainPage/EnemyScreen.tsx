import { useEffect, useState } from "react";
import EnemyTypingParagraph from "../../components/Game/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";


const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
  gameStatus,
}: EnemyGameProps) => {

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

      <div className="flex-grow">
        {gameStatus === "not-started" ? (
          <h1 className="text-6xl text-end font-serif">{displayedText}</h1>
        ) : (
          <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
        )}
      </div>
    </div>
  );
};

export default EnemyScreen;
