import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/lib/openai";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export function ChatMessage({
  message,
  isLastMessage = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-4 py-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
        isLastMessage && "pb-16"
      )}
    >
      <Avatar
        className={cn(
          "h-8 w-8 rounded-md border",
          isUser ? "bg-background" : "bg-primary/10"
        )}
      >
        {isUser ? (
          <User2Icon className="h-15 w-16 text-foreground" />
        ) : (
          <div className="relative w-10 h-10">
            <Image
              src="/logo21.png"
              alt="DROK Logo"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
        )}
      </Avatar>
      <div className="flex flex-col gap-2 w-full max-w-full">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {isUser ? "You" : "DROK Assistant"}
          </span>
          {!isUser && (
            <Badge
              variant="outline"
              className="text-xs bg-primary/10 hover:bg-primary/20"
            >
              AI
            </Badge>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-3 text-sm",
            isUser
              ? "bg-secondary text-secondary-foreground"
              : "bg-background border text-foreground"
          )}
        >
          {message.content ? (
            <div className="prose prose-sm max-w-none text-foreground">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-lg font-bold mt-4 mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-base font-semibold mt-3 mb-1"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-sm font-medium mt-2 mb-1" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="my-1 text-sm" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 my-1 text-sm" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 my-1 text-sm" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="my-0.5" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-primary underline hover:text-primary/80"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold" {...props} />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
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
