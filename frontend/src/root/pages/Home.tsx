import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "./WaitingScreen";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import { Loading } from "@/auth/components/Loading";
import CountDown from "../components/Game/CountDown";
import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Camper from "../components/Game/UiComponents/SnowFloor";
import { Snowfall } from "react-snowfall";
import swords from "/swords.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


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
  const [currentPlayerHasHigherScore, setCurrentPlayerHasHigherScore] =
    useState<boolean | undefined>(true);

  useEffect(() => {
    setCurrentPlayerHasHigherScore(
      currentPlayer && enemyPlayer && currentPlayer.score > enemyPlayer.score
    );
  }, [gameStatus]);

  useEffect(() => {
    if (timer === 0 && timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      ioInstance?.emit("start-timer", timeLeft);
      setTimeLeft((prev) => prev! - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function startGame() {
    if (!ioInstance) return;
    setTimeLeft(5);
    setTimeout(() => {
      ioInstance.emit("start-game");
    }, 5000);
  }

  

  return (
    <>
      <div className="w-3/4 flex flex-row h-2/3">
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
            {gameStatus === "in-progress" ? (
              <>
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
            ) : (
              <div className="flex flex-col w-full">
                <div className="h-1/6 flex items-center justify-center">
                  <Camper />
                  <Snowfall snowflakeCount={300} />
                  {ioInstance?.id === host ? (
                    <>
                        <HoverCard defaultOpen closeDelay={600}>
                          <HoverCardTrigger>
                      <Button
                        onClick={startGame}
                        variant="link"
                        className="text-2xl underline"
                      >
                        <div className=" flex h-20 w-20">

                          <img  src={swords} />
                        </div>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex items-center justify-center"><h1>Click to start!</h1></HoverCardContent>
                    </HoverCard>
                    </>
                  ) : (
                    <h1 className="text-center text-2xl items-center">
                      Waiting for host to start battle. Hold on!
                    </h1>
                  )}
                </div>
                <div className="w-full flex h-5/6">
                  <PlayerScreen
                    name={currentPlayer?.name}
                    host={host}
                    gameId={inviteCode}
                    ioInstance={ioInstance}
                    gameStatus={gameStatus}
                    paragraph={paragraph}
                    setTimeLeft={setTimeLeft}
                  />
                  <div className="flex items-center justify-center text-white text-6xl font-semibold italic">
                    <h1>VS</h1>
                  </div>
                  <EnemyScreen
                    name={enemyPlayer?.name}
                    gameId={inviteCode}
                    ioInstance={ioInstance}
                    gameStatus={gameStatus}
                    paragraph={paragraph}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GamePage;
