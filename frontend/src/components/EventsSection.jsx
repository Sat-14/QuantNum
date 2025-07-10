import React from 'react';
import EventCard from './EventCard';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const EventsSection = ({id, events=[], onEventsClick}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section id={id} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-800 mb-6">
            Our <span className="text-gray-500">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From workshops to competitions, we organize events that 
            challenge and inspire mathematical thinking
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event}
              onClick={onEventsClick}
              />
          ))}
        </div>
      </div>

      {location.pathname === '/' && (
      <div className='max-w-6xl mx-auto'>
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-2">
            view our past events
          </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 mr-2 rounded-full transition-colors duration-300"
              onClick={() => navigate('/event')}
            >
             Past Events
            </button>
        </div>
      </div>
      )}
    </section>
  );
};

export default EventsSection;
