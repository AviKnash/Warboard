import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { IContextType } from "@/types";
import { onAuthStateChanged } from "firebase/auth";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  userLoggedIn: false,
  setCurrentUser: () => {},
  setUserLoggedIn: () => {},
};

type IUser =
  | {
      displayName: string;
      photoURL: string;
      userID:string
    }
  | undefined;

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<IUser>({
    displayName: "",
    photoURL: "",
    userID:""
  });
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user: any) => {
    setIsLoading(true);
    if (user) {
      setCurrentUser({
        displayName: user.displayName,
        photoURL: user.photoURL,
        userID:user.uid
      });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(undefined);
      setUserLoggedIn(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (cookieFallback === "[]" || cookieFallback === null) {
      navigate("/start-game");
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userLoggedIn,
    setUserLoggedIn,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
