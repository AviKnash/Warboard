import { Link } from "react-router-dom";
import { AvatarDemo } from "./UserIcon";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { userLoggedIn ,currentUser} = useUserContext();
  const homeLink = `/start-game`;
  const leaderboardLink = `/start-game/leaderboard`;

  return (
    <div className="flex border bg-card text-card-foreground shadow-sm justify-center">
      <div className="container flex justify-between items-center">
        <div className="flex flex-row w-3/4 h-12 items-center">
          <Link to={homeLink}>
            <img className="h-10" draggable={false} src="/warboard.png" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to={leaderboardLink} className="hover:text-gray-300">
            Leaderboard
          </Link>
          {userLoggedIn && (
            <Link to="#" className="hover:text-gray-300">
              <AvatarDemo currentUser={currentUser}/>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
