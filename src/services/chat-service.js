import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getChatId } from "../lib/chat-utils";

export const sendMessage = async (senderId, receiverId, text) => {
  const chatId = getChatId(senderId, receiverId);

  await setDoc(
    doc(db, "chats", chatId),
    {
      participants: [senderId, receiverId],
      updatedAt: serverTimestamp(),
      lastMessage: text,
    },
    { merge: true }
  );

  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId,
    createdAt: serverTimestamp(),
  });
};