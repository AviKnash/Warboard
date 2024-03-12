import { Socket } from "socket.io-client";

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
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
};

export type EnemyTyping = {
  id: string;
  letter: string;
};

export type GameStatus = "not-started" | "in-progress" | "finished";

export type GameProps = {
  host: string;
  gameId: string | undefined;
  gameStatus: string;
  ioInstance: Socket | undefined;
  paragraph: string;
};

export type EnemyGameProps = {
  gameId: string | undefined;
  gameStatus: string;
  ioInstance: Socket | undefined;
  paragraph: string;
};
