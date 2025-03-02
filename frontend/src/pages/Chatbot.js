import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const predefinedQA = [
  {
    question: "What companies hire the most students?",
    answer: "TCS, Infosys, and Wipro consistently hire the most students. This year, TCS hired 45, Infosys 38, and Wipro 32."
  },
  {
    question: "Which sector has the highest placement rate?",
    answer: "The IT sector has the highest placement rate at 45%, followed by Finance at 20%."
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you?", sender: 'bot', timestamp: new Date() }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage = { id: messages.length + 1, text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, { id: prev.length + 1, text: response, sender: 'bot', timestamp: new Date() }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const qa of predefinedQA) {
      if (lowerQuery.includes(qa.question.toLowerCase())) {
        return qa.answer;
      }
    }
    return "I'm not sure about that. Could you ask something else?";
  };

  const handleQuickQuestionClick = (question) => {
    setInputValue(question);
    const inputElement = document.getElementById('chat-input');
    if (inputElement) inputElement.focus();
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h1 className="text-xl font-bold">AI Placement Assistant</h1>
        <p>Ask me anything about placements or preparation tips.</p>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-md">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}> 
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}>{msg.text}</div>
          </div>
        ))}
        {isTyping && <div className="text-left"><Loader2 className="animate-spin" /> Typing...</div>}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="mt-4">
        <div className="flex gap-2 mb-2">
          {predefinedQA.map((qa, idx) => (
            <button key={idx} className="bg-indigo-100 p-2 rounded-full text-xs" onClick={() => handleQuickQuestionClick(qa.question)}>{qa.question}</button>
          ))}
        </div>
        <div className="flex">
          <input id="chat-input" type="text" className="flex-1 border p-2 rounded-l-md" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button className="bg-indigo-600 text-white p-2 rounded-r-md" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;