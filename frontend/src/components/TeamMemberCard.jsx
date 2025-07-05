import React from 'react';

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <div 
      onClick={() => onClick(member)}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 cursor-pointer"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold`}>
        {member.initials}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{member.position}</h3>
      <h4 className="text-lg font-semibold text-pink-500 mb-4">{member.name}</h4>
      <p className="text-gray-600 text-sm mb-4">{member.description}</p>
      <p className="text-xs text-gray-500">{member.bio}</p>
    </div>
  );
};

export default TeamMemberCard;