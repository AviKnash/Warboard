import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/home/:invite-code" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center h-full">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
