import React, { useState } from 'react';
import { plants } from '../../data/plants';
import { PlantCard } from '../../components/PlantCard';
import { Plant } from '../../types/plant';
import { PlantPassport } from './PlantPassport';

export const PlantList: React.FC = () => {
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    const handlePlantClick = (plant: Plant) => {
        setSelectedPlant(plant);
    };

    // Group plants by difficulty
    const groupedPlants = {
        Easy: plants.filter(p => p.difficulty === 'Easy'),
        Medium: plants.filter(p => p.difficulty === 'Medium'),
        Hard: plants.filter(p => p.difficulty === 'Hard')
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">📖 식물 사전</h2>

            <div className="space-y-12">
                {/* Easy Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">Easy</span>
                        <h3 className="text-xl font-bold text-gray-800">초보 식집사를 위한 식물</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {groupedPlants.Easy.map((plant) => (
                            <PlantCard key={plant.id} plant={plant} onClick={handlePlantClick} />
                        ))}
                    </div>
                </section>

                {/* Medium Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">Medium</span>
                        <h3 className="text-xl font-bold text-gray-800">도전해볼 만한 식물</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {groupedPlants.Medium.map((plant) => (
                            <PlantCard key={plant.id} plant={plant} onClick={handlePlantClick} />
                        ))}
                    </div>
                </section>

                {/* Hard Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Hard</span>
                        <h3 className="text-xl font-bold text-gray-800">프로 식집사를 위한 식물</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {groupedPlants.Hard.map((plant) => (
                            <PlantCard key={plant.id} plant={plant} onClick={handlePlantClick} />
                        ))}
                    </div>
                </section>
            </div>

            {selectedPlant && (
                <PlantPassport
                    plant={selectedPlant}
                    onClose={() => setSelectedPlant(null)}
                />
            )}
        </div>
    );
};
