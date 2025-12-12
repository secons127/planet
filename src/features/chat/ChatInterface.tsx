import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: '안녕하세요! 저는 당신의 식물 친구 풋풋이(Plant Buddy)예요. 무엇이 궁금하신가요? 🌱' }
    ]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const { affection, waterLevel, talkToPlant } = useGameStore();

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.text,
                    context: {
                        waterLevel,
                        affection
                    }
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
            const errorMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: "😵 (시스템 오류) 서버가 켜져 있는지, Ollama가 실행 중인지 확인해주세요!" };
            setMessages(prev => [...prev, errorMsg]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-green-100">
            <div className="bg-green-600 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">💬 Plant Buddy (Powered by Gemma 3)</h3>
                <span className="text-sm bg-green-700 px-2 py-1 rounded-full">애정도: {affection}</span>
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
                            🤔 생각하는 중...
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={loading ? "답변을 기다리는 중..." : "식물에게 말을 걸어보세요..."}
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
