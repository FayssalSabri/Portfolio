import React from 'react';

const Logo = ({ showSignature = false, size = "medium", showText = false, className = "", variant = "default" }) => {
  // Tailles prédéfinies
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 80,
    xxlarge: 120
  };

  const logoSize = typeof size === 'string' ? sizeMap[size] || sizeMap.medium : size;

  // Couleurs selon la variante
  const getColors = () => {
    switch (variant) {
      case "monochrome":
        return {
          stroke: "currentColor",
          fill: "currentColor",
          opacity: "0.9"
        };
      case "outline":
        return {
          stroke: "currentColor",
          fill: "none",
          opacity: "0.8"
        };
      default:
        return {
          stroke: "currentColor",
          fill: "currentColor",
          opacity: "0.9"
        };
    }
  };

  const colors = getColors();

  if (showSignature) {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <svg 
          width={logoSize} 
          height={logoSize} 
          viewBox="0 0 200 200" 
          className="transition-transform hover:scale-105"
        >
          {/* Cercle background très subtil */}
          <circle cx="100" cy="100" r="90" fill="currentColor" opacity="0.05"/>
          
          {/* F avec design tech - version épurée */}
          <path 
            d="M 65 65 L 120 65 L 120 75 L 75 75 L 75 95 L 110 95 L 110 105 L 75 105 L 75 135" 
            stroke={colors.stroke}
            strokeWidth="6" 
            strokeLinecap="square"
            fill="none"
            opacity={colors.opacity}
          />
          
          {/* Points tech décoratifs - version discrète */}
          <circle cx="125" cy="70" r="3" fill={colors.fill} opacity="0.7"/>
          <circle cx="115" cy="100" r="3" fill={colors.fill} opacity="0.7"/>
          <circle cx="80" cy="140" r="3" fill={colors.fill} opacity="0.7"/>
          
          {/* S avec design tech */}
          <path 
            d="M 130 80 L 145 80 Q 155 80 155 90 Q 155 100 145 100 L 135 100 Q 125 100 125 110 Q 125 120 135 120 L 150 120" 
            stroke={colors.stroke}
            strokeWidth="6" 
            strokeLinecap="square"
            fill="none"
            opacity={colors.opacity}
          />
        </svg>
        {showText && (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Fayssal Sabri
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI & Data Science</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg 
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 200 200" 
        className="transition-transform hover:scale-105"
      >
        {/* Version épurée sans background */}
        
        {/* F avec design tech */}
        <path 
          d="M 65 65 L 120 65 L 120 75 L 75 75 L 75 95 L 110 95 L 110 105 L 75 105 L 75 135" 
          stroke={colors.stroke}
          strokeWidth="6" 
          strokeLinecap="square"
          fill="none"
          opacity={colors.opacity}
        />
        
        {/* Points tech décoratifs réduits */}
        <circle cx="125" cy="70" r="2.5" fill={colors.fill} opacity="0.8"/>
        <circle cx="115" cy="100" r="2.5" fill={colors.fill} opacity="0.8"/>
        <circle cx="80" cy="140" r="2.5" fill={colors.fill} opacity="0.8"/>
        
        {/* S avec design tech */}
        <path 
          d="M 130 80 L 145 80 Q 155 80 155 90 Q 155 100 145 100 L 135 100 Q 125 100 125 110 Q 125 120 135 120 L 150 120" 
          stroke={colors.stroke}
          strokeWidth="6" 
          strokeLinecap="square"
          fill="none"
          opacity={colors.opacity}
        />
      </svg>
    </div>
  );
};

// Version alternative avec différentes variantes
export const LogoVariants = {
  // Version Pro (par défaut)
  Pro: (props) => <Logo {...props} />,
  
  // Version avec contour seulement
  Outline: (props) => <Logo {...props} variant="outline" />,
  
  // Version monochrome
  Monochrome: (props) => <Logo {...props} variant="monochrome" />,
  
  // Version avec texte professionnel
  WithText: ({ size = 120, showText = true, className = "" }) => (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        className="transition-transform hover:scale-105 text-gray-900 dark:text-white"
      >
        {/* Design épuré */}
        <path 
          d="M 65 65 L 120 65 L 120 75 L 75 75 L 75 95 L 110 95 L 110 105 L 75 105 L 75 135" 
          stroke="currentColor"
          strokeWidth="6" 
          strokeLinecap="square"
          fill="none"
          opacity="0.9"
        />
        
        {/* Points discrets */}
        <circle cx="125" cy="70" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="115" cy="100" r="3" fill="currentColor" opacity="0.7"/>
        <circle cx="80" cy="140" r="3" fill="currentColor" opacity="0.7"/>
        
        {/* S design */}
        <path 
          d="M 130 80 L 145 80 Q 155 80 155 90 Q 155 100 145 100 L 135 100 Q 125 100 125 110 Q 125 120 135 120 L 150 120" 
          stroke="currentColor"
          strokeWidth="6" 
          strokeLinecap="square"
          fill="none"
          opacity="0.9"
        />
      </svg>
      {showText && (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Fayssal Sabri
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI & Data Science Engineer</p>
        </div>
      )}
    </div>
  ),
  
  // Version minimaliste pour la navigation
  Minimal: ({ size = "medium", className = "" }) => {
    const sizeMap = {
      small: 32,
      medium: 48,
      large: 64,
      xlarge: 80
    };

    const logoSize = sizeMap[size] || sizeMap.medium;

    return (
      <svg 
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 200 200" 
        className={`transition-transform hover:scale-105 text-gray-900 dark:text-white ${className}`}
      >
        {/* Version ultra épurée pour navigation */}
        <path 
          d="M 65 65 L 120 65 L 120 75 L 75 75 L 75 95 L 110 95 L 110 105 L 75 105 L 75 135 M 130 80 L 145 80 Q 155 80 155 90 Q 155 100 145 100 L 135 100 Q 125 100 125 110 Q 125 120 135 120 L 150 120" 
          stroke="currentColor"
          strokeWidth="5" 
          strokeLinecap="square"
          fill="none"
          opacity="0.9"
        />
      </svg>
    );
  },

  // Version badge professionnel
  Badge: ({ size = "medium", className = "" }) => {
    const sizeMap = {
      small: 40,
      medium: 56,
      large: 72
    };

    const logoSize = sizeMap[size] || sizeMap.medium;

    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <svg 
          width={logoSize} 
          height={logoSize} 
          viewBox="0 0 200 200" 
          className="transition-transform hover:scale-105 text-gray-900 dark:text-white"
        >
          {/* Cercle subtil */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
          
          {/* Logo principal */}
          <path 
            d="M 65 65 L 120 65 L 120 75 L 75 75 L 75 95 L 110 95 L 110 105 L 75 105 L 75 135" 
            stroke="currentColor"
            strokeWidth="5" 
            strokeLinecap="square"
            fill="none"
            opacity="0.9"
          />
          
          <path 
            d="M 130 80 L 145 80 Q 155 80 155 90 Q 155 100 145 100 L 135 100 Q 125 100 125 110 Q 125 120 135 120 L 150 120" 
            stroke="currentColor"
            strokeWidth="5" 
            strokeLinecap="square"
            fill="none"
            opacity="0.9"
          />
        </svg>
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white text-sm leading-none">
            Fayssal Sabri
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-xs leading-none">
            AI Engineer
          </span>
        </div>
      </div>
    );
  }
};

export default Logo;