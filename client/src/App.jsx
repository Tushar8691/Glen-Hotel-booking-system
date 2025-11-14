
import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import { ClerkProvider } from '@clerk/clerk-react';
import ResizableNavbar from "./components/Navbar.jsx";


import Home from "./pages/Home.jsx";
import Hotels from "./pages/Hotel.jsx";
import Booking from "./pages/Booking.jsx";
import Experiences from "./pages/Experiences.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import { Dock } from "./components/Dock.jsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URL;


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

        <ResizableNavbar />
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<Home />} />
          <Route path="/hotel" element={<Hotels />} />
          <Route path="/booking/:hotelId" element={<Booking />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-200 mb-4">404</h1>
                <p className="text-gray-400">Page not found</p>
              </div>
            </div>
          } />
        </Routes>
      <Dock />
      </div>
    </ClerkProvider>


  );
}

export default App;
