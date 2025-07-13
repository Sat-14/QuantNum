import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import GallerySection from '../components/GallerySection'; 
import ImageOverlay from '../components/ImageOverlay';
import { Camera, Image, Calendar } from 'lucide-react';
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

export default function Gallery() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

const images = [
  {
    id: 1,
    title: 'Equation 2024 - Opening Ceremony',
    description: 'Students and faculty gathered for the grand opening of our annual mathematics olympiad.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Taj Mahal
    category: 'Events',
    date: 'April 15, 2024',
    iconBg: 'bg-blue-500',
    icon: <Calendar className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Equation 2024',
      '📍 Location: IIIT Pune Main Audi',
      '👥 Participants: 200+ students',
      '🏆 Competition: Math Olympiad'
    ]
  },
  {
    id: 2,
    title: 'Workshop Session',
    description: 'Interactive problem-solving session during our monthly math workshop.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Eiffel Tower
    category: 'Workshop',
    date: 'March 10, 2024',
    iconBg: 'bg-purple-500',
    icon: <Image className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Monthly Workshop',
      '📍 Location: Academic Block',
      '🎯 Focus: Problem Solving',
      '⏰ Duration: 3 hours'
    ]
  },
  {
    id: 3,
    title: 'Research Presentation',
    description: 'Faculty member presenting cutting-edge research findings at our annual symposium.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Colosseum
    category: 'Research',
    date: 'December 5, 2024',
    iconBg: 'bg-green-500',
    icon: <Camera className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Research Symposium',
      '📍 Location: Conference Hall',
      '🔬 Topic: Applied Mathematics',
      '👨‍🏫 Speaker: Dr. Smith'
    ]
  },
  {
    id: 4,
    title: 'Team Building Activity',
    description: 'Mathematical puzzle-solving team building session for club members.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Great Wall of China
    category: 'Team Building',
    date: 'February 20, 2024',
    iconBg: 'bg-red-500',
    icon: <Image className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Team Building',
      '📍 Location: Club Room',
      '🧩 Activity: Puzzle Solving',
      '👥 Members: 30 participants'
    ]
  },
  {
    id: 5,
    title: 'Award Ceremony',
    description: 'Celebrating winners and participants of various mathematical competitions.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Machu Picchu
    category: 'Awards',
    date: 'May 1, 2024',
    iconBg: 'bg-yellow-500',
    icon: <Calendar className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Award Ceremony',
      '📍 Location: Main Auditorium',
      '🏆 Awards: 15 categories',
      '🎉 Celebration: Achievement Recognition'
    ]
  },
  {
    id: 6,
    title: 'Study Group Session',
    description: 'Collaborative study session focusing on advanced calculus concepts.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXhOy4B-royEmBA2trVcL_m4uhYtxSb9gp1dwtWwWF-aRuiZwhjs13fn1gcwzzrHxb53k&usqp=CAU', // Petra
    category: 'Study Group',
    date: 'January 15, 2024',
    iconBg: 'bg-indigo-500',
    icon: <Camera className="w-6 h-6 text-white" />,
    details: [
      '📅 Event: Study Group',
      '📍 Location: Library',
      '📚 Subject: Advanced Calculus',
      '⏰ Duration: 2 hours'
    ]
  }
];

  const openImageOverlay = (image) => {
    setSelectedImage(image);
    setShowImageOverlay(true);
  };

  const closeImageOverlay = () => {
    setShowImageOverlay(false);
    setSelectedImage(null);
  };

  const getBackgroundClass = () => {
    switch (activeSection) {
      case 'hero':
        return 'bg-gradient-to-br from-black via-gray-900 to-black';
      case 'gallery':
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
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
        <GallerySection 
          images={images}
          onImageClick={openImageOverlay}
        />
      </AnimatedSection>
      
      <AnimatedSection direction="up" delay={100}>
        <Footer onContactClick={() => setShowContactOverlay(true)} />
      </AnimatedSection>

      {showImageOverlay && selectedImage && (
        <ImageOverlay 
          image={selectedImage}
          onClose={closeImageOverlay}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
}