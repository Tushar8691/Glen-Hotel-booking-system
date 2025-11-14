// pages/Hotels.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HotelSection } from "../components/HotelSelection";
import { HotelSearchForm } from "../components/HotelSearchForm";

const Hotels = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState(null);

  // Get search data from navigation state
  useEffect(() => {
    if (location.state && location.state.searchData) {
      setSearchData(location.state.searchData);
    }
  }, [location.state]);

  const handleSearch = (data) => {
    setSearchData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-[55px] font-bold text-gray-200 mb-8 text-center">
          Our <span className="text-yellow-400">Hotels</span>
        </h1>
        <p className="text-[25px] text-gray-400 mb-16 text-center max-w-4xl mx-auto">
          Discover luxury accommodations tailored for your comfort.
        </p>
        
        <HotelSearchForm onSearch={handleSearch} initialData={searchData} />
        <HotelSection searchData={searchData} />
      </div>
    </div>
  );
};

export default Hotels;