"use client";

import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { FollowerPointerCard } from "./ui/following-pointer";

export function Hero() {
  // Common link variable for all products
  const COMMON_HOTEL_LINK = "/hotel";

  const products = [
    // Goa Hotels with bright, high-quality Goa landmark images
    {
      title: "The Grand Palace - Goa",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Basilica of Bom Jesus - bright daylight
    },
    {
      title: "Coastal Paradise - Goa",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Goa Beach Resort - bright sunny day
    },
    {
      title: "Heritage Beach Resort - Goa",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Goa coastline - vibrant colors
    },

    // Bangalore Hotels with bright Bangalore landmark images  
    {
      title: "Urban Retreat - Bangalore",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Vidhana Soudha - bright daylight
    },
    {
      title: "Tech City Hotel - Bangalore", 
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Bangalore Palace - bright golden hour
    },
    {
      title: "Garden City Resort - Bangalore",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Lalbagh Botanical Garden - bright green
    },

    // Hyderabad Hotels with bright Hyderabad monument images
    {
      title: "Heritage Manor - Hyderabad",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Charminar - bright daylight
    },
    {
      title: "Nizami Palace - Hyderabad",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Golconda Fort - bright sunset
    },
    {
      title: "Royal Heritage - Hyderabad", 
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Chowmahalla Palace - bright architecture
    },

    // Lonavala Hotels with bright Lonavala landscape images
    {
      title: "Alpine Haven - Lonavala",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Karla Caves - bright natural light
    },
    {
      title: "Green Valley Retreat - Lonavala",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Lonavala hills - bright green landscape
    },
    {
      title: "Mountain View Resort - Lonavala",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d040a94?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Tiger's Leap - bright valley view
    },

    // Mumbai Hotels with bright Mumbai landmark images
    {
      title: "Gateway Grand - Mumbai",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Gateway of India - bright daylight
    },
    {
      title: "Marine Drive Hotel - Mumbai", 
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // Marine Drive - bright city lights
    },
    {
      title: "Bollywood Suites - Mumbai",
      link: COMMON_HOTEL_LINK,
      thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3", // CST Station - bright architectural details
    },
  ];

  return (
    <div>
      <FollowerPointerCard>
    <HeroParallax products={products} />
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          Discover India's <br /> Premium Hotels
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
          Experience luxury and comfort at India's most iconic destinations. From the beaches of Goa to the tech hub of Bangalore, from the historic charm of Hyderabad to the scenic beauty of Lonavala - find your perfect stay with us.
        </p>
        <p className="max-w-2xl text-base md:text-xl mt-4 dark:text-neutral-200">
          Let's make your stay memorable with us.
        </p>
      </div>

    </FollowerPointerCard>
    </div>
  );
}
