import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const RootLayout = () => {
  return (
    <>
        <TopBar />
      <section className="flex flex-1 justify-center items-center flex-col py-10">

        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
