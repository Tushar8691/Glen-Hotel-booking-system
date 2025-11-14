// components/BookingCards.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FollowerPointerCard } from "./ui/following-pointer";

export function BookingCards() {
  const [activeFilter, setActiveFilter] = useState('all');

  const bookingCards = [
    {
      id: 1,
      title: "The Grand Palace",
      subtitle: "Ocean Suite",
      location: "Goa, India",
      status: "confirmed",
      checkIn: "March 15, 2025",
      checkOut: "March 20, 2025",
      guests: "2 Adults",
      price: "₹62,500",
      nights: 5,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3540&auto=format&fit=crop",
      bookingRef: "GP2025001"
    },
    {
      id: 2,
      title: "Alpine Haven",
      subtitle: "Mountain View Room",
      location: "Lonavala, India",
      status: "confirmed",
      checkIn: "April 10, 2025",
      checkOut: "April 15, 2025",
      guests: "2 Adults, 1 Child",
      price: "₹31,000",
      nights: 5,
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3540&auto=format&fit=crop",
      bookingRef: "AH2025002"
    },
    {
      id: 3,
      title: "Urban Retreat",
      subtitle: "Executive Suite",
      location: "Bangalore, India",
      status: "pending",
      checkIn: "May 5, 2025",
      checkOut: "May 8, 2025",
      guests: "1 Adult",
      price: "₹26,250",
      nights: 3,
      src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=3540&auto=format&fit=crop",
      bookingRef: "UR2025003"
    },
    // Add a cancelled booking for demo
    {
      id: 4,
      title: "Coastal Paradise",
      subtitle: "Beach Villa",
      location: "Goa, India",
      status: "cancelled",
      checkIn: "February 10, 2025",
      checkOut: "February 15, 2025",
      guests: "4 Adults",
      price: "₹45,000",
      nights: 5,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=3540&auto=format&fit=crop",
      bookingRef: "CP2025004"
    },
  ];

  // Manage local bookings persisted by Booking page
  const [localBookingsState, setLocalBookingsState] = useState([]);

  const loadLocalBookings = () => {
    try {
      const raw = localStorage.getItem('localBookings');
      if (!raw) return setLocalBookingsState([]);
      const parsed = JSON.parse(raw || '[]');
      const mapped = parsed.map((b, idx) => ({
        id: `local-${b.id}-${idx}`,
        title: b.title,
        subtitle: b.subtitle || b.title,
        location: b.location,
        status: b.status || 'pending',
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
        price: b.price,
        nights: b.nights || 1,
        src: b.src || 'https://images.unsplash.com/photo-1501117716987-c8e5663d62b6?q=80&w=1600&auto=format&fit=crop',
        bookingRef: b.bookingRef || b.id,
      }));
      setLocalBookingsState(mapped);
    } catch (e) {
      console.error('Error reading local bookings', e);
      setLocalBookingsState([]);
    }
  };

  useEffect(() => {
    loadLocalBookings();
    const onStorage = (e) => {
      if (e.key === 'localBookings') loadLocalBookings();
    };
    const onLocalUpdate = () => loadLocalBookings();
    window.addEventListener('storage', onStorage);
    window.addEventListener('localBookingsUpdated', onLocalUpdate);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('localBookingsUpdated', onLocalUpdate);
    };
  }, []);

  // Prepend local bookings so they show first
  const mergedBookings = [...localBookingsState, ...bookingCards];

  // Filter bookings based on active filter
  const filteredBookings = useMemo(() => {
    if (activeFilter === 'all') {
      return mergedBookings;
    }
    return mergedBookings.filter(booking => booking.status === activeFilter);
  }, [activeFilter, localBookingsState]);

  // Get count for each filter
  const getFilterCount = (filterType) => {
    if (filterType === 'all') return mergedBookings.length;
    return mergedBookings.filter(booking => booking.status === filterType).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-900/50 text-green-400 border-green-700/50';
      case 'pending': return 'bg-yellow-900/50 text-yellow-400 border-yellow-700/50';
      case 'cancelled': return 'bg-red-900/50 text-red-400 border-red-700/50';
      default: return 'bg-gray-800/50 text-gray-400 border-gray-700/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Tabs with Counts */}
        <FollowerPointerCard>
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'confirmed', 'pending', 'cancelled'].map((filter) => {
            const count = getFilterCount(filter);
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeFilter === filter 
                      ? 'bg-gray-900 text-yellow-400' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        </FollowerPointerCard>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-400 text-lg">
            {activeFilter === 'all' 
              ? `Showing all ${filteredBookings.length} bookings`
              : `Found ${filteredBookings.length} ${activeFilter} booking${filteredBookings.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Booking Cards Grid with Animation */}
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600"
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={booking.src}
                      alt={booking.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium">#{booking.bookingRef}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Hotel Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-200 mb-1">{booking.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{booking.subtitle}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {booking.location}
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Check-in</span>
                        <span className="text-gray-200 font-medium text-sm">{booking.checkIn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Check-out</span>
                        <span className="text-gray-200 font-medium text-sm">{booking.checkOut}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Guests</span>
                        <span className="text-gray-200 font-medium text-sm">{booking.guests}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{booking.nights} nights</span>
                        <span className="text-yellow-400 font-bold text-lg">{booking.price}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto border border-gray-700">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-200 mb-2">
                  No {activeFilter === 'all' ? '' : activeFilter} bookings found
                </h3>
                <p className="text-gray-400">
                  {activeFilter === 'all' 
                    ? "You don't have any bookings yet. Start exploring our hotels!"
                    : `You don't have any ${activeFilter} bookings.`
                  }
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
