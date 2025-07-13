import React from 'react';
import { Calendar } from 'lucide-react';

const ImageCard = ({ image, onClick }) => {
  return (
    <div 
      onClick={() => onClick(image)} 
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {image.category}
          </span>
        </div>

        {/* Icon */}
        <div className={`absolute top-4 left-4 w-10 h-10 ${image.iconBg} rounded-full flex items-center justify-center opacity-90`}>
          {image.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
          {image.title}
        </h3>
        
        <div className="flex items-center text-gray-400 mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{image.date}</span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {image.description}
        </p>

        {/* Preview details */}
        <div className="space-y-1 text-xs text-gray-500">
          {image.details.slice(0, 2).map((detail, index) => (
            <div key={index} className="truncate">
              {detail}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;