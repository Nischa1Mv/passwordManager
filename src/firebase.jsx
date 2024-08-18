import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "password-manager-30ac1.firebaseapp.com",
  projectId: "password-manager-30ac1",
  storageBucket: "password-manager-30ac1.appspot.com",
  messagingSenderId: "402909017835",
  appId: "1:402909017835:web:1f4b1492a0fb5f4822f0ae",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, app, auth };
