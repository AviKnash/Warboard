import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "./WaitingScreen";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import { Loading } from "@/auth/components/Loading";
import CountDown from "../components/CountDown";
import { useGameContext } from "@/context/GameContext";
import { useGame } from "@/hooks/useGame";
import { useUserContext } from "@/context/AuthContext";

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
  } = useSocket();

  const { timeLeft, popOver } = useGameContext();
  const {userLoggedIn}= useUserContext()

  const currentPlayerHasHigherScore =
    currentPlayer && enemyPlayer && currentPlayer?.score > enemyPlayer?.score;

  // useEffect(() => {
  //   if (gameStatus === "finished") {
  //     addGame({ wpm:players[0].wpm, totalGames: 1 });
  //   }
  // }, [gameStatus, addGame, wpm]);



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
            {popOver && <CountDown count={timeLeft} />}
            <PlayerScreen
              // setPopOver={setPopOver}
              name={currentPlayer?.name}
              host={host}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
              // setTimeLeft={setTimeLeft}
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
