import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import EventSection from '../components/EventsSection'; 
import EventOverlay from '../components/EventOverlay';
import { Calendar, Users } from 'lucide-react';
import ScrollToTopButton from '../components/ScrollToTopButton';


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

export default function PastEvents() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const [showEventOverlay, setShowEventOverlay] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

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
    },
    {
      id: 4,
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
    },
    {
      id: 5,
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

  const openEventsOverlay = (member) => {
    setSelectedEvent(member);
    setShowEventOverlay(true);
  };

  const closeEventsOverlay = () => {
    setShowEventOverlay(false);
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
  return (
    <div className={`min-h-screen pt-20 transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
      <Navigation onContactClick={() => setShowContactOverlay(true)} />

      <AnimatedSection direction="up" delay={100}>
        <div className="flex justify-start px-4 pt-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            ← Back to Home
          </button>
        </div>
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={200}>
        <EventSection 
          events={events}
          onEventsClick={openEventsOverlay}
        />
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={100}>
        <Footer onContactClick={() => setShowContactOverlay(true)} />
      </AnimatedSection>

      {showEventOverlay && selectedEvent && (
        <EventOverlay 
          event={selectedEvent}
          onClose={closeEventsOverlay}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
}