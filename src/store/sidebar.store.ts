import { create } from "zustand";

interface State {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useSidebar = create<State>()((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
