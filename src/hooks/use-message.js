import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getChatId } from "../lib/chat-utils";

export const useMessages = (uid1, uid2) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!uid1 || !uid2) return;

    const chatId = getChatId(uid1, uid2);

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub()
  }, [uid1, uid2]);

  return messages;
};