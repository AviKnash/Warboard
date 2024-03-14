import CreateGame from "../CreateGame";
import JoinGame from "../JoinGame";
import logo from "../../../public/warboard.png";

const StartGame = () => {
  return (
    <>
      <img draggable={false} src={logo} />
      <div className="w-3/4 flex flex-row">
        <CreateGame />
        <JoinGame />
      </div>
    </>
  );
};

export default StartGame;
