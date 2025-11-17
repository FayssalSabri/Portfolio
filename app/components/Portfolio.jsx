'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Code, Database, Cloud, Rocket, User, Mail, MapPin, 
  Calendar, ArrowUpRight, ExternalLink, ChevronRight, ChevronLeft,
  Github, Linkedin, Twitter, FileText, Award, School,
  Briefcase, Cpu, Zap, Sparkles, ArrowRight, Phone,
  BookOpen, Languages, Download, X, Image
} from 'lucide-react';
import Logo from '../components/Logo';

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
};

// ----------------------------------------------------------------
// LAZY LOADED COMPONENTS
// ----------------------------------------------------------------

// Certification Carousel Component
// Certification Carousel Component
const CertificationCarousel = ({ certifications }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageErrors, setImageErrors] = useState({});

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === certifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1
    );
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  // Timeout fallback - force display after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadedImages[currentIndex]) {
        setLoadedImages(prev => ({ ...prev, [currentIndex]: true }));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, loadedImages]);

  // Preload images on mount
  useEffect(() => {
    certifications.forEach((cert, index) => {
      const img = new window.Image();
      img.onload = () => handleImageLoad(index);
      img.onerror = () => handleImageError(index);
      img.src = cert.image;
    });
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80">
      {/* Carousel Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Certification Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-sm">
                {!loadedImages[currentIndex] && !imageErrors[currentIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="text-center">
                      <Image size={48} className="text-gray-400 mx-auto mb-3 animate-pulse" />
                      <p className="text-gray-500 text-sm">Loading certification...</p>
                    </div>
                  </div>
                )}
                {imageErrors[currentIndex] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="text-center">
                      <Award size={48} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">Certificate image unavailable</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={certifications[currentIndex].image}
                    alt={certifications[currentIndex].title}
                    className={`w-full h-full object-contain rounded-xl shadow-lg transition-opacity duration-300 ${
                      loadedImages[currentIndex] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(currentIndex)}
                    onError={() => handleImageError(currentIndex)}
                  />
                )}
              </div>
            </div>

            {/* Certification Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="font-bold text-lg mb-1">{certifications[currentIndex].title}</h3>
              <p className="text-blue-300 text-sm">{certifications[currentIndex].issuer}</p>
              <p className="text-gray-300 text-xs">{certifications[currentIndex].date}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all z-10"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', throttle(toggleVisibility, 100));
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRight size={20} className="-rotate-45" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Enhanced Navigation with smooth scroll
const Navigation = ({ activeSection, onSectionClick, darkMode, onThemeToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onSectionClick('home')}
          >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Logo showSignature={true} size="small" />
          </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all relative ${
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={onThemeToggle}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </motion.button>

            {/* Contact CTA */}
            <motion.button
              onClick={() => onSectionClick('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              <Mail size={16} />
              Contact
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section with clean TypeScript effect
const HeroSection = ({ onSectionClick }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    'AI & Data Science',
    'Machine Learning & Deep Learning',
    'Computer Vision',
    'NLP & LLMs',
    'MLOps & Deployment'
  ];

  useEffect(() => {
    const role = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === role) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayedText(
          isDeleting
            ? role.substring(0, displayedText.length - 1)
            : role.substring(0, displayedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, currentRoleIndex, isDeleting]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gray-200/30 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gray-200/30 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-200/20 dark:bg-gray-700/15 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm"
      >
        <motion.div 
          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Available for new opportunities
      </motion.div>
        {/* Main Heading - Clean & Bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-tight"
        >
          <span className="block text-gray-900 dark:text-white">
            Fayssal Sabri
          </span>
        </motion.h1>

        {/* TypeScript Effect - Specialty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-6 min-h-[80px]">
            <div className="relative flex items-center justify-center w-full">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                {displayedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-blue-600 dark:bg-blue-400 ml-1"
              />
            </div>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Building intelligent systems that solve real-world challenges through 
            <span className="font-semibold text-gray-900 dark:text-white"> machine learning</span>, 
            <span className="font-semibold text-gray-900 dark:text-white"> data engineering</span>, and 
            <span className="font-semibold text-gray-900 dark:text-white"> scalable AI solutions</span>
          </p>
        </motion.div>

        {/* Stats Cards - Minimal & Elegant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-5xl mx-auto mb-24"
        >
          {[
            { number: '10+', label: 'Projects' },
            { number: '6', label: 'Certifications' },
            { number: '3', label: 'Hackathons' },
            { number: '15+', label: 'Technologies' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="group relative p-6 rounded-2xl bg-white/50 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-all hover:shadow-xl w-40 sm:w-44"
            >
              <div className="absolute inset-0 bg-gray-100/30 dark:bg-gray-800/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 cursor-pointer"
            onClick={() => onSectionClick('about')}
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <ChevronRight size={20} className="rotate-90" />
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

// About Section with clean layout - All sections in blue theme
const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about transforming complex problems into elegant AI solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6 border-l-4 border-blue-600 dark:border-blue-400"
              >
                <img
                  src="/images/profile/fayssal_.jpg"
                  alt="Fayssal Sabri"
                  className="w-full aspect-square rounded-xl object-cover mb-4 ring-2 ring-gray-200 dark:ring-gray-700"
                  onError={(e) => {
                    e.target.outerHTML = `
                      <div class="w-full aspect-square rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 ring-2 ring-gray-200 dark:ring-gray-700">
                        <span class="text-gray-400 dark:text-gray-600 font-bold text-4xl">FS</span>
                      </div>
                    `;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Fayssal Sabri
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  AI & Data Science Engineer
                </p>
                
                {/* Quick Info */}
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                    <span>Paris, France</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
                    <span>Open to opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="truncate">fayssal.sabri.pro@gmail.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  <motion.a
                    href="https://linkedin.com/in/fayssalsabri"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href="https://github.com/fayssalsabri"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-all"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Background */}
            <div className="rounded-2xl p-6 sm:p-8 border-l-4 border-blue-600 dark:border-blue-400">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <User size={24} className="text-blue-600 dark:text-blue-400" />
                Background
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm a dual-degree engineer from <span className="font-semibold text-gray-900 dark:text-white">Arts et Métiers</span> and <span className="font-semibold text-gray-900 dark:text-white">École Centrale de Lyon</span>, specializing in AI and Data Science. My journey combines rigorous engineering fundamentals with cutting-edge machine learning expertise.
                </p>
                <p>
                  I thrive on building end-to-end AI systems that deliver measurable impact, from conceptualization and data exploration to deployment and monitoring in production environments.
                </p>
              </div>
            </div>

            {/* Education & Languages Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="rounded-2xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
                  <School size={20} className="text-blue-600 dark:text-blue-400" />
                  Education
                </h3>
                <div className="space-y-5">
                  {[
                    { 
                      degree: "M.Eng. Data & AI", 
                      school: "École Centrale de Lyon", 
                      year: "2024-2025",
                      location: "Paris, FR"
                    },
                    { 
                      degree: "DESECL - Risk Management", 
                      school: "École Centrale de Lyon", 
                      year: "2024-2025",
                      location: "Lyon, FR"
                    },
                    { 
                      degree: "State Engineer - AI", 
                      school: "ENSAM Meknès", 
                      year: "2020-2025",
                      location: "Meknès, MA"
                    }
                  ].map((edu, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-5 border-l-2 border-blue-600 dark:border-blue-400"
                    >
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1 leading-tight">{edu.degree}</h5>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs mb-0.5">{edu.school}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{edu.year} • {edu.location}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="rounded-2xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
                <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
                  <Languages size={20} className="text-blue-600 dark:text-blue-400" />
                  Languages
                </h3>
                <div className="space-y-3">
                  {[
                    { language: "French", level: "Native", code: "FR" },
                    { language: "English", level: "Professional (C1)", code: "EN" },
                    { language: "Arabic", level: "Native", code: "AR" },
                    { language: "Spanish", level: "Basic (A1)", code: "ES" }
                  ].map((lang, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">{lang.code}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{lang.language}</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{lang.level}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="rounded-2xl p-6 border-l-4 border-blue-600 dark:border-blue-400">
              <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600 dark:text-blue-400" />
                Interests & Activities
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI Research", "Open Source", "Robotics", "Technology Watch & Innovation", "Hackathons",
                  "Problem Solving & Logical Reasoning", "Continuous Learning", "Technical Writing"
                ].map((interest, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all cursor-default"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
// Experience Section with timeline
const ExperienceSection = () => {
  const experiences = [
    {
      role: "R&D Engineer - AI & Cybersecurity",
      company: "Audensiel",
      period: "Apr 2025 – Sep 2025",
      location: "Boulogne-Billancourt, France",
      description: "Developing ML pipeline for IoT intrusion detection and multi-agent LLM solutions for enhanced model explainability (XAI).",
      achievements: ["18% precision improvement", "XAI implementation", "ML pipeline development"],
      tech: ["Python", "Scikit-Learn", "TensorFlow", "MLOps"],
      type: "Internship",
      logo: "/images/companies/Audensiel-removebg-preview.png" 
    },
    {
      role: "Developer - Industrial Chatbot (RAG)",
      company: "3D Smart Factory",
      period: "Jul 2024 – Sep 2024",
      location: "Mohammadia, Morocco",
      description: "Built RAG assistant to automate production queries and deployed prototype via REST API.",
      achievements: ["RAG implementation", "API deployment", "Process automation"],
      tech: ["Python", "LangChain", "LLaMA 3", "ChromaDB"],
      type: "Internship",
      logo: "/images/companies/3d-smart-factory.png" 
    },
    {
      role: "Computer Vision Engineer",
      company: "Renault Group",
      period: "Jul 2023 – Sep 2023",
      location: "Tangier, Morocco",
      description: "Developed YOLOv5 system for automated water-leak detection on vehicle windshields.",
      achievements: ["20% time reduction", "YOLOv5 implementation", "Production integration"],
      tech: ["Python", "OpenCV", "YOLOv5", "TensorFlow"],
      type: "Internship",
      logo: "/images/companies/renault-removebg-preview.png" 
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey in AI and data science
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 transform md:-translate-x-1/2" />
          
          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot with logo */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 transform -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl border-4 border-white dark:border-black overflow-hidden"
                  >
                    <img 
                      src={exp.logo} 
                      alt={`${exp.company} logo`}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"><span class="text-white font-bold text-lg">${exp.company.charAt(0)}</span></div>`;
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} ml-24 md:ml-0`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all overflow-hidden group"
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                            {exp.company}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800">
                          {exp.type}
                        </span>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-blue-500" />
                          <span className="font-medium">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-purple-500" />
                          <span className="font-medium">{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-5">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Zap size={16} className="text-yellow-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.2 + i * 0.1 }}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                              <div className="mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <Code size={16} className="text-blue-500" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.2 + i * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


// Skills Section
const SkillsSection = () => {
  const skillCategories = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Reinforcement Learning", "MLOps"],
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
      dotColor: "bg-blue-500"
    },
    {
      category: "Data Engineering",
      icon: Database,
      skills: ["SQL & NoSQL", "Data Pipelines", "ETL Processes", "Big Data", "Data Warehousing", "Data Visualization"],
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600 dark:text-purple-400",
      dotColor: "bg-purple-500"
    },
    {
      category: "Programming & Tools",
      icon: Code,
      skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Docker", "Git"],
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
      dotColor: "bg-green-500"
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS", "GCP", "Azure", "Kubernetes", "CI/CD", "MLflow", "FastAPI"],
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-400",
      dotColor: "bg-orange-500"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-800/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive toolkit for building production-grade AI systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <Icon className={category.textColor} size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIdx * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                    >
                      <div className={`w-1.5 h-1.5 ${category.dotColor} rounded-full`} />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
// Projects Section with grid layout
const ProjectsSection = () => {
  const projects = [
    {
      title: "RecomSys-Flix - AI-Powered Movie Recommendation System",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      image: "/images/projects/RecomSys-Flix.png", 
      tech: ["Python", "TensorFlow", "Docker", "AWS", "REST API", "Collaborative Filtering", "Neural Embeddings", "Hybrid recommendation"],
      category: "Recommender Systems",
      impact: "1000+ req/min throughput",
      github: "https://github.com/FayssalSabri/RecomSys-Flix",
      
    },
    {
      title: "Multi-Agent RL System",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment to simulate multi-agent scenarios and emergent behaviors.",
      image: "/images/projects/RLsystem.png", 
      tech: ["Python", "Reinforcement Learning", "OpenAI Gym", "Q-Learning", "Actor-Critic"],
      category: "Reinforcement Learning",
      impact: "Research in cooperative AI",
      github: "#",
      
    },

    {
      title: "ChurnGuard - MLOps Pipeline",
      description: "End-to-end CI/CD pipeline with MLflow for automated training, versioning, and deployment with model monitoring and A/B testing.",
      image: "/images/projects/churnguard.jpg", 
      tech: ["Python", "MLflow", "FastAPI", "Docker", "GCP"],
      category: "MLOps",
      impact: "Reduced deployment time by 60%",
      github: "#",
      
    },
    {
      title: "PredictFlow - Predictive Maintenance",
      description: "LSTM model for equipment failure prediction with real-time monitoring dashboard achieving 92% accuracy 24 hours in advance.",
      image: "/images/projects/predictflow.jpg", 
      tech: ["Python", "TensorFlow", "LSTM", "Streamlit", "Docker"],
      category: "Deep Learning",
      impact: "92% accuracy, 24h advance warning",
      github: "https://github.com/FayssalSabri/PredictFlow",
      
    },
    {
      title: "SmartCancer Detector",
      description: "Medical AI application for early cancer detection across multiple cancer types using deep learning and transfer learning.",
      image: "/images/projects/cancer-detector.jpg", 
      tech: ["Python", "TensorFlow", "CNN", "Medical Imaging", "Transfer Learning"],
      category: "Computer Vision",
      impact: "Multi-cancer classification system",
      github: "https://github.com/FayssalSabri/SmartCancerDetector/",
      
    },
    {
      title: "Systematic Review - AI in NVH",
      description: "Led team in systematic review of AI applications in NVH modeling for electrified vehicles, presented to Stellantis engineers.",
      image: "/images/projects/nvh-research.jpg", 
      tech: ["Research", "Python", "TensorFlow", "Signal Processing"],
      category: "Research",
      impact: "Delivered to Stellantis engineers",
      // github: "#",
      
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work in AI and data science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                {/* Replace with actual image */}
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact */}
                {project.impact && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                       {project.impact}
                    </p>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Certifications Section with Carousel
const CertificationsSection = () => {
  const certifications = [
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      date: "2024",
      image: "/images/certifications/MLS-DBzv1e_Z.png", 
      link: "https://www.coursera.org/account/accomplishments/specialization/VF663RCLC57N",
      skills: ["Machine Learning", "Deep Learning", "AI Fundamentals"]
    },
    {
      title: "Deep Learning & Keras",
      issuer: "Coursera",
      date: "2024",
      image: "/images/certifications/DL.png", 
      link: "https://www.coursera.org/account/accomplishments/verify/PT37U2NJCWDR",
      skills: ["Deep Learning", "Keras", "Neural Networks"]
    },
    {
      title: "Advanced SQL",
      issuer: "365 Data Science",
      date: "2023",
      image: "/images/certifications/ASQL-BsghoSsW.png", 
      link: "https://learn.365datascience.com/certificates/CC-FF10CFFD9D/",
      skills: ["SQL", "Database", "Data Analysis"]
    },
    {
      title: "Git & GitHub",
      issuer: "365 Data Science",
      date: "2023",
      image: "/images/certifications/gitandgithub.png", 
      link: "https://learn.365datascience.com/certificates/CC-6FB9E230D9/",
      skills: ["Version Control", "Git", "Collaboration"]
    },
    {
      title: "Certified Lean Management Professional",
      issuer: "Udemy",
      date: "2024",
      image: "/images/certifications/leanManagement.png", 
      link: "https://www.udemy.com/certificate/UC-7553a73d-7a62-4d32-983f-20b2d6f470ca/",
      skills: ["Lean Principles", "Process Optimization", "Efficiency"]
    },
    {
      title: "Agile and Kanban",
      issuer: "Udemy",
      date: "2024",
      image: "/images/certifications/agile-CizRE1_S.png", 
      link: "https://www.udemy.com/certificate/UC-9cd64e94-cdd1-43b3-a548-d1cf5ed2f1d6/",
      skills: ["Agile Methodologies", "Kanban", "Project Management"]
    }
  ];

  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  return (
    <section id="certifications" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-800/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <CertificationCarousel certifications={certifications} />
          </motion.div>

          {/* Certifications List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                Professional Certifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through my certifications using the carousel or explore the detailed list below
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 p-4 cursor-pointer transition-all duration-300"
                  onClick={() => openModal(cert)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Award className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">
                        {cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cert.skills.slice(0, 2).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                        +{cert.skills.length - 2}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              {[
                { number: certifications.length, label: 'Certifications' },
                { number: '4', label: 'Platforms' },
                { number: '2023-2024', label: 'Period' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Certification Modal */}
        <AnimatePresence>
          {isModalOpen && selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-900 rounded-full backdrop-blur-sm transition-all shadow-lg"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedCert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {selectedCert.issuer}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                    Issued {selectedCert.date}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Skills Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                    >
                      <ExternalLink size={16} />
                      Verify Credential
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:fayssal.sabri.pro@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's discuss your next project or opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Let's connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I'm always interested in new opportunities, collaborations, and discussions about AI and data science. Whether you have a project in mind or just want to connect, feel free to reach out.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'fayssal.sabri.pro@gmail.com',
                  href: 'mailto:fayssal.sabri.pro@gmail.com'
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: 'in/fayssalsabri',
                  href: 'https://linkedin.com/in/fayssalsabri'
                },
                {
                  icon: Github,
                  label: 'GitHub',
                  value: '@fayssalsabri',
                  href: 'https://github.com/fayssalsabri'
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Paris, France',
                  href: null
                }
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform">
                    <item.icon className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all resize-vertical"
                  placeholder="Write your message..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-sm text-center">
            © 2025 Fayssal Sabri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ----------------------------------------------------------------
// MAIN PORTFOLIO COMPONENT
// ----------------------------------------------------------------

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
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
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
          <Brain className="text-white" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />

        {/* Hero Section */}
        <HeroSection onSectionClick={scrollToSection} />

        {/* About Section */}
        <AboutSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Scroll to Top */}
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Portfolio;