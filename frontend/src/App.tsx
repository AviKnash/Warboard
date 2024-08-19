import "./globals.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/MainPage/Home";
import AuthLayout from "./auth/AuthLayout";
import StartGame from "./auth/components/StartGame";
import { Toaster } from "./components/ui/toaster";
import LeaderBoard from "./root/pages/MainPage/LeaderBoard";
import Practice from "./root/pages/Practice/Practice";


const App = () => {
  return (
    <main className="h-screen">
      <Routes>
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
