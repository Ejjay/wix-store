'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function BotAssistant() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
  variant="default"
  size="icon"
  className="size-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-gradient-to-r from-red-500 to-red-700"
  onClick={() => {
    console.log('Bot assistant clicked');
  }}
>
  <Image 
    src="/bot.png" 
    alt="Bot Assistant" 
    width={40} 
    height={40} 
  />
</Button>
    </div>
  );
}