"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";

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

  // Create three rows from the suggestions array
  const row1 = suggestions.slice(0, 17);
  const row2 = suggestions.slice(17, 34);
  const row3 = suggestions.slice(34);

  // References for scrollable containers
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);

  // Swipe configuration for minimal swipe distance
  const swipeConfig = {
    delta: 10, // minimum distance (in px) before a swipe is detected
  };

  // Create swipe handlers for each row
  const swipeHandlers1 = useSwipeable({
    onSwipedLeft: () =>
      scrollRef1.current?.scrollBy({ left: 150, behavior: "smooth" }),
    onSwipedRight: () =>
      scrollRef1.current?.scrollBy({ left: -150, behavior: "smooth" }),
    ...swipeConfig,
  });

  const swipeHandlers2 = useSwipeable({
    onSwipedLeft: () =>
      scrollRef2.current?.scrollBy({ left: 150, behavior: "smooth" }),
    onSwipedRight: () =>
      scrollRef2.current?.scrollBy({ left: -150, behavior: "smooth" }),
    ...swipeConfig,
  });

  const swipeHandlers3 = useSwipeable({
    onSwipedLeft: () =>
      scrollRef3.current?.scrollBy({ left: 150, behavior: "smooth" }),
    onSwipedRight: () =>
      scrollRef3.current?.scrollBy({ left: -150, behavior: "smooth" }),
    ...swipeConfig,
  });

  // Duplicate the content so that when it scrolls by 50% (half its total width) the loop is seamless.
  const duplicateRow = (row) => (
    <>
      {row.map((suggestion, index) => (
        <button
          key={`first-${index}`}
          className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm text-black dark:text-white shadow-sm"
        >
          {suggestion}
        </button>
      ))}
      {row.map((suggestion, index) => (
        <button
          key={`second-${index}`}
          className="whitespace-nowrap px-4 py-2 rounded-full bg-white hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm text-black dark:text-white shadow-sm"
        >
          {suggestion}
        </button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Row 1 - Left to Right */}
      <div
        className="suggestions-container"
        {...swipeHandlers1}
        ref={scrollRef1}
      >
        <div className="floating-suggestions animate-scroll">
          {duplicateRow(row1)}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div
        className="suggestions-container"
        {...swipeHandlers2}
        ref={scrollRef2}
      >
        <div className="floating-suggestions animate-scroll-reverse">
          {duplicateRow(row2)}
        </div>
      </div>

      {/* Row 3 - Left to Right */}
      <div
        className="suggestions-container"
        {...swipeHandlers3}
        ref={scrollRef3}
      >
        <div className="floating-suggestions animate-scroll">
          {duplicateRow(row3)}
        </div>
      </div>
    </div>
  );
};

export default function AIAssistantPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Simulate a small delay to ensure the layout is ready
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-white via-gray-100 to-gray-300 dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <h2 className="text-sm font-semibold">Shop Assistant</h2>
              <Image
                src="/verified.png"
                alt="Verified Badge"
                width={8}
                height={8}
                className="w-5 h-5"
              />
            </div>
            <p className="text-xs text-gray-500">Official AI</p>
          </div>

          <div className="w-10"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-0 py-6">
          {/* Animated Logo with smooth transition */}
          <div
            className={`transition-all duration-300 ease-in-out flex justify-center items-center ${
              isInputFocused ? "scale-50 mb-2" : "scale-100 mb-8"
            }`}
          >
            <AnimatedLogo
              width={isInputFocused ? 75 : 150}
              height={isInputFocused ? 75 : 150}
            />
          </div>

          {/* Heading with transition */}
          <h3
            className={`text-xl text-center font-semibold transition-all duration-300 ${
              isInputFocused ? "opacity-0 h-0" : "opacity-100 mb-8"
            }`}
          >
            Ask Shop Assistant anything
          </h3>

          {/* Floating Suggestions */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isInputFocused ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
            }`}
          >
            <FloatingSuggestions />
          </div>
        </div>

        {/* Message Input Area */}
        <div className="border-t bg-white dark:bg-gray-800 p-4">
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

      {/* Updated styles for floating suggestions */}
      <style jsx global>{`
        .animate-scroll {
          animation: scroll 250s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scroll-reverse 250s linear infinite;
        }

        @keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes scroll-reverse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.floating-suggestions {
  display: flex;
  gap: 8px;
  padding: 0;
  justify-content: flex-start;
  animation: scroll 250s linear infinite;
}

.suggestions-container {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: flex;
}
      `}</style>
    </div>
  );
}