import React, { useState } from 'react';
import ImageCard from './ImageCard';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

const GallerySection = ({ id, images = [], onImageClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from images
  const categories = ['All', ...new Set(images.map(image => image.category))];

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  return (
    <section id={id} className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-800 mb-6">
            Our <span className="text-gray-500">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capturing moments of mathematical excellence, learning, and community
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={onImageClick}
            />
          ))}
        </div>

        {/* No images message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No images found in the "{selectedCategory}" category.
            </p>
          </div>
        )}
      </div>

      {/* Navigation button for home page */}
      {location.pathname === '/' && (
        <div className="max-w-6xl mx-auto">
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-2">
              view our complete gallery
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 mr-2 rounded-full transition-colors duration-300"
              onClick={() => navigate('/gallery')}
            >
              View Gallery
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;