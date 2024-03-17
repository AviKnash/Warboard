import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameProps } from "@/types";
import TypingParagraph from "../components/TypingParagraph";
import { useGameContext } from "@/context/GameContext";
import { useState } from "react";

const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
  host,
  setPopOver,
  setTimeLeft
}: GameProps) => {
  // const { setPopOver } = useGameContext();
  console.log(gameStatus);

  // const [popOver, setPopOver] = useState<boolean>(false);


  function startGame() {
    console.log("here");
    if (!ioInstance) return;
    setPopOver(true);
    setTimeLeft(6)
    setTimeout(() => {
      console.log("Inside timeout");
      ioInstance.emit("start-game");
      setPopOver(false);
    }, 5000);
  }

  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      {gameStatus === "not-started" ? (
        <>
          {ioInstance?.id === host ? (
            <>
              <CardContent className="flex-grow">
                <p>
                  Create a game where you can invite a friend to battle it out!
                </p>
              </CardContent>
              <CardFooter className="flex justify-center mt-auto">
                <Button onClick={startGame}>Start Game</Button>
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex-grow">
              <p>Waiting for the host to start the game...</p>
            </CardContent>
          )}
        </>
      ) : (
        <>
          <CardContent className="flex-grow">
            <TypingParagraph ioInstance={ioInstance} paragraph={paragraph} />
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PlayerScreen;
