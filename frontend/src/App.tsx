import "./globals.css";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Home";
// import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from "./root/pages";
// import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="h-screen">
      <Routes>
        {/* public*/}
{/* 
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route> */}

        {/* private*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="/explore" element={<Explore />} /> */}

        </Route>
      </Routes>
      {/* <Toaster /> */}
    </main>
  );
};

export default App;