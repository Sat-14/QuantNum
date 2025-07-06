import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import AchievementsSection from './components/AchievementsSection';
import ResourcesSection from './components/ResourcesSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
//import ContactOverlay from './components/ContactOverlay';
import TeamMemberOverlay from './components/TeamMemberOverlay';
import MyComponent from './components/MyComponent';
import { useNavigate } from 'react-router';

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Animation wrapper component
const AnimatedSection = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 'duration-1000',
  className = '' 
}) => {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-20';
      case 'down': return '-translate-y-20';
      case 'left': return 'translate-x-20';
      case 'right': return '-translate-x-20';
      case 'scale': return 'scale-95';
      default: return 'translate-y-20';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${duration} ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`transform transition-all ${duration} ease-out ${
          isVisible 
            ? 'translate-y-0 translate-x-0 scale-100 opacity-100' 
            : `${getInitialTransform()} opacity-0`
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const [showTeamMemberOverlay, setShowTeamMemberOverlay] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const arr = ['Director announces the launch of QuantNum', 'Join us in our journey to explore the universe of mathematics', 'Empowering minds through mathematical discovery'];
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'Announces', 'events', 'achievements', 'resources', 'team', 'footer'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const teamMembers = [
    {
      id: 'president',
      name: 'Rahul Sharma',
      position: 'President',
      initials: 'RS',
      gradient: 'from-red-500 to-red-700',
      description: 'Mathematics & Data Science enthusiast with expertise in advanced mathematical concepts and problem-solving.',
      bio: 'Passionate about exploring diverse realms and technological fields related to mathematical discovery and quantum research.',
      motto: 'Mathematics is the language with which God has written the universe.',
      email: 'president@quantnum.ac.in',
      phone: '+91 987 654 3210',
      linkedin: 'linkedin.com/in/rahulsharma'
    },
    {
      id: 'vicepresident',
      name: 'Priya Patel',
      position: 'Vice President',
      initials: 'PP',
      gradient: 'from-gray-400 to-gray-600',
      description: 'Passionate mathematics researcher with deep knowledge in theoretical and applied mathematics.',
      bio: 'Specializing in the future of mathematical algorithms, theory and practical applications in technology.',
      motto: 'In mathematics, you don\'t understand things. You just get used to them.',
      email: 'vicepresident@quantnum.ac.in',
      phone: '+91 876 543 2109',
      linkedin: 'linkedin.com/in/priyapatel'
    },
    {
      id: 'secretary',
      name: 'Arjun Singh',
      position: 'Secretary',
      initials: 'AS',
      gradient: 'from-red-400 to-gray-500',
      description: 'Expert in Pure Mathematics with focus on the power of collaborative learning and knowledge sharing.',
      bio: 'Committed to excellence and organizational innovation. Dedicated to the advancement of mathematical excellence.',
      motto: 'Pure mathematics is, in its way, the poetry of logical ideas.',
      email: 'secretary@quantnum.ac.in',
      phone: '+91 765 432 1098',
      linkedin: 'linkedin.com/in/arjunsingh'
    }
  ];

  const openTeamMemberOverlay = (member) => {
    setSelectedTeamMember(member);
    setShowTeamMemberOverlay(true);
  };

  const closeTeamMemberOverlay = () => {
    setShowTeamMemberOverlay(false);
    setSelectedTeamMember(null);
  };

  const getBackgroundClass = () => {
    switch (activeSection) {
      case 'hero':
        return 'bg-gradient-to-br from-black via-gray-900 to-red-950';
      case 'events':
        return 'bg-gradient-to-br from-gray-900 via-black to-red-900';
      case 'team':
        return 'bg-gradient-to-br from-red-950 via-black to-gray-900';
      case 'footer':
        return 'bg-gradient-to-br from-black via-red-950 to-gray-900';
      default:
        return 'bg-gradient-to-br from-black via-gray-900 to-red-950';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
      <Navigation onContactClick={() => setShowContactOverlay(true)} activeSection={activeSection}/>
      
      <AnimatedSection direction="up" delay={200}>
        <HeroSection />
        <section id="Announces" className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">
                  📢 Announcements
                </span>
              </h2>
            </div>
            
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-red-500/30 shadow-red-500/20">
              <div className="text-center text-red-500">
                <MyComponent myarr={arr}/>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={100}>
      <section id="events" className="py-20">
        <EventsSection />
      </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={150}>
        <AchievementsSection />
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={100}>
        <ResourcesSection />
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={200}>
        <TeamSection 
          teamMembers={teamMembers}
          onTeamMemberClick={openTeamMemberOverlay}
        />
        <div className="flex justify-center px-4 pb-4">
          <button
            onClick={() => navigate('/team')}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/30 border border-red-500/30"
          >
            Go to Full Team →
          </button>
        </div>
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={100}>
        <Footer onContactClick={() => setShowContactOverlay(true)} />
      </AnimatedSection>

      {/*  {showContactOverlay && (
        <ContactOverlay 
          onClose={() => setShowContactOverlay(false)}
          onCopy={copyToClipboard}
          copiedField={copiedField}
        />
      )}*/}

      {showTeamMemberOverlay && selectedTeamMember && (
        <TeamMemberOverlay 
          member={selectedTeamMember}
          onClose={closeTeamMemberOverlay}
          onCopy={copyToClipboard}
          copiedField={copiedField}
        />
      )}
    </div>
  );
}