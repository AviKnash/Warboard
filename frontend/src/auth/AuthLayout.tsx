import TopBar from "@/root/components/TopBar";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;


  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/home/:invite-code" />
      ) : (
        <>
        <TopBar />
          <section className="flex flex-1 justify-center items-center h-full" style={{ height: `calc(100vh - 7vh)` }}>
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
