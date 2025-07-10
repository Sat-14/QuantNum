import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ChevronDown, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

export default function Navigation({ onContactClick, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const linkClasses = (id) =>
    `transition-colors cursor-pointer ${
      activeSection === id
        ? 'text-red-600 font-semibold'
        : 'text-gray-400 hover:text-pink-400'
    }`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsContactDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const contactOptions = [
    {
      label: 'Email',
      icon: Mail,
      action: () => window.location.href = 'mailto:contact@quantnum.com',
      color: 'hover:text-blue-500'
    },
    {
      label: 'Phone',
      icon: Phone,
      action: () => window.alert('Call us at +1234567890'),
      color: 'hover:text-green-500'
    },
    {
      label: 'Instagram',
      icon: Instagram,
      action: () => window.open('https://instagram.com/quantnum', '_blank'),
      color: 'hover:text-pink-500'
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      action: () => window.open('https://linkedin.com/company/quantnum', '_blank'),
      color: 'hover:text-blue-600'
    }
  ];

  const ContactDropdown = ({ isMobile = false }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
        className={`${linkClasses('footer')} flex items-center space-x-1 ${
          isMobile ? 'text-white' : ''
        }`}
      >
        <span>Contact</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${
            isContactDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isContactDropdownOpen && (
        <div className={`absolute ${isMobile ? 'left-0 top-full' : 'right-0 top-full'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50`}>
          {contactOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                setIsContactDropdownOpen(false);
                if (isMobile) setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center space-x-3 text-gray-700 ${option.color} transition-colors duration-200`}
            >
              <option.icon size={18} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded">
              <img src="../../QunatNum.svg" alt="QuantNum Logo" />
            </div>
            <a href="/" className="text-xl font-bold hover:opacity-80 transition duration-200">
              <span className="text-red-500">Quant</span>
              <span className="text-white">Num</span>
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
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
            <ContactDropdown />
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} color='white' /> : <Menu size={28} color='white' />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="flex flex-col md:hidden space-y-4 mt-4">
            <button onClick={() => scrollToSection('events')} className="text-white hover:text-pink-500 transition-colors text-left">
              Events
            </button>
            <button onClick={() => scrollToSection('Announces')} className="text-white hover:text-pink-500 transition-colors text-left">
              Announcements
            </button>
            <button onClick={() => scrollToSection('achievements')} className="text-white hover:text-pink-500 transition-colors text-left">
              Achievements
            </button>
            <button onClick={() => scrollToSection('resources')} className="text-white hover:text-pink-500 transition-colors text-left">
              Resources
            </button>
            <ContactDropdown isMobile={true} />
          </div>
        )}
      </div>
    </nav>
  );
};