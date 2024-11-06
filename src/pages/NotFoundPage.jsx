import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
