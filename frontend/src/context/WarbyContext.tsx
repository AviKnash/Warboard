import { WarbyMessages, WarbyStateValues } from "@/lib/constants";
import {  WarbyState } from "@/types";
import  {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useGameParams } from "./GameContext";

type WarbyContextType = {
  warbyState: WarbyState;
  warbyText: string;
  updateWarby: (message: string, newState?: WarbyState) => void;
};

const WarbyContext = createContext<WarbyContextType | undefined>(undefined);

export const WarbyProvider = ({ children }: { children: ReactNode }) => {
  const [warbyState, setWarbyState] = useState<WarbyState>(
    WarbyStateValues.IDLE
  );
  const [warbyText, setWarbyText] = useState<string>(
    WarbyMessages.DEFAULT_BATTLE
  );
  const { typingStreak } = useGameParams();

  useEffect(() => {
    if (typingStreak === 0) return;
    setWarbyText(
      `STREEEAAAAAAK!. Nice, you're on a ${typingStreak} word streak! Keep going!`
    );
    setWarbyState(WarbyStateValues.EXCITED);

    const timeoutId = setTimeout(() => {
      setWarbyText(WarbyMessages.DEFAULT_BATTLE);
      setWarbyState(WarbyStateValues.IDLE);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [typingStreak]);

  const updateWarby = (message: string, newState?: WarbyState) => {
    setWarbyText(message);
    newState && setWarbyState(newState);

    setTimeout(() => {
      setWarbyText(WarbyMessages.DEFAULT_BATTLE);
      setWarbyState(WarbyStateValues.IDLE);
    }, 5000);
  };

  return (
    <WarbyContext.Provider value={{ warbyState, warbyText, updateWarby }}>
      {children}
    </WarbyContext.Provider>
  );
};

export const useWarby = () => {
  const context = useContext(WarbyContext);
  if (!context) {
    throw new Error("useWarby must be used within a GameParamsProvider");
  }
  return context;
};
