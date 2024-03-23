import { useUserContext } from "@/context/AuthContext";
import CreateGame from "../CreateGame";
import JoinGame from "../JoinGame";
import SignIn from "../SignIn";
import logo from "/warboard.png";
import LoggedInUser from "./LoggedInUser";
import FullSpinner from "./FullSpinner";

const StartGame = () => {
  const { userLoggedIn, currentUser, isLoading } = useUserContext();

  return (
    <>
      {isLoading ? (
        <FullSpinner />
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center">
          <div className="grid grid-col-1">
            <img draggable={false} src={logo} className="h-36 p-5" />
          </div>
          {userLoggedIn && !isLoading && (
            <div className="grid grid-col-1 mt-5">
              <LoggedInUser currentUser={currentUser} />
            </div>
          )}
          <div
            className={`w-full grid grid-cols-1 py-5 sm:grid-cols-2 lg:grid-cols-${
              userLoggedIn ? "2" : "3"
            }`}
          >
            <CreateGame />
            {!userLoggedIn && <SignIn />}

            <JoinGame />
          </div>
        </div>
      )}
    </>
  );
};

export default StartGame;
