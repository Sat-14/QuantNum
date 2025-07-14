import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

const Footer = ({ onContactClick }) => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* QuantNum Info */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">QuantNum</h3>
            <p className="text-pink-100 mb-4 max-w-md">
              Math club at IIIT Pune dedicated to advancing mathematical knowledge through innovation, collaboration and excellence.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <a
                  href="https://www.instagram.com/quantnum_iiitp?igsh=cTNsdnh6cjh0eDk2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl"
                >
                <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <a
                  href="https://www.linkedin.com/company/quantnum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl"
                >
                <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
              <a
                href="mailto:quantnum@iiitp.ac.in"
                className="text-white text-xl"
              >
              <i className="fa-solid fa-envelope"></i>
              </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-pink-100">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('events')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('achievements')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Achievements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('resources')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={onContactClick} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-pink-100">
              <div className="flex items-center space-x-2">
                <div className="space-y-2 text-white">
                  {/* Phone */}
                  <a 
                    href="tel:+911234567890" 
                    className="flex items-center space-x-2 hover:text-blue-800"
                  >
                    <PhoneIcon className="w-4 h-5" />
                    <span>+91 83XXX XXXXX</span>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:quantnum@iiitp.ac.in" 
                    className="flex items-center space-x-2 hover:text-blue-800"
                  >
                    <EnvelopeIcon className="w-4 h-5" />
                    <span>quantnum@iiitp.ac.in</span>
                  </a>
                  {/* Location */}
                  <a 
                    href="https://maps.app.goo.gl/d9tkhCgrH9WL8wTw5" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 hover:text-blue-800"
                  >
                    <MapPinIcon className="w-4 h-5" />
                    <span>IIIT Pune, Maharashtra</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-pink-400/30 mt-12 pt-8 text-center text-pink-100">
          <p>&copy; 2024 QuantNum - IIIT Pune Math Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;