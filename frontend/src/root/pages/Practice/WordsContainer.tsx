import React from "react";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-v-xl mt-3 border border-white m-4">
      {children}
    </div>
  );
};

export default WordsContainer;
