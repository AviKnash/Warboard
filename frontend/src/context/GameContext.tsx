
import useSocket from "@/hooks/useSocket";
import { IGameContext } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  popOver: false,
  counter: 5,
  setPopOver: () => {},
};

const GameContext = createContext<IGameContext>(INITIAL_STATE);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [popOver, setPopOver] = useState<boolean>(false);
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [counter,popOver]);
  

  const value = {
    popOver,
    counter,
    setPopOver,
  };

  console.log(counter)

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => useContext(GameContext);
