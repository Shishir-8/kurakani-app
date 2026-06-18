import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  loading: false,

  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
}));