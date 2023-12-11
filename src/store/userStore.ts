import { fetchUserType } from "@/db/queries/getUser";
import { create } from "zustand";

type UserStore = {
  user: fetchUserType;
  setUser: (user: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser: fetchUserType) => set({ user: newUser }),
}));

export const selectUser = (state: UserStore) => state.user;
export const selectSetUser = (state: UserStore) => state.setUser;
