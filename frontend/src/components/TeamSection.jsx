import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
// ⚠️ add `id` prop with default undefined
const TeamSection = ({ id, teamMembers = [], onTeamMemberClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
   <section id={id} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-red-500">Team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the brilliant minds driving QuantNum forward. 
            Our team combines mathematical expertise with innovative thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.isArray(teamMembers) &&
  teamMembers.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              onClick={onTeamMemberClick}
            />
          ))}
        </div>

        {/* Optional: Add a call to action or additional info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Interested in joining our team?
          </p>
          {location.pathname === '/' && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors duration-300"
              onClick={() => navigate('/team')}
            >
              🚀 Meet the rest of our team!
            </button>
          )}
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
