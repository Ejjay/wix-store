"use client";

import { useState } from 'react'

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full bg-primary p-4"
      >
        <ChatIcon />
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <iframe
          src="https://ej-meta-ai-clone.vercel.app"
          className="fixed bottom-20 right-4 w-96 h-[600px] rounded-lg shadow-lg"
        />
      )}
    </div>
  )
}