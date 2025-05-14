"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BotAssistant() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    router.push('/ai-assistant');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="default"
        size="icon"
        className={`size-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-gradient-to-r from-red-500 to-red-700 ${
          isActive ? 'animate-pulse' : ''
        }`}
        onClick={handleClick}
      >
        <Image src="/bot.png" alt="Bot Assistant" width={40} height={40} />
      </Button>
    </div>
  );
}