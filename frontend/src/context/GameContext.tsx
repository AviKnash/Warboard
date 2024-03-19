
import { IGameContext } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  popOver: false,
  timeLeft: 0,
  setPopOver: () => {},
  setTimeLeft:()=>{}
};

const GameContext = createContext<IGameContext>(INITIAL_STATE);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [popOver, setPopOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  console.log(timeLeft)

  const value = {
    popOver,
    timeLeft,
    setPopOver,
    setTimeLeft
  };


  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => useContext(GameContext);
