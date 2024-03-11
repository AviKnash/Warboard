import React, { useEffect, useState } from "react";

interface TypingParagraphProps {
  paragraph: string | undefined;
}

const TypingParagraph: React.FC<TypingParagraphProps> = ({ paragraph }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (paragraph && event.key === paragraph[currentPosition].toLowerCase()) {
        setCurrentPosition((prev) => Math.min(prev + 1, paragraph.length - 1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPosition, paragraph]);

  return (
    <div>
      {paragraph && paragraph.split("").map((letter, index) => (
        <span key={index} className={index === currentPosition ? "cursor" : ""}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default TypingParagraph;
