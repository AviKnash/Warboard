// import {LeftSideBar,BottomBar,TopBar } from "@/components/shared";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      {/* <TopBar /> */}

      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;