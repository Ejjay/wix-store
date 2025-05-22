import { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { AIService } from '@/services/ai-service';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const aiService = new AIService();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/ai-bridge',
    onFinish: () => {
      scrollToBottom();
    }
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <h3 className="font-semibold">Store Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}