import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { plants } from '../../data/plants';

interface GameViewProps {
    onNavigate?: (view: 'Chat') => void;
}

export const GameView: React.FC<GameViewProps> = ({ onNavigate }) => {
    const {
        level, exp, maxExp, waterLevel, affection, environmentLevel,
        fertilizerCount, waterPlant, fertilizePlant, tick
    } = useGameStore();

    const [feedback, setFeedback] = useState<{ msg: string, id: number }[]>([]);

    // Mock taking care of the first plant
    const currentPlant = plants[0]; // Monstera

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 5000); // Decrease water every 5 seconds
        return () => clearInterval(timer);
    }, [tick]);

    const showFeedback = (msg: string) => {
        const id = Date.now();
        setFeedback(prev => [...prev, { msg, id }]);
        setTimeout(() => {
            setFeedback(prev => prev.filter(f => f.id !== id));
        }, 2000);
    };

    const handleWater = () => {
        if (waterLevel >= 100) return;
        waterPlant();
        showFeedback("💧 물 주기 성공! (Exp +5)");
    };

    const handleFertilize = () => {
        if (fertilizerCount <= 0) {
            alert("영양제가 부족해요! (일일 제한 3회)");
            return;
        }
        fertilizePlant();
        showFeedback("💊 영양제 투여! 쑥쑥 자라라! (Exp +30)");
    };

    const getEnvironmentName = (envLevel: number) => {
        if (envLevel >= 4) return '대형 온실 (Greenhouse)';
        if (envLevel >= 3) return '비닐 하우스';
        if (envLevel >= 2) return '베란다 정원';
        return '일반 화분';
    };

    return (
        <div className="max-w-4xl mx-auto relative">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-800">🌱 나의 식물 키우기</h2>

            {/* HUD / Status Bar */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="text-sm text-gray-500">레벨</p>
                    <p className="text-xl font-bold">Lv. {level}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">환경</p>
                    <p className="text-lg font-bold text-green-600">{getEnvironmentName(environmentLevel)}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">성장치 ({exp}/{maxExp})</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (exp / maxExp) * 100)}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Plant Visual Area */}
                <div className="bg-green-50 p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] border-2 border-green-100 relative overflow-hidden">
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow text-sm border border-pink-100 text-pink-500 font-bold">
                        ❤️ 애정도: {affection}
                    </div>

                    <img
                        src={currentPlant.imageUrl}
                        alt="My Plant"
                        className={`transition-all duration-1000 border-4 border-white shadow-xl rounded-full object-cover
              ${level < 3 ? 'w-32 h-32' : level < 10 ? 'w-48 h-48' : 'w-64 h-64'}
              ${waterLevel < 20 ? 'filter grayscale brightness-75' : ''}
              ${waterLevel === 0 ? 'opacity-50' : ''}
            `}
                    />

                    {waterLevel < 30 && (
                        <div className="mt-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg animate-pulse font-bold">
                            💦 목 말라요!
                        </div>
                    )}

                    {/* Feedback Toast Area (Absolute in Plant Area) */}
                    <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center pointer-events-none">
                        {feedback.map(f => (
                            <div key={f.id} className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-full mb-2 animate-bounce shadow-lg z-20">
                                {f.msg}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls Area */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">관리하기</h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">수분</span>
                                <span className="text-sm text-gray-500">{waterLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-4 rounded-full transition-all duration-500 ${waterLevel < 30 ? 'bg-red-400' : 'bg-blue-400'}`}
                                    style={{ width: `${waterLevel}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={handleWater}
                                className={`text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 ${waterLevel >= 100 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200 shadow-lg'
                                    }`}
                                disabled={waterLevel >= 100}
                            >
                                <span>💧</span> 물 주기
                            </button>
                            <button
                                className={`text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 ${fertilizerCount <= 0 ? 'bg-yellow-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-200 shadow-lg'
                                    }`}
                                onClick={handleFertilize}
                            >
                                <span>💊</span> 영양제 ({fertilizerCount})
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 col-span-2 shadow-green-200 shadow-lg"
                                onClick={() => onNavigate?.('Chat')}
                            >
                                <span>💬</span> 대화하기 (AI)
                            </button>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                            <p>💡 <strong>Tip:</strong> 영양제는 하루에 3번만 줄 수 있어요. 물은 흙이 마를 때마다 주세요!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
