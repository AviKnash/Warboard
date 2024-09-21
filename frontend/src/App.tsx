import "./globals.css";
import { Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <Navigate to="/mobile-landing" replace />;
  }

  return (
    <main className="h-screen">
      <Routes>
        {/**mobile */}
        <Route path="/mobile-landing" element={<MobileDismissPage />} />

        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<StartGame />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index path="/:inviteCode/:name" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
