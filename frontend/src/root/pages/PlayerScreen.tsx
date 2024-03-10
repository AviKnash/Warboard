import React from 'react';

const PlayerScreen = ({ sentence }: { sentence: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-300 text-gray-800">
      <div className="border border-gray-400 p-4 mb-4">
        <p className="text-xl">{sentence}</p>
      </div>
    </div>
  );
};

export default PlayerScreen;
