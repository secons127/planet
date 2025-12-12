import { create } from 'zustand';

interface GameState {
    level: number;
    exp: number;
    maxExp: number;
    waterLevel: number; // 0-100
    affection: number; // 0-100
    environmentLevel: number; // 1: Pot, 2: Veranda, 3: Vinyl House, 4: Greenhouse
    fertilizerCount: number;

    // Actions
    addExp: (amount: number) => void;
    waterPlant: () => void;
    fertilizePlant: () => void;
    talkToPlant: () => void;
    tick: () => void; // Call periodically
}

export const useGameStore = create<GameState>((set) => ({
    level: 1,
    exp: 0,
    maxExp: 100,
    waterLevel: 50,
    affection: 0,
    environmentLevel: 1,
    fertilizerCount: 3,

    addExp: (amount) => set((state) => {
        const newExp = state.exp + amount;
        if (newExp >= state.maxExp) {
            return {
                level: state.level + 1,
                exp: newExp - state.maxExp,
                maxExp: Math.floor(state.maxExp * 1.5),
                environmentLevel: state.level + 1 === 10 ? 2 : (state.level + 1 === 30 ? 3 : (state.level + 1 === 50 ? 4 : state.environmentLevel))
            };
        }
        return { exp: newExp };
    }),

    waterPlant: () => set((state) => ({
        waterLevel: Math.min(100, state.waterLevel + 30),
        affection: Math.min(100, state.affection + 2),
        exp: state.exp + 5 >= state.maxExp ? 0 : state.exp + 5 // Small exp for watering
    })),

    fertilizePlant: () => set((state) => {
        if (state.fertilizerCount <= 0) return {};
        return {
            fertilizerCount: state.fertilizerCount - 1,
            exp: state.exp + 30 >= state.maxExp ? 0 : state.exp + 30, // Big exp boost
            affection: Math.min(100, state.affection + 5)
        };
    }),

    talkToPlant: () => set((state) => ({
        affection: Math.min(100, state.affection + 10),
        exp: state.exp + 5 >= state.maxExp ? 0 : state.exp + 5
    })),

    tick: () => set((state) => ({
        waterLevel: Math.max(0, state.waterLevel - 1)
    }))
}));
