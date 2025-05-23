"use client";

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-primary p-4"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className={`
          fixed 
          ${isMobile ? 'top-0 left-0 w-full h-full m-0' : 'bottom-20 right-4 w-96 h-[600px]'}
          transition-all duration-300 ease-in-out
        `}
        style={{
          position: isMobile ? 'fixed' : undefined,
          zIndex: 9999,
        }}>
          <iframe
            src="https://ej-meta-ai-clone.vercel.app"
            className={`
              rounded-lg 
              shadow-lg 
              ${isMobile ? 'w-full h-full m-0 rounded-none' : 'w-full h-full'}
            `}
            style={{
              border: 'none',
              position: isMobile ? 'fixed' : undefined,
              top: isMobile ? 0 : undefined,
              left: isMobile ? 0 : undefined,
              right: isMobile ? 0 : undefined,
              bottom: isMobile ? 0 : undefined,
            }}
          />
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="fixed top-4 right-4 z-[9999] bg-primary rounded-full p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}