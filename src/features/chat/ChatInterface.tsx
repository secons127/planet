import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: '안녕하세요! 식물 관리 전문가입니다. 식물에 대해 궁금한 점을 물어보세요! 🌿' }
    ]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const { talkToPlant } = useGameStore();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    context: {}
                })
            });

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            const botResponse = data.reply;

            const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse };
            setMessages(prev => [...prev, botMsg]);

            // Bonus affection for chatting
            talkToPlant();

        } catch (error) {
            const errorMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: "😵 서버 연결 오류! 백엔드 서버(port 8000)가 실행 중인지 확인해주세요." };
            setMessages(prev => [...prev, errorMsg]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-green-100">
            <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">🌿 식물 상담소</h3>
                <span className="text-sm bg-green-700 px-2 py-1 rounded-full">전문가 상담</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                            ? 'bg-green-500 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl p-3 text-gray-500 animate-pulse">
                            🤔 답변 작성 중...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={loading ? "답변을 기다리는 중..." : "식물에 대해 궁금한 점을 물어보세요..."}
                    disabled={loading}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-gray-100"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
                >
                    ➤
                </button>
            </form>
        </div>
    );
};
