"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

// Add the FloatingSuggestions component
const FloatingSuggestions = () => {
  const suggestions = [
    "📱 Browse electronics", "👕 Latest fashion trends", "🎁 Gift ideas", 
    "💰 View deals", "❓ How to order", "🏠 Home decor", 
    "📚 Books and media", "🎮 Gaming accessories", "👟 Sports equipment",
    "🎨 Art supplies", "🔧 Tools and hardware", "🌿 Garden essentials",
    "🍳 Kitchen gadgets", "💄 Beauty products", "🎵 Musical instruments",
    "👶 Baby items", "🐕 Pet supplies", "🏃‍♂️ Fitness gear",
    "🚗 Auto accessories", "💻 Computer parts", "📸 Photography gear",
    "🎪 Party supplies", "🎒 Back to school", "🏕️ Camping gear",
    "🎭 Costumes", "🎨 Craft supplies", "🧸 Toys and games",
    "⌚ Watches", "👜 Handbags", "🕶️ Sunglasses",
    "🎪 Outdoor furniture", "🛋️ Indoor furniture", "🖼️ Wall art",
    "📱 Phone accessories", "💡 Smart home", "🎧 Audio equipment",
    "🎮 Video games", "📺 TV & Entertainment", "🧴 Skincare",
    "👗 Women's clothing", "👔 Men's clothing", "🎀 Accessories",
    "🏋️ Exercise equipment", "🎿 Winter sports", "🏄‍♂️ Summer sports",
    "🎨 DIY projects", "🧩 Puzzles", "💝 Special offers",
    "🎁 Gift cards", "🔥 New arrivals"
  ];

  // Create three rows of suggestions
  const row1 = suggestions.slice(0, 17);
  const row2 = suggestions.slice(17, 34);
  const row3 = suggestions.slice(34);

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Row 1 - Left to Right */}
      <div className="suggestions-container">
        <div className="floating-suggestions">
          {[...row1, ...row1].map((suggestion, index) => (
            <button
              key={index}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm text-black dark:text-white shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="suggestions-container">
        <div className="floating-suggestions">
          {[...row2, ...row2].map((suggestion, index) => (
            <button
              key={index}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm text-black dark:text-white shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Row 3 - Left to Right */}
      <div className="suggestions-container">
        <div className="floating-suggestions">
          {[...row3, ...row3].map((suggestion, index) => (
            <button
              key={index}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm text-black dark:text-white shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  // Handle touch move event
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      const distance = touchEnd - touchStart;
      // If the user has dragged down more than 50px, close the sheet
      if (distance > 50) {
        setIsOpen(false);
      }
    }
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="fixed bottom-6 right-6 z-50">
        <SheetTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="size-14 rounded-full shadow-lg hover:scale-110 transition-transform bg-gradient-to-r from-red-500 to-red-700"
          >
            <Image src="/bot.png" alt="Bot Assistant" width={40} height={40} />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent
        side="bottom"
        className="fixed bottom-0 h-[90vh] overflow-hidden rounded-t-[20px] p-0 bg-gradient-to-b from-white via-gray-100 to-gray-300 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black"
        hideCloseIcon
      >
        <div className="flex flex-col h-full">
          {/* Top Navigation Bar with touch events */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>

            {/* Center content with absolute positioning */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-1 bg-gray-300 rounded-full mb-3"></div>
              <div className="flex items-center gap-1">
                <h2 className="text-m font-semibold">Shop Assistant</h2>
                <Image
                  src="/verified.png"
                  alt="Verified Badge"
                  width={12}
                  height={12}
                  className="w-5 h-5"
                />
              </div>
              <p className="text-xs text-gray-500">Official AI</p>
            </div>

            {/* Placeholder for spacing */}
            <div className="w-10"></div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 px-4 py-6 overflow-hidden">
            {/* Animated Logo with smooth transition */}
            <div 
              className={cn(
                "transition-all duration-300 ease-in-out flex justify-center items-center",
                isInputFocused ? "scale-50 mb-2" : "scale-100 mb-8"
              )}
            >
              <AnimatedLogo 
                width={isInputFocused ? 75 : 150} 
                height={isInputFocused ? 75 : 150} 
              />
            </div>

            {/* Heading with transition */}
            <h3 
              className={cn(
                "text-xl text-center font-semibold transition-all duration-300",
                isInputFocused ? "opacity-0 h-0" : "opacity-100 mb-8"
              )}
            >
              Ask Shop Assistant anything
            </h3>

            {/* Floating Suggestions with transition */}
            <div 
              className={cn(
                "transition-all duration-300 ease-in-out",
                isInputFocused ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
              )}
            >
              <FloatingSuggestions />
            </div>
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t mt-auto bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <button className="text-blue-500 flex-shrink-0">✨</button>
              <div className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center">
                <input
                  type="text"
                  placeholder="Type question..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Utility function for conditionally joining classNames
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}