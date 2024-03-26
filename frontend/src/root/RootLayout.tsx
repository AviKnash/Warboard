import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <section
        className="h-full flex flex-1 justify-center items-center flex-col"
      >
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
