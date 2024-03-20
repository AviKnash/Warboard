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

const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
  host,
  setTimeLeft,
}: GameProps) => {

  function startGame() {
    if (!ioInstance) return;
    setTimeLeft(5)
    setTimeout(() => {
      ioInstance.emit("start-game");
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
