import EnemyScreen from "./EnemyScreen";
import PlayerScreen from "./PlayerScreen";
import UserInput from "../components/UserInput";
import useGame from "../../hooks/useGame";

const GamePage = () => {
  const { state, words } = useGame();

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="relative leading-relaxed break-all grid text-blue-900 justify-center">
          <UserInput
            className="absolute inset-0 z-10 text-lg"
            userInput={"Hello"}
          />
          <EnemyScreen
            sentence={words}
            className="absolute inset-0 z-10 border border-violet-500 text-stone-500 text-lg"
          />
        </div>

        <PlayerScreen sentence={words} />
      </div>
    </>
  );
};

export default GamePage;
