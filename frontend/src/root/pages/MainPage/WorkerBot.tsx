import WarbyIdle from "/WarbyIdle.gif";
import WarbyExcite from "/WarbyExcite.gif";
import { WarbyStateValues } from "@/lib/constants";
import { useWarby } from "@/context/WarbyContext";

const WorkerBot = () => {
  const { warbyState,warbyText } = useWarby();
  let currentWarbyGif;

  if (warbyState === WarbyStateValues.IDLE) {
    currentWarbyGif = WarbyIdle;
  } else {
    currentWarbyGif = WarbyExcite;
  }

  const handleMouseEnter = () => {
    //TODO
  };

  const handleMouseLeave = () => {
    //TODO
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chatbot button */}
      <>
        <div className="border border-white thought text-gray-500">{warbyText}</div>
        <div className="flex justify-end">
          <img
            draggable="false"
            width="90px"
            src={currentWarbyGif}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </>
    </div>
  );
};

export default WorkerBot;
