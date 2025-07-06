import React from 'react';

const Navigation = ({ onContactClick }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded"></div>
            <span className="font-bold text-xl">
              <span style={{color:'#FF5354'}}>Quant</span>
              <span className="text-white">Num</span>
            </span>
            </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('events')} 
              className="text-gray-700 hover:text-pink-500 transition-colors cursor-pointer"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('achievements')} 
              className="text-gray-700 hover:text-pink-500 transition-colors cursor-pointer"
            >
              Achievements
            </button>
            <button 
              onClick={() => scrollToSection('resources')} 
              className="text-gray-700 hover:text-pink-500 transition-colors cursor-pointer"
            >
              Resources
            </button>
            <button 
              onClick={onContactClick} 
              className="text-gray-700 hover:text-pink-500 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;