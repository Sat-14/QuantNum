import React from 'react';

const Logo = ({ className = "w-12 h-12", showText = false, showTagline = false }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* SVG Logo */}
      <svg 
        className={className}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="#9CA3AF" 
          strokeWidth="3" 
          fill="none"
        />
        
        {/* Diagonal Line */}
        <line 
          x1="25" 
          y1="75" 
          x2="75" 
          y2="25" 
          stroke="#9CA3AF" 
          strokeWidth="3"
        />
        
        {/* Letter N */}
        <path 
          d="M 30 70 L 30 40 L 50 60 L 50 30" 
          stroke="#9CA3AF" 
          strokeWidth="3" 
          fill="none"
        />
        
        {/* Letter Q (modified to intertwine with N) */}
        <path 
          d="M 70 40 Q 70 30, 60 30 Q 50 30, 50 40 L 50 60 Q 50 70, 60 70 Q 70 70, 70 60 L 70 40" 
          stroke="#9CA3AF" 
          strokeWidth="3" 
          fill="none"
        />
      </svg>
      
      {/* Text Logo */}
      {showText && (
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-red-500">Quant</span>
            <span className="text-white">Num</span>
          </h1>
          {showTagline && (
            <p className="text-xs text-gray-400 tracking-wider uppercase">
              Eternal Truths. Whispered in the language of numbers
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
