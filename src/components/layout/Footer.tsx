import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Your Application Name. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
            <Link
              to="/privacy-policy"
              className="text-sm hover:text-gray-900 hover:underline"
            >
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-4 hidden sm:inline-block" />
            <Link
              to="/terms-of-service"
              className="text-sm hover:text-gray-900 hover:underline"
            >
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-4 hidden sm:inline-block" />
            <Link
              to="/contact"
              className="text-sm hover:text-gray-900 hover:underline"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;