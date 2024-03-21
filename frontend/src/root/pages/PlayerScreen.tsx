import { Card, CardContent } from "@/components/ui/card";
import { GameProps } from "@/types";
import TypingParagraph from "../components/Game/TypingParagraph";
import spartan from "/helmet.png";

const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
}: GameProps) => {
  return (
    <Card
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
      style={{ backgroundImage: `url(${spartan})`, backgroundSize: "cover" }}
    >
      {gameStatus === "not-started" ? (
        <CardContent className="flex-grow">
          <h1 className="text-6xl">{name}</h1>
        </CardContent>
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
