import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon, RefreshCwIcon } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { streamingChat } from '@/lib/openai';

export function ChatInput() {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    messages, 
    addMessage, 
    updateLastMessage, 
    setIsLoading, 
    setError,
    clearMessages
  } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSubmitting) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    addMessage(userMessage);
    setInput('');
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      // Add an empty assistant message to show the loading indicator
      addMessage({ role: 'assistant', content: '' });
      
      await streamingChat({
        messages: [...messages, userMessage],
        onMessageUpdate: (content) => {
          updateLastMessage(content);
        },
      });
    } catch (error) {
      console.error('Error in chat submission:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while processing your request.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 fixed bottom-0 left-0 right-0 py-4 px-4 md:px-8 flex flex-col w-full gap-4">
      <div className="flex items-center gap-2 mx-auto w-full max-w-4xl">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          onClick={() => clearMessages()}
          disabled={isSubmitting || messages.length === 0}
          title="Clear chat history"
        >
          <RefreshCwIcon className="h-5 w-5" />
        </Button>
        
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask DigiRocket's AI Assistant a question..."
            className="min-h-[52px] w-full resize-none pr-12 py-3 max-h-[200px] overflow-y-auto rounded-lg"
            disabled={isSubmitting}
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isSubmitting}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}