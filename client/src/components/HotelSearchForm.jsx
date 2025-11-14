// components/HotelSearchForm.jsx
import React, { useState, useEffect } from "react";

export function HotelSearchForm({ onSearch, initialData }) {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  // Set initial data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setSearchData(initialData);
      // Trigger search with initial data
      onSearch(initialData);
    }
  }, [initialData, onSearch]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get minimum checkout date (day after check-in)
  const getMinCheckoutDate = () => {
    if (!searchData.checkIn) return today;
    const checkInDate = new Date(searchData.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };

  const handleInputChange = (field, value) => {
    const newSearchData = { ...searchData, [field]: value };
    
    // If check-in date changes and check-out is before or same as check-in, reset check-out
    if (field === 'checkIn' && searchData.checkOut) {
      const checkInDate = new Date(value);
      const checkOutDate = new Date(searchData.checkOut);
      if (checkOutDate <= checkInDate) {
        newSearchData.checkOut = "";
      }
    }
    
    setSearchData(newSearchData);
    
    // Trigger search on destination change for real-time filtering
    if (field === 'destination') {
      onSearch(newSearchData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <div className="flex justify-center items-center w-full mb-12">
      <div className="w-full max-w-6xl px-4">
        <form 
          onSubmit={handleSubmit}
          className="
            bg-white text-gray-800
            border border-yellow-400 
            shadow-[0_4px_6px_-1px_rgba(255,192,203,0.5)]
            rounded-lg 
            px-8 py-6 
            flex flex-col gap-6 
            md:flex-row md:gap-8 md:items-end
            max-md:items-start
            mx-auto
          "
        >
          {/* Destination Field */}
          <div className="flex-1 min-w-0">
            <div className='flex items-center gap-3 mb-2'>
              <svg className="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
              </svg>
              <label htmlFor="destinationInput" className="text-sm font-medium text-gray-700">Destination</label>
            </div>
            <input 
              list='destinations' 
              id="destinationInput" 
              type="text" 
              value={searchData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors" 
              placeholder="Where do you want to go?" 
            />
            <datalist id='destinations'>
              <option value="Goa" />
              <option value="Hyderabad" />
              <option value="Lonavala" />
              <option value="Bangalore" />
              <option value="Mumbai" />
              <option value="Delhi" />
              <option value="Kerala" />
              <option value="Rajasthan" />
            </datalist>
          </div>

          {/* Check In Field */}
          <div className="flex-1 min-w-0">
            <div className='flex items-center gap-3 mb-2'>
              <svg className="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>
              <label htmlFor="checkIn" className="text-sm font-medium text-gray-700">Check in</label>
            </div>
            <input 
              id="checkIn" 
              type="date" 
              value={searchData.checkIn}
              min={today}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors" 
            />
          </div>

          {/* Check Out Field */}
          <div className="flex-1 min-w-0">
            <div className='flex items-center gap-3 mb-2'>
              <svg className="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
              </svg>
              <label htmlFor="checkOut" className="text-sm font-medium text-gray-700">Check out</label>
            </div>
            <input 
              id="checkOut" 
              type="date" 
              value={searchData.checkOut}
              min={getMinCheckoutDate()}
              disabled={!searchData.checkIn}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" 
            />
          </div>

          {/* Guests Field */}
          <div className="flex-shrink-0 md:min-w-[120px]">
            <div className='flex items-center gap-3 mb-2 max-md:justify-center'>
              <svg className="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 1 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              <label htmlFor="guests" className="text-sm font-medium text-gray-700">Guests</label>
            </div>
            <input 
              min={1} 
              max={8} 
              id="guests" 
              type="number" 
              value={searchData.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
              className="w-full md:max-w-[100px] rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors text-center" 
              placeholder="1" 
            />
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0 max-md:w-full max-md:mt-2">
            <button 
              type="submit"
              className='flex items-center justify-center gap-2 rounded-md bg-yellow-400 hover:bg-yellow-500 py-3 px-6 text-gray-800 font-medium cursor-pointer transition-colors max-md:w-full max-md:py-3 min-h-[48px]'
            >
              <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <span className="text-[15px] text-gray-800">Search Hotels</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}