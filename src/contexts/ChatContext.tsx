'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserProfile } from './UserProfileContext';

// Define message types
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Define the context interface
interface ChatContextType {
  messages: Message[];
  addMessage: (role: MessageRole, content: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Initial welcome message
const getInitialMessages = (userName?: string): Message[] => [
  {
    id: '1',
    role: 'assistant',
    content: userName 
      ? `Hi ${userName}! I'm your AI career guidance assistant. I can help you explore career options based on your interests and skills. How can I assist you today?`
      : `Hi there! I'm your AI career guidance assistant. I can help you explore career options, understand educational requirements, and provide insights on job prospects. How can I assist you today?`,
    timestamp: new Date()
  }
];

// Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const { userProfile } = useUserProfile();
  const [messages, setMessages] = useState<Message[]>(getInitialMessages(userProfile.name));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update initial message if user profile changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === '1') {
      setMessages(getInitialMessages(userProfile.name));
    }
  }, [userProfile.name]);

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Add a message to the chat
  const addMessage = (role: MessageRole, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    };

    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      // Save to localStorage
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  // Clear all messages
  const clearMessages = () => {
    const initialMessages = getInitialMessages(userProfile.name);
    setMessages(initialMessages);
    localStorage.setItem('chatMessages', JSON.stringify(initialMessages));
  };

  // Send a message to the API and get a response
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage('user', content);
    setIsLoading(true);

    try {
      // Prepare context from user profile if available
      let contextMessage = '';
      if (userProfile.profileComplete) {
        contextMessage = `[User Profile Context: Name: ${userProfile.name}, Interests: ${userProfile.interests.join(', ')}, Skills: ${userProfile.skills.join(', ')}, Education Level: ${userProfile.education.level}, Field of Study: ${userProfile.education.field || 'Not specified'}, Career Goals: ${userProfile.goals.shortTerm || 'Not specified'}]`;
      }

      // Prepare messages for API
      const apiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add context message if available
      if (contextMessage) {
        apiMessages.push({
          role: 'system' as MessageRole,
          content: contextMessage
        });
      }

      // Add the new user message
      apiMessages.push({
        role: 'user' as MessageRole,
        content
      });

      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      
      // Add assistant message
      addMessage('assistant', data.content);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      addMessage(
        'assistant',
        'I apologize, but I encountered an error processing your request. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isLoading, setIsLoading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook for using the context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
