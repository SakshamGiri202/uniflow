import React, { useState, useEffect } from 'react';

interface AISearchBarProps {
  placeholder?: string;
  themeColor?: string; // e.g., 'sky-400' or 'indigo-500'
  onSearch?: (query: string) => void;
}

const AISearchBar: React.FC<AISearchBarProps> = ({ 
  placeholder = "Ask anything...", 
  themeColor = "sky-400",
  onSearch 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Simulate AI Thinking state when typing stops
  useEffect(() => {
    if (inputValue.length > 0) {
      setIsThinking(true);
      const timer = setTimeout(() => setIsThinking(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsThinking(false);
    }
  }, [inputValue]);

  return (
    <div className="relative group w-full max-w-xl transition-all duration-300">
      {/* Glowing Border / Ring Container */}
      <div 
        className={`relative flex items-center h-12 rounded-full border bg-[#0D1119]/60 backdrop-blur-xl px-4 transition-all duration-500 animate-perimeter-glow
          ${isFocused ? 'scale-[1.01]' : 'scale-100'}`}
      >
        {/* Left Icon: Search */}
        <div className={`mr-3 transition-colors duration-300 ${isFocused ? 'text-sky-400' : 'text-white/30'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-white placeholder:text-white/20 placeholder:transition-opacity focus:placeholder:opacity-0 transition-all"
        />

        {/* Right Icon: AI Sparkle / Thinking Indicator */}
        <div className="relative ml-3">
          <div 
            className={`transition-all duration-500 rounded-full p-1.5 flex items-center justify-center
              ${isThinking ? 'bg-sky-400/20 rotate-180 scale-110' : 'bg-transparent'}
              ${isFocused ? 'text-sky-400' : 'text-white/20'}`}
          >
            {isThinking ? (
              /* Neural / Pulse Dots Animation */
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-sky-400 rounded-full animate-bounce" />
              </div>
            ) : (
              /* Minimal Sparkle Icon */
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
          
          {/* Subtle neural web glow beneath AI icon */}
          {isFocused && (
            <div className="absolute inset-0 bg-sky-400/10 blur-lg animate-pulse -z-10 rounded-full" />
          )}
        </div>
      </div>

      {/* Floating Neural Cursor Decorator (Subtle Glow Follower - optional visual flair) */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent transition-all duration-1000
          ${isFocused ? 'w-2/3 opacity-100 translate-y-2' : 'w-0 opacity-0 translate-y-0'}`}
      />
      
      <style>{`
        @keyframes perimeter-glow-cycle {
          0% { border-color: #f0abfc; box-shadow: 0 0 10px rgba(240, 171, 252, 0.5), inset 0 0 5px rgba(240, 171, 252, 0.2); }
          33% { border-color: #fbbf24; box-shadow: 0 0 10px rgba(251, 191, 36, 0.5), inset 0 0 5px rgba(251, 191, 36, 0.2); }
          66% { border-color: #22d3ee; box-shadow: 0 0 10px rgba(34, 211, 238, 0.5), inset 0 0 5px rgba(34, 211, 238, 0.2); }
          100% { border-color: #f0abfc; box-shadow: 0 0 10px rgba(240, 171, 252, 0.5), inset 0 0 5px rgba(240, 171, 252, 0.2); }
        }
        .animate-perimeter-glow {
          animation: perimeter-glow-cycle 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AISearchBar;
