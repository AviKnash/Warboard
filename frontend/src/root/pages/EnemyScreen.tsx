import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EnemyTypingParagraph from "../components/EnemyTypingParagraph";
import { GameProps } from "@/types";

const EnemyScreen = ({
  gameId,
  ioInstance,
  gameStatus,
  paragraph,
}: GameProps) => {
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Enemy</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
      </CardContent>
      <CardFooter className="flex justify-center mt-auto"></CardFooter>
    </Card>
  );
};

export default EnemyScreen;
