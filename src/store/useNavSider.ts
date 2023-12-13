import { create } from "zustand";

export type NavItemType = {
  key: string;
  title: string;
  url: string;
  icon: string;
  seeRoles: string;
};
interface NavSiderStore {
  navSider: boolean;
  navItem: NavItemType;
  setNavSider: (navSider: boolean) => void;
  setNavItem: (navItem: NavItemType) => void;
}

export const useNavSiderStore = create<NavSiderStore>((set) => ({
  navSider: false,
  navItem: {
    key: "",
    title: "",
    url: "",
    icon: "",
    seeRoles: "",
  },
  setNavSider: (navSider: boolean) => set({ navSider }),
  setNavItem: (navItem: NavItemType) => set({ navItem }),
}));

export const selectNavSider = (state: NavSiderStore) => state.navSider;
export const selectSetNavSider = (state: NavSiderStore) => state.setNavSider;
export const selectNavItem = (state: NavSiderStore) => state.navItem;
export const selectSetNavItem = (state: NavSiderStore) => state.setNavItem;
