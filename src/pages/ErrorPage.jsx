import React from 'react';

import { FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <FaUtensils className="text-6xl text-red-500 mb-4 animate-pulse" />
      
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-md">
        404
      </h1>
      
      <p className="text-gray-600 text-xl font-medium mb-8">
        The page you're looking for doesn't exist on the menu.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/2718/2718224.png"
        alt="Not Found Food"
        className="w-48 h-48 mb-6 opacity-80 hover:scale-105 transition-transform duration-300"
      />

      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded-xl font-bold shadow-md hover:shadow-red-300 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
