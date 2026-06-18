import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      selectedUser: null,

      setSelectedUser: (user) =>
        set({ selectedUser: user }),

      clearSelectedUser: () =>
        set({ selectedUser: null }),
    }),
    {
      name: "chat-store",
    }
  )
);