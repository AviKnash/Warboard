// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZEjJ7ih6iiudVBc4l0yUIM5_s9VK7DAw",
  authDomain: "warboard-ed70b.firebaseapp.com",
  projectId: "warboard-ed70b",
  storageBucket: "warboard-ed70b.appspot.com",
  messagingSenderId: "188611051944",
  appId: "1:188611051944:web:d0b9ef411ea20eef66dd9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
