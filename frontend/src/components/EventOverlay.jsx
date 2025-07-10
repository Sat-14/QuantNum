import React from "react";
// import {Loaction,Calender} from 'lucide-react'

export default function EventOverlay({ event, onClose, copyToClipboard, copiedField }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-sm text-gray-500">📅 {event.date}</p>
        <p className="text-sm text-gray-500 mb-4">📍 {event.location}</p>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          onClick={() => copyToClipboard(event.title, 'title')}
        >
          {copiedField === 'title' ? 'Copied!' : 'Copy Event Title'}
        </button>
      </div>
    </div>
  );
}