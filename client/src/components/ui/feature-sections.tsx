// components/ui/feature-sections.jsx
"use client";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export const FeaturesSectionDemo = () => {
  const features = [
    {
      title: "Adventure Sports",
      description:
        "Thrilling activities for adrenaline seekers including paragliding, rock climbing, and white water rafting in breathtaking locations.",
      icon: <IconAdventure />,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=3540&auto=format&fit=crop",
    },
    {
      title: "Cultural Heritage",
      description:
        "Immerse yourself in local culture with guided tours of historical sites, museums, and traditional villages with expert storytellers.",
      icon: <IconCulture />,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?q=80&w=3540&auto=format&fit=crop",
    },
    {
      title: "Culinary Journey",
      description:
        "Discover authentic local flavors through cooking classes, food tours, and fine dining experiences with renowned chefs.",
      icon: <IconCulinary />,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3540&auto=format&fit=crop",
    },
    {
      title: "Wellness Retreat",
      description:
        "Rejuvenate your mind and body with yoga retreats, spa treatments, and meditation sessions in serene natural environments.",
      icon: <IconWellness />,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=3540&auto=format&fit=crop",
    },
    {
      title: "Wildlife Safari",
      description:
        "Experience nature's wonders with guided wildlife tours and photography expeditions in pristine natural habitats.",
      icon: <IconWildlife />,
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?q=80&w=3540&auto=format&fit=crop",
    },
    {
      title: "City Exploration",
      description:
        "Explore urban landscapes, architecture, and local neighborhoods with expert guides who know the hidden gems.",
      icon: <IconCity />,
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=3544&auto=format&fit=crop",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Feature = ({ title, description, icon, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-yellow-400 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
      <div className="mt-4 px-10">
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 object-cover rounded-lg opacity-0 group-hover/feature:opacity-100 transition duration-300"
        />
      </div>
    </motion.div>
  );
};

// Icon Components
const IconAdventure = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconCulture = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconCulinary = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconWellness = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconWildlife = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconCity = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
