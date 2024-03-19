import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

type IUserAuth = {
  email: string;
  password: string;
};

export const doCreateUserWithEmailAndPassword = async ({
  email,
  password,
}: IUserAuth) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: IUserAuth) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  return result;
};

export const doSignOut = async () => {
  return auth.signOut();
};

export const doPasswordReset = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// export const doPasswordChange = async (password: string) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = async() =>{
//     sendEmailVerification(auth.currentUser, {
//         url:
//     })
// }
