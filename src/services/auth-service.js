import toast from "react-hot-toast";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email, password, fullName) => {

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      fullName,
      email: user.email,
    });
    return user;
};

export const loginuser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res
};

export const logoutUser = async () => {
    await signOut(auth)
}
