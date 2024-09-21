import { useState } from "react";
import WarbyIdle from "/WarbyIdle.gif";
import WarbyExcite from "/WarbyExcite.gif";

const MobileDismissPage = () => {
  const [currentWarbyGif, setCurrentWarbyGif] = useState(WarbyIdle);

  const handleTouchEnter = () => {
    setCurrentWarbyGif(WarbyExcite);
  };

  const handleTouchLeave = () => {
    setCurrentWarbyGif(WarbyIdle);
  };

  return (
    <div className="flex flex-col items-center border border-white h-full justify-center">
      <>
        <div className="border border-white thought text-gray-500">
          Warboard is not available on mobile yet. Stay tuned!
        </div>
        <div
          onTouchStart={handleTouchEnter}
          onTouchEnd={handleTouchLeave}
          className="flex justify-end"
        >
          <img draggable="false" src={currentWarbyGif} />
        </div>
      </>
    </div>
  );
};

export default MobileDismissPage;
