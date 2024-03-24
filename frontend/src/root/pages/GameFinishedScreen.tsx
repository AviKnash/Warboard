import { useEffect } from "react";
import LoseScreen from "./GameOver/LoseScreen";
import WinScreen from "./GameOver/WinScreen";
import { useGame } from "@/hooks/useGame";
import { useUserContext } from "@/context/AuthContext";
import { useGetUser } from "@/hooks/useGetUser";

export function GameFinishedScreen({
  currentPlayerHasHigherScore,
  wpm,
  userLoggedIn,
}: {
  currentPlayerHasHigherScore: boolean | undefined;
  wpm: number | undefined;
  userLoggedIn: boolean | undefined;
}) {

  if (userLoggedIn) {
    const { addGame, addUserStats } = useGame();
    const { currentUser } = useUserContext();
    const { user, loading } = useGetUser(currentUser?.userID);

    useEffect(() => {
      if (userLoggedIn && user && !loading) {
        const userNewTotalGames = user.totalGames + 1;
        const userNewGamesWon = currentPlayerHasHigherScore
          ? user.gamesWon + 1
          : user.gamesWon;

        addGame({ wpm });
        addUserStats({
          totalGames: userNewTotalGames,
          gamesWon: userNewGamesWon,
        });
      }
    }, [loading]);
  }

  const restartPage = () => {
    window.location.reload();
  };

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
