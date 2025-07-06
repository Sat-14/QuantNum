import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import AchievementsSection from './components/AchievementsSection';
import ResourcesSection from './components/ResourcesSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import MyComponent from './components/MyComponent';
//import ContactOverlay from './components/ContactOverlay';
import TeamMemberOverlay from './components/TeamMemberOverlay';

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
      <Navigation onContactClick={() => setShowContactOverlay(true)} />

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

      <EventsSection />
      
      <AchievementsSection />
      
      <ResourcesSection />
      
      <TeamSection
       id="team"                     // ← anchor lives here, nowhere else
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
