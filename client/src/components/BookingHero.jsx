// components/BookingHero.jsx
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { SpotlightNew } from "./ui/spotlight-new";

export function BookingHero() {
  const { user } = useUser();

  return (
    <div className="relative bg-gray-900 overflow-hidden min-h-[80vh] flex items-center">
      {/* Spotlight New Effect */}
      <SpotlightNew    className="absolute inset-0"
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(45, 100%, 85%, .12) 0, hsla(45, 100%, 55%, .04) 50%, hsla(45, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(45, 100%, 85%, .08) 0, hsla(45, 100%, 55%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(45, 100%, 85%, .06) 0, hsla(45, 100%, 45%, .02) 80%, transparent 100%)"
        translateY={-250}
        width={600}
        height={1200}
        smallWidth={280}
        duration={8}
        xOffset={120}
      />

      {/* Dark background overlay */}
      <div className="absolute inset-0 bg-gray-900/80"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:py-32">
        <div className="text-center">
          {/* Welcome Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 mb-8 shadow-lg">
            <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300 text-sm font-medium">
              Welcome back, {user?.firstName || 'Guest'}!
            </span>
          </div>

          {/* Main Heading with Gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 bg-clip-text text-transparent">
              My{" "}
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Manage your reservations and explore your upcoming stays with{" "}
            <span className="text-yellow-400 font-semibold">Glen</span>
          </p>

          {/* Quick Stats with Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold text-gray-200 mb-3 group-hover:text-yellow-400 transition-colors">3</div>
              <div className="text-gray-400 text-lg">Total Bookings</div>
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="group bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-3 group-hover:text-yellow-300 transition-colors">2</div>
              <div className="text-gray-400 text-lg">Upcoming Stays</div>
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="group bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-3 group-hover:text-green-300 transition-colors">1</div>
              <div className="text-gray-400 text-lg">Completed</div>
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25">
            <a href="/hotel">
              <span className="flex items-center">
                Explore More Hotels
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span></a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
