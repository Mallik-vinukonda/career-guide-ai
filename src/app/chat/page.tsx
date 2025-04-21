'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaGraduationCap, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

// Types for our chat messages
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your friendly career guide. I can help you discover exciting jobs based on what you like to do! What subjects or activities do you enjoy the most?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Predefined quick responses for child-friendly interaction
  const quickResponses = [
    "I like computers and technology",
    "I enjoy helping people",
    "I like art and being creative",
    "I like animals and nature",
    "I enjoy sports and being active"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle sending a message (either from input or quick response)
  const handleSendMessage = async (e: React.FormEvent | null, quickResponse?: string) => {
    if (e) e.preventDefault();
    
    const messageText = quickResponse || input;
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Try to call the API first
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `⚠️ ${data.error}`,
              timestamp: new Date()
            }
          ]);
          setIsLoading(false);
          return;
        }
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.content,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: '⚠️ AI service is currently unavailable. Please try again later.',
          timestamp: new Date()
        }
      ]);
      setIsLoading(false);
      return;
    }
    
    // Fallback: Generate response locally if API fails
    setTimeout(() => {
      // Simple response logic for demo purposes - more child-friendly
      let responseContent = '';
      const userInput = messageText.toLowerCase();
      
      if (userInput.includes('computer') || userInput.includes('tech') || userInput.includes('coding')) {
        responseContent = `That's awesome! If you like computers and technology, you might enjoy these careers:\n\n🖥️ **Game Designer** - Create fun video games\n\n🌐 **Web Developer** - Build cool websites\n\n🤖 **Robotics Engineer** - Make robots that can help people\n\n🔒 **Cybersecurity Expert** - Protect computers from hackers\n\nDo any of these sound interesting to you?`;
      } 
      else if (userInput.includes('help') || userInput.includes('people') || userInput.includes('care')) {
        responseContent = `That's wonderful! If you enjoy helping others, you might like these careers:\n\n👨‍⚕️ **Doctor or Nurse** - Help sick people feel better\n\n👩‍🏫 **Teacher** - Help others learn new things\n\n👮 **Police Officer** - Keep communities safe\n\n🧠 **Counselor** - Help people with their feelings\n\nWhich of these sounds most exciting to you?`;
      }
      else if (userInput.includes('art') || userInput.includes('creat') || userInput.includes('draw')) {
        responseContent = `How creative! If you enjoy art and making things, you might like these careers:\n\n🎨 **Animator** - Make characters move in movies and games\n\n📱 **App Designer** - Create how apps look and work\n\n🏠 **Architect** - Design beautiful buildings\n\n👗 **Fashion Designer** - Create cool clothes\n\nDo any of these sound fun to you?`;
      }
      else if (userInput.includes('animal') || userInput.includes('nature') || userInput.includes('outside')) {
        responseContent = `Nature lover! If you enjoy animals and the outdoors, you might like these careers:\n\n🐾 **Veterinarian** - Help sick animals get better\n\n🌳 **Park Ranger** - Take care of forests and parks\n\n🌊 **Marine Biologist** - Study ocean animals\n\n🌱 **Botanist** - Learn about plants and how they grow\n\nWhich of these would you like to learn more about?`;
      }
      else if (userInput.includes('sport') || userInput.includes('active') || userInput.includes('play')) {
        responseContent = `You're sporty! If you like being active, you might enjoy these careers:\n\n⚽ **Sports Coach** - Teach others how to play sports\n\n💪 **Physical Therapist** - Help people recover from injuries\n\n🏃 **Athletic Trainer** - Keep athletes healthy and strong\n\n🏆 **Sports Manager** - Run sports teams and events\n\nDo any of these sound exciting to you?`;
      }
      else if (userInput.includes('help') || userInput.includes('what can you do')) {
        responseContent = "I can help you discover fun careers based on what you enjoy! I can tell you about:\n\n1. Different types of jobs that match your interests\n2. What you might learn in school to prepare\n3. What people do in different jobs\n4. How to explore careers you find interesting\n\nJust tell me what you like to do or what subjects you enjoy!";
      }
      else {
        responseContent = "That sounds interesting! To help you discover fun careers, could you tell me more about:\n\n- What subjects do you enjoy in school?\n- What activities do you like doing for fun?\n- Do you prefer working with people, animals, computers, or creating things?\n\nOr you can click one of the quick response buttons below!";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Function to clear chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hi there! I'm your friendly career guide. I can help you discover exciting jobs based on what you like to do! What subjects or activities do you enjoy the most?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <FaArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <FaGraduationCap className="text-blue-600 dark:text-blue-400" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Career Guide AI</h1>
            </div>
          </div>
          <button 
            onClick={handleClearChat}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Clear chat"
          >
            <MdRefresh size={20} />
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div 
                  className={`text-xs mt-1 ${
                    message.role === 'user' 
                      ? 'text-blue-200' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Response Buttons */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick responses:</h3>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(null, response)}
                  className="px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm transition-colors"
                  disabled={isLoading}
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <form onSubmit={(e) => handleSendMessage(e)} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 hover:bg-blue-700 p-3 text-white transition-colors disabled:bg-blue-400"
              disabled={isLoading || !input.trim()}
            >
              <FaPaperPlane size={16} />
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Ask me what jobs might be fun for you!
          </p>
        </div>
      </div>
    </div>
  );
}
