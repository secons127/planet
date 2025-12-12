import React from 'react';
import { Plant } from '../types/plant';

interface PlantCardProps {
    plant: Plant;
    onClick?: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-green-50"
            onClick={() => onClick?.(plant)}
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{plant.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${plant.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            plant.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        {plant.difficulty}
                    </span>
                </div>
                <p className="text-sm text-gray-500 italic mb-2">{plant.scientificName}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{plant.description}</p>
            </div>
        </div>
    );
};
