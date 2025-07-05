import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection = ({ teamMembers, onTeamMemberClick }) => {
  return (
    <section id="team" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-pink-500">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the people driving QuantNum forward!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              onClick={onTeamMemberClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;