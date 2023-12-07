import { create } from "zustand";

type UserStore = {
  user: any;
  setUser: (user: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "Enes",
    email: "",
    photoURL: "",
    uid: "",
  },
  setUser: (newUser: any) => set({ user: newUser }),
}));

export const selectUser = (state: UserStore) => state.user;
export const selectSetUser = (state: UserStore) => state.setUser;
