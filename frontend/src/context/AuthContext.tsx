import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { IContextType, IUser } from "@/types";
import { onAuthStateChanged } from "firebase/auth";
import {  doc, getDoc } from "firebase/firestore";

const INITIAL_STATE = {
  currentUser: undefined,
  isLoading: false,
  userLoggedIn: false,
  setCurrentUser: () => {},
  setUserLoggedIn: () => {},
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<IUser>({
    displayName: "",
    photoURL: "",
    userID: "",
    email:"",
    totalGames: 0,
    gamesWon: 0,
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
      const userCollection = doc(db, "user", user.uid);
      const userSnapshot = await getDoc(userCollection);
      const userFromDB = userSnapshot.data();

      setCurrentUser({
        displayName: user.displayName,
        photoURL: user.photoURL,
        userID: user.uid,
        email:user.email,
        totalGames: userFromDB?.totalGames | 0,
        gamesWon: userFromDB?.gamesWon | 0,
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
