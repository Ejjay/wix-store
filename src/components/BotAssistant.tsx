'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function BotAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="fixed bottom-6 right-6 z-50">
        <SheetTrigger asChild>
          <Button 
            variant="default"
            size="icon"
            className="size-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-gradient-to-r from-red-500 to-red-700"
          >
            <Image 
              src="/bot.png" 
              alt="Bot Assistant" 
              width={40}
              height={40}
            />
          </Button>
        </SheetTrigger>
      </div>
      
      <SheetContent 
        side="bottom" 
        className="rounded-t-[20px] h-[80vh] p-0" // Added p-0 to remove default padding
        hideCloseIcon // This prop will be handled in the sheet.tsx component
      >
        <div className="flex flex-col h-full">
          {/* Pill handle with reduced margin */}
          <div className="mx-auto w-12 h-1.5 bg-gray-300 rounded-full mt-3 mb-4" />
          
          {/* Content with padding */}
          <div className="flex-1 px-6">
            <h2 className="text-2xl font-bold mb-4">Bot Assistant</h2>
            <p>This is your bot assistant content.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}