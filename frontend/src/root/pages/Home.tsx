import { useEffect, useState } from "react";
import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { GameStatus, Player, PlayerScore } from "@/types";
import { Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";
import WaitingScreen from "./WaitingScreen";
import { GameFinishedScreen } from "./GameFinishedScreen";

const GamePage = () => {
  const { inviteCode, name } = useParams();
  const { toast } = useToast();
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [paragraph, setParagraph] = useState<string>("");
  const [host, setHost] = useState<string>("");

  console.log(name);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      transports: ["websocket"],
    });

    setIoInstance(socket);

    socket.emit("join-game", inviteCode, name);

    return () => {
      removeListeners();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setupListeners();
    return () => removeListeners();
  }, [ioInstance]);

  function setupListeners() {
    if (!ioInstance) return;

    ioInstance.on("connect", () => {
      console.log("Connected to server");
    });

    ioInstance.on("players", (players: Player[]) => {
      console.log("recieved players");
      setPlayers(players);
    });

    ioInstance.on("player-joined", (player: Player) => {
      setPlayers((prev) => [...prev, player]);
    });

    ioInstance.on("player-left", (id: string) => {
      setPlayers((prev) => prev.filter((player) => player.id !== id));
    });

    ioInstance.on("player-score", ({ id, score }: PlayerScore) => {
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.id === id) {
            return {
              ...player,
              score,
            };
          }
          return player;
        })
      );
    });

    ioInstance.on("game-started", (paragraph: string) => {
      setParagraph(paragraph);
      setGameStatus("in-progress");
    });

    ioInstance.on("game-finished", () => {
      setGameStatus("finished");
    });

    ioInstance.on("new-host", (id: string) => {
      setHost(id);
    });

    ioInstance.on("error", (message: string) => {
      toast({ title: message });
    });
  }

  function removeListeners() {
    if (!ioInstance) return;

    ioInstance.off("connect");
    ioInstance.off("players");
    ioInstance.off("player-joined");
    ioInstance.off("player-left");
    ioInstance.off("player-score");
    ioInstance.off("game-started");
    ioInstance.off("game-finished");
    ioInstance.off("new-host");
    ioInstance.off("error");
  }

  window.onbeforeunload = () => {
    if (ioInstance) {
      ioInstance.emit("leave");
    }
  };
  console.log(players);
  const enemyName =
    ioInstance?.id === host ? players[1]?.name : players[0]?.name;

  let currentPlayerHasHigherScore;

  if (gameStatus === "finished") {
    const currentPlayer = players.find((player) => player.name === name);
    const enemyPlayer = players.find((player) => player.name !== name);

    if (currentPlayer && enemyPlayer) {
       currentPlayerHasHigherScore =
        currentPlayer.score > enemyPlayer.score;
      console.log(currentPlayerHasHigherScore);
    } else {
      console.log("Current player or enemy player not found.");
    }
  }

  return (
    <>
      <div className="w-3/4 flex flex-row">
        {gameStatus === "finished" ? (
          <GameFinishedScreen currentPlayerHasHigherScore={currentPlayerHasHigherScore} />
        ) : (
          players.length === 1 ? (
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
          )
        )}
      </div>
    </>
  );
  
};

export default GamePage;
