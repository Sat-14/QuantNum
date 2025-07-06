import React from 'react';
import { X, Mail, Phone, Linkedin, Copy, Check } from 'lucide-react';

const TeamMemberOverlay = ({ member, onClose, onCopy, copiedField }) => {
  if (!member) return null;

  const handleCopy = (text, field) => {
    onCopy(text, field);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white/100 transition-all duration-200 shadow-lg z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Header with Avatar */}
        <div className="relative p-8 pb-6">
          <div className="flex flex-col items-center text-center">
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
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {member.name}
            </h2>
            
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium shadow-lg">
              {member.position}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-6">
          {/* Description */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {member.description}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Motto */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Motto</h3>
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "{member.motto}"
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-purple-600" />
                  <span className="text-gray-700">{member.email}</span>
                </div>
                <button
                  onClick={() => handleCopy(member.email, 'email')}
                  className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                >
                  {copiedField === 'email' ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-purple-600" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-purple-600" />
                  <span className="text-gray-700">{member.phone}</span>
                </div>
                <button
                  onClick={() => handleCopy(member.phone, 'phone')}
                  className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                >
                  {copiedField === 'phone' ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-purple-600" />
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/30">
                <div className="flex items-center space-x-3">
                  <Linkedin size={20} className="text-purple-600" />
                  <span className="text-gray-700">{member.linkedin}</span>
                </div>
                <button
                  onClick={() => handleCopy(`https://${member.linkedin}`, 'linkedin')}
                  className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
                >
                  {copiedField === 'linkedin' ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} className="text-purple-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={`mailto:${member.email}`}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Send Email
            </a>
            <a
              href={`https://${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white/80 text-gray-700 py-3 px-6 rounded-xl font-medium text-center hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-200"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberOverlay;