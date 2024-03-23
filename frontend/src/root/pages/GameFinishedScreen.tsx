import { useEffect } from "react";
import LoseScreen from "./GameOver/LoseScreen";
import WinScreen from "./GameOver/WinScreen";
import { useGame } from "@/hooks/useGame";

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
  const {user,getUser} = 

  useEffect(() => {
    userLoggedIn && addGame({ wpm, totalGames: 1 });
  }, []);

  const restartPage = () => {
    window.location.reload();
  };

  console.log(currentPlayerHasHigherScore)

  return (
    <>
      {currentPlayerHasHigherScore ? (
        <WinScreen wpm={wpm} restartPage={restartPage} />
        ) : (
          <LoseScreen wpm={wpm} restartPage={restartPage} />
          )}
          </>
  );
}
