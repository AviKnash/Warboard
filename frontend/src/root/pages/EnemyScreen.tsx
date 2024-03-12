import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EnemyTypingParagraph from "../components/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";

const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
}: EnemyGameProps) => {
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
      </CardContent>
      <CardFooter className="flex justify-center mt-auto"></CardFooter>
    </Card>
  );
};

export default EnemyScreen;
