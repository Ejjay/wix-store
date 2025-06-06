"use client";

import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useSwipeable } from "react-swipeable";
import { queryProducts } from "@/wix-api/products";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import { products } from '@wix/stores';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  buildProductContext,
  INITIAL_SYSTEM_PROMPT,
  VERIFICATION_PROMPT,
  MESSAGE_CONTEXT_REMINDER,
  PRODUCT_KNOWLEDGE_TEST,
  SYSTEM_UPDATE_PROMPT
} from './ai-instructions';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface FloatingSuggestionsProps {
  isHidden: boolean;
}

const FloatingSuggestions = ({ isHidden }: FloatingSuggestionsProps) => {
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

  const row1 = suggestions.slice(0, 17);
  const row2 = suggestions.slice(17, 34);
  const row3 = suggestions.slice(34);

  const scrollRef1 = useRef<HTMLDivElement | null>(null);
  const scrollRef2 = useRef<HTMLDivElement | null>(null);
  const scrollRef3 = useRef<HTMLDivElement | null>(null);

  const swipeConfig = {
    delta: 10,
  };

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

  const duplicateRow = (row: string[]) => (
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
    <div className={`flex flex-col gap-3 mb-6 transition-all duration-300 ${isHidden ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
      <div
        className="suggestions-container"
        {...swipeHandlers1}
        ref={scrollRef1}
      >
        <div className="floating-suggestions animate-scroll">
          {duplicateRow(row1)}
        </div>
      </div>

      <div
        className="suggestions-container"
        {...swipeHandlers2}
        ref={scrollRef2}
      >
        <div className="floating-suggestions animate-scroll-reverse">
          {duplicateRow(row2)}
        </div>
      </div>

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
}

// Function to fetch all products with pagination
async function fetchAllProducts(client: any) {
  if (!client) {
    console.error("Wix client not initialized");
    throw new Error("Wix client not initialized");
  }

  console.log("Starting to fetch products with client:", !!client);

  let allProducts: products.Product[] = [];
  let currentPage = 0;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const productsData = await queryProducts(client, {
      limit: pageSize,
      skip: currentPage * pageSize,
      sort: "last_updated"
    });

    allProducts = allProducts.concat(productsData.items);

    // Determine if there are more products to fetch
    hasMore = productsData.items.length === pageSize;
    currentPage++;
  }

  return allProducts;
}

export default function AIAssistantPage() {
  const [products, setProducts] = useState<products.Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();

  const refreshProductContext = useCallback(async () => {
    try {
      const updatedProducts = await fetchAllProducts(wixBrowserClient);
      setProducts(updatedProducts);

      if (chatInstance) {
        const newContext = buildProductContext(updatedProducts);
        await chatInstance.sendMessage(SYSTEM_UPDATE_PROMPT(newContext));
      }
    } catch (error) {
      console.error("Error refreshing product context:", error);
    }
  }, [chatInstance]);

  useEffect(() => {
    const debugProducts = async () => {
      const products = await fetchAllProducts(wixBrowserClient);
      console.log("Available products:", products.map(p => ({
        name: p.name,
        price: p.priceData?.formatted?.price,
        inStock: p.stock?.inStock
      })));
    };
    
    debugProducts();
  }, []);

  const initializeChat = async () => {
    try {
      console.log("Fetching products...");
      
      const productsData = await fetchAllProducts(wixBrowserClient);
      console.log("Products fetched:", productsData.length);

      if (productsData.length === 0) {
        console.error("No products found in Product lists");
        throw new Error("Product lists is empty");
      }

      setProducts(productsData);
      const productContext = buildProductContext(productsData);
      
      console.log("Product context built:", productContext);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chat = model.startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      await chat.sendMessage(INITIAL_SYSTEM_PROMPT(productContext));

      setChatInstance(chat);

      const verificationResponse = await chat.sendMessage(VERIFICATION_PROMPT);
      
      const verificationText = await verificationResponse.response.text();
      console.log("AI Knowledge Verification:", verificationText);

    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !chatInstance) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatInstance.sendMessage(MESSAGE_CONTEXT_REMINDER(userMessage));

      const text = await result.response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeChat();

    const interval = setInterval(refreshProductContext, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [refreshProductContext]);

  useEffect(() => {
    if (chatInstance) {
      chatInstance.sendMessage(PRODUCT_KNOWLEDGE_TEST)
        .then((result: GenerateContentResult) => result.response.text())
        .then((text: string) => { 
          console.log("AI product knowledge test:", text);
        })
        .catch((error: Error) => {  
          console.error("AI test failed:", error);
        });
    }
  }, [chatInstance]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isHidden = isInputFocused || messages.length > 0;

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

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto px-4 pb-[120px]">
          {!isHidden && (
            <>
              <div className="flex justify-center items-center mb-8 mt-6">
                <AnimatedLogo width={150} height={150} />
              </div>
              <h3 className="text-xl text-center font-semibold mb-8">
                Ask Shop Assistant anything
              </h3>
              <FloatingSuggestions isHidden={isHidden} />
            </>
          )}

          <div className="mt-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 ${
                    message.role === 'user' ? 'user-message' : 'assistant-message'
                  } markdown-content`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Custom styling for markdown elements
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold mb-2" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-bold mb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-bold mb-2" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc ml-4 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal ml-4 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                      code: ({ node, ...props }) => (
                        <code
                          className="block bg-gray-200 dark:bg-gray-700 p-2 rounded my-2"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-gray-300 pl-4 italic my-2"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center">
                <div className="animate-bounce">⌛</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input form */}
        <form 
          onSubmit={handleSendMessage}
          className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-2 items-center"
        >
          <button type="button" className="text-blue-500 flex-shrink-0">✨</button>
          <div className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent outline-none text-sm"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
          <button 
            type="submit" 
            className="shrink-0"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}