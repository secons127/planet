import { Plant } from '../types/plant';

export const plants: Plant[] = [
    // Easy
    {
        id: '1',
        name: '몬스테라',
        scientificName: 'Monstera deliciosa',
        description: '크고 구멍 난 잎이 매력적인 공기 정화 식물입니다.',
        difficulty: 'Easy',
        waterFrequency: '흙이 마르면 듬뿍 (주 1회)',
        sunlight: '반양지 (직사광선 피하기)',
        temperature: '18-25°C',
        imageUrl: '/images/monstera.png',
        origin: '멕시코, 중앙아메리카',
        botanicalFamily: '천남성과 (Araceae)',
        careGuide: '직사광선을 받으면 잎이 탈 수 있으니 창가 커튼 뒤에 두세요. 공중 뿌리는 잘라내거나 흙으로 유인해도 좋습니다.',
        baseHealth: 100,
        growthRate: 1.2
    },
    {
        id: '4',
        name: '산세베리아',
        scientificName: 'Dracaena trifasciata',
        description: '밤에도 산소를 배출하는 침실에 두기 좋은 식물입니다.',
        difficulty: 'Easy',
        waterFrequency: '월 1회 (건조에 강함)',
        sunlight: '모든 빛 조건 가능',
        temperature: '15-30°C',
        imageUrl: '/images/sansevieria.png',
        origin: '서아프리카',
        botanicalFamily: '비짜루과 (Asparagaceae)',
        careGuide: '물을 너무 자주 주면 뿌리가 썩을 수 있습니다. 잊어버린 듯이 키우는 게 가장 좋습니다.',
        baseHealth: 150,
        growthRate: 0.8
    },
    {
        id: '5',
        name: '금전수',
        scientificName: 'Zamioculcas zamiifolia',
        description: '돈이 들어온다는 의미가 있는, 집들이 선물로 인기 만점인 식물입니다.',
        difficulty: 'Easy',
        waterFrequency: '흙이 바싹 마르면 (2-3주 1회)',
        sunlight: '반음지 ~ 반양지',
        temperature: '18-26°C',
        imageUrl: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?q=80&w=300&auto=format&fit=crop', // Quota exceeded for gen, kept external
        origin: '동아프리카',
        botanicalFamily: '천남성과 (Araceae)',
        careGuide: '그늘에서도 잘 자라지만 너무 어두우면 웃자랄 수 있습니다. 추위에 약하니 겨울에는 실내에 두세요.',
        baseHealth: 140,
        growthRate: 1.1
    },

    // Medium
    {
        id: '2',
        name: '스킨답서스',
        scientificName: 'Epipremnum aureum',
        description: '생명력이 강해 초보자도 키우기 쉬운 덩굴 식물입니다.',
        difficulty: 'Medium', // Changed based on user request (though usually easy, grouping for demo)
        waterFrequency: '겉흙이 마르면 듬뿍',
        sunlight: '반음지에서도 잘 자람',
        temperature: '21-25°C',
        imageUrl: '/images/pothos.png',
        origin: '솔로몬 제도',
        botanicalFamily: '천남성과 (Araceae)',
        careGuide: '수경재배로도 잘 자랍니다. 잎에 분무해주면 공중습도를 높이는 데 도움이 됩니다.',
        baseHealth: 120,
        growthRate: 1.5
    },
    {
        id: '6',
        name: '인도고무나무',
        scientificName: 'Ficus elastica',
        description: '두껍고 광택이 나는 잎이 멋진 인기 관엽 식물입니다.',
        difficulty: 'Medium',
        waterFrequency: '겉흙이 마르면 (1-2주 1회)',
        sunlight: '양지 ~ 반양지',
        temperature: '16-24°C',
        imageUrl: '/images/rubber-plant.png',
        origin: '인도, 말레이시아',
        botanicalFamily: '뽕나무과 (Moraceae)',
        careGuide: '잎의 먼지를 젖은 천으로 자주 닦아주면 광합성에 도움이 됩니다. 갑작스러운 환경 변화를 싫어합니다.',
        baseHealth: 110,
        growthRate: 1.3
    },

    // Hard
    {
        id: '3',
        name: '테이블 야자',
        scientificName: 'Chamaedorea elegans',
        description: '책상 위에 올려두기 좋은 작은 야자수입니다.',
        difficulty: 'Hard', // Difficult to maintain specific humidity perfectly
        waterFrequency: '주 1-2회',
        sunlight: '반음지',
        temperature: '10-24°C',
        imageUrl: '/images/parlor-palm.png',
        origin: '멕시코, 과테말라',
        botanicalFamily: '종려과 (Arecaceae)',
        careGuide: '직사광선은 잎을 누렇게 만듭니다. 공중습도를 좋아하니 자주 분무해주세요.',
        baseHealth: 80,
        growthRate: 1.0
    },
    {
        id: '7',
        name: '칼라테아',
        scientificName: 'Calathea makoyana',
        description: '화려한 잎 무늬가 매력적이지만 환경에 예민한 식물입니다.',
        difficulty: 'Hard',
        waterFrequency: '항상 촉촉하게 유지 (과습 주의)',
        sunlight: '반음지',
        temperature: '18-30°C',
        imageUrl: '/images/calathea.png',
        origin: '브라질',
        botanicalFamily: '마란타과 (Marantaceae)',
        careGuide: '수돗물의 염소 성분에 민감하니 하루 받아둔 물을 주세요. 공중습도가 낮으면 잎 끝이 탈 수 있습니다.',
        baseHealth: 70,
        growthRate: 0.9
    }
];
