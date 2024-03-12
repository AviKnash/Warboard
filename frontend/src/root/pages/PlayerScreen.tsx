import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameProps} from "@/types";
import TypingParagraph from "../components/TypingParagraph";

const PlayerScreen = ({
  ioInstance,
  gameStatus,
  paragraph,
  host,
}: GameProps) => {
  function startGame() {
    console.log("here");
    if (!ioInstance) return;

    ioInstance.emit("start-game");
  }

  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Player Screen</CardTitle>
      </CardHeader>
      {gameStatus === "not-started" && ioInstance?.id === host ? (
        <>
          <CardContent className="flex-grow">
            <p>Create a game where you can invite a friend to battle it out!</p>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button onClick={startGame}>Start Game</Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="flex-grow">
            <TypingParagraph ioInstance={ioInstance} paragraph={paragraph} />
            {/* <p>
              <Cursor />
              {paragraph}
            </p> */}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PlayerScreen;
