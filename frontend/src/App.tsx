import "./globals.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/MainPage/Home";
import AuthLayout from "./auth/AuthLayout";
import StartGame from "./auth/components/StartGame";
import { Toaster } from "./components/ui/toaster";
import LeaderBoard from "./root/pages/MainPage/LeaderBoard";
import Practice from "./root/pages/Practice/Practice";
import { useEffect, useState } from "react";
import MobileDismissPage from "./auth/MobileDismissPage";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <main className="h-screen">
      <Routes>
        <Route path="/mobile-landing" element={<MobileDismissPage />} />
        <Route
          path="*"
          element={
            isMobile && location.pathname !== "/mobile-landing" ? (
              <Navigate to="/mobile-landing" replace />
            ) : (
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<StartGame />} />
                  <Route path="/leaderboard" element={<LeaderBoard />} />
                </Route>
                <Route element={<RootLayout />}>
                  <Route path="/:inviteCode/:name" element={<Home />} />
                  <Route path="/practice" element={<Practice />} />
                </Route>
              </Routes>
            )
          }
        />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
