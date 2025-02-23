import { truncate } from "@/lib/utils";
import EnemyTypingParagraph from "../../components/Game/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";
import { SparklesCore } from "@/components/ui/sparkles";

const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
  gameStatus,
}: EnemyGameProps) => {
  return (
    <div className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center">
      {gameStatus === "not-started" ? (
        <div className="relative w-full">
          <div className="flex-grow flex-row flex align-middle">
            <div className="flex items-center justify-end flex-1">
              <h1 className="md:text-6xl sm:text-3xl pr-10">
                {truncate(name as string)}
              </h1>
            </div>
          </div>
          <div className="absolute h-[100%] w-full flex bottom-[-1rem] z-0">
            <SparklesCore
              id="enemysparkles"
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
        <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
      )}
    </div>
  );
};

export default EnemyScreen;
