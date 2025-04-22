import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { User2Icon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/lib/openai';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export function ChatMessage({ message, isLastMessage = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'flex w-full gap-4 py-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300',
        isLastMessage && 'pb-16'
      )}
    >
      <Avatar className={cn(
        'h-8 w-8 rounded-md border',
        isUser ? 'bg-background' : 'bg-primary/10',
      )}>
        {isUser ? (
          <User2Icon className="h-5 w-5 text-foreground" />
        ) : (
          <div className="relative w-5 h-5">
            <Image
              src="/drok-logo.png"
              alt="DROK Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
        )}
      </Avatar>
      <div className="flex flex-col gap-2 w-full max-w-full">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {isUser ? 'You' : 'DROK Assistant'}
          </span>
          {!isUser && (
            <Badge variant="outline" className="text-xs bg-primary/10 hover:bg-primary/20">
              AI
            </Badge>
          )}
        </div>
        <div className={cn(
          'rounded-lg p-3 text-sm',
          isUser 
            ? 'bg-secondary text-secondary-foreground' 
            : 'bg-background border text-foreground'
        )}>
          {message.content || (
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce delay-75" />
              <span className="h-2 w-2 rounded-full bg-primary/50 animate-bounce delay-150" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}