import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const CustomizationPanel: React.FC = () => {
    const { customization, setCustomization } = useGameStore();

    const backgrounds = [
        { id: 'living-room', name: '거실', color: 'from-gray-100 to-gray-200' },
        { id: 'veranda', name: '베란다', color: 'from-blue-50 to-blue-100' },
        { id: 'forest', name: '🌲 숲', color: 'from-green-800 to-green-600' },
        { id: 'desert', name: '🌵 사막', color: 'from-orange-200 to-yellow-100' },
        { id: 'office', name: '사무실', color: 'from-slate-200 to-slate-300' },
    ];

    const pots = [
        { id: 'terracotta', name: '토기', color: 'bg-orange-700' },
        { id: 'ceramic', name: '세라믹 (흰색)', color: 'bg-white border-2 border-gray-200' },
        { id: 'plastic', name: '플라스틱 (검정)', color: 'bg-gray-800' },
        { id: 'glass', name: '유리병', color: 'bg-blue-200/50 backdrop-blur' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800">🎨 꾸미기</h3>

            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-600 mb-2">배경 선택</label>
                <div className="grid grid-cols-2 gap-2">
                    {backgrounds.map(bg => (
                        <button
                            key={bg.id}
                            onClick={() => setCustomization('background', bg.id)}
                            className={`p-2 rounded-lg text-sm font-medium transition-all ${customization.background === bg.id
                                    ? 'ring-2 ring-green-500 bg-green-50 text-green-700'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {bg.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">화분 선택</label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {pots.map(pot => (
                        <button
                            key={pot.id}
                            onClick={() => setCustomization('pot', pot.id)}
                            className={`flex flex-col items-center gap-1 group min-w-[60px]`}
                        >
                            <div className={`w-10 h-10 rounded-b-xl rounded-t-sm shadow-sm transition-transform group-hover:-translate-y-1 ${pot.color} ${customization.pot === pot.id ? 'ring-2 ring-offset-2 ring-green-500' : ''
                                }`}></div>
                            <span className={`text-xs ${customization.pot === pot.id ? 'font-bold text-green-700' : 'text-gray-500'}`}>
                                {pot.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
