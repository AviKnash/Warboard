import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
import { useGameParams } from "@/context/GameContext";
import { TypingStreakValues } from "@/types";
import { Socket } from "socket.io-client";
import { WarbyMessages, WarbyStateValues } from "@/lib/constants";
import { useWarby } from "@/context/WarbyContext";

interface ITypingParagraph {
  paragraph: string;
  ioInstance: Socket | undefined;
  typingErrors: number;
  className?: string;
  setMistake: React.Dispatch<React.SetStateAction<boolean>>;
}

const LetterSpan = memo(
  ({ letter, className }: { letter: string; className: string }) => (
    <span style={{ fontSize: "1.5rem" }} className={className}>
      {letter}
    </span>
  )
);

const TypingParagraph: React.FC<ITypingParagraph> = memo(
  ({ paragraph, ioInstance, typingErrors, className, setMistake }) => {
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const { setTypingStreak } = useGameParams();
    const [numberOfWordsWithoutError, setNumberOfWordsWithoutError] =
      useState<number>(0);
    const { updateWarby } = useWarby();
    const streakMilestone = useMemo(
      () => [10, 20, 30, 40, 60, 70, 90, 120, 150],
      []
    );

    useEffect(() => {
      if (streakMilestone.includes(numberOfWordsWithoutError))
        setTypingStreak(numberOfWordsWithoutError as TypingStreakValues);
    }, [numberOfWordsWithoutError, setTypingStreak, streakMilestone]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Shift") return;
        if (event.key === paragraph[currentPosition]) {
          if (event.key === " ") {
            setNumberOfWordsWithoutError((prev) => prev + 1);
          }
          setCurrentPosition((prev) =>
            Math.min(prev + 1, paragraph.length - 1)
          );
          ioInstance?.emit("player-typed", event.key);
        } else {
          setTypingStreak(0);
          setNumberOfWordsWithoutError(0);
          setMistake(true);
          setTimeout(() => setMistake(false), 500);
          ioInstance?.emit("typed-errors", typingErrors + 1, ioInstance.id);
        }
      },
      [
        currentPosition,
        paragraph,
        ioInstance,
        setMistake,
        setTypingStreak,
        typingErrors,
      ]
    );

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleKeyDown]);

    useEffect(() => {
      if (paragraph.length - 1 === currentPosition) {
        ioInstance?.emit("refetch-paragraph");
        updateWarby(
          "Niiiiiceee! You've finished this paragraph! Let's keep up the momentum!",
          WarbyStateValues.EXCITED
        );

        const timeOut = setTimeout(() => {
          updateWarby(WarbyMessages.DEFAULT_BATTLE, WarbyStateValues.IDLE);
        }, 5000);

        setCurrentPosition(0);

        return () => clearTimeout(timeOut);
      }
    }, [currentPosition, paragraph]);

    const renderedParagraph = useMemo(() => {
      return paragraph.split("").map((letter, index) => {
        const isTyped = index < currentPosition;
        const isCurrent = index === currentPosition;
        let letterClassName = "";

        if (isTyped) {
          letterClassName = "typed";
        } else if (isCurrent) {
          letterClassName = "current";
        }

        return (
          <>
            <LetterSpan
              key={index}
              letter={letter}
              className={letterClassName}
            />
          </>
        );
      });
    }, [paragraph, currentPosition]);

    return <div className={`h-full ${className}`}>{renderedParagraph}</div>;
  }
);

export default TypingParagraph;
