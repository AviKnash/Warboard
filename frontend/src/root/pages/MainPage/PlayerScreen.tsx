import { GameProps } from "@/types";
import TypingParagraph from "../../components/Game/TypingParagraph";
import { useState } from "react";
import WorkerBot from "./WorkerBot";
import { truncate } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

const PlayerScreen = ({
  name,
  ioInstance,
  gameStatus,
  paragraph,
  typingErrors,
}: GameProps) => {
  const [mistake, setMistake] = useState<boolean>(false);

  return (
    <div className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center">
      {gameStatus === "not-started" ? (
        <div className="relative w-full">
          <div className="flex-grow flex-row flex align-middle">
            <div className="flex items-center flex-1">
              <h1 className="md:text-6xl sm:text-3xl pr-10">
                {truncate(name as string)}
              </h1>
            </div>
          </div>
          <div className="absolute h-full w-full flex bottom-[-1rem] z-0">
            <SparklesCore
              id="playersparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow h-full">
            {mistake && (
              <div className="fixed top-0 left-0 w-full h-full bg-red-700 bg-opacity-20 animate-flash pointer-events-none" />
            )}
            <TypingParagraph
              setMistake={setMistake}
              typingErrors={typingErrors}
              ioInstance={ioInstance}
              paragraph={paragraph}
            />
            <WorkerBot />
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerScreen;
