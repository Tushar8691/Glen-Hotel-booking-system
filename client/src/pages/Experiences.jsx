// pages/Experiences.jsx
import React from "react";
import { ExperienceHero } from "../components/ExperienceHero";
import { ExperienceFeatures } from "../components/ExperienceFeatures";

const Experiences = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ExperienceHero />
      <ExperienceFeatures />
    </div>
  );
};

export default Experiences;
