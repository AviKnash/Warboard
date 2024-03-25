import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useUserContext } from "@/context/AuthContext";

export const useGame = () => {
  const gameCollection = collection(db, "game");
  const { currentUser } = useUserContext();
  const userDocument = currentUser && doc(db, "user", currentUser.userID);

  const addGame = async ({ wpm }: { wpm: number | undefined }) => {
    await addDoc(gameCollection, {
      userID: currentUser?.userID,
      userName: currentUser?.displayName,
      wpm,
      playedAt: serverTimestamp(),
    });
  };

  const addUserStats = async ({
    totalGames,
    gamesWon,
  }: {
    totalGames: number;
    gamesWon: number;
  }) => {
    console.log(totalGames, gamesWon);

    if (userDocument) {
      await updateDoc(userDocument, {
        totalGames,
        gamesWon,
      });
    }
  };

  return { addGame, addUserStats };
};
