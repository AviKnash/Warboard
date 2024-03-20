import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

interface Game {
  id: string;
  playedAt: any;
  totalGames: number;
  userID: string;
  wpm: number;
  userName:string;
}

export const useGetLeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const gameCollectionRef = collection(db, "game");

  const getLeaderBoard = async () => {
    let unsubscribe: any;

    try {
      const queryGame = query(gameCollectionRef, orderBy("wpm", "desc"));

      unsubscribe = onSnapshot(queryGame, (snapshot) => {
        let docs: Game[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          const gameData = {
            id,
            userName:data.userName,
            playedAt: data.playedAt,
            totalGames: data.totalGames,
            userID: data.userID,
            wpm: data.wpm,
          };

          docs.push(gameData);
        });
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
