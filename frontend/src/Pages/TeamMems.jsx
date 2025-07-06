import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import EventsSection from '../components/EventsSection';
import AchievementsSection from '../components/AchievementsSection';
import ResourcesSection from '../components/ResourcesSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
//import ContactOverlay from './components/ContactOverlay';
import TeamMemberOverlay from '../components/TeamMemberOverlay';
import MyComponent from '../components/MyComponent';
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

export default function TeamMembers() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const [showTeamMemberOverlay, setShowTeamMemberOverlay] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const arr = ['Director announces the launch of QuantNum', 'Join us in our journey to explore the universe of mathematics', 'Empowering minds through mathematical discovery'];
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'events', 'team', 'footer'];
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
    gradient: 'from-pink-400 to-red-500',
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
    gradient: 'from-blue-400 to-purple-500',
    description: 'Passionate mathematics researcher with deep knowledge in theoretical and applied mathematics.',
    bio: 'Specializing in the future of mathematical algorithms, theory and practical applications in technology.',
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
    gradient: 'from-green-400 to-blue-500',
    description: 'Expert in Pure Mathematics with focus on the power of collaborative learning and knowledge sharing.',
    bio: 'Committed to excellence and organizational innovation. Dedicated to the advancement of mathematical excellence.',
    motto: 'Pure mathematics is, in its way, the poetry of logical ideas.',
    email: 'secretary@quantnum.ac.in',
    phone: '+91 765 432 1098',
    linkedin: 'linkedin.com/in/arjunsingh'
  },
  {
    id: 'treasurer',
    name: 'Sana Kapoor',
    position: 'Treasurer',
    initials: 'SK',
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Financial strategist with a sharp eye for budget optimization and resource allocation.',
    bio: 'Sana ensures the smooth financial functioning of the society with transparency and foresight.',
    motto: 'A good budget is a reflection of good priorities.',
    email: 'treasurer@quantnum.ac.in',
    phone: '+91 912 345 6789',
    linkedin: 'linkedin.com/in/sanakapoor'
  },
  {
    id: 'outreach',
    name: 'Dev Mehra',
    position: 'Outreach Coordinator',
    initials: 'DM',
    gradient: 'from-cyan-400 to-teal-500',
    description: 'Creative connector bridging QuantNum with wider academic and research communities.',
    bio: 'Dev leads our outreach efforts with compelling initiatives and inclusive campaigns.',
    motto: 'Mathematics grows when shared.',
    email: 'outreach@quantnum.ac.in',
    phone: '+91 934 567 8012',
    linkedin: 'linkedin.com/in/devmehra'
  },
  {
    id: 'editor',
    name: 'Meera Iyer',
    position: 'Content & Publication Lead',
    initials: 'MI',
    gradient: 'from-indigo-400 to-blue-500',
    description: 'Enthusiastic writer and editor with a love for mathematical storytelling and education.',
    bio: 'Meera curates and edits all content, ensuring clarity and impact in every publication.',
    motto: 'Words are vectors of understanding.',
    email: 'editor@quantnum.ac.in',
    phone: '+91 945 210 6783',
    linkedin: 'linkedin.com/in/meera-iyer'
  },
  {
    id: 'research',
    name: 'Kabir Verma',
    position: 'Head of Research',
    initials: 'KV',
    gradient: 'from-rose-400 to-fuchsia-500',
    description: 'Leader in mathematical exploration, with deep insight into modern research trends.',
    bio: 'Kabir mentors internal projects and drives collaborations with academic partners.',
    motto: 'Curiosity backed by rigor is unstoppable.',
    email: 'research@quantnum.ac.in',
    phone: '+91 987 123 4567',
    linkedin: 'linkedin.com/in/kabirverma'
  },
  {
    id: 'design',
    name: 'Naina Desai',
    position: 'Creative & Design Head',
    initials: 'ND',
    gradient: 'from-orange-300 to-pink-400',
    description: 'Visual storyteller creating stunning assets that bring mathematics to life.',
    bio: 'Naina leads brand identity and design systems that elevate the QuantNum aesthetic.',
    motto: 'Design is intelligence made visible.',
    email: 'design@quantnum.ac.in',
    phone: '+91 976 543 2180',
    linkedin: 'linkedin.com/in/nainadesai'
  },
  {
    id: 'logistics',
    name: 'Yusuf Khan',
    position: 'Logistics & Operations Manager',
    initials: 'YK',
    gradient: 'from-lime-400 to-emerald-500',
    description: 'Master of execution who ensures every event runs with precision.',
    bio: 'Yusuf handles event coordination, resource movement, and all behind-the-scenes magic.',
    motto: 'Success lives in the details.',
    email: 'logistics@quantnum.ac.in',
    phone: '+91 998 201 2345',
    linkedin: 'linkedin.com/in/yusufkhan'
  },
  {
    id: 'tech',
    name: 'Aisha Raza',
    position: 'Technology Lead',
    initials: 'AR',
    gradient: 'from-slate-500 to-neutral-700',
    description: 'Full-stack developer bringing digital interactivity to QuantNum’s platforms.',
    bio: 'Aisha maintains the official site and builds tools to amplify learning and outreach.',
    motto: 'Code is poetry written with logic.',
    email: 'tech@quantnum.ac.in',
    phone: '+91 901 765 4420',
    linkedin: 'linkedin.com/in/aisharaza'
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ← Back to Home
          </button>
        </div>
      </AnimatedSection>
      

      
      <AnimatedSection direction="up" delay={200}>
        <TeamSection 
          teamMembers={teamMembers}
          onTeamMemberClick={openTeamMemberOverlay}
        />
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