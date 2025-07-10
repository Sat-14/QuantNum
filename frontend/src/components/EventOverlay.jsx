import React from 'react';
import { X, Calendar, Clock, MapPin, Award, Copy, Check } from 'lucide-react';

const EventOverlay = ({ event, onClose, onCopy, copiedField }) => {
  if (!event) return null;

  
  const getDetailIcon = (detail) => {
    if (detail.includes('Date:')) return <Calendar className="w-5 h-5 text-red-400" />;
    if (detail.includes('Time:')) return <Clock className="w-5 h-5 text-red-400" />;
    if (detail.includes('Venue:')) return <MapPin className="w-5 h-5 text-red-400" />;
    if (detail.includes('Prize Pool:') || detail.includes('Focus:') || detail.includes('Capacity:')) return <Award className="w-5 h-5 text-red-400" />;
    if (detail.includes('Participants:')) return <Award className="w-5 h-5 text-red-400" />;
    return null;
  };

  const extractCopyText = (detail) => detail.split(': ')[1] || detail;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 w-11/12 max-w-md border border-red-700/50 relative overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               background: `radial-gradient(circle at top left, ${event.iconBg.replace('bg-', '')}-700, transparent 60%)`,
             }}>
        </div>
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               background: `radial-gradient(circle at bottom right, ${event.iconBg.replace('bg-', '')}-700, transparent 60%)`,
             }}>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close overlay"
        >
          <X size={28} />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`p-4 rounded-full ${event.iconBg} mb-4 shadow-lg flex items-center justify-center`}>
            {event.icon}
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
            {event.title}
          </h2>
          <p className="text-gray-300 text-md mb-6 max-w-sm">
            {event.description}
          </p>

          <div className="w-full space-y-3 mb-6">
            {event.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 text-left border border-gray-600 hover:border-red-500 transition-all duration-200 cursor-pointer"
                onClick={() => onCopy(extractCopyText(detail), detail)}
              >
                <div className="flex items-center">
                  {getDetailIcon(detail)}
                  <span className="ml-3 text-gray-200 text-lg flex-grow">
                    {detail}
                  </span>
                </div>
                <button
                  className="ml-4 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
                  aria-label={`Copy ${detail}`}
                  title={`Click to copy ${detail}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(extractCopyText(detail), detail);
                  }}
                >
                  {copiedField === detail ? (
                    <Check size={20} className="text-green-400" />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors shadow-lg"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventOverlay;