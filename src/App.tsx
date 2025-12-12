import React, { useState } from 'react';
import { PlantList } from './features/dictionary/PlantList';
import { GameView } from './features/game/GameView';
import { ChatInterface } from './features/chat/ChatInterface';

type View = 'Home' | 'Dictionary' | 'Game' | 'Chat';

function App() {
    const [currentView, setCurrentView] = useState<View>('Home');

    const renderView = () => {
        switch (currentView) {
            case 'Dictionary':
                return <PlantList />;
            case 'Game':
                return <GameView onNavigate={(view) => setCurrentView(view)} />;
            case 'Chat':
                return <ChatInterface />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-4">
                        <h1 className="text-4xl font-bold text-green-700 mb-4">🌿 내 손안의 작은 정원</h1>
                        <p className="text-xl text-gray-700 mb-8">우리만의 식물 키우기 여정이 곧 시작됩니다!</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                            <div
                                onClick={() => setCurrentView('Dictionary')}
                                className="bg-white p-6 rounded-xl shadow-lg border border-green-100 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">📖</div>
                                <h2 className="text-2xl font-bold mb-2">식물 사전</h2>
                                <p>나에게 맞는 식물을 찾아보세요.</p>
                            </div>
                            <div
                                onClick={() => setCurrentView('Game')}
                                className="bg-white p-6 rounded-xl shadow-lg border border-green-100 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">🌱</div>
                                <h2 className="text-2xl font-bold mb-2">식물 키우기</h2>
                                <p>물을 주고 사랑으로 키워보세요.</p>
                            </div>
                            <div
                                onClick={() => setCurrentView('Chat')}
                                className="bg-white p-6 rounded-xl shadow-lg border border-green-100 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">💬</div>
                                <h2 className="text-2xl font-bold mb-2">AI 상담소</h2>
                                <p>식물에 대해 무엇이든 물어보세요.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-green-50">
            {/* Header / Navigation */}
            <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <button onClick={() => setCurrentView('Home')} className="text-xl font-bold text-green-800">
                        🌿 My Little Garden
                    </button>
                    <div className="space-x-4">
                        <button onClick={() => setCurrentView('Dictionary')} className={`px-3 py-1 rounded ${currentView === 'Dictionary' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>사전</button>
                        <button onClick={() => setCurrentView('Game')} className={`px-3 py-1 rounded ${currentView === 'Game' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>키우기</button>
                        <button onClick={() => setCurrentView('Chat')} className={`px-3 py-1 rounded ${currentView === 'Chat' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>상담소</button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-4">
                {renderView()}
            </main>
        </div>
    );
}

export default App;
