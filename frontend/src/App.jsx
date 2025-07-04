import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import AchievementsSection from './components/AchievementsSection';
import ResourcesSection from './components/ResourcesSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
//import ContactOverlay from './components/ContactOverlay';
//import TeamMemberOverlay from './components/TeamMemberOverlay';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showContactOverlay, setShowContactOverlay] = useState(false);
  const [showTeamMemberOverlay, setShowTeamMemberOverlay] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [copiedField, setCopiedField] = useState('');

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
      gradient: 'from-green-400 to-blue-500',
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
        return 'bg-gradient-to-br from-pink-100 via-white to-blue-50';
      case 'events':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100';
      case 'team':
        return 'bg-gradient-to-br from-purple-100 via-pink-50 to-red-50';
      case 'footer':
        return 'bg-gradient-to-br from-red-50 via-pink-100 to-purple-100';
      default:
        return 'bg-gradient-to-br from-pink-100 via-white to-blue-50';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}>
      <Navigation onContactClick={() => setShowContactOverlay(true)} />
      
      <HeroSection />
      
      <EventsSection />
      
      <AchievementsSection />
      
      <ResourcesSection />
      
      <TeamSection 
        teamMembers={teamMembers}
        onTeamMemberClick={openTeamMemberOverlay}
      />
      
      <Footer onContactClick={() => setShowContactOverlay(true)} />

    {/*  {showContactOverlay && (
        <ContactOverlay 
          onClose={() => setShowContactOverlay(false)}
          onCopy={copyToClipboard}
          copiedField={copiedField}
        />
      )}*/}

      {/*{showTeamMemberOverlay && selectedTeamMember && (
        <TeamMemberOverlay 
          member={selectedTeamMember}
          onClose={closeTeamMemberOverlay}
          onCopy={copyToClipboard}
          copiedField={copiedField}
        />
      )}*/}
    </div>
  );
}