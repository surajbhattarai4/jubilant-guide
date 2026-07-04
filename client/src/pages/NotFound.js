import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-bold"
        >
          Go Home <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;