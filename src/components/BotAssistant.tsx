'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function BotAssistant() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        variant="default"
        size="icon"
        className="size-14 rounded-full shadow-lg hover:scale-110 transition-transform"
        onClick={() => {
          // Add your bot assistant functionality here
          console.log('Bot assistant clicked');
        }}
      >
        <Image 
          src="/bot-assistant.png" 
          alt="Bot Assistant" 
          width={28} 
          height={28} 
        />
      </Button>
    </div>
  );
}