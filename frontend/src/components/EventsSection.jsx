import React from 'react';
import { Calendar, Users } from 'lucide-react';
import EventCard from './EventCard';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: 'Equation 2024',
      description: 'Annual Math Olympiad mathematics competition featuring calculus, algebra, statistics and combinatorics.',
      iconBg: 'bg-blue-500',
      icon: <Calendar className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: April 15, 2024',
        '⏰ Time: 10:00 AM - 4:00 PM',
        '📍 Venue: IIIT Pune Main Audi',
        '🏆 Prize Pool: ₹50,000'
      ]
    },
    {
      id: 2,
      title: 'Math Workshop',
      description: 'Interactive workshop on advanced mathematical concepts and problem-solving techniques.',
      iconBg: 'bg-purple-500',
      icon: <Users className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: Monthly',
        '⏰ Time: 2:00 PM - 5:00 PM',
        '📍 Venue: Academic Block',
        '👥 Capacity: 50 students'
      ]
    },
    {
      id: 3,
      title: 'Research Symposium',
      description: 'Annual symposium showcasing cutting-edge mathematical research and innovations.',
      iconBg: 'bg-green-500',
      icon: <Calendar className="w-6 h-6 text-white" />,
      details: [
        '📅 Date: December 2024',
        '⏰ Time: Full Day',
        '📍 Venue: Conference Hall',
        '🎯 Focus: Applied Mathematics'
      ]
    }
  ];

  return (
    <section id="events" className="min-h-screen py-20 px-6">
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
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;