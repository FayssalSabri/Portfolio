// Components/Logo.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Database, Zap } from 'lucide-react';

const Logo = ({ size = "medium", className = "", onClick, showSignature = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizes = {
    small: { 
      container: "w-10 h-10", 
      signature: "w-24",
      text: "text-sm",
      icon: 14,
      orbitRadius: 14
    },
    medium: { 
      container: "w-14 h-14", 
      signature: "w-32",
      text: "text-lg",
      icon: 18,
      orbitRadius: 18
    },
    large: { 
      container: "w-18 h-18", 
      signature: "w-40",
      text: "text-xl",
      icon: 22,
      orbitRadius: 22
    }
  };

  // Système de bulles orbitales plus complexe
  const orbitalSystems = [
    {
      orbit: "inner",
      bubbles: [
        { id: 1, color: "bg-blue-400", size: "w-1.5 h-1.5", icon: Zap, duration: 3 },
        { id: 2, color: "bg-purple-400", size: "w-1.5 h-1.5", icon: Cpu, duration: 4 },
        { id: 3, color: "bg-pink-400", size: "w-1.5 h-1.5", icon: Database, duration: 5 },
      ],
      radius: sizes[size].orbitRadius * 0.8
    },
    {
      orbit: "outer", 
      bubbles: [
        { id: 4, color: "bg-cyan-400", size: "w-1 h-1", duration: 6 },
        { id: 5, color: "bg-indigo-400", size: "w-1 h-1", duration: 7 },
        { id: 6, color: "bg-teal-400", size: "w-1 h-1", duration: 8 },
        { id: 7, color: "bg-rose-400", size: "w-1 h-1", duration: 9 },
      ],
      radius: sizes[size].orbitRadius * 1.3
    }
  ];

  return (
    <motion.div
      className={`flex items-center gap-4 cursor-pointer group ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Container principal du logo */}
      <motion.div
        className={`${sizes[size].container} relative`}
        animate={{
          rotate: isHovered ? 180 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Cercle extérieur rotatif PRINCIPAL */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Cercle intérieur fixe */}
        <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain 
              size={sizes[size].icon} 
              className="text-blue-600 dark:text-blue-400"
            />
          </motion.div>
        </div>

        {/* Systèmes de bulles orbitales */}
        {orbitalSystems.map((system, systemIndex) => (
          <motion.div
            key={system.orbit}
            className="absolute inset-0"
            animate={{ rotate: system.orbit === "inner" ? -360 : 360 }}
            transition={{ 
              duration: system.orbit === "inner" ? 12 : 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {system.bubbles.map((bubble, bubbleIndex) => {
              const angle = (bubbleIndex / system.bubbles.length) * 360;
              const IconComponent = bubble.icon;
              
              return (
                <motion.div
                  key={bubble.id}
                  className={`absolute ${bubble.color} ${bubble.size} rounded-full flex items-center justify-center`}
                  style={{
                    left: `50%`,
                    top: `50%`,
                    x: -bubble.size.width / 2 || -6,
                    y: -bubble.size.height / 2 || -6,
                  }}
                  animate={{
                    rotate: 360,
                    x: [
                      `calc(${system.radius}px * cos(${angle}deg) - ${bubble.size.width / 2 || 6}px)`,
                      `calc(${system.radius}px * cos(${angle + 120}deg) - ${bubble.size.width / 2 || 6}px)`,
                      `calc(${system.radius}px * cos(${angle + 240}deg) - ${bubble.size.width / 2 || 6}px)`,
                      `calc(${system.radius}px * cos(${angle + 360}deg) - ${bubble.size.width / 2 || 6}px)`
                    ],
                    y: [
                      `calc(${system.radius}px * sin(${angle}deg) - ${bubble.size.height / 2 || 6}px)`,
                      `calc(${system.radius}px * sin(${angle + 120}deg) - ${bubble.size.height / 2 || 6}px)`,
                      `calc(${system.radius}px * sin(${angle + 240}deg) - ${bubble.size.height / 2 || 6}px)`,
                      `calc(${system.radius}px * sin(${angle + 360}deg) - ${bubble.size.height / 2 || 6}px)`
                    ],
                  }}
                  transition={{
                    duration: bubble.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: bubbleIndex * 0.2,
                  }}
                >
                  {IconComponent && (
                    <IconComponent size={8} className="text-white" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ))}

        {/* Bulles supplémentaires qui apparaissent au hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`hover-bubble-${i}`}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [
                      `calc(${sizes[size].orbitRadius * 1.6}px * cos(${i * 90}deg))`,
                      `calc(${sizes[size].orbitRadius * 1.8}px * cos(${i * 90 + 180}deg))`,
                      `calc(${sizes[size].orbitRadius * 1.6}px * cos(${i * 90 + 360}deg))`
                    ],
                    y: [
                      `calc(${sizes[size].orbitRadius * 1.6}px * sin(${i * 90}deg))`,
                      `calc(${sizes[size].orbitRadius * 1.8}px * sin(${i * 90 + 180}deg))`,
                      `calc(${sizes[size].orbitRadius * 1.6}px * sin(${i * 90 + 360}deg))`
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Effet de glow pulsant */}
        <motion.div
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg -z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Signature */}
      {showSignature && (
        <motion.div className={`${sizes[size].signature} relative`}>
          <motion.span
            className={`${sizes[size].text} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block leading-tight`}
          >
            Fayssal Sabri
          </motion.span>
          <motion.div
            className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1 flex items-center gap-1"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <span>AI & Data Science Engineer</span>
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            >
              <Brain size={10} className="text-purple-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;