import { create } from 'zustand';

// Types
export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'mature';
export type SoilCondition = 'dry' | 'moist' | 'wet' | 'nutrient-deficient';
export type HealthCondition = 'healthy' | 'pest-infested' | 'root-rot' | 'withered';
export type Weather = 'sunny' | 'rainy' | 'cloudy';

interface GameState {
    level: number;
    exp: number;
    maxExp: number;

    // Basic Stats
    waterLevel: number; // 0-100
    affection: number; // 0-100
    environmentLevel: number; // 1: Pot, 2: Veranda, 3: Vinyl House, 4: Greenhouse
    fertilizerCount: number;

    // Advanced Stats
    growthStage: GrowthStage;
    soilCondition: SoilCondition;
    healthCondition: HealthCondition;
    ventilation: number; // 0-100
    hygiene: number; // 0-100 (Cleanliness of leaves)
    weather: Weather; // Current weather condition

    // Customization
    customization: {
        background: string;
        pot: string;
    };

    // Actions
    addExp: (amount: number) => void;
    waterPlant: () => void;
    fertilizePlant: () => void;
    talkToPlant: () => void;

    // Advanced Actions
    inspect: () => string; // Returns inspection result message
    prunePlant: () => void;
    ventilate: () => void;
    wipeLeaves: () => void;
    setCustomization: (type: 'background' | 'pot', value: string) => void;

    tick: () => void; // Call periodically
}

export const useGameStore = create<GameState>((set, get) => ({
    level: 1,
    exp: 0,
    maxExp: 100,
    waterLevel: 50,
    affection: 0,
    environmentLevel: 1, // Represents size/type of environment
    fertilizerCount: 3,

    // Initial Advanced State
    growthStage: 'seed',
    soilCondition: 'moist',
    healthCondition: 'healthy',
    ventilation: 80,
    hygiene: 100,
    weather: 'sunny',
    customization: {
        background: 'living-room',
        pot: 'terracotta'
    },

    addExp: (amount) => set((state) => {
        const newExp = state.exp + amount;
        if (newExp >= state.maxExp) {
            // Level Up Logic
            const nextLevel = Number(state.level) + 1; // Ensure number type
            let nextStage = state.growthStage;

            // Evolve based on 3-level intervals
            if (nextLevel >= 4 && nextLevel < 7) nextStage = 'sprout';
            if (nextLevel >= 7 && nextLevel < 10) nextStage = 'growing';
            if (nextLevel >= 10) nextStage = 'mature';

            return {
                level: nextLevel,
                exp: newExp - state.maxExp,
                maxExp: Math.floor(state.maxExp * 1.5),
                growthStage: nextStage,
                environmentLevel: nextLevel >= 10 ? 2 : (nextLevel >= 30 ? 3 : state.environmentLevel)
            };
        }
        return { exp: newExp };
    }),

    waterPlant: () => {
        const state = useGameStore.getState();
        const newWaterLevel = Math.min(100, state.waterLevel + 30);
        let newSoil: SoilCondition = 'moist';
        if (newWaterLevel > 90) newSoil = 'wet'; // Overwatering risk

        useGameStore.setState({
            waterLevel: newWaterLevel,
            soilCondition: newSoil,
            affection: Math.min(100, state.affection + 2)
        });
        state.addExp(5);
    },

    fertilizePlant: () => {
        const state = useGameStore.getState();
        if (state.fertilizerCount <= 0) return;

        // Logic: Cure status if sick, else Double XP
        let newHealth = state.healthCondition;
        let earnedExp = 0;

        if (state.healthCondition !== 'healthy') {
            newHealth = 'healthy'; // Cure
        } else {
            earnedExp = 60; // Double XP (Standard was 30)
        }

        useGameStore.setState({
            fertilizerCount: state.fertilizerCount - 1,
            healthCondition: newHealth,
            soilCondition: 'moist',
            affection: Math.min(100, state.affection + 5)
        });
        state.addExp(earnedExp);
    },

    talkToPlant: () => {
        const state = useGameStore.getState();
        useGameStore.setState({
            affection: Math.min(100, state.affection + 10)
        });
        state.addExp(5);
    },

    // Advanced Actions Impl
    inspect: () => {
        const s = get();
        let msg = `[상태 검사 결과]\n`;

        // Weather check
        if (s.customization.background === 'forest' || s.customization.background === 'desert') {
            const w = s.weather === 'sunny' ? '☀️ 맑음' : s.weather === 'rainy' ? '🌧️ 비' : '☁️ 흐림';
            msg += `🌤️ 현재 날씨: ${w}\n`;
        }

        // Soil check
        if (s.waterLevel < 20) {
            msg += `🔍 흙이 바싹 말라있어요. (건조)\n`;
        } else if (s.waterLevel > 90) {
            msg += `🔍 흙이 축축해서 뿌리가 숨쉬기 힘들어요. (과습 주의)\n`;
        } else {
            msg += `🔍 흙 상태가 아주 좋아요.\n`;
        }

        // Environment check
        if (s.ventilation < 30) msg += `🌬️ 통풍이 필요해요! 공기가 답답해요.\n`;
        if (s.hygiene < 50) msg += `🍂 잎에 먼지가 많이 쌓였어요. 닦아주세요.\n`;

        // Health check
        if (s.healthCondition === 'pest-infested') msg += `🐛 앗! 잎 뒤에 벌레가 숨어있어요! (해충)\n`;
        else if (s.healthCondition === 'root-rot') msg += `💧 뿌리가 썩고 있어요! 과습입니다! (뿌리파리/무름병)\n`;
        else if (s.healthCondition === 'healthy') msg += `✨ 식물이 아주 건강해 보입니다.\n`;

        return msg;
    },

    prunePlant: () => {
        const state = useGameStore.getState();
        useGameStore.setState({
            hygiene: Math.min(100, state.hygiene + 20)
        });
        state.addExp(15); // Pruning stimulates growth
    },

    ventilate: () => {
        const state = useGameStore.getState();
        useGameStore.setState({
            ventilation: 100,
            soilCondition: state.waterLevel > 80 ? 'moist' : state.soilCondition // Helps dry out wet soil
        });
        state.addExp(5);
    },

    // Weather change logic triggered by tick or event
    changeWeather: () => set(() => {
        const weathers: Weather[] = ['sunny', 'sunny', 'cloudy', 'rainy'];
        const nextWeather = weathers[Math.floor(Math.random() * weathers.length)];
        return { weather: nextWeather };
    }),

    wipeLeaves: () => set((state) => ({
        hygiene: 100,
        affection: Math.min(100, state.affection + 5)
    })),

    setCustomization: (type, value) => set((state) => ({
        customization: {
            ...state.customization,
            [type]: value
        }
    })),

    tick: () => set((state) => {
        // Base modifiers
        let waterDecayRate = 1.0;
        let hygieneDecayRate = 1.0;
        const currentBackground = state.customization.background;

        // Environment Modifiers
        if (currentBackground === 'forest') {
            hygieneDecayRate = 0.5; // Forest air is cleaner
        } else if (currentBackground === 'desert') {
            waterDecayRate = 2.0; // Desert heat dries water faster
        }

        // Weather Logic (Only outdoors)
        const isOutdoor = ['forest', 'desert'].includes(currentBackground);
        let currentWater = state.waterLevel;
        let currentVentilation = state.ventilation;
        let nextWeather = state.weather;

        if (isOutdoor) {
            // Outdoor ventilation is always good
            currentVentilation = 100;

            // Random weather change (1% chance per tick)
            if (Math.random() < 0.01) {
                const weathers: Weather[] = ['sunny', 'sunny', 'cloudy', 'rainy'];
                nextWeather = weathers[Math.floor(Math.random() * weathers.length)];
            }

            // Weather effects on modifiers
            if (state.weather === 'sunny') {
                // Sun dries faster (additive effect)
                currentWater = Math.max(0, currentWater - 1.5);
            } else if (state.weather === 'cloudy') {
                // Clouds reduce evaporation
                waterDecayRate *= 0.8;
            } else if (state.weather === 'rainy') {
                // Rain regenerates water and cleans leaves
                currentWater = Math.min(100, currentWater + 2.0);
                hygieneDecayRate = -5.0; // Negative decay = Regeneration (Wash leaves)
                waterDecayRate = 0; // No decay while raining
            }
        }

        // Apply Logic
        // Note: We use Math.max(0, ...) for decay, but if decayRate is negative (regen), we handle differently

        // Water
        if (waterDecayRate > 0) {
            currentWater = Math.max(0, currentWater - (1 * waterDecayRate));
        }

        // Hygiene (Regen if rate is negative, else decay)
        let newHygiene = state.hygiene;
        if (hygieneDecayRate < 0) {
            // Raining / Washing
            newHygiene = Math.min(100, state.hygiene + Math.abs(hygieneDecayRate));
        } else {
            newHygiene = Math.max(0, state.hygiene - (0.2 * hygieneDecayRate));
        }

        // Ventilation
        const newVentilation = isOutdoor ? 100 : Math.max(0, currentVentilation - 0.5);

        // Conditional Logic (Simulating dynamic health)
        let newHealth: HealthCondition = state.healthCondition;

        // Risk factors
        // Root Rot Logic: High water
        // If Raining and Water > 95, significantly increase root rot chance as requested
        if (currentWater > 95) {
            let rotChance = 0.05; // Base chance
            if (state.weather === 'rainy' && isOutdoor) rotChance = 0.2; // High risk in rain

            if ((newVentilation < 20 || isOutdoor) && Math.random() < rotChance) {
                newHealth = 'root-rot';
            }
        }

        if (newHygiene < 20 && newVentilation < 30 && Math.random() < 0.05) {
            newHealth = 'pest-infested'; // Dirty + Stale air = Pest probability
        }

        return {
            waterLevel: currentWater,
            ventilation: newVentilation,
            hygiene: newHygiene,
            healthCondition: newHealth,
            soilCondition: currentWater < 20 ? 'dry' : (currentWater > 90 ? 'wet' : 'moist'),
            weather: nextWeather
        };
    })
}));
