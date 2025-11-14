// pages/MyBookings.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { BookingHero } from "../components/BookingHero";
import { BookingCards } from "../components/BookingCards";


const MyBookings = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-300 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Access Denied</h1>
          <p className="text-gray-400">Please sign in to view your bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <BookingHero />
      <div className="max-w-6xl mx-auto px-4">
        <BookingCards />

      </div>
    </div>
  );
};

export default MyBookings;
