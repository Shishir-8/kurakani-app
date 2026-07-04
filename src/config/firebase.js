import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCQrrbrVOgvk22oIiW0q2tED1mFtMSNArY",  // this is not production app so env is in app 
  authDomain: "kurakani-chat-app-7fd35.firebaseapp.com",
  projectId: "kurakani-chat-app-7fd35",
  storageBucket: "kurakani-chat-app-7fd35.firebasestorage.app",
  messagingSenderId: "88871017625",
  appId: "1:88871017625:web:cb4ce18593363fa0aa2c08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)


const provider = new GoogleAuthProvider()

export const signInwithGoogle = () => {
  return signInWithPopup(auth, provider)
}

