# CONTEXT.md

## 1. 핵심 파일 구조 (Core File Structure)
```
src/
├── components/         # 재사용 가능한 UI 컴포넌트 (PlantCard 등)
├── data/              # 정적 데이터 (식물 Mock Data)
├── features/          # 주요 기능별 모듈
│   ├── chat/          # AI 채팅 관련 (ChatInterface)
│   ├── dictionary/    # 식물 사전 관련 (PlantList)
│   └── game/          # 게임 로직 및 뷰 (GameView)
├── store/             # 전역 상태 관리 (gameStore - Zustand)
├── types/             # TypeScript 타입 정의 (Plant, GameState)
├── App.tsx            # 메인 라우팅 및 레이아웃
└── main.tsx           # 진입점
```

## 2. 데이터 명세 (Data Specifications)
### Plant (식물 데이터)
- **id**: 고유 식별자 (UUID)
- **stats**: `baseHealth`(기본 체력), `growthRate`(성장 속도)
- **meta**: `difficulty`(난이도), `waterFrequency`(물 주기 텍스트)

### GameState (게임 상태)
- **level**: 현재 레벨 (1~50)
- **environmentLevel**: 환경 등급 (1: 화분 ~ 4: 온실)
- **metrics**: `waterLevel`(0-100), `affection`(0-100)

## 3. 기술적 제약 사항 (Technical Constraints)
1. **브라우저 스토리지 의존**: 현재 백엔드 DB 없이 브라우저 메모리에 상태가 저장되므로, 새로고침 시 데이터가 초기화됩니다. (추후 localStorage 도입 필요)
2. **AI Mock Response**: 실제 LLM API 연동 전 단계로, `setTimeout`을 이용한 가짜 응답(Mock Response)이 하드코딩되어 있습니다.
3. **이미지 리소스**: 외부 URL(Unsplash)을 사용하고 있어 오프라인 상태나 링크 만료 시 이미지가 깨질 수 있습니다.

## 4. 개선 사항 (Improvements)
1. **AI 모델 연동**: OpenAI API 또는 Ollama(Local LLM)를 연결하여 실제 문맥을 이해하는 대화 기능 구현.
    - *Prompt Engineering*: 게임 상태(수분량, 애정도)를 System Prompt에 주입하여 상황에 맞는 대화 생성.
2. **데이터 영속성**: `zustand/middleware`의 `persist`를 사용하여 게임 진행 상황 저장.
3. **PWA 적용**: 모바일에서도 앱처럼 사용할 수 있도록 PWA 설정 추가.
4. **유저 커스텀**: 식물 별명 짓기 및 나만의 정원 꾸미기 기능 추가.
