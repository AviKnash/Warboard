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
  inviteCode: string | undefined;
};

const SocketContext = createContext<SocketContextType>({
  ioInstance: undefined,
  players: [],
  gameStatus: "not-started",
  paragraph: "",
  host: "",
  serverConnected: false,
  inviteCode: "",
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const {
        players,
        gameStatus,
        paragraph,
        host,
        ioInstance,
        inviteCode,
        serverConnected,
      } = useSocket();
    
  return (
    <SocketContext.Provider
      value={{
        players,
        gameStatus,
        paragraph,
        host,
        ioInstance,
        inviteCode,
        serverConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketInstance = () => useContext(SocketContext);
