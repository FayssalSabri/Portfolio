'use client';

import React from 'react';

const Logo = ({ 
  size = 60, 
  className = "" 
}) => {
  return (
    <img
      src="/Logo.png"
      alt="Fayssal Sabri Logo"
      className={`object-contain ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`
      }}
      onError={(e) => {
        console.error('Logo failed to load');
        e.target.outerHTML = `
          <div class="flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white font-bold ${className}" 
               style="width: ${size}px; height: ${size}px; font-size: ${size * 0.3}px">
            FS
          </div>
        `;
      }}
    />
  );
};

export default Logo;