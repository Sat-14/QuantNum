import React from 'react';
import { X, Calendar, Clock, MapPin, Award, Camera, Users } from 'lucide-react';

const ImageOverlay = ({ image, onClose }) => {
  if (!image) return null;

  const getDetailIcon = (detail) => {
    if (detail.includes('Event:')) return <Calendar className="w-5 h-5 text-red-400" />;
    if (detail.includes('Duration:')) return <Clock className="w-5 h-5 text-red-400" />;
    if (detail.includes('Location:')) return <MapPin className="w-5 h-5 text-red-400" />;
    if (detail.includes('Focus:') || detail.includes('Subject:') || detail.includes('Topic:')) return <Award className="w-5 h-5 text-red-400" />;
    if (detail.includes('Participants:') || detail.includes('Members:') || detail.includes('Speaker:')) return <Users className="w-5 h-5 text-red-400" />;
    if (detail.includes('Competition:') || detail.includes('Activity:') || detail.includes('Awards:') || detail.includes('Celebration:')) return <Award className="w-5 h-5 text-red-400" />;
    return <Camera className="w-5 h-5 text-red-400" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-4 md:p-6 w-11/12 max-w-lg max-h-[90vh] border border-red-700/50 relative overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               background: `radial-gradient(circle at top left, ${image.iconBg.replace('bg-', '')}-700, transparent 60%)`,
             }}>
        </div>
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
               background: `radial-gradient(circle at bottom right, ${image.iconBg.replace('bg-', '')}-700, transparent 60%)`,
             }}>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close overlay"
        >
          <X size={28} />
        </button>

        <div className="relative z-10 overflow-y-auto max-h-[calc(90vh-2rem)] pt-8">
          {/* Image */}
          <div className="mb-4 px-2">
            <div className="p-1 rounded-lg bg-gradient-to-r from-red-500 via-gray-600 to-red-500">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-32 object-contain rounded-lg shadow-lg bg-black"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            <div className={`p-2 rounded-full ${image.iconBg} mb-3 shadow-lg flex items-center justify-center`}>
              <div className="w-5 h-5 flex items-center justify-center">
                {React.cloneElement(image.icon, { className: "w-5 h-5 text-white" })}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {image.title}
            </h2>
            
            <div className="flex items-center text-gray-400 mb-3">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{image.date}</span>
              <span className="mx-2">•</span>
              <span className="text-xs bg-red-600 px-2 py-1 rounded-full text-white">
                {image.category}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-4 max-w-md">
              {image.description}
            </p>

            <div className="w-full space-y-2 mb-4">
              {image.details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700/50 rounded-lg p-2 text-left border border-gray-600 hover:border-red-500 transition-all duration-200"
                >
                  <div className="flex items-center">
                    {getDetailIcon(detail)}
                    <span className="ml-2 text-gray-200 text-sm flex-grow">
                      {detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOverlay;