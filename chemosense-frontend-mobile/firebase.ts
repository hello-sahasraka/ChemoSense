import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvNfEstukksY--T5fEXxr5Hu26CplCe0c",
  authDomain: "chemosense-b421d.firebaseapp.com",
  projectId: "chemosense-b421d",
  storageBucket: "chemosense-b421d.firebasestorage.app",
  messagingSenderId: "612952232003",
  appId: "1:612952232003:web:05955ef7a396cddaad04f6"
};

const app = initializeApp(firebaseConfig);

// 🔐 Authentication service
const auth = getAuth(app);

// 🔥 Firestore database service
const db = getFirestore(app);

export { auth, db };
