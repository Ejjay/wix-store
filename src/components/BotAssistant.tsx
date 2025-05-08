'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedLogo from './AnimatedLogo';

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
        className="h-[90vh] rounded-t-[20px] p-0"
        hideCloseIcon
      >
        <div className="flex flex-col h-full">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
            
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Store Assistant</h2>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  {/* Your verified badge SVG here */}
                </svg>
              </div>
              <p className="text-sm text-gray-500">with AI</p>
            </div>
            
            <div className="w-10"> {/* Empty div for spacing */} </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 px-4 py-6">
            <div className="flex justify-center mb-8">
              <AnimatedLogo width={150} height={150} />
              <div className="w-24 h-24">
              </div>
            </div>

            <h3 className="text-xl text-center mb-6">
              Ask Store Assistant anything
            </h3>
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-gray-100">
              <input 
                type="text" 
                placeholder="Message"
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button className="text-blue-500">
                {/* Your sparkles icon SVG here */}
                ✨
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}