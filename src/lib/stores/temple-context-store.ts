import { create } from 'zustand';

interface TempleContextState {
  selectedTempleId: number | null;
  setSelectedTempleId: (id: number | null) => void;
}

export const useTempleContextStore = create<TempleContextState>((set) => ({
  selectedTempleId: null,
  setSelectedTempleId: (id) => set({ selectedTempleId: id }),
}));
