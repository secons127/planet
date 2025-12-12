export interface Plant {
    id: string;
    name: string;
    scientificName?: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    waterFrequency: string; // e.g., "Every 3-4 days"
    sunlight: string; // e.g., "Partial Shade"
    temperature: string; // e.g., "18-24°C"
    imageUrl: string;
    // Game stats
    baseHealth: number;
    growthRate: number;
}
