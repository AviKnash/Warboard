import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import UserInput from "../components/UserInput";
import useGame from "../../hooks/useGame";
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3001");

socket.emit("send_message", { message: "hello" });


const GamePage = () => {
    useEffect(() => {
      socket.on("recieve_message", (data) => {
        alert(data.message);
      });
    }, [socket]);
  const { state, words, typed } = useGame();

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="relative leading-relaxed break-all grid text-blue-900 justify-center">
          <UserInput
            words={words}
            className="absolute inset-0 z-10 text-lg"
            userInput={typed}
          />
          <EnemyScreen
            sentence={words}
            className="absolute inset-0 z-10 border border-violet-500 text-slate-500 text-lg"
          />
        </div>

        <PlayerScreen sentence={words} />
      </div>
    </>
  );
};

export default GamePage;
