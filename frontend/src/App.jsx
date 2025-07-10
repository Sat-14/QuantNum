import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import AchievementsSection from './components/AchievementsSection';
import ResourcesSection from './components/ResourcesSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
//import ContactOverlay from './components/ContactOverlay';
import TeamMemberOverlay from './components/TeamMemberOverlay';
import MyComponent from './components/MyComponent';
import { useNavigate } from 'react-router';
import { Calendar, Users } from 'lucide-react';
import EventOverlay from './components/EventOverlay';

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
  const [showEventsOverlay, setShowEevtsOverlay] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [copiedField, setCopiedField] = useState('');

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
  const navigate = useNavigate();
  const teamMembers = [

  {
    id: 'president',
    name: 'Rahul Sharma',
    position: 'President',
    initials: 'RS',
    gradient: 'from-red-400 to-red-600',
    glowGradient: 'from-red-500 to-red-600',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Replace with actual image URL
    description: 'Leading QuantNum with passion for mathematical excellence. Specializes in advanced calculus and number theory. Currently researching applications of quantum mathematics in computational algorithms.'
    
  },
  {
    id: 'vicepresident',
    name: 'Priya Patel',
    position: 'Vice President',
    initials: 'PP',
    gradient: 'from-gray-600 to-gray-800',
    glowGradient: 'from-purple-500 to-blue-500',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', // Replace with actual image URL
    description: 'Passionate about making mathematics accessible to all. Expert in statistical analysis and machine learning algorithms. Organizes weekly problem-solving sessions and mentors junior members.',
    motto: "In mathematics, you don't understand things. You just get used to them.",
    email: 'vicepresident@quantnum.ac.in',
    phone: '+91 876 543 2109',
    linkedin: 'linkedin.com/in/priyapatel'
  },
  {
    id: 'secretary',
    name: 'Arjun Singh',
    position: 'Secretary',
    initials: 'AS',
    gradient: 'from-red-600 to-gray-800',
    glowGradient: 'from-green-500 to-blue-500',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', // Replace with actual image URL
    description: 'Manages club operations with mathematical precision. Specializes in discrete mathematics and cryptography. Coordinates with faculty advisors and maintains our resource library.'
  }
];

const events = [
    {
      id: 1,
      title: 'Equation 2024',
      description: 'Annual Math Olympiad mathematics competition featuring calculus, algebra, statistics and combinatorics.',
      iconBg: 'bg-blue-500',
      icon: <Calendar className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: April 15, 2024',
        '⏰ Time: 10:00 AM - 4:00 PM',
        '📍 Venue: IIIT Pune Main Audi',
        '🏆 Prize Pool: ₹50,000'
      ]
    },
    {
      id: 2,
      title: 'Math Workshop',
      description: 'Interactive workshop on advanced mathematical concepts and problem-solving techniques.',
      iconBg: 'bg-purple-500',
      icon: <Users className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: Monthly',
        '⏰ Time: 2:00 PM - 5:00 PM',
        '📍 Venue: Academic Block',
        '👥 Capacity: 50 students'
      ]
    },
    {
      id: 3,
      title: 'Research Symposium',
      description: 'Annual symposium showcasing cutting-edge mathematical research and innovations.',
      iconBg: 'bg-green-500',
      icon: <Calendar className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: December 2024',
        '⏰ Time: Full Day',
        '📍 Venue: Conference Hall',
        '🎯 Focus: Applied Mathematics'
      ]
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

  const openEventsOverlay = (event) => {
    setSelectedEvent(event);
    setShowEevtsOverlay(true);
  };

  const closeEventsOverlay = () => {
    setShowEevtsOverlay(false);
    setSelectedEvent(null);
  };

  const getBackgroundClass = () => {

  switch (activeSection) {
    case 'hero':
      return 'bg-gradient-to-br from-black via-gray-900 to-black';
    case 'events':
      return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
    case 'team':
      return 'bg-gradient-to-br from-black via-gray-900 to-black';
    case 'footer':
      return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
    default:
      return 'bg-gradient-to-br from-black via-gray-900 to-black';
  }
};
const arr = [
  'Welcome to QuantNum! ',
  'We are a community of math enthusiasts dedicated to exploring the beauty and power of mathematics. ',
  'Join us for exciting events, workshops, and discussions that delve into the world of numbers and their applications. ',
  'Whether you are a student, researcher, or simply curious about math, there is a place for you here. ',
  'Let’s embark on this mathematical journey together! ',
  'Stay tuned for our upcoming events and announcements. ',
  'Feel free to reach out to us with any questions or suggestions. ']
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
      
      
      <EventsSection
        id="events"
        events={events}
        onEventsClick={openEventsOverlay}
      />

      {showEventsOverlay && selectedEvent && (
        <EventOverlay 
          event={selectedEvent}
          onClose={closeEventsOverlay}
          onCopy={copyToClipboard}
          copiedField={copiedField}
        />
      )}
      </section>
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={150}>
        <AchievementsSection />
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={100}>
        <ResourcesSection />
      </AnimatedSection>
      

      <TeamSection
       id="team"                     // ← anchor lives here, nowhere else
        teamMembers={teamMembers}
        onTeamMemberClick={openTeamMemberOverlay}
      />
      
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
      <ScrollToTopButton />
    </div>
  );
}
