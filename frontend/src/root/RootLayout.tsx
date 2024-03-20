import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const RootLayout = () => {
  return (
    <>
        <TopBar />
      <section className="flex flex-1 justify-center items-center flex-col" style={{ height: `calc(100vh - 7vh)` }}>

        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
