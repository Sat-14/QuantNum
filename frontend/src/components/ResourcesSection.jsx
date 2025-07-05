import React from 'react';

const ResourcesSection = () => {
  const resources = [
    {
      id: 1,
      title: 'Study Materials',
      description: 'Comprehensive notes, problem sets, and solution guides for various mathematical topics.',
      iconBg: 'bg-purple-500',
      icon: '📖',
      buttonColor: 'bg-purple-500 hover:bg-purple-600',
      buttonText: 'Access Materials'
    },
    {
      id: 2,
      title: 'Math Tools',
      description: 'Collection of mathematical software, calculators, and visualization tools.',
      iconBg: 'bg-red-500',
      icon: '🔧',
      buttonColor: 'bg-red-500 hover:bg-red-600',
      buttonText: 'View Tools'
    },
    {
      id: 3,
      title: 'Video Lectures',
      description: 'Recorded lectures and tutorials from our workshops and guest speakers.',
      iconBg: 'bg-indigo-500',
      icon: '🎥',
      buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
      buttonText: 'Watch Videos'
    }
  ];

  return (
    <section id="resources" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-pink-500">Resources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access our collection of mathematical resources, tools, and learning materials
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50">
              <div className={`w-12 h-12 ${resource.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <span className="text-white text-2xl">{resource.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <button className={`${resource.buttonColor} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}>
                {resource.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;