import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { doSignInWithGoogle } from "@/firebase/api";
import { useState } from "react";

type IUser = {
  displayName: string;
  email: string;
  totalGames: number;
  gamesWon: number;
  userID: string;
};

export const useUser = () => {
  const userCollection = collection(db, "user");
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const getUser = async (userID: string) => {
    let unsubscribe: (() => void) | null = null;

    try {
      const queryUser = query(userCollection, where("userID", "==", userID));
      unsubscribe = onSnapshot(queryUser, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const userData = {
            displayName: data.displayName,
            email: data.email,
            totalGames: data.totalGames,
            gamesWon: data.gamesWon,
            userID: data.userID,
          };
          setUser(userData);
        });

        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  };

  const addUser = async () => {
    try {
      const { user } = await doSignInWithGoogle();
      if (user) {
        const { displayName, uid, email } = user;

        const userRefCollection = doc(db, "user", uid);
        const querySnapshot = await getDoc(userRefCollection);

        if (!querySnapshot.exists()) {
          await setDoc(userRefCollection, {
            userID: uid,
            totalGames: 0,
            gamesWon: 0,
            displayName,
            email,
          });
        } else {
          console.log("User already exists");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addUser, getUser, user, loading };
};
