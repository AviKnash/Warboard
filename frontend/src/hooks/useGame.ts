import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useUserContext } from "@/context/AuthContext";

export const useGame = () => {
  const gameCollection = collection(db, "game");
  const { currentUser } = useUserContext();

  const addGame = async ({
    wpm,
    totalGames,
  }: {
    wpm: number | undefined;
    totalGames: number | undefined;
  }) => {
    await addDoc(gameCollection, {
      userID: currentUser.userID,
      userName:currentUser.displayName,
      wpm,
      totalGames,
      playedAt: serverTimestamp(),
    });
  };
  return { addGame };
};
