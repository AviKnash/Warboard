import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import trophy from "/trophy.png";

type IWinProps = {
  wpm: number | undefined;
  restartPage: () => void;
};

const WinScreen = ({ wpm, restartPage }: IWinProps) => {
  const { width, height } = useWindowSize();
  const widthPercent = width - width * 0.004;
  const heightPercent = height - height * 0.01;

  return (

    <div className="flex w-full items-center justify-center">
      
      <Confetti width={widthPercent} height={heightPercent} />
      <Card className="h-auto rounded-lg shadow-md flex flex-col items-center justify-center w-1/2">
        <CardHeader>
          <CardTitle>"Congratulations!"</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <p>"Well done! You win"</p>
          <img
            className="w-1/2 h-auto"
            draggable="false"
            src={trophy}
            />
          <p>You typed {wpm} words per minute</p>
        </CardContent>
        <CardFooter className="flex justify-center mt-auto">
          <Button onClick={restartPage}>Play again</Button>
        </CardFooter>
      </Card>
            </div>
  );
};

export default WinScreen;
