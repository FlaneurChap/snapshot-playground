'use client';

import { X, Bot, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ isOpen, onClose, currentTab }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm the GenSec AI Assistant. I'm currently viewing the ${currentTab} data. I can help you:\n\n• Identify missing tests or gaps in assessment\n• Suggest follow-up actions based on current results\n• Explain complex biomarkers\n• Recommend specialist referrals\n\nWhat would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'This is a UI prototype. AI responses will be powered by a language model in production.'
        }
      ]);
    }, 1000);
  };

  const suggestedPrompts = [
    'What tests are missing for this patient?',
    'Explain the significance of the elevated Lp(a)',
    'What specialists should I refer to?',
    'Create a treatment plan summary'
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h2 className="text-lg font-semibold">GenSec AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-teal-700 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-sm text-teal-200 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Context: {currentTab}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-teal-700">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-semibold">GenSec AI</span>
                  </div>
                )}
                <div className="text-sm whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-4 space-y-2">
            <div className="text-xs font-medium text-gray-600 mb-2">Suggested questions:</div>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about this patient..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-teal-900 hover:bg-teal-800 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            AI responses are context-aware based on current tab
          </p>
        </div>
      </div>
    </>
  );
}
