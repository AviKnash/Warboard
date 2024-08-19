import TopBar from "@/root/components/TopBar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

  return (
    <>
      <>
        <TopBar />
        <section
          className="flex flex-1 justify-center items-center h-full"
          style={{ height: `calc(100vh - 10vh)` }}
        >
          <Outlet />
        </section>
      </>
    </>
  );
};

export default AuthLayout;
