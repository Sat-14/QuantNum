import React from 'react';
import Logo from './Logo';

const Navigation = ({ onContactClick }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo showText={true} className="w-10 h-10" />
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('events')} 
              className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('achievements')} 
              className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              Achievements
            </button>
            <button 
              onClick={() => scrollToSection('resources')} 
              className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              Resources
            </button>
            <button 
              onClick={onContactClick} 
              className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
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
