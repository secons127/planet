# 🌿 내 손안의 작은 정원 (My Little Garden)

> **AI 기반의 식물 키우기 시뮬레이션 & 식물 사전 웹 애플리케이션**

## 1. 개요 및 목적 (Overview & Purpose)
이 프로젝트는 식물을 키우고 싶지만 두려움이 있는 초보자들을 위해 기획되었습니다.
사용자는 **AI 챗봇(Plant Buddy)**과의 교감을 통해 식물 관리법을 배우고, 가상 환경에서 식물을 키우며 자신감을 얻을 수 있습니다.
단순한 정보 전달을 넘어, 식물이 마치 살아있는 친구처럼 대화하며 사용자와 정서적 유대를 형성하는 것을 목표로 합니다.

## 2. 기술 스택 (Tech Stack)
### Frontend
- **Core**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand (게임 상태 및 데이터 관리)
- **Icons**: Lucide React

### AI & Integration
- **LLM Interface**: OpenAI API / Local LLM (Ollama) 연동 구조 설계
- **Chat**: React State 기반의 실시간 채팅 UI

### Environment
- **Runtime**: Node.js (v18+)
- **Package Manager**: npm

## 3. 설치 방법 (Installation)
이 프로젝트는 Node.js 환경에서 실행됩니다.

1. **저장소 클론 (Clone Repository)**
   ```bash
   git clone <repository-url>
   cd plannet
   ```

2. **의존성 설치 (Install Dependencies)**
   ```bash
   npm install
   ```

3. **환경 변수 설정 (Env Setup)** (선택 사항)
   - `.env` 파일을 생성하고 LLM API Key 등을 설정합니다. (현재 Mock 모드로 동작 시 불필요)

## 4. 실행 방법 (Usage)

### 개발 서버 실행
```bash
npm run dev
```
- 브라우저에서 `http://localhost:5173` 접속.

### 빌드 및 프로덕션 실행
```bash
npm run build
npm run preview
```

## 5. 제공 기능 (Features)

### 🤖 AI 식물 챗봇 (Plant Buddy)
- **페르소나 대화**: 식물이 자신의 상태(목마름, 행복함 등)를 기반으로 사용자에게 말을 걸어줍니다.
- **맞춤형 상담**: "잎이 노랗게 변했어"와 같은 질문에 대해 AI가 구체적인 해결책을 제시합니다. (현재 Mockup 구현)
- **교감 시스템**: 대화를 자주 할수록 '애정도'가 상승하여 식물이 더 빨리 자랍니다.

### � 식물 사전 (Plant Dictionary)
- 식물별 난이도, 물 주기, 성장 환경 등 필수 정보를 카드 형태로 제공합니다.
- 초보자 맞춤형 태그(Easy, Medium, Hard) 분류.

### 🌱 게이미피케이션 (Gamification)
- **성장 시뮬레이션**: 경험치(Exp)를 모아 레벨업하면 화분이 베란다, 비닐하우스, 대형 온실로 업그레이드됩니다.
- **실시간 상태 관리**: 시간이 지남에 따라 수분이 감소하므로 주기적인 관리가 필요합니다.


# 🌿 내 손안의 작은 정원 (My Little Garden)

🔗 GitHub: https://github.com/secons127/planet
