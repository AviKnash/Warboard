import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import skull from "/skull.png";
import SnowFall from "react-snowfall"

type ILoseProps = {
  wpm: number | undefined;
  restartPage: () => void;
};

const LoseScreen = ({ wpm, restartPage }: ILoseProps) => {

  return (

    <div className="flex w-full items-center justify-center">
     <SnowFall />
      <Card className="h-auto rounded-lg shadow-md flex flex-col items-center justify-center w-1/2">
        <CardHeader>
          <CardTitle>"Too slow..."</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <p>"That sucks. Keep practicing!"</p>
          <img className="w-1/2 h-auto" draggable="false" src={skull} />
          <p>You typed {wpm} words per minute</p>
        </CardContent>
        <CardFooter className="flex justify-center mt-auto">
          <Button onClick={restartPage}>Play again</Button>
        </CardFooter>
      </Card>
    </div>

  );
};

export default LoseScreen;
