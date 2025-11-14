// components/HotelSection.jsx
import React, { useState, useEffect } from "react";
import { ExpandableCardDemo } from "./ui/expandable-cards";

export function HotelSection({ searchData }) {
  const allHotels = [
    {
      description: "Luxury Resort",
      title: "The Grand Palace",
      location: "Goa",
      price: "₹12,500",
      pricePerNight: 12500,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/grand-palace",
      content: () => {
        return (
          <p>
            Experience luxury at its finest with our premium suites, world-class spa, and breathtaking ocean views. The Grand Palace offers an unforgettable stay with personalized service and exceptional amenities.
          </p>
        );
      },
    },
    {
      description: "Modern Boutique Hotel",
      title: "Urban Oasis",
      location: "Bangalore",
      price: "₹8,000",
      pricePerNight: 8000,
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/urban-oasis",
      content: () => {
        return (
          <p>
            A modern boutique hotel in the heart of the city. Perfect for business travelers and urban explorers seeking comfort and style in a prime location.
          </p>
        );
      },
    },
    {
      description: "Mountain Retreat",
      title: "Alpine Haven",
      location: "Lonavala",
      price: "₹6,500",
      pricePerNight: 6500,
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/alpine-haven",
      content: () => {
        return (
          <p>
            Escape to the mountains and enjoy pristine nature, hiking trails, and cozy fireplaces. Alpine Haven offers the perfect mountain getaway with breathtaking views and outdoor adventures.
          </p>
        );
      },
    },
    {
      description: "Beachfront Resort",
      title: "Ocean Breeze",
      location: "Goa",
      price: "₹15,000",
      pricePerNight: 15000,
      src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/ocean-breeze",
      content: () => {
        return (
          <p>
            Wake up to pristine white sand beaches and crystal-clear waters. Our beachfront resort offers the ultimate tropical escape with world-class amenities and stunning ocean views.
          </p>
        );
      },
    },
    {
      description: "Historic Manor",
      title: "Heritage Manor",
      location: "Hyderabad",
      price: "₹9,500",
      pricePerNight: 9500,
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=3532&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/heritage-manor",
      content: () => {
        return (
          <p>
            Step back in time at our beautifully restored historic manor. Combining old-world charm with modern luxury, Heritage Manor offers a unique and elegant experience.
          </p>
        );
      },
    },
    {
      description: "Eco-Friendly Lodge",
      title: "Green Valley",
      location: "Lonavala",
      price: "₹7,200",
      pricePerNight: 7200,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/green-valley",
      content: () => {
        return (
          <p>
            Immerse yourself in nature at our sustainable eco-lodge. Built with environmentally friendly materials and powered by renewable energy, offering a guilt-free luxury experience.
          </p>
        );
      },
    },
  ];

  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  useEffect(() => {
    if (searchData?.destination) {
      const filtered = allHotels.filter((hotel) =>
        hotel.location.toLowerCase().includes(searchData.destination.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(allHotels);
    }
  }, [searchData]);

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {filteredHotels.length > 0 ? (
            <>
              Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} 
              {searchData?.destination && ` in "${searchData.destination}"`}
            </>
          ) : (
            <>
              No hotels found in "{searchData?.destination}". Try searching for a different destination.
              <div className="text-sm text-gray-600 mt-2">
                Available destinations: Goa, Bangalore, Lonavala, Hyderabad
              </div>
            </>
          )}
        </h2>
      </div>
      
      <ExpandableCardDemo cards={filteredHotels} searchData={searchData} />
    </div>
  );
}
