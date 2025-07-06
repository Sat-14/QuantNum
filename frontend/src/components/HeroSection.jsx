import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToTeam = () => {
    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-block bg-gray-500 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
            ✨ Math meets Innovation at IIIT Pune
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 tracking-tight">
          <span className="text-red-500">Quant</span>Num
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Where numbers meet innovation. Exploring the beauty of mathematics through 
          collaborative learning, competitions, and cutting-edge research.
        </p>
        
        <button 
          onClick={scrollToTeam}
          className="bg-red-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          🚀 Meet Our Team!
        </button>
      </div>
      
      <ChevronDown className="absolute bottom-8 w-6 h-6 text-gray-400 animate-bounce" />
    </section>
  );
};

export default HeroSection;