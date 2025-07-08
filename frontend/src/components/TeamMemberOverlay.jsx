import React from 'react';
import { X, Mail, Phone, Linkedin, Copy, Check } from 'lucide-react';

const TeamMemberOverlay = ({ member, onClose, onCopy, copiedField }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full mx-4 relative border border-red-500/30 shadow-2xl shadow-red-500/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/20 transition-colors text-white"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg`}>
            {member.initials}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
          <p className="text-red-400 font-medium mb-3">{member.position}</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
          <div className="bg-black/50 rounded-lg p-4 border border-red-500/20">
            <p className="text-red-300 italic text-sm">"{member.motto}"</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Mail size={18} className="text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">Email</p>
              <p className="text-white text-sm">{member.email}</p>
            </div>
            <button
              onClick={() => onCopy(member.email, 'email')}
              className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
            >
              {copiedField === 'email' ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Phone size={18} className="text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">Phone</p>
              <p className="text-white text-sm">{member.phone}</p>
            </div>
            <button
              onClick={() => onCopy(member.phone, 'phone')}
              className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
            >
              {copiedField === 'phone' ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Linkedin size={18} className="text-red-400" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs">LinkedIn</p>
              <p className="text-white text-sm">{member.linkedin}</p>
            </div>
            <button
              onClick={() => onCopy(`https://${member.linkedin}`, 'linkedin')}
              className="p-2 rounded-full hover:bg-red-500/20 transition-colors"
            >
              {copiedField === 'linkedin' ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <a
            href={`mailto:${member.email}`}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-medium text-center hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/30"
          >
            Send Email
          </a>
          <a
            href={`https://${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-xl font-medium text-center hover:bg-gray-600 transition-all border border-gray-600"
          >
            View LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberOverlay;