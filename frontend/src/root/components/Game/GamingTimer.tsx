import { forwardRef, useImperativeHandle, useState } from "react";

export interface TimerRef {
  updateTime: (newTime: number) => void;
}

const GamingTimer = forwardRef<TimerRef, {}>((_, ref) => {
  const [time, setTime] = useState(0);

  useImperativeHandle(ref, () => ({
    updateTime: (newTime) => {
      setTime(newTime);
    },
  }));

  return (
    <div
      className={`flex items-center justify-center text-white text-6xl font-semibold italic timer ${
        time <= 5 ? "pulsing" : ""
      }`}
    >
      <h1>{time}</h1>
    </div>
  );
});

export default GamingTimer;
