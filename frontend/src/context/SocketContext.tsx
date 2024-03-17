// SocketContext.js
import { createContext, useContext} from "react";
import { Socket } from "socket.io-client";
import { Player, GameStatus } from "@/types";
import useSocket from "@/hooks/useSocket";

type SocketContextType = {
  ioInstance: Socket | undefined;
  players: Player[];
  gameStatus: GameStatus;
  paragraph: string;
  host: string;
  serverConnected: boolean;
  wpm: number;
  name: string | undefined;
  inviteCode: string | undefined;
};

const SocketContext = createContext<SocketContextType>({
  ioInstance: undefined,
  players: [],
  gameStatus: "not-started",
  paragraph: "",
  host: "",
  serverConnected: false,
  wpm: 0,
  name: "",
  inviteCode: "",
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const {
        players,
        gameStatus,
        paragraph,
        host,
        ioInstance,
        name,
        inviteCode,
        serverConnected,
        wpm,
      } = useSocket();
    
  return (
    <SocketContext.Provider
      value={{
        players,
        gameStatus,
        paragraph,
        host,
        ioInstance,
        name,
        inviteCode,
        serverConnected,
        wpm,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketInstance = () => useContext(SocketContext);
