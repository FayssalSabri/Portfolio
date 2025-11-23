import React from 'react';

const Logo = ({ 
  size = 60, 
  className = "", 
  logoUrl = "/images/logo/Logo.png",
  darkModeLogoUrl = "/images/logo/Logo.png"
}) => {
  return (
    <div className={`${className}`}>
      {/* Version light mode */}
      <img
        src={logoUrl}
        alt="Fayssal Sabri Logo"
        className="object-contain dark:hidden transition-all"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`
        }}
      />
      
      {/* Version dark mode (si fournie) */}
      {darkModeLogoUrl && (
        <img
          src={darkModeLogoUrl}
          alt="Fayssal Sabri Logo"
          className="object-contain hidden dark:block transition-all"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`
          }}
        />
      )}
    </div>
  );
};

export default Logo;