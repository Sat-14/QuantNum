import { TypeAnimation } from 'react-type-animation';
import '@south-paw/typeface-minecraft';
import React, { useState, useEffect } from 'react';

const MyComponent = ({ myarr }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Create a continuous stream of text with gaps
  const createTextStream = () => {
    if (!myarr || myarr.length === 0) return '';
    
    // Repeat the array to create continuous flow
    const repeatedTexts = Array(10).fill(myarr).flat();
    return repeatedTexts.map((text, index) => (
      <span key={index} className="inline-block">
        📢 {text}
        <span className="inline-block w-24"></span> {/* 3 second gap equivalent */}
      </span>
    ));
  };

  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (container) {
      setContainerWidth(container.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const scrollSpeed = 50; // pixels per second
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        const newPosition = prev + 1;
        // Reset when text has scrolled completely off screen
        if (newPosition > 2000) {
          return -containerWidth;
        }
        return newPosition;
      });
    }, 1000 / scrollSpeed);

    return () => clearInterval(interval);
  }, [containerWidth]);

  return (
    <div 
      id="scroll-container"
      className="relative w-full h-16 overflow-hidden border border-red-500/30 rounded-lg bg-black/40"
    >
      <div 
        className="absolute whitespace-nowrap text-red-500 text-2xl font-bold flex items-center h-full"
        style={{ 
          fontFamily: '"Minecraft", Arial, sans-serif',
          transform: `translateX(-${scrollPosition}px)`,
          left: '100%'
        }}
      >
        {createTextStream()}
      </div>
    </div>
  );
};
export default MyComponent;