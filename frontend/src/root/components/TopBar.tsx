import { Link } from "react-router-dom";
import { AvatarDemo } from "./UserIcon";
import { useUserContext } from "@/context/AuthContext";

interface ITopBar {
  leaderboardRequired: boolean;
}
const TopBar = ({ leaderboardRequired }: ITopBar) => {
  const { userLoggedIn, currentUser } = useUserContext();
  const homeLink = `/`;
  const leaderboardLink = `/leaderboard`;
  console.log("LEADERR",leaderboardRequired)

  return (
    <nav className="flex justify-between shadow h-16 p-1 sticky top-0 w-full z-99">
      <div className="items-center m-1 ml-5">
        <Link to={homeLink}>
          <img className="h-10" draggable={false} src="/logo.svg" />
        </Link>
      </div>
      <div className="flex items-center space-x-4 p-4">
        {leaderboardRequired && <Link to={leaderboardLink}>Leaderboard</Link>}
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
