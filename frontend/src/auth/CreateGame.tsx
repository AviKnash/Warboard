import { EnterNameDialog } from "./components/EnterNameDialog";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CommonButton from "@/components/common/CommonButton";
import CommonCard from "@/components/common/CommonCard";

interface CardFooterProps {
  userLoggedIn: boolean;
  createGame: () => void;
  createSinglePlayerGame: () => void;
}

const CreateGame = () => {
  const navigate = useNavigate();

  const { currentUser, userLoggedIn } = useUserContext();

  const createGame = () => {
    const inviteCode = uuidv4();
    return navigate(`/${inviteCode}/${currentUser?.displayName}`);
  };

  const createSinglePlayerGame = () => {
    return navigate(`/practice`);
  };

  const CardFooter: React.FC<CardFooterProps> = ({
    userLoggedIn,
    createGame,
    createSinglePlayerGame,
  }) => {
    return (
      <div className="flex justify-center mt-auto">
        {userLoggedIn ? (
          <CommonButton className="mx-2" onClick={createGame}>
            Multiplayer Battle
          </CommonButton>
        ) : (
          <EnterNameDialog />
        )}
        <CommonButton className="mx-2" onClick={createSinglePlayerGame}>
          Practice Singleplayer
        </CommonButton>
      </div>
    );
  };

  return (
    <CommonCard
      footerContent={
        <CardFooter
          userLoggedIn={userLoggedIn}
          createGame={createGame}
          createSinglePlayerGame={createSinglePlayerGame}
        />
      }
      title="Create a game!"
    >
      <p>Click to make a room and share the code to battle it out!!</p>
    </CommonCard>
  );
};

export default CreateGame;
