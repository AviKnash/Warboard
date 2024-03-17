import { Socket } from "socket.io-client";

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type ISocketContext = {
  name: string | undefined;
  ioInstance: Socket | undefined;
  inviteCode: string | undefined;
  removeListeners:(socket: Socket)=>void
};

export type IGameContext = {
  popOver: boolean;
  counter: number;
  setPopOver: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IUser = {
  name: string;
};

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type PlayerScore = {
  id: string;
  score: number;
  wpm: number;
};

export type EnemyTyping = {
  id: string;
  letter: string;
};

export type GameStatus = "not-started" | "in-progress" | "finished";

export type GameProps = {
  name: string | undefined;
  host: string;
  gameId: string | undefined;
  gameStatus: string;
  ioInstance: Socket | undefined;
  paragraph: string;
  setPopOver:React.Dispatch<React.SetStateAction<boolean>>
  setTimeLeft:React.Dispatch<React.SetStateAction<number | null>>
};

export type EnemyGameProps = {
  name: string | undefined;
  gameId: string | undefined;
  gameStatus: string;
  ioInstance: Socket | undefined;
  paragraph: string;
};
