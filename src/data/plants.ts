import { Plant } from '../types/plant';

export const plants: Plant[] = [
    {
        id: '1',
        name: '몬스테라',
        scientificName: 'Monstera deliciosa',
        description: '크고 구멍 난 잎이 매력적인 공기 정화 식물입니다. 인테리어 식물로 매우 인기가 높습니다.',
        difficulty: 'Easy',
        waterFrequency: '흙이 마르면 듬뿍 (주 1회)',
        sunlight: '반양지 (직사광선 피하기)',
        temperature: '18-25°C',
        imageUrl: '/images/monstera.png',
        baseHealth: 100,
        growthRate: 1.2
    },
    {
        id: '2',
        name: '스킨답서스',
        scientificName: 'Epipremnum aureum',
        description: '생명력이 강해 초보자도 키우기 쉬운 덩굴 식물입니다. 일산화탄소 제거 능력이 탁월합니다.',
        difficulty: 'Easy',
        waterFrequency: '겉흙이 마르면 듬뿍',
        sunlight: '반음지에서도 잘 자람',
        temperature: '21-25°C',
        imageUrl: '/images/pothos.png',
        baseHealth: 120,
        growthRate: 1.5
    },
    {
        id: '3',
        name: '테이블 야자',
        scientificName: 'Chamaedorea elegans',
        description: '책상 위에 올려두기 좋은 작은 야자수입니다. 공기 중의 벤젠과 폼알데히드 제거에 효과적입니다.',
        difficulty: 'Easy',
        waterFrequency: '주 1-2회',
        sunlight: '반음지',
        temperature: '10-24°C',
        imageUrl: '/images/parlor-palm.png',
        baseHealth: 80,
        growthRate: 1.0
    }
];
