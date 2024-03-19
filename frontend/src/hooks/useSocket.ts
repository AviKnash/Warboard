import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Player, PlayerScore, GameStatus } from "@/types";
import { useUserContext } from "@/context/AuthContext";

const useSocket = () => {
  const { inviteCode, name } = useParams();
  const { toast } = useToast();
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [paragraph, setParagraph] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [serverConnected, setServerConnected] = useState<boolean>(false);
  const { currentUser } = useUserContext();

  const userName = currentUser ? currentUser.displayName : name;

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      transports: ["websocket"],
    });

    setIoInstance(socket);

    socket.emit("join-game", inviteCode, userName);

    return () => {
      removeListeners(socket);
      socket.disconnect();
    };
  }, [inviteCode, name]);

  useEffect(() => {
    if (ioInstance) {
      setupListeners(ioInstance);
    }
    return () => ioInstance && removeListeners(ioInstance);
  }, [ioInstance]);

  function setupListeners(socket: Socket) {
    socket.on("connect", () => {
      console.log("Connected to server");
      setServerConnected(true);
    });

    socket.on("players", (players: Player[]) => {
      console.log("received players");
      setPlayers(players);
    });

    socket.on("player-joined", (player: Player) => {
      setPlayers((prev) => [...prev, player]);
    });

    socket.on("player-left", (id: string) => {
      setPlayers((prev) => prev.filter((player) => player.id !== id));
    });

    socket.on("player-score", ({ id, score, wpm }: PlayerScore) => {
      setPlayers((prev) =>
        prev.map((player) => {
          if (player.id === id) {
            return {
              ...player,
              score,
              wpm,
            };
          }
          return player;
        })
      );
    });

    socket.on("game-started", (paragraph: string) => {
      setParagraph(paragraph);
      setGameStatus("in-progress");
    });

    socket.on("game-finished", () => {
      setGameStatus("finished");
    });

    socket.on("new-host", (id: string) => {
      setHost(id);
    });

    socket.on("error", (message: string) => {
      toast({ title: message });
    });
  }

  function removeListeners(socket: Socket) {
    socket.off("connect");
    socket.off("players");
    socket.off("player-joined");
    socket.off("player-left");
    socket.off("player-score");
    socket.off("game-started");
    socket.off("game-finished");
    socket.off("new-host");
    socket.off("error");
  }

  const currentPlayer = players.find((player)=>player.id === ioInstance?.id)
  const enemyPlayer = players.find((player)=>player.id !== ioInstance?.id)

  return {
    players,
    gameStatus,
    paragraph,
    host,
    ioInstance,
    inviteCode,
    serverConnected,
    currentPlayer,
    enemyPlayer
  };
};

export default useSocket;
