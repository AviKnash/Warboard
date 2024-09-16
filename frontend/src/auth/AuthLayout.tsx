import TopBar from "@/root/components/TopBar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <TopBar leaderboardRequired={true}/>
        <section
          className="flex flex-1 justify-center items-center"
          style={{
            height: 'calc(100vh - 4rem)',
          }}
        >
          <Outlet />
        </section>
    </>
  );
};

export default AuthLayout;
