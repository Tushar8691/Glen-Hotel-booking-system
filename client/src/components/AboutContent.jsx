// components/AboutContent.jsx
import React from "react";

export function AboutContent() {
  const values = [
    { label: "Exceptional Service" },
    { label: "Sustainable Tourism" },
    { label: "Cultural Authenticity" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-200 mb-6">Our Story</h2>
          <p className="text-lg text-gray-400 mb-6">
            Founded with a passion for exceptional hospitality, Glen has been 
            creating memorable experiences for travelers from around the world. 
            Our journey began with a simple vision: to provide luxury accommodations 
            and unique experiences that exceed expectations.
          </p>
          <p className="text-lg text-gray-400">
            Today, we continue to uphold our commitment to excellence, offering 
            personalized service and unforgettable moments that make every stay special.
          </p>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-200 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-400 mb-6">
            To create extraordinary travel experiences that connect people with 
            beautiful destinations, rich cultures, and lasting memories. We believe 
            that every journey should be transformative and inspiring.
          </p>
          <div className="space-y-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-300">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
