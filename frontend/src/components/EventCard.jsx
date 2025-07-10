import React from 'react';

const EventCard = ({ event, onClick }) => {
  return (
    <div onClick={() => onClick(event)} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 cursor-pointer group">
      <div className={`w-12 h-12 ${event.iconBg} rounded-full flex items-center justify-center mb-6`}>
        {event.icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
      <p className="text-gray-400 mb-4">{event.description}</p>
      <div className="space-y-2 text-sm text-gray-500">
        {event.details.map((detail, index) => (
          <div key={index}>{detail}</div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
