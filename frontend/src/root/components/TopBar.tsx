import { Link } from "react-router-dom";
import { AvatarDemo } from "./UserIcon";
import { useUserContext } from "@/context/AuthContext";

const TopBar = () => {
  const { userLoggedIn, currentUser } = useUserContext();
  const homeLink = `/start-game`;
  const leaderboardLink = `/start-game/leaderboard`;

  return (
    <nav className="flex justify-between shadow h-16 p-1">
      <div className="items-center m-1 ml-5">
        <Link to={homeLink}>
          <img className="h-10" draggable={false} src="/logo.svg" />
        </Link>
      </div>
      <div className="flex items-center space-x-4 p-4">
        <Link to={leaderboardLink}>Leaderboard</Link>
        {userLoggedIn && (
          <Link to="#" className="hover:text-gray-300">
            <AvatarDemo currentUser={currentUser} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
