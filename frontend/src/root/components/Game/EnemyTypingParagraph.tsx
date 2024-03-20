import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { EnemyTyping } from "@/types";

interface EnemyTypingParagraphProps {
  ioInstance: Socket | undefined;
  paragraph: string;
}

const EnemyTypingParagraph: React.FC<EnemyTypingParagraphProps> = ({
  ioInstance,
  paragraph,
}) => {
  const [enemyTypedLetters, setEnemyTypedLetters] = useState<string[]>([]);

  useEffect(() => {
    const handleTypedLetter = ({ letter }: EnemyTyping) => {
      setEnemyTypedLetters((prevLetters) => [...prevLetters, letter]);
    };

    ioInstance?.on("typed-letter", handleTypedLetter);

    return () => {
      ioInstance?.off("typed-letter", handleTypedLetter);
    };
  }, [ioInstance]);

  const renderLetter = (letter: string, index: number) => {
    const isTyped = index < enemyTypedLetters.length;

    let className = "";

    if (isTyped) {
      className = "typed";
    }

    return (
      <span key={index} className={className}>
        {isTyped ? enemyTypedLetters[index] : letter}
      </span>
    );
  };

  return <div>{paragraph && paragraph.split("").map(renderLetter)}</div>;
};

export default EnemyTypingParagraph;
