"use client";

import React from "react";
import { ChatContainer } from "@/components/chat-container";
import { CompanyInfo } from "@/components/company-info";
import { ModeToggle } from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareIcon, InfoIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="relative w-28 h-8">
              <Image
                src="/drok-logo.png"
                alt="DROK Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <h1 className="text-lg font-bold"></h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 relative">
          <ChatContainer />
        </div>

        <div className="hidden md:block w-80 border-l p-4 overflow-y-auto">
          <CompanyInfo />
        </div>

        {/* Mobile tabs for responsive design */}
        <div className="md:hidden fixed bottom-[72px] left-0 right-0 border-t bg-background z-10">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="flex-1">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="info" className="flex-1">
                <InfoIcon className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="hidden" />
            <TabsContent
              value="info"
              className="p-4 border-t bg-background absolute w-full"
            >
              <CompanyInfo />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
