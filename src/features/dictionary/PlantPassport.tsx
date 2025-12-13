import React from 'react';
import { Plant } from '../../types/plant';
import { X, MapPin, Droplets, Sun, Thermometer, BookOpen } from 'lucide-react';

interface PlantPassportProps {
    plant: Plant;
    onClose: () => void;
}

export const PlantPassport: React.FC<PlantPassportProps> = ({ plant, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#fdfbf7] rounded-lg shadow-2xl w-full max-w-lg overflow-hidden border-2 border-[#e5e7eb] relative">
                {/* Passport Header Pattern */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-700 via-green-500 to-green-700"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mb-2 shadow-lg">
                            <span className="text-2xl">🌿</span>
                        </div>
                        <h2 className="text-xl font-serif text-green-900 tracking-wider font-bold">PLANT PASSPORT</h2>
                        <span className="text-xs text-green-700 tracking-[0.2em] mt-1">식물 등록증</span>
                    </div>

                    <div className="flex gap-6 mb-6">
                        {/* Photo Area */}
                        <div className="w-1/3 flex flex-col gap-2">
                            <div className="aspect-[3/4] bg-gray-100 rounded border border-gray-300 overflow-hidden shadow-inner relative group">
                                <img
                                    src={plant.imageUrl}
                                    alt={plant.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="text-center">
                                <span className={`inline-block px-2 py-0.5 text-xs font-bold text-white rounded-full ${plant.difficulty === 'Easy' ? 'bg-blue-500' :
                                        plant.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}>
                                    {plant.difficulty.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Basic Info Area */}
                        <div className="w-2/3 flex flex-col justify-center space-y-3">
                            <div>
                                <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Name / 이름</label>
                                <p className="font-bold text-lg text-gray-900">{plant.name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Scientific Name / 학명</label>
                                <p className="italic text-green-800 font-serif">{plant.scientificName}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Family / 과</label>
                                <p className="text-sm text-gray-700">{plant.botanicalFamily || 'Unknown'}</p>
                            </div>
                            <div>
                                <label className="text-[10px] text-gray-500 uppercase tracking-wider block">Origin / 원산지</label>
                                <div className="flex items-center gap-1 text-sm text-gray-700">
                                    <MapPin size={14} className="text-red-500" />
                                    <span>{plant.origin || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6 bg-green-50/50 p-4 rounded-lg border border-green-100/50">
                        <div className="flex flex-col items-center text-center p-2">
                            <Droplets size={20} className="text-blue-500 mb-1" />
                            <span className="text-[10px] text-gray-500">Water</span>
                            <span className="text-xs font-medium text-gray-700 leading-tight mt-1">{plant.waterFrequency}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2 border-l border-green-100">
                            <Sun size={20} className="text-orange-500 mb-1" />
                            <span className="text-[10px] text-gray-500">Light</span>
                            <span className="text-xs font-medium text-gray-700 leading-tight mt-1">{plant.sunlight}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-2 border-l border-green-100">
                            <Thermometer size={20} className="text-red-500 mb-1" />
                            <span className="text-[10px] text-gray-500">Temp</span>
                            <span className="text-xs font-medium text-gray-700 leading-tight mt-1">{plant.temperature}</span>
                        </div>
                    </div>

                    {/* Care Guide */}
                    {plant.careGuide && (
                        <div className="bg-white p-4 rounded border border-dashed border-gray-300 relative">
                            <div className="absolute -top-3 left-4 bg-[#fdfbf7] px-2 flex items-center gap-1 text-green-800 text-sm font-bold">
                                <BookOpen size={14} />
                                <span>Care Guide</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {plant.careGuide}
                            </p>
                        </div>
                    )}

                    {/* Footer Stamps */}
                    <div className="mt-6 flex justify-between items-end opacity-40">
                        <div className="border-2 border-green-800 rounded-full w-12 h-12 flex items-center justify-center rotate-[-12deg]">
                            <span className="text-[8px] text-green-800 font-bold uppercase text-center leading-none">Planet<br />Verified</span>
                        </div>
                        <div className="text-[8px] font-mono text-gray-400">
                            ID: {plant.id.padStart(8, '0')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
