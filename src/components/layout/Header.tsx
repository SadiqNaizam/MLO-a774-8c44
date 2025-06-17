import React from 'react';
import { Link } from 'react-router-dom';
import { Aperture } from 'lucide-react'; // Using Aperture as a placeholder logo icon

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 transition-colors">
              <Aperture className="h-8 w-8 text-blue-500" />
              <span className="font-semibold text-xl tracking-tight">AppLogo</span>
            </Link>
          </div>

          {/* Navigation Links (Optional - kept minimal as per description for auth pages) */}
          {/* 
          <nav className="hidden md:flex space-x-4">
            <Link to="/generic-content" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            // Add other global links here if needed
          </nav>
          */}

          {/* User Actions (Optional - e.g., login/logout button, user avatar) */}
          {/* 
          <div className="hidden md:block">
            // Placeholder for user actions
          </div>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;