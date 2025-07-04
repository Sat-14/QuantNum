import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
      <div className={`w-12 h-12 ${event.iconBg} rounded-xl flex items-center justify-center mb-6`}>
        {event.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="space-y-2 text-sm text-gray-500">
        {event.details.map((detail, index) => (
          <div key={index}>{detail}</div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;