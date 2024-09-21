import { useEffect, useMemo, useRef, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import Loading from "@/auth/components/Loading";
import CountDown from "../../components/Game/CountDown";
import { Snowfall } from "react-snowfall";
import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "../WaitingScreen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HostGameTimeForm from "./HostGameTimeForm";
import GamingTimer, { TimerRef } from "@/root/components/Game/GamingTimer";
import IceFlooring from "./IceFlooring";
import VSBackdrop from "./VSBackdrop";

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
    enemyParagraph,
  } = useSocket();
  const { userLoggedIn } = useUserContext();
  const [popScreen, setPopScreen] = useState<boolean>(false);
  const [currentPlayerHasHigherScore, setCurrentPlayerHasHigherScore] =
    useState<boolean | undefined>(true);
  const [timeFormOpen, setTimeFormOpen] = useState<boolean>(true);
  const timerRef = useRef<TimerRef>(null);

  const FormSchema = z.object({
    type: z.enum(["10", "30", "60"], {
      required_error: "You need to select a game time",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (
      (currentPlayer &&
        enemyPlayer &&
        currentPlayer.score >= enemyPlayer.score) ||
      !enemyPlayer
    ) {
      setCurrentPlayerHasHigherScore(true);
    } else {
      setCurrentPlayerHasHigherScore(false);
    }
  }, [gamingTimer]);

  useEffect(() => {
    if (!gamingTimer) return;

    if (timerRef.current) {
      timerRef.current.updateTime(gamingTimer);
    }

    if (gamingTimer === 1 && players.length > 1) {
      ioInstance?.emit("finish-game");
    }
  }, [gamingTimer, players.length, ioInstance]);

  useEffect(() => {
    if (countDown && countDown > 0) {
      setPopScreen(true);
    } else {
      setPopScreen(false);
    }
  }, [countDown]);

  function startGame(data: z.infer<typeof FormSchema>) {
    if (!ioInstance) return;
    setTimeFormOpen(false);

    ioInstance.emit("count-down", 6);
    setTimeout(() => {
      ioInstance.emit("game-timer", +data.type);

      ioInstance.emit("start-game");
    }, 5000);
  }

  const renderGame = useMemo(() => {
    if (!serverConnected || !currentPlayer) {
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
            <GamingTimer ref={timerRef} />

            <EnemyScreen
              name={enemyPlayer?.name}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={enemyParagraph}
            />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="h-1/6 flex items-center justify-center">
              {/* <Camper /> */}
              <Snowfall snowflakeCount={300} />
              {ioInstance?.id === host ? (
                <HostGameTimeForm
                  timeFormOpen={timeFormOpen}
                  form={form}
                  startGame={startGame}
                />
              ) : (
                <h1 className="text-center text-2xl items-center">
                  Waiting for host to start battle. Hold on!
                </h1>
              )}
            </div>
            <div className="w-full flex h-5/6 z-10">
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
                paragraph={enemyParagraph}
              />
            </div>
            <VSBackdrop />
            <IceFlooring />
          </div>
        )}
      </>
    );
  }, [
    serverConnected,
    currentPlayer,
    gameStatus,
    players,
    popScreen,
    countDown,
    enemyPlayer,
    paragraph,
    enemyParagraph,
  ]);

  return <div className="w-3/4 flex flex-row h-2/3">{renderGame}</div>;
};

export default GamePage;
