import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "./WaitingScreen";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import { Loading } from "@/auth/components/Loading";
import CountDown from "../components/CountDown";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const GamePage = () => {
  const {
    players,
    gameStatus,
    paragraph,
    host,
    ioInstance,
    inviteCode,
    serverConnected,
    currentPlayer,
    enemyPlayer,
    timer,
    popScreen,
  } = useSocket();

  const { userLoggedIn } = useUserContext();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (timer === 0 && timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      ioInstance?.emit("start-timer", timeLeft);
      setTimeLeft((prev) => prev! - 1);
      console.log("Ehehehehehe");
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const currentPlayerHasHigherScore =
    currentPlayer && enemyPlayer && currentPlayer?.score > enemyPlayer?.score;

  return (
    <>
      <div className="w-3/4 flex flex-row">
        {!serverConnected ? (
          <Loading />
        ) : gameStatus === "finished" ? (
          <GameFinishedScreen
            userLoggedIn={userLoggedIn}
            wpm={currentPlayer?.wpm}
            currentPlayerHasHigherScore={currentPlayerHasHigherScore}
          />
        ) : players.length === 1 ? (
          <WaitingScreen gameId={inviteCode} />
        ) : (
          <>
            {popScreen && <CountDown count={timer} />}
            <PlayerScreen
              name={currentPlayer?.name}
              host={host}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
              setTimeLeft={setTimeLeft}
            />
            <EnemyScreen
              name={enemyPlayer?.name}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GamePage;
