import { create } from 'zustand';

export type WorldView = 'collectors' | 'corporates';

interface HeroState {
  currentWorld: WorldView;
  isFlipping: boolean;
  toggleWorld: () => void;
  setFlipping: (flipping: boolean) => void;
}

export const useHeroStore = create<HeroState>((set) => ({
  currentWorld: 'collectors',
  isFlipping: false,
  toggleWorld: () => set((state) => ({ 
    currentWorld: state.currentWorld === 'collectors' ? 'corporates' : 'collectors',
    isFlipping: true 
  })),
  setFlipping: (flipping: boolean) => set({ isFlipping: flipping }),
}));
