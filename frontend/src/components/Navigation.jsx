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

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded"><img src="../../QunatNum.svg"/></div>
            <span className="font-bold text-xl">QuantNum</span>
          </div>
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
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};