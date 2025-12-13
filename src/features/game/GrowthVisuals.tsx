import React from 'react';
import { GrowthStage } from '../../store/gameStore';

interface GrowthVisualsProps {
    stage: GrowthStage;
    plantImage: string; // The mature plant image
}

export const GrowthVisuals: React.FC<GrowthVisualsProps> = ({ stage, plantImage }) => {
    // Fallback visuals using Emojis and CSS animation

    if (stage === 'seed') {
        return (
            <div className="flex flex-col items-center justify-center animate-bounce">
                <div className="text-6xl filter drop-shadow-lg">🌱</div>
                <div className="mt-4 bg-amber-800/20 px-3 py-1 rounded-full text-xs font-bold text-amber-900">
                    씨앗 (Seed)
                </div>
            </div>
        );
    }

    if (stage === 'sprout') {
        return (
            <div className="flex flex-col items-center justify-center animate-pulse">
                <div className="text-8xl filter drop-shadow-lg transform origin-bottom hover:scale-110 transition-transform">🌱</div>
                <div className="mt-4 bg-green-800/20 px-3 py-1 rounded-full text-xs font-bold text-green-900">
                    새싹 (Sprout)
                </div>
            </div>
        );
    }

    if (stage === 'growing') {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="text-9xl filter drop-shadow-lg transform origin-bottom hover:rotate-3 transition-transform">🌿</div>
                <div className="mt-4 bg-green-600/20 px-3 py-1 rounded-full text-xs font-bold text-green-800">
                    성장기 (Growing)
                </div>
            </div>
        );
    }

    // Mature
    return (
        <div className="relative group">
            <img
                src={plantImage}
                alt="Mature Plant"
                className="w-64 h-64 object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-green-800/80 text-white px-2 py-1 rounded text-xs">다 자랐어요!</span>
            </div>
        </div>
    );
};
