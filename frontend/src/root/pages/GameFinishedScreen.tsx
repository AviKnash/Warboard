import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GameFinishedScreen({
  currentPlayerHasHigherScore,
}: {
  currentPlayerHasHigherScore: boolean | undefined;
}) {
  const restartPage = () => {
    window.location.reload();
  };
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
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
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button onClick={restartPage}>Got it!</Button>
      </CardFooter>
    </Card>
  );
}
