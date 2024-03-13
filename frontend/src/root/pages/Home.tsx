import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import WaitingScreen from "./WaitingScreen";
import { GameFinishedScreen } from "./GameFinishedScreen";
import useSocket from "@/hooks/useSocket";
import { Loading } from "@/auth/components/Loading";

const GamePage = () => {
  const { players, gameStatus, paragraph, host, ioInstance, name, inviteCode } =
    useSocket();

  const enemyName =
    ioInstance?.id === host ? players[1]?.name : players[0]?.name;

  let currentPlayerHasHigherScore;

  if (gameStatus === "finished") {
    const currentPlayer = players.find((player) => player.name === name);
    const enemyPlayer = players.find((player) => player.name !== name);

    if (currentPlayer && enemyPlayer) {
      currentPlayerHasHigherScore = currentPlayer.score > enemyPlayer.score;
      console.log(currentPlayerHasHigherScore);
    } else {
      console.log("Current player or enemy player not found.");
    }
  }

  return (
    <>
      <div className="w-3/4 flex flex-row">
        {!ioInstance ? (
          <Loading />
        ) : gameStatus === "finished" ? (
          <GameFinishedScreen
            currentPlayerHasHigherScore={currentPlayerHasHigherScore}
          />
        ) : players.length === 1 ? (
          <WaitingScreen gameId={inviteCode} />
        ) : (
          <>
            <PlayerScreen
              name={name}
              host={host}
              gameId={inviteCode}
              ioInstance={ioInstance}
              gameStatus={gameStatus}
              paragraph={paragraph}
            />
            <EnemyScreen
              name={enemyName}
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
