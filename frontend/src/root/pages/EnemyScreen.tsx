import {
  Card,
  CardContent,
} from "@/components/ui/card";
import EnemyTypingParagraph from "../components/Game/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";
import dragon from "/fantasy.png";

const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
  gameStatus,
}: EnemyGameProps) => {



  return (
    <Card
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
      style={{
        backgroundImage: `url(${dragon})`,
        backgroundSize: "cover",
      }}
    >

      <CardContent className="flex-grow">
        {gameStatus === "not-started" ? (
          <h1 className="text-6xl text-end font-serif">{name}</h1>
        ) : (
          <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
        )}
      </CardContent>
    </Card>
  );
};

export default EnemyScreen;
