import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface TypingParagraphProps {
  paragraph: string;
  ioInstance: Socket | undefined;
  typingErrors: number;
}

const TypingParagraph: React.FC<TypingParagraphProps> = ({
  paragraph,
  ioInstance,
  typingErrors,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isCurrentVisible, setIsCurrentVisible] = useState(true);

  const toggleCurrentVisibility = () => {
    setIsCurrentVisible((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === paragraph[currentPosition]) {
      setCurrentPosition((prev) => Math.min(prev + 1, paragraph.length - 1));

      if (!ioInstance) return;
      ioInstance.emit("player-typed", event.key);
    } else {
      ioInstance?.emit("typed-errors", (typingErrors += 1));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(toggleCurrentVisibility, 500);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [currentPosition, paragraph]);

  const renderLetter = (letter: string, index: number) => {
    const isTyped = index < currentPosition;
    const isCurrent = index === currentPosition;

    let className = "";

    if (isTyped) {
      className = "typed";
    } else if (isCurrent && isCurrentVisible) {
      className = "current";
    }

    return (
      <>
        <span key={index} className={className}>
          {letter}
        </span>
      </>
    );
  };

  return <div>{paragraph && paragraph.split("").map(renderLetter)}</div>;
};

export default TypingParagraph;
