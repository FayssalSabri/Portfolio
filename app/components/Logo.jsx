// // Components/Logo.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Brain, Cpu, Database, Zap } from 'lucide-react';

// const Logo = ({ 
//   size = "medium", 
//   className = "", 
//   onClick, 
//   showSignature = true,
//   faviconMode = false 
// }) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   const sizes = {
//     small: { 
//       container: "w-10 h-10", 
//       signature: "w-24",
//       text: "text-sm",
//       icon: 14,
//       orbitRadius: 14
//     },
//     medium: { 
//       container: "w-14 h-14", 
//       signature: "w-32",
//       text: "text-lg",
//       icon: 18,
//       orbitRadius: 18
//     },
//     large: { 
//       container: "w-18 h-18", 
//       signature: "w-40",
//       text: "text-xl",
//       icon: 22,
//       orbitRadius: 22
//     },
//     favicon: {
//       container: "w-6 h-6",
//       signature: "w-0",
//       text: "text-xs",
//       icon: 10,
//       orbitRadius: 8
//     }
//   };

//   const currentSize = faviconMode ? "favicon" : size;

//   // Système de bulles orbitales simplifié pour favicon
//   const orbitalSystems = faviconMode ? [
//     {
//       orbit: "inner",
//       bubbles: [
//         { id: 1, color: "bg-blue-400", size: "w-1 h-1", duration: 4 },
//         { id: 2, color: "bg-purple-400", size: "w-1 h-1", duration: 5 },
//       ],
//       radius: sizes[currentSize].orbitRadius * 0.6
//     }
//   ] : [
//     {
//       orbit: "inner",
//       bubbles: [
//         { id: 1, color: "bg-blue-400", size: "w-1.5 h-1.5", icon: Zap, duration: 3 },
//         { id: 2, color: "bg-purple-400", size: "w-1.5 h-1.5", icon: Cpu, duration: 4 },
//         { id: 3, color: "bg-pink-400", size: "w-1.5 h-1.5", icon: Database, duration: 5 },
//       ],
//       radius: sizes[currentSize].orbitRadius * 0.8
//     },
//     {
//       orbit: "outer", 
//       bubbles: [
//         { id: 4, color: "bg-cyan-400", size: "w-1 h-1", duration: 6 },
//         { id: 5, color: "bg-indigo-400", size: "w-1 h-1", duration: 7 },
//         { id: 6, color: "bg-teal-400", size: "w-1 h-1", duration: 8 },
//         { id: 7, color: "bg-rose-400", size: "w-1 h-1", duration: 9 },
//       ],
//       radius: sizes[currentSize].orbitRadius * 1.3
//     }
//   ];

//   // Pour le mode favicon, on retourne une version simplifiée
//   if (faviconMode) {
//     return (
//       <motion.div
//         className={`${sizes.favicon.container} relative cursor-pointer`}
//         onClick={onClick}
//         animate={{
//           rotate: isHovered ? 180 : 0,
//         }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Cercle extérieur rotatif */}
//         <motion.div
//           className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         />

//         {/* Cercle intérieur fixe */}
//         <div className="absolute inset-0.5 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
//           <Brain 
//             size={sizes.favicon.icon} 
//             className="text-blue-600 dark:text-blue-400"
//           />
//         </div>

//         {/* Bulles orbitales simplifiées */}
//         {orbitalSystems.map((system, systemIndex) => (
//           <motion.div
//             key={system.orbit}
//             className="absolute inset-0"
//             animate={{ rotate: -360 }}
//             transition={{ 
//               duration: 10, 
//               repeat: Infinity, 
//               ease: "linear" 
//             }}
//           >
//             {system.bubbles.map((bubble, bubbleIndex) => {
//               const angle = (bubbleIndex / system.bubbles.length) * 360;
              
//               return (
//                 <motion.div
//                   key={bubble.id}
//                   className={`absolute ${bubble.color} ${bubble.size} rounded-full`}
//                   style={{
//                     left: `50%`,
//                     top: `50%`,
//                   }}
//                   animate={{
//                     x: [
//                       `calc(${system.radius}px * cos(${angle}deg) - 2px)`,
//                       `calc(${system.radius}px * cos(${angle + 360}deg) - 2px)`
//                     ],
//                     y: [
//                       `calc(${system.radius}px * sin(${angle}deg) - 2px)`,
//                       `calc(${system.radius}px * sin(${angle + 360}deg) - 2px)`
//                     ],
//                   }}
//                   transition={{
//                     duration: bubble.duration,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                 />
//               );
//             })}
//           </motion.div>
//         ))}
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       className={`flex items-center gap-4 cursor-pointer group ${className}`}
//       onClick={onClick}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//     >
//       {/* Container principal du logo */}
//       <motion.div
//         className={`${sizes[currentSize].container} relative`}
//         animate={{
//           rotate: isHovered ? 180 : 0,
//         }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Cercle extérieur rotatif PRINCIPAL */}
//         <motion.div
//           className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         />

//         {/* Cercle intérieur fixe */}
//         <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
//           <motion.div
//             animate={{ scale: [1, 1.08, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <Brain 
//               size={sizes[currentSize].icon} 
//               className="text-blue-600 dark:text-blue-400"
//             />
//           </motion.div>
//         </div>

//         {/* Systèmes de bulles orbitales */}
//         {orbitalSystems.map((system, systemIndex) => (
//           <motion.div
//             key={system.orbit}
//             className="absolute inset-0"
//             animate={{ rotate: system.orbit === "inner" ? -360 : 360 }}
//             transition={{ 
//               duration: system.orbit === "inner" ? 12 : 15, 
//               repeat: Infinity, 
//               ease: "linear" 
//             }}
//           >
//             {system.bubbles.map((bubble, bubbleIndex) => {
//               const angle = (bubbleIndex / system.bubbles.length) * 360;
//               const IconComponent = bubble.icon;
              
//               return (
//                 <motion.div
//                   key={bubble.id}
//                   className={`absolute ${bubble.color} ${bubble.size} rounded-full flex items-center justify-center`}
//                   style={{
//                     left: `50%`,
//                     top: `50%`,
//                     x: -bubble.size.width / 2 || -6,
//                     y: -bubble.size.height / 2 || -6,
//                   }}
//                   animate={{
//                     rotate: 360,
//                     x: [
//                       `calc(${system.radius}px * cos(${angle}deg) - ${bubble.size.width / 2 || 6}px)`,
//                       `calc(${system.radius}px * cos(${angle + 120}deg) - ${bubble.size.width / 2 || 6}px)`,
//                       `calc(${system.radius}px * cos(${angle + 240}deg) - ${bubble.size.width / 2 || 6}px)`,
//                       `calc(${system.radius}px * cos(${angle + 360}deg) - ${bubble.size.width / 2 || 6}px)`
//                     ],
//                     y: [
//                       `calc(${system.radius}px * sin(${angle}deg) - ${bubble.size.height / 2 || 6}px)`,
//                       `calc(${system.radius}px * sin(${angle + 120}deg) - ${bubble.size.height / 2 || 6}px)`,
//                       `calc(${system.radius}px * sin(${angle + 240}deg) - ${bubble.size.height / 2 || 6}px)`,
//                       `calc(${system.radius}px * sin(${angle + 360}deg) - ${bubble.size.height / 2 || 6}px)`
//                     ],
//                   }}
//                   transition={{
//                     duration: bubble.duration,
//                     repeat: Infinity,
//                     ease: "linear",
//                     delay: bubbleIndex * 0.2,
//                   }}
//                 >
//                   {IconComponent && (
//                     <IconComponent size={8} className="text-white" />
//                   )}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         ))}

//         {/* Bulles supplémentaires qui apparaissent au hover */}
//         <AnimatePresence>
//           {isHovered && (
//             <>
//               {[...Array(4)].map((_, i) => (
//                 <motion.div
//                   key={`hover-bubble-${i}`}
//                   className="absolute w-1 h-1 bg-yellow-400 rounded-full"
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{
//                     scale: [0, 1, 0],
//                     opacity: [0, 1, 0],
//                     x: [
//                       `calc(${sizes[currentSize].orbitRadius * 1.6}px * cos(${i * 90}deg))`,
//                       `calc(${sizes[currentSize].orbitRadius * 1.8}px * cos(${i * 90 + 180}deg))`,
//                       `calc(${sizes[currentSize].orbitRadius * 1.6}px * cos(${i * 90 + 360}deg))`
//                     ],
//                     y: [
//                       `calc(${sizes[currentSize].orbitRadius * 1.6}px * sin(${i * 90}deg))`,
//                       `calc(${sizes[currentSize].orbitRadius * 1.8}px * sin(${i * 90 + 180}deg))`,
//                       `calc(${sizes[currentSize].orbitRadius * 1.6}px * sin(${i * 90 + 360}deg))`
//                     ],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     delay: i * 0.5,
//                   }}
//                 />
//               ))}
//             </>
//           )}
//         </AnimatePresence>

//         {/* Effet de glow pulsant */}
//         <motion.div
//           className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg -z-10"
//           animate={{ 
//             scale: [1, 1.1, 1],
//             opacity: [0.2, 0.4, 0.2]
//           }}
//           transition={{ duration: 3, repeat: Infinity }}
//         />
//       </motion.div>

//       {/* Signature */}
//       {showSignature && (
//         <motion.div className={`${sizes[currentSize].signature} relative`}>
//           <motion.span
//             className={`${sizes[currentSize].text} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block leading-tight`}
//           >
//             Fayssal Sabri
//           </motion.span>
//           <motion.div
//             className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1 flex items-center gap-1"
//             animate={{ opacity: isHovered ? 1 : 0.7 }}
//           >
//             <span>AI & Data Science Engineer</span>
//             <motion.div
//               animate={{ rotate: isHovered ? 360 : 0 }}
//               transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
//             >
//               <Brain size={10} className="text-purple-500" />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Logo;

// Components/Logo.jsx
// Components/Logo.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Logo = ({ 
  size = "medium", 
  className = "", 
  onClick, 
  showSignature = true,
  faviconMode = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizes = {
    small: { 
      container: "w-12 h-12", 
      signature: "w-28",
      text: "text-sm",
      lineWidth: 2,
      nodeSize: 2.5,
      bubbleSize: 3
    },
    medium: { 
      container: "w-16 h-16", 
      signature: "w-36",
      text: "text-lg",
      lineWidth: 2.5,
      nodeSize: 3,
      bubbleSize: 4
    },
    large: { 
      container: "w-20 h-20", 
      signature: "w-44",
      text: "text-xl",
      lineWidth: 3,
      nodeSize: 3.5,
      bubbleSize: 5
    },
    favicon: {
      container: "w-8 h-8",
      signature: "w-0",
      text: "text-xs",
      lineWidth: 1.5,
      nodeSize: 2,
      bubbleSize: 2.5
    }
  };

  const currentSize = faviconMode ? "favicon" : size;
  const config = sizes[currentSize];

  // Structure du cerveau plus visible
  const brainStructure = [
    // Contour principal épaissi
    { type: 'path', d: "M35,40 Q25,50 35,60 Q40,70 50,75 Q60,70 65,60 Q75,50 65,40 Q60,30 50,25 Q40,30 35,40", color: "#2563EB" },
    
    // Séparation hémisphères plus visible
    { type: 'path', d: "M50,25 Q45,35 50,45 Q55,55 50,65 Q45,75 50,75 Q55,75 50,65 Q45,55 50,45 Q55,35 50,25", color: "#7C3AED" }
  ];

  // Points de connexion plus gros
  const nodes = [
    { id: 1, x: 40, y: 45, color: "#2563EB", delay: 0 },
    { id: 2, x: 35, y: 55, color: "#2563EB", delay: 0.2 },
    { id: 3, x: 45, y: 65, color: "#2563EB", delay: 0.4 },
    { id: 4, x: 55, y: 45, color: "#7C3AED", delay: 0.1 },
    { id: 5, x: 60, y: 55, color: "#7C3AED", delay: 0.3 },
    { id: 6, x: 50, y: 60, color: "#DC2626", delay: 0.5 }
  ];

  // Connexions plus épaisses
  const connections = [
    { from: 1, to: 2, duration: 2.0 },
    { from: 2, to: 3, duration: 2.5 },
    { from: 4, to: 5, duration: 2.2 },
    { from: 1, to: 6, duration: 1.8 },
    { from: 3, to: 6, duration: 2.1 },
    { from: 4, to: 6, duration: 2.3 },
    { from: 5, to: 6, duration: 2.4 }
  ];

  // Particules plus grosses et visibles
  const particles = [...Array(6)].map((_, i) => ({
    id: i,
    size: 1.2,
    duration: 2 + i * 0.3,
    delay: i * 0.5,
    path: connections[i % connections.length]
  }));

  // 3 bulles Google plus grosses et mieux placées
  const googleBubbles = [
    { 
      id: 1, 
      color: "#4285F4", // Bleu Google
      x: 15, 
      y: 25,
      delay: 0,
      duration: 2.5,
      size: 1.2
    },
    { 
      id: 2, 
      color: "#EA4335", // Rouge Google
      x: 85, 
      y: 25,
      delay: 0.4,
      duration: 3,
      size: 1
    },
    { 
      id: 3, 
      color: "#34A853", // Vert Google
      x: 50, 
      y: 90,
      delay: 0.8,
      duration: 3.5,
      size: 1.1
    }
  ];

  const Connection = ({ connection }) => {
    const fromNode = nodes.find(n => n.id === connection.from);
    const toNode = nodes.find(n => n.id === connection.to);
    
    return (
      <>
        {/* Ligne principale plus épaisse */}
        <motion.line
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke="url(#connectionGradient)"
          strokeWidth={config.lineWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0.4, opacity: 0.6 }}
          animate={{ 
            pathLength: isHovered ? 0.9 : 0.4,
            opacity: isHovered ? 1 : 0.6
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Éclair blanc plus visible */}
        <motion.line
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke="#FFFFFF"
          strokeWidth={config.lineWidth * 0.8}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: connection.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </>
    );
  };

  const Node = ({ node }) => (
    <motion.g>
      {/* Glow externe plus visible */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={config.nodeSize * 1.5}
        fill={node.color}
        opacity="0.4"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: node.delay,
          ease: "easeInOut"
        }}
      />
      
      {/* Nœud principal plus gros */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={config.nodeSize}
        fill={node.color}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: node.delay,
          ease: "easeInOut"
        }}
      />
      
      {/* Cœur blanc plus brillant */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={config.nodeSize * 0.6}
        fill="#FFFFFF"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: node.delay,
          ease: "easeInOut"
        }}
      />
    </motion.g>
  );

  const Particle = ({ particle }) => {
    const connection = particle.path;
    const fromNode = nodes.find(n => n.id === connection.from);
    const toNode = nodes.find(n => n.id === connection.to);
    
    return (
      <motion.circle
        r={particle.size}
        fill="#FFFFFF"
        initial={{ x: fromNode.x, y: fromNode.y }}
        animate={{
          x: [fromNode.x, toNode.x],
          y: [fromNode.y, toNode.y],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut"
        }}
      />
    );
  };

  const GoogleBubble = ({ bubble }) => (
    <motion.g>
      {/* Glow autour de la bulle */}
      <motion.circle
        cx={bubble.x}
        cy={bubble.y}
        r={config.bubbleSize * bubble.size * 1.8}
        fill={bubble.color}
        opacity="0.3"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: bubble.duration,
          repeat: Infinity,
          delay: bubble.delay,
          ease: "easeInOut"
        }}
      />
      
      {/* Bulle principale plus grosse */}
      <motion.circle
        cx={bubble.x}
        cy={bubble.y}
        r={config.bubbleSize * bubble.size}
        fill={bubble.color}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: bubble.duration,
          repeat: Infinity,
          delay: bubble.delay,
          ease: "easeInOut"
        }}
      />
      
      {/* Point central très visible */}
      <motion.circle
        cx={bubble.x}
        cy={bubble.y}
        r={config.bubbleSize * bubble.size * 0.5}
        fill="#FFFFFF"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: bubble.duration * 0.6,
          repeat: Infinity,
          delay: bubble.delay,
          ease: "easeInOut"
        }}
      />
      
      {/* Ligne de connexion plus visible */}
      <motion.line
        x1={bubble.x}
        y1={bubble.y}
        x2="50"
        y2="50"
        stroke={bubble.color}
        strokeWidth={config.lineWidth * 0.6}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: bubble.duration,
          repeat: Infinity,
          delay: bubble.delay,
          ease: "easeInOut"
        }}
      />
    </motion.g>
  );

  return (
    <motion.div
      className={`flex items-center gap-4 cursor-pointer group ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <motion.div
        className={`${config.container} relative bg-transparent`}
        animate={{
          rotateZ: isHovered ? 8 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0"
        >
          <defs>
            {/* Gradients plus contrastés */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Bulles Google - dessinées en premier pour être en arrière-plan */}
          {googleBubbles.map(bubble => (
            <GoogleBubble key={bubble.id} bubble={bubble} />
          ))}

          {/* Remplissage du cerveau plus visible */}
          <motion.path
            d="M35,40 Q25,50 35,60 Q40,70 50,75 Q60,70 65,60 Q75,50 65,40 Q60,30 50,25 Q40,30 35,40"
            fill="url(#brainGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Structure du cerveau */}
          {brainStructure.map((shape, index) => (
            <motion.path
              key={index}
              d={shape.d}
              fill="none"
              stroke={shape.color}
              strokeWidth={config.lineWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.2, delay: index * 0.2 }}
            />
          ))}

          {/* Connexions */}
          {connections.map(connection => (
            <Connection key={`${connection.from}-${connection.to}`} connection={connection} />
          ))}

          {/* Nœuds */}
          {nodes.map(node => (
            <Node key={node.id} node={node} />
          ))}

          {/* Particules */}
          {particles.map(particle => (
            <Particle key={particle.id} particle={particle} />
          ))}

          {/* Pulsation globale plus visible */}
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1"
            opacity="0.4"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Glow externe plus visible */}
        <motion.div
          className="absolute -inset-3 rounded-full -z-10 blur-md"
          animate={{ 
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.15 : 1,
            background: [
              'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
            ]
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Signature avec meilleur contraste */}
      {showSignature && !faviconMode && (
        <motion.div className={`${config.signature} relative`}>
          <motion.span
            className={`${config.text} font-semibold text-slate-800 dark:text-slate-200 block leading-tight`}
            animate={{ opacity: isHovered ? 1 : 0.9 }}
          >
            Fayssal Sabri
          </motion.span>
          <motion.div
            className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 flex items-center gap-2"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            <span>AI & Machine Learning Engineer</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity 
              }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;