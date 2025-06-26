import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-500 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <span className="text-gray-600 text-white">
            📋 Vendor Management System © {currentYear} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
