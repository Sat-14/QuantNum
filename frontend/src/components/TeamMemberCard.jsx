import React from 'react';

const TeamMemberCard = ({ member, onClick }) => {
  return (
    <div 
      onClick={() => onClick(member)}
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 cursor-pointer group"
    >
      {/* Glowing Circle with Image */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${member.glowGradient || 'from-red-500 to-red-600'} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
        
        {/* Image Container */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-red-500 transition-colors duration-300">
          {member.imageUrl ? (
            <img 
              src={member.imageUrl} 
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-bold`}>
              {member.initials}
            </div>
          )}
        </div>
      </div>
      
      {/* Member Info */}
      <h3 className="text-xl font-bold text-white mb-2">{member.position}</h3>
      <h4 className="text-lg font-semibold text-red-500 mb-4">{member.name}</h4>
      
      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {member.description}
      </p>
    </div>
  );
};

export default TeamMemberCard;
