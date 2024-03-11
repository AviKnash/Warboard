import CreateGame from "../CreateGame";
import JoinGame from "../JoinGame";

const StartGame = () => {
  return (
    <>
      <h4>WarBoard</h4>
      <div className="w-3/4 flex flex-row">
        <CreateGame />
        <JoinGame />
      </div>
    </>
  );
};

export default StartGame;
