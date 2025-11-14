import React from "react";
import { Vortex } from "./ui/vortex";
import { useNavigate } from "react-router-dom";

export function VortexDemo() {
  const navigate = useNavigate();

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Experience the Best Hotels with <span className="text-yellow-400">Glen.</span>
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          We offer the best hotel experiences at the most affordable prices.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            onClick={() => navigate('/about')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
          >
            Contact Us
          </button>
        </div>
      </Vortex>
    </div>
  );
}
