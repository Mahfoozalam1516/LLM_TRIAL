import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '@/lib/openai';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      addMessage: (message) => 
        set((state) => ({ 
          messages: [...state.messages, message],
          error: null,
        })),
      updateLastMessage: (content) => 
        set((state) => {
          const updatedMessages = [...state.messages];
          const lastIndex = updatedMessages.length - 1;
          
          if (lastIndex >= 0 && updatedMessages[lastIndex].role === 'assistant') {
            updatedMessages[lastIndex] = {
              ...updatedMessages[lastIndex],
              content,
            };
          } else {
            updatedMessages.push({
              role: 'assistant',
              content,
            });
          }
          
          return { messages: updatedMessages };
        }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'digirocket-chat-storage',
    }
  )
);