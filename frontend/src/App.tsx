import "./globals.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/MainPage/Home";
import AuthLayout from "./auth/AuthLayout";
import StartGame from "./auth/components/StartGame";
import { Toaster } from "./components/ui/toaster";
import LeaderBoard from "./root/pages/MainPage/LeaderBoard";
import Practice from "./root/pages/Practice/Practice";
import { useEffect } from "react";
import MobileDismissPage from "./auth/MobileDismissPage";

const App = () => {
  const navigate = useNavigate();

  const isMobile = () => {
    return (
      /Mobi|Android/i.test(navigator.userAgent) ||
      window.matchMedia("(max-width: 768px)").matches
    );
  };

  useEffect(() => {
    if (isMobile()) {
      navigate("/mobile-landing");
    }
  }, [navigate]);

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
