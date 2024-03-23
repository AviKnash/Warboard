import "./globals.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Home";
import AuthLayout from "./auth/AuthLayout";
import StartGame from "./auth/components/StartGame";
import { Toaster } from "./components/ui/toaster";
import LeaderBoard from "./root/pages/LeaderBoard";
// import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./root/pages";
// import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="h-screen">
      <Routes>
        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path="/start-game" element={<StartGame />} />
          <Route path="/start-game/leaderboard" element={<LeaderBoard />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index path="home/:inviteCode/:name" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
