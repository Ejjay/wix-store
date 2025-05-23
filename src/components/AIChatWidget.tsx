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
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manage body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-primary p-4"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Add overlay when chat is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50" 
          style={{ zIndex: 9998 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div 
          className={`
            fixed 
            ${isMobile ? 'inset-0' : 'bottom-20 right-4 w-96 h-[600px]'}
            bg-white dark:bg-gray-900
          `}
          style={{ zIndex: 9999 }}
        >
          <iframe
            src="https://ejshop-ai-assistant.vercel.app"
            className={`
              w-full h-full
              ${isMobile ? 'rounded-none' : 'rounded-lg'}
              shadow-lg
            `}
            style={{
              border: 'none',
              height: '100%', // Changed to 100%
              width: '100%',
              position: 'absolute', // Changed to absolute
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden' // Added to prevent scrolling issues
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