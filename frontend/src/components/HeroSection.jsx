import React from 'react';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

const HeroSection = () => {
  const scrollToTeam = () => {
    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
      <div className="max-w-4xl mx-auto">

        {/* Large Logo */}
        <div className="mb-8">
          <Logo className="w-32 h-32 mx-auto mb-6" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-red-500">Quant</span>
          <span className="text-white">Num</span>
        </h1>
        
        <p className="text-lg text-gray-400 mb-4 tracking-wider uppercase">
          Eternal Truths. Whispered in the language of numbers
        </p>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Where mathematics meets innovation. IIIT Pune's premier mathematics club 
          exploring the infinite possibilities of numbers through collaborative 
          learning and cutting-edge research.
        </p>
        
        <button 
          onClick={scrollToTeam}

          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50 cursor-pointer"

        >
          🚀 Meet Our Team!
        </button>
      </div>
      
      <ChevronDown className="absolute bottom-8 w-6 h-6 text-gray-600 animate-bounce" />
    </section>
  );
};

export default HeroSection;
