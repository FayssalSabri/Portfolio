'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, BarChart3 ,Moon, Sun, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Code, Database, Brain, Cloud, ChevronDown, ExternalLink, Menu, X, ArrowRight, Sparkles, Target, Users, TrendingUp, Zap, Shield, Activity, BookOpen, Lightbulb, Rocket, Cpu, Palette, Server, Terminal, ClipboardCheck, Workflow, Send, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import Logo from './Logo';
// ----------------------------------------------------------------
// OPTIMIZED UTILITIES
// ----------------------------------------------------------------
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Optimized random generator
const useDeterministicRandom = (seed = 0) => {
  return useCallback((index) => {
    const x = Math.sin(index * 12.9898 + seed * 7.233) * 43758.5453;
    return x - Math.floor(x);
  }, [seed]);
};

// ----------------------------------------------------------------
// ENHANCED COMPONENTS
// ----------------------------------------------------------------

// Enhanced Scroll Progress with performance optimization
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    const throttledScroll = throttle(updateScrollProgress, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      style={{ transformOrigin: '0%' }}
      transition={{ duration: 0.1 }}
    />
  );
};

// Enhanced Contact Form with consistent sizing
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:fayssal.sabri.pro@gmail.com?subject=${subject}&body=${body}`;
      
      setStatus({ 
        type: 'success', 
        message: 'Your email client is opening... Please complete sending!' 
      });
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);

    } catch (error) {
      console.error('Email error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Error while sending. Please send me an email directly at fayssal.sabri.pro@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col"
    >
      <div className="text-center mb-8 flex-shrink-0">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Mail className="text-white" size={28} />
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Contact Me
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Let's discuss your next project
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
            placeholder="Select a topic"
          />
        </div>
        
        <div className="flex-grow">
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full h-full min-h-[120px] px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-vertical"
            placeholder="Write your message..."
          />
        </div>

        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl flex-shrink-0 ${
              status.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : status.type === 'error'
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {status.type === 'success' && <CheckCircle className="text-green-600 dark:text-green-400" size={20} />}
              {status.type === 'error' && <AlertCircle className="text-red-600 dark:text-red-400" size={20} />}
              {status.type === 'loading' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                </motion.div>
              )}
              <p className={`text-sm font-medium ${
                status.type === 'success' 
                  ? 'text-green-700 dark:text-green-400' 
                  : status.type === 'error'
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-blue-700 dark:text-blue-400'
              }`}>
                {status.message}
              </p>
            </div>
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex-shrink-0"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
              Sending...
            </>
          ) : (
            <>
              <Send size={20} />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Enhanced Contact Information Card
const ContactInformation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col">
        <div className="text-center mb-8 flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="text-white" size={28} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Contact Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Let's connect and create something amazing
          </p>
        </div>
        
        {/* Contact Items */}
        <div className="space-y-6 mb-8 flex-grow">
          {[
            { 
              icon: Linkedin, 
              label: 'LinkedIn', 
              value: 'in/fayssalsabri', 
              href: 'https://www.linkedin.com/in/fayssalsabri',
              description: 'Professional network & experience'
            },
            { 
              icon: Github, 
              label: 'GitHub', 
              value: '@fayssalsabri', 
              href: 'https://github.com/fayssalsabri',
              description: 'Open source projects & contributions'
            },
            { 
              icon: MapPin, 
              label: 'Location', 
              value: 'Lyon, France',
              description: 'Open to remote & onsite opportunities'
            },
            { 
              icon: Mail, 
              label: 'Email', 
              value: 'fayssal.sabri.pro@gmail.com', 
              href: 'mailto:fayssal.sabri.pro@gmail.com',
              description: 'Direct contact for opportunities'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group border border-gray-100 dark:border-gray-700/50"
            >
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform flex-shrink-0">
                <item.icon className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm block mb-1 truncate"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{item.value}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Availability Section - Integrated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg flex-shrink-0"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-white/20">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Current Status</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-300">Available immediately</span>
              </div>
            </div>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Actively seeking <span className="font-semibold">full-time opportunities</span> in AI Engineering, 
            Data Science, and Machine Learning roles.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-medium">AI Engineering</span>
            <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-medium">Data Science</span>
            <span className="px-2 py-1 bg-white/20 rounded-lg text-xs font-medium">MLOps</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
// Performance Metrics Component
const PerformanceMetrics = () => {
  const metrics = [
    {
      value: "AI & Data",
      label: "Technical Expertise",
      icon: BrainCircuit,
      color: "from-indigo-500 to-purple-600",
    },
    {
      value: "+5 projects",
      label: "Industry / Research Experience",
      icon: Workflow,
      color: "from-emerald-500 to-teal-600",
    },
    {
      value: "Python, DL, ML",
      label: "Technology Stack",
      icon: Cpu,
      color: "from-blue-500 to-cyan-600",
    },
    {
      value: "Analysis & Modeling",
      label: "Quantitative Skills",
      icon: BarChart3,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="text-center p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
            >
              <Icon className="text-white" size={24} />
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {metric.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Enhanced Floating Elements with optimized performance
const FloatingAIElements = () => {
  const getRandom = useDeterministicRandom(1);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const handleResize = throttle(checkMobile, 250);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const aiIcons = isMobile 
    ? [Brain, Code, Cloud, Cpu, Rocket, Lightbulb]
    : [Brain, Code, Cloud, Cpu, Rocket, Lightbulb, Shield, Database, Activity, Zap];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Optimized Neural Network Grid */}
      <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05]">
        <svg width="100%" height="100%" className="text-blue-500">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Optimized Floating AI Icons */}
      {aiIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/5 dark:text-blue-300/5"
          style={{
            left: `${getRandom(index) * 100}%`,
            top: `${getRandom(index + 100) * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, getRandom(index) * 20 - 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: isMobile ? 15 + index * 2 : 12 + index * 2,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        >
          <Icon size={isMobile ? 24 + getRandom(index + 200) * 16 : 28 + getRandom(index + 200) * 24} />
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Gradient Orb with better performance
const GradientOrb = ({ className, delay = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-10 ${className}`}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: isMobile ? 15 : 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Enhanced Background with optimized performance
const EnhancedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <GradientOrb className="top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-400 to-purple-500" />
      <GradientOrb className="bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-pink-400 to-blue-500" delay={4} />
      <GradientOrb className="top-3/4 left-1/4 w-1/3 h-1/3 bg-gradient-to-r from-green-400 to-cyan-500" delay={8} />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <FloatingAIElements />
    </div>
  );
};

// Enhanced Typewriter with better performance
const AITypewriter = ({ texts, delay = 50, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    if (!isDeleting && currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, delay / 2);
      return () => clearTimeout(timeout);
    } else if (currentIndex === currentText.length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }
  }, [currentIndex, isDeleting, texts, currentTextIndex, delay]);
  
  return (
    <span className={`${className} inline-flex`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Enhanced TiltCard with mobile optimization
const TiltCard = ({ children, className = "", intensity = 15 }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / intensity;
    const rotateY = (centerX - x) / intensity;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      animate={!isMobile ? { rotateX: rotate.x, rotateY: rotate.y } : {}}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Custom Cursor that doesn't interfere with text
const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable = target.closest('button') || target.closest('a') || target.closest('[role="button"]');
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Only enable on desktop
    if (window.innerWidth >= 768) {
      document.addEventListener('mousemove', updateCursor);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        document.removeEventListener('mousemove', updateCursor);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`fixed w-3 h-3 rounded-full pointer-events-none z-50 bg-blue-600 transition-all duration-150 ${
          isPointer ? 'scale-150 bg-purple-600' : 'scale-100'
        } ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: cursorPosition.x - 6,
          y: cursorPosition.y - 6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Outer ring */}
      <motion.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-blue-400/50 transition-all duration-300 ${
          isPointer ? 'scale-150 border-purple-400/70' : 'scale-100'
        } ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
      />
    </>
  );
};

// Loading component for better UX
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white dark:bg-gray-950 z-50 flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5, repeat: Infinity } }}
        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center"
      >
        <Brain className="text-white" size={28} />
      </motion.div>
    </motion.div>
  );
};

// Enhanced Language Section
const LanguageSection = () => {
  const languages = [
    { 
      language: "French", 
      level: "Native",
    },
    { 
      language: "English", 
      level: "Professional Proficiency (C1)",
    },
    { 
      language: "Spanish", 
      level: "Intermediate (B1)",
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <BookOpen size={20} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Languages</h3>
      </div>
      
      <div className="space-y-4">
        {languages.map((lang, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all group"
          >
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {lang.language}
              </h4>
            </div>
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
              {lang.level}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------
// MAIN PORTFOLIO COMPONENT
// ----------------------------------------------------------------

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true); // dark mode by default
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize component
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const handleResize = throttle(checkMobile, 250);
    window.addEventListener('resize', handleResize);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Optimized scroll handling
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (current && current !== activeSection) {
      setActiveSection(current);
    }
  }, [activeSection]);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100); 
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Data arrays
  const experiences = [
    {
      title: "R&D Engineer - AI & Cybersecurity",
      company: "Audensiel",
      period: "Apr. 2025 – Sep. 2025",
      location: "Boulogne-Billancourt, France",
      highlights: [
        "Developed ML pipeline for IoT intrusion detection, achieving 18% precision improvement",
        "Designed multi-agent LLM solution for enhanced model explainability (XAI)",
        "Leveraged Python, Scikit-Learn, TensorFlow, and MLOps best practices"
      ],
      color: "blue",
      icon: Shield,
      achievements: ["18% precision improvement", "XAI implementation", "ML pipeline development"]
    },
    {
      title: "Developer - Industrial Chatbot (RAG)",
      company: "3D Smart Factory",
      period: "Jul. 2024 – Sep. 2024",
      location: "Mohammadia, Morocco",
      highlights: [
        "Analyzed business requirements and developed RAG assistant to automate production queries",
        "Deployed prototype via REST API for seamless integration",
        "Used Python, LangChain, LLaMA 3, and ChromaDB"
      ],
      color: "purple",
      icon: Brain,
      achievements: ["RAG implementation", "API deployment", "Process automation"]
    },
    {
      title: "Computer Vision Engineer",
      company: "Renault Group",
      period: "Jul. 2023 – Sep. 2023",
      location: "Tangier, Morocco",
      highlights: [
        "Built and deployed a YOLOv5 system for automated water-leak detection on vehicle windshields, improving detection reliability.",
        "Reduced diagnostic time by 20% through real-time defect identification and optimization of the inspection workflow.",
        "Industrialized the proof of concept and coordinated integration with production teams for operational use.",
        "Utilized Python, OpenCV, YOLOv5, TensorFlow, and industrial image-processing techniques"
      ],
      color: "indigo",
      icon: Activity,
      achievements: ["20% time reduction", "YOLOv5 implementation", "Production integration"]
    }
  ];

  const projects = [
    {
      title: "ChurnGuard",
      subtitle: "End-to-End MLOps Pipeline",
      description: "Built complete CI/CD pipeline with MLflow for automated training, versioning, and deployment. Includes model monitoring, A/B testing, and automated retraining triggers.",
      tech: "Python, Scikit-Learn, FastAPI, Docker, MLflow, GitHub Actions, GCP",
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500",
      impact: "Reduced deployment time by 60%",
      status: "Production Ready",
      metrics: ["60% faster deployment", "Auto-retraining", "A/B testing"],
      link: "#"
    },
    {
      title: "Systematic Review of AI-Based NVH Methods in Electrified Vehicles",
      description: "Led team in conducting systematic review of AI applications in NVH (Noise, Vibration, Harshness) modeling. Synthesized cutting-edge research and presented actionable insights to Stellantis engineering teams.",
      tech: "Python, TensorFlow, Signal Processing, Research Analysis, Technical Reporting",
      icon: Users,
      gradient: "from-emerald-500 to-teal-500",
      impact: "Delivered to Stellantis engineers",
      institution: "École Centrale de Lyon & Stellantis",
      period: "Dec 2024 – Apr 2025",
      role: "collaboration with Stellantis",
      metrics: ["Team leadership", "Research synthesis", "Industry presentation"],
      link: "#"
    },
    {
      title: "PredictFlow",
      subtitle: "Predictive Maintenance System",
      description: "Developed LSTM model for equipment failure prediction from sensor data. Real-time monitoring dashboard with 92% accuracy in failure detection 24 hours in advance.",
      tech: "Python, TensorFlow (Keras), Pandas, Scikit-Learn, Streamlit, Docker",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      impact: "92% accuracy, 24h advance warning",
      metrics: ["92% accuracy", "24h prediction", "Real-time dashboard"],
      link: "#"
    },
    {
      title: "SmartCancer Detector",
      subtitle: "Medical AI Diagnostic Tool",
      description: "Implemented intelligent application for early cancer detection across breast, skin, and lung cancer types. Leveraged deep learning models trained on medical imaging datasets with transfer learning techniques.",
      tech: "Python, TensorFlow, Keras, CNNs, Medical Imaging, Transfer Learning",
      icon: Brain,
      gradient: "from-rose-500 to-pink-500",
      impact: "Multi-cancer classification system",
      metrics: ["Multi-cancer detection", "Transfer learning", "Medical imaging"],
      link: "#"
    },
    {
      title: "RecomSys-Flix",
      subtitle: "Recommendation Engine",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      tech: "Python, PyTorch, Pandas, FastAPI, Docker, AWS (EC2)",
      icon: Code,
      gradient: "from-orange-500 to-red-500",
      impact: "1000+ req/min throughput",
      metrics: ["Hybrid recommendation", "High throughput", "AWS deployment"],
      link: "#"
    },
    {
      title: "Multi-Agent RL System",
      subtitle: "Cooperative Intelligence Research",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment to simulate multi-agent scenarios and emergent behaviors.",
      tech: "Python, PyTorch, OpenAI Gym, Q-Learning, Actor-Critic, RL",
      icon: Lightbulb,
      gradient: "from-violet-500 to-purple-500",
      impact: "Research in cooperative AI",
      metrics: ["Multi-agent RL", "Custom environment", "Cooperative AI"],
      link: "#"
    }
  ];

  const skills = {
    "AI & Machine Learning": {
      items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps", "Reinforcement Learning"],
      icon: Brain,
      color: "blue",
      level: 95
    },
    "Frameworks & Libraries": {
      items: ["Scikit-Learn", "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "Keras"],
      icon: Code,
      color: "purple",
      level: 90
    },
    "Data Engineering": {
      items: ["Pandas", "SQL", "PostgreSQL", "Supabase", "Apache Spark", "PySpark", "Hadoop", "ETL"],
      icon: Database,
      color: "emerald",
      level: 88
    },
    "Cloud & DevOps": {
      items: ["Docker", "Kubernetes", "FastAPI", "Git", "AWS", "GCP", "MLflow", "CI/CD"],
      icon: Cloud,
      color: "sky",
      level: 85
    }
  };

  const certifications = [
    { 
      name: "Machine Learning Specialization", 
      issuer: "Stanford University (Coursera)", 
      link: "https://www.coursera.org/account/accomplishments/specialization/VF663RCLC57N",
      icon: Award,
    },
    { 
      name: "Deep Learning & Keras", 
      issuer: "Coursera", 
      link: "https://www.coursera.org/account/accomplishments/verify/PT37U2NJCWDR",
      icon: Brain,
    },
    { 
      name: "Advanced SQL", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-FF10CFFD9D/",
      icon: Database,
    },
    { 
      name: "Git & GitHub", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-6FB9E230D9/",
      icon: Code,
    },
    { 
      name: "Certified Lean Management Professional", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-7553a73d-7a62-4d32-983f-20b2d6f470ca/",
      icon: ClipboardCheck,
    },
    { 
      name: "Kanban+Agile Kanban Productivity & Efficiency+Agile Scrum", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-9cd64e94-cdd1-43b3-a548-d1cf5ed2f1d6/",
      icon: Workflow,
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  if (!mounted || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-500 overflow-x-hidden">

        {/* Enhanced Background */}
        <EnhancedBackground />

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Enhanced Navigation */}
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => scrollToSection('hero')}
              >
                <Logo size="medium" />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {['about', 'experience', 'projects', 'skills', 'certifications', 'contact'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all capitalize relative overflow-hidden ${
                      activeSection === section
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{section}</span>
                  </motion.button>
                ))}
                
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-2 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden flex items-center gap-2">
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <PerformanceMetrics />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/30 shadow-xl"
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                Available for Full-Time Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
                Fayssal Sabri
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <AITypewriter  
                  texts={["AI & Data Science", "ML & DL", "Computer Vision", "Scalable AI Systems"]}
                  delay={90}
                  className="font-bold"
                />
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Leveraging AI and Data Science to create impactful solutions 
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg mb-8 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Dual degree from <span className="font-semibold text-gray-900 dark:text-white">Arts et Métiers</span> & <span className="font-semibold text-gray-900 dark:text-white">École Centrale de Lyon</span>. 
              Passionate about building scalable AI solutions that solve real-world business challenges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all hover:shadow-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span>Get in Touch</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a
                href="https://www.linkedin.com/in/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 font-medium transition-all hover:shadow-lg text-gray-700 dark:text-gray-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-12 cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown size={28} className="mx-auto text-gray-400 dark:text-gray-600" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate about leveraging AI to solve real-world business challenges
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <TiltCard className="group p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "M.Eng. Data & AI in Industrial Engineering", school: "École Centrale de Lyon", period: "2024-2025", location: "Paris, France", color: "blue" },
                    { title: "DESECL - Industrial Risk Management", school: "École Centrale de Lyon", period: "2024-2025", location: "Lyon, France", color: "emerald" },
                    { title: "State Engineer - AI & Data Science", school: "ENSAM Meknès", period: "2020-2025", location: "Meknès, Morocco", color: "purple" }
                  ].map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`pl-4 border-l-2 border-${edu.color}-500 hover:border-${edu.color}-600 transition-colors`}
                    >
                      <h4 className="font-bold text-base mb-1">{edu.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">{edu.school}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{edu.period} • {edu.location}</p>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>

              <TiltCard className="group p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform">
                    <Brain size={24} />
                  </div>
                  <h3 className="text-xl font-bold">Expertise</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                  Specialized in the <span className="font-semibold text-gray-900 dark:text-white">complete data science lifecycle</span> - from business scoping and data exploration to model development and cloud-based deployment.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                  Proficient in <span className="font-semibold text-gray-900 dark:text-white">Python, SQL, and Spark</span>, I excel at translating complex business challenges into scalable AI solutions within collaborative, agile environments.
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Rocket, label: "Innovation", color: "blue", value: 95 },
                    { icon: Users, label: "Leadership", color: "purple", value: 90 },
                    { icon: Zap, label: "Fast Learner", color: "yellow", value: 98 },
                    { icon: Target, label: "Goal-Oriented", color: "green", value: 92 }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-2 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <item.icon className={`mx-auto mb-1 text-${item.color}-600 dark:text-${item.color}-400`} size={16} />
                      <p className="font-bold text-xs text-gray-900 dark:text-white">{item.label}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 h-1 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Achievements
                </span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="group p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all backdrop-blur-sm"
                >
                  <Award className="text-yellow-600 dark:text-yellow-400 mb-2" size={24} />
                  <h3 className="text-lg font-bold mb-1">Top 7/200 – Think AI Morocco Hackathon</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs mb-2 leading-relaxed">
                    Developed full-stack application with React and Flask, integrating multimodal LLMs and adaptive RAG architecture for intelligent document processing
                  </p>
                  <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                    May 2024 • UM6P
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all backdrop-blur-sm"
                >
                  <Github className="text-purple-600 dark:text-purple-400 mb-2" size={24} />
                  <h3 className="text-lg font-bold mb-1">HuggingFace LeRobot Contributor</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs mb-2 leading-relaxed">
                    Active contributor to open-source robotics projects, implementing reinforcement learning algorithms and AI-driven control systems
                  </p>
                  <span className="inline-block px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    2024 • Open Source
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Journey
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Building intelligent systems across cybersecurity, manufacturing, and automotive industries
              </p>
            </motion.div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative"
                  >
                    <TiltCard className="p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 relative">
                      <div className="flex flex-col gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`p-2.5 rounded-2xl bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 text-white`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{exp.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {exp.achievements.map((achievement, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p className="font-medium">{exp.period}</p>
                          <p className="flex items-center gap-1 mt-1">
                            <MapPin size={12} />
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm"
                          >
                            <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5 flex-shrink-0">
                              ▹
                            </span>
                            <span className="leading-relaxed">
                              {highlight}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Production-ready solutions showcasing end-to-end ML capabilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, idx) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <TiltCard className="h-full p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${project.gradient} text-white`}>
                          <Icon size={20} />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{project.subtitle}</p>

                      {project.role && (
                        <div className="mb-2">
                          <span className="inline-block px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {project.role}
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 dark:text-gray-300 text-xs mb-3 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {project.impact && (
                        <div className="mb-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                          <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                            <TrendingUp size={12} />
                            {project.impact}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-500 font-mono leading-relaxed mb-2">
                        {project.tech}
                      </p>

                      {project.institution && (
                        <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">{project.institution}</span>
                            {project.period && <span> • {project.period}</span>}
                          </p>
                        </div>
                      )}
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Technical Arsenal
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Comprehensive toolkit for building production-grade ML systems
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(skills).map(([category, data], idx) => {
                const Icon = data.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <TiltCard className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${data.color}-100 dark:bg-${data.color}-900/30`}>
                          <Icon className={`text-${data.color}-600 dark:text-${data.color}-400`} size={20} />
                        </div>
                        <h3 className="text-sm font-bold leading-tight">{category}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {data.items.map((skill, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="px-2 py-1 rounded text-xs font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications & Languages Section */}
        <section id="certifications" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Certifications & Languages
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Continuous learning and professional development
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white">
                    <Award size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert, i) => {
                    const Icon = cert.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-700/50 group"
                      >
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 mt-0.5">
                          <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{cert.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                          {cert.link && (
                            <motion.a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            >
                              View credential
                              <ExternalLink size={12} />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Languages Section */}
              <LanguageSection />
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="py-16 sm:py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Ready to bring your next project to life? Let's talk!
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <ContactForm />
              <ContactInformation />
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-8 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Fayssal Sabri
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">AI & Data Science Engineer</p>
              </div>
              <div className="flex gap-3">
                {[
                  { icon: Mail, href: "mailto:fayssal.sabri.pro@gmail.com", label: "Email" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/fayssalsabri", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/fayssalsabri", label: "GitHub" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} className="text-gray-600 dark:text-gray-400" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                © 2025 Fayssal Sabri - Crafted with passion for innovation
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;