// pages/AboutUs.jsx
import React from "react";
import { AboutHero } from "../components/AboutHero";
import { AboutContent } from "../components/AboutContent";
import { AnimatedTestimonialsDemo } from "../components/Testimonial";


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AboutHero />
      <AboutContent />
      <AnimatedTestimonialsDemo />

    </div>
  );
};

export default AboutUs;
