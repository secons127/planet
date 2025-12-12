import React from 'react';
import { plants } from '../../data/plants';
import { PlantCard } from '../../components/PlantCard';
import { Plant } from '../../types/plant';

export const PlantList: React.FC = () => {
    const handlePlantClick = (plant: Plant) => {
        alert(`${plant.name} 선택! (상세 보기 기능 준비 중)`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">📖 식물 사전</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plants.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} onClick={handlePlantClick} />
                ))}
            </div>
        </div>
    );
};
