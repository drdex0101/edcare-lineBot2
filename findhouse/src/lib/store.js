import { create } from 'zustand';

const useStore = create((set) => ({
  item: null,
  setItem: (newItem) => set({ item: newItem }),
}));

export default useStore;
