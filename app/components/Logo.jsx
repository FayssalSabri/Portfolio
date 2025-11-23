'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ 
  size = 40, 
  className = "",
  showText = false,
  animated = true
}) => {
  
  const strokeWidth = size * 0.1;

  const signature = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.8,
        ease: [0.43, 0.13, 0.23, 0.96] // Courbe naturelle d'écriture
      }
    }
  };

  const dotAppear = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 1.6,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <motion.div 
        className="relative"
        style={{ width: size * 1.2, height: size }}
        initial="hidden"
        animate={animated ? "visible" : "hidden"}
        whileHover={{ scale: 1.05 }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 120 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Signature "F" naturelle */}
          <motion.path
            d="M30 25 C 30 25, 28 40, 30 55 C 32 70, 35 75, 35 75"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={signature}
          />
          
          {/* Barre horizontale supérieure fluide */}
          <motion.path
            d="M30 35 C 35 33, 45 32, 50 35"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={signature}
          />
          
          {/* Barre médiane plus courte */}
          <motion.path
            d="M32 50 C 38 49, 42 48, 45 50"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            variants={signature}
          />

          {/* Point de signature personnel */}
          <motion.circle 
            cx="60" 
            cy="45" 
            r="2.5" 
            fill="currentColor"
            variants={dotAppear}
          />

          {/* Légère courbe artistique */}
          <motion.path
            d="M65 40 Q 70 45, 65 50"
            stroke="currentColor"
            strokeWidth={strokeWidth * 0.8}
            strokeLinecap="round"
            fill="none"
            variants={signature}
          />
        </svg>
      </motion.div>

      {showText && (
        <motion.div 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-sm font-light text-gray-900 dark:text-white leading-none tracking-wide">
            Fayssal Sabri
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;