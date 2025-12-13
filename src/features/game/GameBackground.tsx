import React from 'react';

import { Weather } from '../../store/gameStore';

interface GameBackgroundProps {
    type: string;
    weather?: Weather;
}

const WeatherOverlay: React.FC<{ weather?: Weather }> = ({ weather }) => {
    if (!weather || weather === 'sunny') return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            {weather === 'rainy' && (
                <div className="absolute inset-0 bg-blue-900/20">
                    {/* Rain drops animation */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-blue-400/60 w-0.5 h-6 rounded-full animate-[fall_1s_linear_infinite]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                animationDelay: `${Math.random()}s`,
                                animationDuration: `${0.5 + Math.random() * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}
            {weather === 'cloudy' && (
                <div className="absolute inset-0 bg-gray-900/10">
                    {/* Clouds */}
                    <div className="absolute top-10 left-10 text-6xl opacity-40 animate-[drift_20s_linear_infinite]">☁️</div>
                    <div className="absolute top-20 right-20 text-6xl opacity-30 animate-[drift_25s_linear_infinite_reverse]">☁️</div>
                </div>
            )}
            <style>{`
                @keyframes fall {
                    to { transform: translateY(100vh); }
                }
                @keyframes drift {
                    0% { transform: translateX(0); }
                    50% { transform: translateX(20px); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export const GameBackground: React.FC<GameBackgroundProps> = ({ type, weather }) => {
    // Forest: Deep greens, trees visuals (SVG)
    if (type === 'forest') {
        return (
            <div className="absolute inset-0 bg-[#0c1e15] overflow-hidden">
                <WeatherOverlay weather={weather} />
                {/* Sky */}
                <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${weather === 'rainy' ? 'from-[#0d1f16] to-[#040f09]' : 'from-[#1a472a] to-[#0d2e1c]'}`} />

                {/* Background Trees (SVG) */}
                <svg className="absolute bottom-0 left-0 w-full h-[60%] opacity-40" preserveAspectRatio="none">
                    <path d="M0,300 L50,150 L100,300 M80,300 L130,120 L180,300 M150,300 L200,180 L250,300 M230,300 L280,140 L330,300 M300,300 L350,160 L400,300
                             M400,300 L450,130 L500,300 M480,300 L530,150 L580,300 M550,300 L600,170 L650,300 M630,300 L680,140 L730,300 M700,300 L750,160 L800,300
                             M800,300 L850,120 L900,300 M880,300 L930,150 L980,300 M950,300 L1000,180 L1050,300 M1030,300 L1080,140 L1130,300 M1100,300 L1150,160 L1200,300"
                        fill="#0f3d24" />
                </svg>

                {/* Foreground Trees (SVG) */}
                <svg className="absolute bottom-0 left-0 w-full h-[50%] opacity-90" preserveAspectRatio="none">
                    <path d="M-20,400 L50,100 L120,400 M100,400 L180,80 L260,400 M240,400 L320,120 L400,400 M380,400 L460,90 L540,400
                             M520,400 L600,110 L680,400 M660,400 L740,80 L820,400 M800,400 L880,100 L960,400 M940,400 L1020,120 L1100,400 M1080,400 L1160,90 L1240,400"
                        fill="#145231" />
                </svg>

                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#0a2615]" />

                {/* Fireflies (Only if not raining) */}
                {weather !== 'rainy' && (
                    <>
                        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_orange]" style={{ animationDuration: '3s' }} />
                        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-pulse delay-75 shadow-[0_0_8px_white]" style={{ animationDuration: '4s' }} />
                        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-150 shadow-[0_0_8px_lightgreen]" style={{ animationDuration: '2.5s' }} />
                    </>
                )}
            </div>
        );
    }

    // Desert: Warm gradients, dunes, sun
    if (type === 'desert') {
        const isRain = weather === 'rainy';
        return (
            <div className={`absolute inset-0 overflow-hidden transition-colors duration-1000 ${isRain ? 'bg-[#c4a48e]' : 'bg-[#ffdcb6]'}`}>
                <WeatherOverlay weather={weather} />

                {/* Sky */}
                <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isRain ? 'from-[#8c7b6f] via-[#c4a48e] to-[#a68c78]' : 'from-[#ff8c61] via-[#ffdcb6] to-[#e6c6a8]'}`} />

                {/* Sun (Hidden if raining) */}
                {!isRain && (
                    <div className="absolute top-10 right-10 w-24 h-24 bg-orange-500 rounded-full shadow-[0_0_60px_rgba(255,140,0,0.8)] animate-[pulse_4s_infinite]" />
                )}

                {/* Dunes (SVG) */}
                <svg className="absolute bottom-0 left-0 w-full h-[40%] text-[#d4a373]" preserveAspectRatio="none">
                    <path d="M0,200 C150,150 300,250 500,180 C700,110 900,220 1200,180 V400 H0 Z" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-full h-[30%] text-[#e8b688] opacity-90" preserveAspectRatio="none">
                    <path d="M0,300 C200,280 400,200 600,250 C800,300 1000,220 1200,280 V400 H0 Z" fill="currentColor" />
                </svg>

                {/* Cactus silhouette */}
                <svg className="absolute bottom-10 left-10 w-20 h-40 text-[#8c6239] opacity-70" viewBox="0 0 100 200">
                    <path d="M45,0 C45,0 55,0 55,10 V100 H60 C70,100 70,80 70,80 V60 C70,55 75,50 80,50 C85,50 90,55 90,60 V90 C90,110 80,120 60,120 H55 V200 H45 V140 H40 C20,140 10,130 10,110 V80 C10,75 15,70 20,70 C25,70 30,75 30,80 V110 C30,120 35,120 40,120 H45 V0 Z" fill="currentColor" />
                </svg>
            </div>
        );
    }

    // Veranda: Windows, tiles
    if (type === 'veranda') {
        return (
            <div className="absolute inset-0 bg-blue-50 overflow-hidden">
                {/* Wall */}
                <div className="absolute inset-0 bg-blue-50" />

                {/* Window Frame */}
                <div className="absolute top-10 left-10 right-10 bottom-40 border-8 border-white bg-sky-200/30 overflow-hidden">
                    {/* Clouds */}
                    <div className="absolute top-4 left-10 w-16 h-8 bg-white/60 rounded-full blur-sm" />
                    <div className="absolute top-12 right-20 w-24 h-10 bg-white/40 rounded-full blur-sm" />
                    {/* Window Bars */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-white" />
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-white" />
                </div>

                {/* Floor (Tiles) */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#e5e7eb] flex flex-wrap gap-[1px] p-[1px] content-start overflow-hidden opacity-50"
                    style={{ backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }}>
                </div>
            </div>
        );
    }

    // Office: Clean, modern, blinds
    if (type === 'office') {
        return (
            <div className="absolute inset-0 bg-slate-100 overflow-hidden">
                {/* Wall */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-100" />

                {/* Blinds Shadow */}
                <div className="absolute inset-0 flex flex-col gap-4 opacity-10 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-full h-2 bg-black blur-sm" />
                    ))}
                </div>

                {/* Desk edge */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-white border-t-8 border-slate-300 shadow-xl" />
            </div>
        );
    }

    // Default: Living Room
    return (
        <div className="absolute inset-0 bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
            {/* Wallpaper pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#d1c4b7]" />
            <div className="absolute bottom-32 left-0 right-0 h-2 bg-[#bfaea0]" /> {/* Baseboard */}
        </div>
    );
};
