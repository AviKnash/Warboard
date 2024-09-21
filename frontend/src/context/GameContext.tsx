import { TypingStreakValues } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GameParamsContextType = {
  typingStreak: TypingStreakValues;
  setTypingStreak: React.Dispatch<React.SetStateAction<TypingStreakValues>>;
};

const GameParamsContext = createContext<GameParamsContextType | undefined>(undefined);

export const GameParamsProvider = ({ children }: { children: ReactNode }) => {
  const [typingStreak, setTypingStreak] = useState<TypingStreakValues>(0);

  return (
    <GameParamsContext.Provider value={{ typingStreak, setTypingStreak }}>
      {children}
    </GameParamsContext.Provider>
  );
};

export const useGameParams = () => {
  const context = useContext(GameParamsContext);
  if (!context) {
    throw new Error('useGameParams must be used within a GameParamsProvider');
  }
  return context;
};
