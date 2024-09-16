import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import Loading from "@/auth/components/Loading";
import CountDown from "../../components/Game/CountDown";
import Camper from "../../components/Game/UiComponents/SnowFloor";
import { Snowfall } from "react-snowfall";
import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "../WaitingScreen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HostGameTimeForm from "./HostGameTimeForm";

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
    gamingTimer,
    typingErrors,
    countDown,
  } = useSocket();
  const { userLoggedIn } = useUserContext();
  const [popScreen, setPopScreen] = useState<boolean>(false);
  const [currentPlayerHasHigherScore, setCurrentPlayerHasHigherScore] =
    useState<boolean | undefined>(true);
    const [timeFormOpen,setTimeFormOpen] = useState<boolean>(true)

  const FormSchema = z.object({
    type: z.enum(["10", "30", "60"], {
      required_error: "You need to select a game time",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setCurrentPlayerHasHigherScore(
      currentPlayer && enemyPlayer && currentPlayer.score > enemyPlayer.score
    );
  }, [gamingTimer]);

  useEffect(() => {
    if (gamingTimer === 0) {
      ioInstance?.emit("finish-game");
    }
  }, [gamingTimer]);

  useEffect(() => {
    if (countDown && countDown > 0) {
      setPopScreen(true);
    } else {
      setPopScreen(false);
    }
  }, [countDown]);

  function startGame(data: z.infer<typeof FormSchema>) {

    if (!ioInstance) return;
    setTimeFormOpen(false)

    ioInstance.emit("count-down", 6);
    setTimeout(() => {
      ioInstance.emit("game-timer", +data.type);
      ioInstance.emit("start-game");
    }, 5000);
  }

  const renderGameContent = () => {
    if (!serverConnected) {
      return <Loading />;
    }

    if (gameStatus === "finished") {
      return (
        <GameFinishedScreen
          totalTyped={currentPlayer?.score}
          typingErrors={typingErrors}
          userLoggedIn={userLoggedIn}
          wpm={currentPlayer?.wpm}
          currentPlayerHasHigherScore={currentPlayerHasHigherScore}
        />
      );
    }

    if (players.length === 1) {
      return <WaitingScreen gameId={inviteCode} />;
    }

    return (
      <>
        {popScreen && <CountDown count={countDown} />}
        {gameStatus === "in-progress" ? (
          <div className="w-full flex flex-col">
            <PlayerScreen
              name={currentPlayer?.name}
              host={host}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
              typingErrors={typingErrors}
            />
            <div className="flex items-center justify-center text-white text-6xl font-semibold italic">
              <h1>{gamingTimer}</h1>
            </div>
            <EnemyScreen
              name={enemyPlayer?.name}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="h-1/6 flex items-center justify-center">
              <Camper />
              <Snowfall snowflakeCount={300} />
              {ioInstance?.id === host ? (
              <HostGameTimeForm timeFormOpen={timeFormOpen} form={form} startGame={startGame}/>
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
                typingErrors={typingErrors}
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
    );
  };

  return <div className="w-3/4 flex flex-row h-2/3">{renderGameContent()}</div>;
};

export default GamePage;
