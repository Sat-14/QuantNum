import React from 'react';
import EventCard from './EventCard';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: 'National Math Olympiad',
      description: 'Our team secured 1st place in the National Mathematics Olympiad 2024.',
      iconBg: 'bg-yellow-500',
      icon: <span className="text-white text-2xl">🏆</span>,
      details: [
        '🥇 1st Place',
        '📅 March 2024'
      ]
    },
    {
      id: 2,
      title: 'Research Publications',
      description: 'Published 15+ research papers in top-tier mathematics journals.',
      iconBg: 'bg-blue-500',
      icon: <span className="text-white text-2xl">📚</span>,
      details: [
        '📄 15+ Papers',
        '📅 2024'
      ]
    },
    {
      id: 3,
      title: 'Alumni Success',
      description: '90% of our alumni are now pursuing advanced degrees in mathematics.',
      iconBg: 'bg-green-500',
      icon: <span className="text-white text-2xl">🎓</span>,
      details: [
        '📊 90% Success Rate',
        '🎯 Graduate Programs'
      ]
    }
  ];

  return (
    <section id="achievements" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-pink-500">Achievements</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our milestones and recognitions in mathematics and research
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {achievements.map((achievement) => (
            <EventCard key={achievement.id} event={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;