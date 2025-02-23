import { useEffect } from "react";
import LoseScreen from "../GameOver/LoseScreen";
import WinScreen from "../GameOver/WinScreen";
import { useGame } from "@/hooks/useGame";
import { useUserContext } from "@/context/AuthContext";
import { useGetUser } from "@/hooks/useGetUser";
import { calculateAccuracyPercentage } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function GameFinishedScreen({
  currentPlayerHasHigherScore,
  wpm,
  userLoggedIn,
  typingErrors,
  totalTyped,
}: {
  currentPlayerHasHigherScore: boolean | undefined;
  wpm: number | undefined;
  userLoggedIn: boolean | undefined;
  typingErrors: number;
  totalTyped: number | undefined;
}) {
  const accuracy = Math.round(
    calculateAccuracyPercentage(typingErrors, totalTyped)
  );
  const navigate = useNavigate();

    const { addGame, addUserStats } = useGame();
    const { currentUser } = useUserContext();
    const { user, loading } = useGetUser(currentUser?.userID);

    useEffect(() => {
      if (userLoggedIn && user && !loading) {
        const userNewTotalGames = user.totalGames + 1;
        const userNewGamesWon = currentPlayerHasHigherScore
          ? user.gamesWon + 1
          : user.gamesWon;

        addGame({ wpm, totalTyped, accuracy });
        addUserStats({
          totalGames: userNewTotalGames,
          gamesWon: userNewGamesWon,
        });
      }
    }, [loading]);
  

  const restartPage = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      {currentPlayerHasHigherScore ? (
        <WinScreen
          accuracy={accuracy}
          typingErrors={typingErrors}
          totalTyped={totalTyped}
          wpm={wpm}
          restartPage={restartPage}
        />
      ) : (
        <LoseScreen
          accuracy={accuracy}
          typingErrors={typingErrors}
          totalTyped={totalTyped}
          wpm={wpm}
          restartPage={restartPage}
        />
      )}
    </>
  );
}
