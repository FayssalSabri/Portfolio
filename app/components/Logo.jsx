import React from 'react';
import Image from 'next/image';

const Logo = ({ 
  size = 60, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/logo/Logo.png"
        alt="Fayssal Sabri"
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;