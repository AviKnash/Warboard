import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface TypingParagraphProps {
  paragraph: string;
  ioInstance: Socket | undefined;
}

const TypingParagraph: React.FC<TypingParagraphProps> = ({
  paragraph,
  ioInstance,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === paragraph[currentPosition]) {
      setCurrentPosition((prev) => Math.min(prev + 1, paragraph.length - 1));

      if (!ioInstance) return;
      ioInstance.emit("player-typed", event.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPosition, paragraph]);

  const renderLetter = (letter: string, index: number) => {
    const isTyped = index < currentPosition;
    const isCurrent = index === currentPosition;

    let className = "";

    if (isTyped) {
      className = "typed";
    } else if (isCurrent) {
      className = "current";
    }

    return (
      <span key={index} className={className}>
        {letter}
      </span>
    );
  };

  return <div>{paragraph && paragraph.split("").map(renderLetter)}</div>;
};

export default TypingParagraph;
