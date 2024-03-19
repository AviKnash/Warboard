import { Outlet, Navigate } from "react-router-dom";
// import sideImage from "/assets/images/cat.jpg";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/home/:invite-code" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
