import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useUserContext } from "@/context/AuthContext";

interface Game {
  userID: string;
  totalGames: number;
  gamesWon: number;
  displayName: string;
  emailAddress: string;
}

export const useGetUser = () => {
  const [user, setUser] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const userCollectionRef = collection(db, "user");

  const getUser = async (userID:string) => {
    let unsubscribe: any;

    try {
      const queryUser = query(userCollectionRef, where("userID", "==",userID));

      unsubscribe = onSnapshot(queryUser, (snapshot) => {

        console.log(snapshot.docs)
       
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    return () => unsubscribe();
  };

//   useEffect(() => {
//     getUser();
//   }, []);

  return {  loading };
};
