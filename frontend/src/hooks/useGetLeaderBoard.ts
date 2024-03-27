import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  doc as document,
} from "firebase/firestore";

interface Game {
  id: string;
  playedAt: any;
  totalGames: number;
  gamesWon: number;
  userID: string;
  wpm: number;
  userName: string;
  totalTyped: number;
  accuracy: number;
}

export const useGetLeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const gameCollectionRef = collection(db, "game");

  const getLeaderBoard = async () => {
    let unsubscribe: any;

    try {
      const queryGame = query(gameCollectionRef, orderBy("wpm", "desc"));

      unsubscribe = onSnapshot(queryGame, async (snapshot) => {
        let docs: Game[] = [];

        for (const doc of snapshot.docs) {
          const data = doc.data();
          const id = doc.id;
          const userCollection = document(db, "user", data.userID);
          const userSnapshot = await getDoc(userCollection);
          const userFromDB = userSnapshot.data();

          const gameData: Game = {
            id,
            userName: data.userName,
            playedAt: data.playedAt,
            gamesWon: userFromDB?.gamesWon | 0,
            totalGames: userFromDB?.totalGames | 0,
            accuracy: data.accuracy,
            totalTyped: data.totalTyped,
            userID: data.userID,
            wpm: data.wpm,
          };

          docs.push(gameData);
        }

        setLeaderBoard(docs);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return { leaderBoard, loading };
};
