
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";

const RootLayout = () => {
  return (
    <>
      <TopBar />

      <section>
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;