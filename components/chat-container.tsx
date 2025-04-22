import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/ui/chat-message';
import { ChatInput } from '@/components/ui/chat-input';
import { useChatStore } from '@/hooks/useChatStore';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

export function ChatContainer() {
  const { messages, error } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-4 pt-4 pb-16">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome to DigiRocket AI Assistant
              </h2>
              <p className="text-muted-foreground max-w-md">
                Ask about digital marketing, web development, branding, or specialized services like AI tools and dropshipping.
              </p>
            </div>
          ) : (
            <>
              {messages.filter(message => message.role !== 'system').map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message} 
                  isLastMessage={index === messages.length - 1} 
                />
              ))}
            </>
          )}
          
          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput />
    </div>
  );
}