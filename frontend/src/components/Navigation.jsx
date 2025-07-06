import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';


export default Navigation = ({ onContactClick, activeSection }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClasses = (id) =>
    `transition-colors cursor-pointer ${
      activeSection === id
        ? 'text-red-600 font-semibold'
        : 'text-gray-700 hover:text-pink-500'
    }`;

    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded"><img src="../../QunatNum.svg"/></div>
            <a href="/" className="text-xl font-bold hover:opacity-80 transition duration-200">
            <span className="text-red-500">Quant</span>
            <span className="text-white">Num</span>
            </a>
          </div>

          {/* desktop menu */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('events')} className={linkClasses('events')}>
              Events
            </button>
            <button onClick={() => scrollToSection('Announces')} className={linkClasses('Announces')}>
              Announcements
            </button>
            <button onClick={() => scrollToSection('achievements')} className={linkClasses('achievements')}>
              Achievements
            </button>
            <button onClick={() => scrollToSection('resources')} className={linkClasses('resources')}>
              Resources
            </button>
            <button onClick={onContactClick} className={linkClasses('footer')}>

          {/* <Logo showText={true} className="w-10 h-10" /> */}
         
              Contact
            </button>
          </div>

          <div className='md:hidden'>
            <button onClick={()=>setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} color='white' /> : <Menu size={28} color='white' />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex flex-col md:hidden space-y-4 mt-4">
            <button onClick={() => scrollToSection('events')} className= {linkClasses('events')}>
              Events
            </button>
            <button onClick={() => scrollToSection('Announces')} className={linkClasses('Announces')}>
              Announcements
            </button>
            <button onClick={() => scrollToSection('achievements')} className={linkClasses('achievements')}>
              Achievements
            </button>
            <button onClick={() => scrollToSection('resources')} className={linkClasses('resources')}>
              Resources
            </button>
            <button onClick={onContactClick} className={linkClasses('footer')}>         
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

