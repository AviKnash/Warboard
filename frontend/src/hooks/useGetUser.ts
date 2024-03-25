import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

interface User {
  userID: string;
  totalGames: number;
  gamesWon: number;
  displayName: string;
  emailAddress: string;
}

const INITAL_USER={
    userID:"",
    totalGames:0,
    gamesWon:0,
    displayName:"",
    emailAddress:""
}

export const useGetUser = (userID: string | undefined) => {
  const [user, setUser] = useState<User>(INITAL_USER);
  const [loading, setLoading] = useState(true);

  const userCollectionRef = collection(db, "user");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(userCollectionRef, where("userID", "==", userID)),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const userData = {
            userID: data.userID,
            totalGames: data.totalGames,
            gamesWon: data.gamesWon,
            displayName: data.displayName,
            emailAddress: data.email,
          };
          setUser(userData);
          setLoading(false);
        });
      }
    );

    return () => unsubscribe();
  }, [userID]);

  return { user, loading };
};
