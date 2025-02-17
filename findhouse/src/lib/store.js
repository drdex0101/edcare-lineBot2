import { create } from 'zustand';

const useStore = create((set) => ({
  item: null,
  setItem: (newItem) => set({ item: newItem }),
  nannyInfo: null, // Add the new state
  setNannyInfo: (newNannyInfo) => set({ nannyInfo: newNannyInfo }), 
}));

export default useStore;
