import React from "react";

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-v-xl mt-3 leading-relaxed break-all m-10">
      {children}
    </div>
  );
};

export default WordsContainer;
