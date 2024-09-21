import { useUserContext } from "@/context/AuthContext";
import CreateGame from "../CreateGame";
import JoinGame from "../JoinGame";
import SignIn from "../SignIn";
import logo from "/warboard.svg";
import LoggedInUser from "./LoggedInUser";
import FullSpinner from "./FullSpinner";
import WarbyIdle from "/WarbyIdle.gif";
import WarbyExcite from "/WarbyExcite.gif";
import { useState } from "react";

const StartGame = () => {
  const { userLoggedIn, currentUser, isLoading } = useUserContext();
  const [currentWarbyGif, setCurrentWarbyGif] = useState(WarbyIdle);

  const onMouseEnter = () => {
    setCurrentWarbyGif(WarbyExcite);
  };

  const onMouseLeave = () => {
    setCurrentWarbyGif(WarbyIdle);
  };

  return (
    <>
      {isLoading ? (
        <FullSpinner />
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center">
          <div className="items-center grid grid-cols-1">
            <div className="flex">
              <img draggable={false} src={logo} className="h-64 p-5" />
              <img
                draggable="false"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                width="90px"
                src={currentWarbyGif}
                className="hover:cursor-pointer self-end my-[2rem]"
              />
            </div>
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
