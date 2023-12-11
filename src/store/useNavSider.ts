import { create } from "zustand";

interface NavSiderStore {
  navSider: boolean;
  setNavSider: (navSider: boolean) => void;
}

export const useNavSiderStore = create<NavSiderStore>((set) => ({
  navSider: false,
  setNavSider: (navSider: boolean) => set({ navSider }),
}));

export const selectNavSider = (state: NavSiderStore) => state.navSider;
export const selectSetNavSider = (state: NavSiderStore) => state.setNavSider;
