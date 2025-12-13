import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { plants } from '../../data/plants';
import { GrowthVisuals } from './GrowthVisuals';
import { CustomizationPanel } from './CustomizationPanel';
import { Search, Wind, Scissors, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

import { GameBackground } from './GameBackground';

interface GameViewProps {
    onNavigate?: (view: 'Chat') => void;
}

export const GameView: React.FC<GameViewProps> = ({ onNavigate }) => {
    const {
        level, exp, maxExp, waterLevel, affection,
        growthStage, soilCondition, healthCondition, ventilation, hygiene,
        customization, weather,
        waterPlant, fertilizePlant, fertilizerCount, tick,
        inspect, prunePlant, ventilate, wipeLeaves
    } = useGameStore();

    const [feedback, setFeedback] = useState<{ msg: string, id: number }[]>([]);
    const [showInspection, setShowInspection] = useState(false);
    const [showCustomization, setShowCustomization] = useState(false);

    // Mock taking care of the first plant
    const currentPlant = plants[0]; // Monstera

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 5000); // Game tick
        return () => clearInterval(timer);
    }, [tick]);

    const showFeedbackMsg = (msg: string) => {
        const id = Date.now();
        setFeedback(prev => [...prev, { msg, id }]);
        setTimeout(() => {
            setFeedback(prev => prev.filter(f => f.id !== id));
        }, 3000);
    };

    const handleWater = () => {
        if (waterLevel >= 100) return;
        waterPlant();
        showFeedbackMsg("💧 물 주기 성공! (Exp +5)");
    };

    const handleFertilize = () => {
        if (fertilizerCount <= 0) {
            alert("영양제가 부족해요! (일일 제한 3회)");
            return;
        }
        fertilizePlant();
        showFeedbackMsg("💊 영양제 투여! 쑥쑥 자라라! (Exp +30)");
    };

    const handleInspect = () => {
        setShowInspection(true);
    };

    // Advanced Actions
    const handleVentilate = () => {
        ventilate();
        showFeedbackMsg("🌬️ 창문을 열어 환기했어요! 통풍이 좋아졌어요.");
    };
    const handlePrune = () => {
        prunePlant();
        showFeedbackMsg("✂️ 가지치기를 했어요! 식물이 더 잘 자랄 거예요.");
    };
    const handleWipe = () => {
        wipeLeaves();
        showFeedbackMsg("✨ 잎을 닦아주었어요! 광합성이 더 잘 될 거예요.");
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
            {/* Left Col: Visuals */}
            <div className={`flex-1 rounded-3xl relative overflow-hidden shadow-2xl transition-all duration-1000 bg-gray-100`}>
                <GameBackground type={customization.background} weather={weather} />

                {/* Weather Overlay for Outdoors */}
                {(customization.background === 'forest' || customization.background === 'desert') && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg flex items-center gap-2">
                        <span className="text-2xl">
                            {weather === 'sunny' ? '☀️' : weather === 'rainy' ? '🌧️' : '☁️'}
                        </span>
                        <span className="font-bold text-gray-800 text-sm">
                            {weather === 'sunny' ? '맑음' : weather === 'rainy' ? '비' : '흐림'}
                        </span>
                    </div>
                )}

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                    <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                        <span className="font-bold text-gray-700">Lv.{level}</span>
                        <span className="text-sm text-gray-500 ml-2">{growthStage.toUpperCase()}</span>
                    </div>
                    <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                        <span>❤️</span>
                        <span className="font-bold text-pink-500">{affection}</span>
                    </div>
                </div>

                {/* Progress Bar Overlay */}
                <div className="absolute top-16 left-4 right-4 z-10">
                    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${(exp / maxExp) * 100}%` }}></div>
                    </div>
                </div>

                {/* Main Plant Visual */}
                <div className={`absolute inset-0 flex justify-center transition-all duration-1000 ${['forest', 'desert'].includes(customization.background) ? 'items-end pb-20' : 'items-center p-12'}`}>
                    <GrowthVisuals stage={growthStage} plantImage={currentPlant.imageUrl} />

                    {/* Dynamic Pot - Only show if Indoors */}
                    {growthStage !== 'seed' && !['forest', 'desert'].includes(customization.background) && (
                        <div className={`absolute bottom-12 w-32 h-24 rounded-b-2xl shadow-lg border-t-8 border-black/5 ${customization.pot === 'terracotta' ? 'bg-orange-700' :
                            customization.pot === 'plastic' ? 'bg-gray-800' :
                                customization.pot === 'glass' ? 'bg-blue-300/40 backdrop-blur border border-white/50' :
                                    'bg-white'
                            }`}></div>
                    )}
                </div>

                {/* Feedback Toast */}
                <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none p-4">
                    {feedback.map(f => (
                        <div key={f.id} className="bg-black/80 text-white px-6 py-2 rounded-full mb-2 animate-bounce shadow-lg text-sm z-20">
                            {f.msg}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Col: Controls */}
            <div className="lg:w-96 flex flex-col gap-6">

                {/* Status Dashboard */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="text-green-600">📊</span> 식물 상태
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">수분 (Soil Moisture)</span>
                                <span className={waterLevel < 30 ? 'text-red-500 font-bold' : 'text-blue-500'}>{waterLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className={`h-2 rounded-full ${waterLevel < 30 ? 'bg-red-400' : 'bg-blue-400'}`} style={{ width: `${waterLevel}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">통풍 (Ventilation)</span>
                                <span className={ventilation < 30 ? 'text-red-500 font-bold' : 'text-cyan-500'}>{Math.round(ventilation)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className={`h-2 rounded-full ${ventilation < 30 ? 'bg-red-400' : 'bg-cyan-400'}`} style={{ width: `${ventilation}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">위생 (Leaves Cleanliness)</span>
                                <span className={hygiene < 50 ? 'text-red-500 font-bold' : 'text-green-500'}>{Math.round(hygiene)}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className={`h-2 rounded-full ${hygiene < 50 ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: `${hygiene}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleInspect}
                        className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-violet-100 text-violet-700 rounded-xl hover:bg-violet-200 transition-colors font-bold"
                    >
                        <Search size={18} />
                        🔍 정밀 검사하기
                    </button>
                </div>

                {/* Actions Grid */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">관리하기</h3>
                        <button
                            onClick={() => setShowCustomization(!showCustomization)}
                            className="text-xs text-gray-500 underline"
                        >
                            {showCustomization ? '닫기' : '꾸미기'}
                        </button>
                    </div>

                    {showCustomization ? (
                        <CustomizationPanel />
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleWater} disabled={waterLevel >= 100} className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all ${waterLevel >= 100 ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                                <span className="text-2xl">💧</span>
                                <span>물 주기</span>
                            </button>

                            <button onClick={handleFertilize} className="p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-bold bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-all">
                                <span className="text-2xl">💊</span>
                                <span>영양제 ({fertilizerCount})</span>
                            </button>

                            <button
                                onClick={handleVentilate}
                                disabled={['forest', 'desert'].includes(customization.background)}
                                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all ${['forest', 'desert'].includes(customization.background)
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100'
                                    }`}
                            >
                                <Wind size={24} />
                                <span>{['forest', 'desert'].includes(customization.background) ? '야외 (통풍됨)' : '환기하기'}</span>
                            </button>

                            <button
                                onClick={handlePrune}
                                disabled={['seed', 'sprout'].includes(growthStage)}
                                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all ${['seed', 'sprout'].includes(growthStage)
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                    }`}
                            >
                                <Scissors size={24} />
                                <span>{['seed', 'sprout'].includes(growthStage) ? '아직 어림' : '가지치기'}</span>
                            </button>

                            <button
                                onClick={handleWipe}
                                disabled={growthStage === 'seed'}
                                className={`p-4 rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all ${growthStage === 'seed'
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                                    }`}
                            >
                                <Sparkles size={24} />
                                <span>{growthStage === 'seed' ? '잎 없음' : '잎 닦기'}</span>
                            </button>

                            <button
                                onClick={() => onNavigate?.('Chat')}
                                className="col-span-2 p-4 mt-2 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200"
                            >
                                💬 식물과 대화하기
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Inspection Modal */}
            {showInspection && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            🔍 정밀 진단 리포트
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-xl mb-6 whitespace-pre-line text-gray-700 leading-relaxed min-h-[100px] border border-gray-200">
                            {inspect()}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className={`p-3 rounded-lg border flex flex-col items-center ${soilCondition === 'wet' || soilCondition === 'dry' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                                <AlertTriangle className={soilCondition === 'wet' || soilCondition === 'dry' ? 'text-red-500 mb-2' : 'hidden'} size={20} />
                                <CheckCircle className={!(soilCondition === 'wet' || soilCondition === 'dry') ? 'text-green-500 mb-2' : 'hidden'} size={20} />
                                <span className="text-xs text-gray-500 uppercase font-bold">Soil</span>
                                <span className="font-bold">{soilCondition.toUpperCase()}</span>
                            </div>
                            <div className={`p-3 rounded-lg border flex flex-col items-center ${healthCondition === 'healthy' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                <CheckCircle className={healthCondition === 'healthy' ? 'text-green-500 mb-2' : 'hidden'} size={20} />
                                <AlertTriangle className={healthCondition !== 'healthy' ? 'text-red-500 mb-2' : 'hidden'} size={20} />
                                <span className="text-xs text-gray-500 uppercase font-bold">Health</span>
                                <span className="font-bold">{healthCondition.toUpperCase()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInspection(false)}
                            className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

