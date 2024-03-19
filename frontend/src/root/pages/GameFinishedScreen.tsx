import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGame } from "@/hooks/useGame";
import { useEffect } from "react";

export function GameFinishedScreen({
  currentPlayerHasHigherScore,
  wpm,
  userLoggedIn,
}: {
  currentPlayerHasHigherScore: boolean | undefined;
  wpm: number | undefined;
  userLoggedIn: boolean | undefined;
}) {
  const { addGame } = useGame();

  useEffect(() => {
    userLoggedIn && addGame({ wpm, totalGames: 1 });
  }, []);

  const restartPage = () => {
    window.location.reload();
  };
  return (
    <Card className="rounded-lg m-4 shadow-md flex flex-col items-center justify-center w-full">
      <CardHeader>
        <CardTitle>
          {currentPlayerHasHigherScore ? "Congratulations!" : "Too bad..."}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <p>
          {currentPlayerHasHigherScore
            ? "Well done! You win"
            : "That sucks! Keep practicing and try "}
        </p>
        <p>You typed {wpm} words per minute</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button onClick={restartPage}>Play again</Button>
      </CardFooter>
    </Card>
  );
}
