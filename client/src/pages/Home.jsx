// pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero.jsx";
import { CarouselGrid } from "../components/Carousel.jsx";
import { AnimatedTestimonialsDemo } from "../components/Testimonial.jsx";
import { VortexDemo } from "../components/Footer.jsx";
import { HotelSearchForm } from "../components/HotelSearchForm.jsx";

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    // Navigate to hotels page with search data
    navigate('/hotel', { state: { searchData } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Hero />
      <HotelSearchForm onSearch={handleSearch} />

      <CarouselGrid />
      <AnimatedTestimonialsDemo />
      <VortexDemo />

    </div>
  );
};

export default Home;
