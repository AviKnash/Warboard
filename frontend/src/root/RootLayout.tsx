import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const RootLayout = () => {
  return (
    <>
      <TopBar leaderboardRequired={false}/>
      <section
        className="h-full flex flex-1 justify-center items-center flex-col"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
