"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useRouter } from "next/navigation";

// FloatingSuggestions component implementation
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

export default function AIAssistantPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-300 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => router.back()} className="p-2">
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col items-center">
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
        <div className="px-4 py-6">
          {/* Animated Logo with smooth transition */}
          <div 
            className={`transition-all duration-300 ease-in-out flex justify-center items-center
              ${isInputFocused ? "scale-50 mb-2" : "scale-100 mb-8"}`}
          >
            <AnimatedLogo 
              width={isInputFocused ? 75 : 150} 
              height={isInputFocused ? 75 : 150} 
            />
          </div>

          {/* Heading with transition */}
          <h3 
            className={`text-xl text-center font-semibold transition-all duration-300
              ${isInputFocused ? "opacity-0 h-0" : "opacity-100 mb-8"}`}
          >
            Ask Shop Assistant anything
          </h3>

          {/* Floating Suggestions */}
          <div 
            className={`transition-all duration-300 ease-in-out
              ${isInputFocused ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
          >
            <FloatingSuggestions />
          </div>

          {/* Message Input Area */}
          <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-gray-800">
            <div className="max-w-4xl mx-auto flex items-center gap-2">
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
      </div>

      {/* Add required styles for floating suggestions animation */}
      <style jsx global>{`
        .suggestions-container {
          overflow: hidden;
          margin: 0 -20px;
        }
        
        .floating-suggestions {
          display: flex;
          gap: 8px;
          animation: scroll 20s linear infinite;
          padding: 0 20px;
        }
        
        .floating-suggestions:nth-child(2) {
          animation-direction: reverse;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}