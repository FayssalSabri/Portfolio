'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Code, Database, Cloud, Rocket, User, Mail, MapPin, 
  Calendar, ArrowUpRight, ExternalLink, ChevronRight, ChevronLeft,
  Github, Linkedin, FileText, Award, School,
  Briefcase, Zap, Sparkles, ArrowRight,
  BookOpen, Languages, X, Target, TrendingUp, Globe, Shield, Layers,
  ChevronDown, Check, Cpu, Palette, Terminal, Star, Image, Menu
} from 'lucide-react';

// ----------------------------------------------------------------
// LOADING SCREEN (simplifié)
// ----------------------------------------------------------------
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-slate-600 dark:text-slate-400 font-medium">Loading Portfolio...</p>
    </div>
  </motion.div>
);

// ----------------------------------------------------------------
// BACKGROUND PATTERN
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

const BackgroundPattern = () => (
  <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-black">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
  </div>
);

// ----------------------------------------------------------------
// PREMIUM CARD COMPONENT (unifié)
// ----------------------------------------------------------------
const PremiumCard = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 transition-all hover:border-blue-500/50 dark:hover:border-blue-500/50 ${className}`}
    >
      <div className="relative h-full rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// CERTIFICATION CAROUSEL (depuis la version 2)
// ----------------------------------------------------------------
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
                      <Image className="text-gray-400 mx-auto mb-3 animate-pulse h-12 w-12" />
                      <p className="text-gray-500 text-sm">Loading certification...</p>
                    </div>
                  </div>
                )}
                {imageErrors[currentIndex] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="text-center">
                      <Award className="text-gray-400 mx-auto mb-3 h-12 w-12" />
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

// ----------------------------------------------------------------
// NAVIGATION RESPONSIVE
// ----------------------------------------------------------------
const Navigation = ({ activeSection, onSectionClick, darkMode, onThemeToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', icon: Rocket, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: Code, label: 'Projects' },
    { id: 'skills', icon: Brain, label: 'Skills' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-6 inset-x-0 max-w-fit mx-auto z-50 hidden lg:block">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center gap-1 p-2 rounded-full border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-blue-900/5' 
              : 'bg-white/50 dark:bg-slate-900/50'
          }`}
        >
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="px-3 py-2 mr-2 hover:opacity-80 transition-opacity"
          >
            <div className="font-bold text-lg tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FS.
            </div>
          </button>

          {/* Links - Desktop */}
          <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-full p-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-slate-900 dark:bg-blue-600 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {section.label}
                </span>
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm ml-2"
          >
            {darkMode ? <Zap size={16} /> : <div className="w-4 h-4 bg-slate-900 rounded-full" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 block lg:hidden w-full px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-blue-900/5' 
              : 'bg-white/50 dark:bg-slate-900/50'
          }`}
        >
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="px-3 py-2 hover:opacity-80 transition-opacity"
          >
            <div className="font-bold text-lg tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FS.
            </div>
          </button>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Zap size={16} /> : <div className="w-4 h-4 bg-slate-900 rounded-full" />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 mt-16"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
              >
                <div className="py-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavClick(section.id)}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-all ${
                          activeSection === section.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                        <span className="font-medium">{section.label}</span>
                        {activeSection === section.id && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// ----------------------------------------------------------------
// HERO SECTION (minimaliste)
// ----------------------------------------------------------------
const HeroSection = ({ onSectionClick }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    'AI & Data Science',
    'Machine Learning',
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
      <BackgroundPattern />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-10 leading-tight tracking-tight"
        >
          <span className="block text-slate-900 dark:text-white">
            Fayssal Sabri
          </span>
        </motion.h1>

        {/* TypeScript Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-6 min-h-[60px] sm:min-h-[80px]">
            <div className="relative flex items-center justify-center w-full">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                {displayedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-1 h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-blue-500 to-purple-600 ml-1"
              />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            Building intelligent systems that solve real-world challenges through 
            <span className="font-semibold text-slate-900 dark:text-white"> machine learning</span>, 
            <span className="font-semibold text-slate-900 dark:text-white"> data engineering</span>, and 
            <span className="font-semibold text-slate-900 dark:text-white"> scalable AI solutions</span>
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom+6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 cursor-pointer"
            onClick={() => onSectionClick('about')}
          >
            <span className="text-xs font-medium dark:text-white">Scroll to explore</span>
            <ChevronRight size={20} className="rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// ABOUT SECTION
// ----------------------------------------------------------------
const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Passionate about transforming complex problems into elegant AI solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-4"
          >
            <PremiumCard className="lg:sticky lg:top-24">
              <div className="rounded-2xl p-4 sm:p-6">
                <img
                  src="/images/profile/FayssalSB.png"
                  alt="Fayssal Sabri"
                  className="w-full aspect-square rounded-xl object-cover mb-4 ring-2 ring-slate-200 dark:ring-slate-700"
                  onError={(e) => {
                    e.target.outerHTML = `
                      <div class="w-full aspect-square rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4 ring-2 ring-slate-200 dark:ring-slate-700">
                        <span class="text-slate-400 dark:text-slate-600 font-bold text-4xl">FS</span>
                      </div>
                    `;
                  }}
                />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  Fayssal Sabri
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  AI & Data Science Engineer
                </p>
                
                {/* Quick Info */}
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                    <span>Paris, France</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
                    <span>Open to opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Linkedin size={16} />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://github.com/fayssalsabri"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-all"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Background */}
            <PremiumCard>
              <div className="rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <User size={24} className="text-blue-600 dark:text-blue-400" />
                  Background
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  <p>
                    I'm a dual-degree engineer from <span className="font-semibold text-slate-900 dark:text-white">Arts et Métiers</span> and <span className="font-semibold text-slate-900 dark:text-white">École Centrale de Lyon</span>, specializing in AI and Data Science. My journey combines rigorous engineering fundamentals with cutting-edge machine learning expertise.
                  </p>
                  <p>
                    I thrive on building end-to-end AI systems that deliver measurable impact, from conceptualization and data exploration to deployment and monitoring in production environments.
                  </p>
                </div>
              </div>
            </PremiumCard>

            {/* Education & Languages Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <PremiumCard>
                <div className="rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-slate-900 dark:text-white flex items-center gap-2">
                    <School size={20} className="text-blue-600 dark:text-blue-400" />
                    Education
                  </h3>
                  <div className="space-y-4 sm:space-y-5">
                    {[
                      { 
                        degree: "M.Eng. Data & AI", 
                        school: "École Centrale de Lyon", 
                        year: "2024-2025",
                        location: "Lyon, FR"
                      },
                      { 
                        degree: "DESECL - Risk Management", 
                        school: "École Centrale de Lyon", 
                        year: "2024-2025",
                        location: "Lyon, FR"
                      },
                      { 
                        degree: "Engineer - AI & Data Science", 
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
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1 leading-tight">{edu.degree}</h5>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-xs mb-0.5">{edu.school}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">{edu.year} • {edu.location}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PremiumCard>

              {/* Languages */}
              <PremiumCard>
                <div className="rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-slate-900 dark:text-white flex items-center gap-2">
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
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">{lang.code}</span>
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{lang.language}</h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{lang.level}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Interests */}
            <PremiumCard>
              <div className="rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-slate-900 dark:text-white flex items-center gap-2">
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
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// EXPERIENCE SECTION
// ----------------------------------------------------------------
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
      type: "Internship"
    },
    {
      role: "Developer - Industrial Chatbot (RAG)",
      company: "3D Smart Factory",
      period: "Jul 2024 – Sep 2024",
      location: "Mohammadia, Morocco",
      description: "Built RAG assistant to automate production queries and deployed prototype via REST API.",
      achievements: ["RAG implementation", "API deployment", "Process automation"],
      tech: ["Python", "LangChain", "LLaMA 3", "ChromaDB"],
      type: "Internship"
    },
    {
      role: "Computer Vision Engineer",
      company: "Renault Group",
      period: "Jul 2023 – Sep 2023",
      location: "Tangier, Morocco",
      description: "Developed YOLOv5 system for automated water-leak detection on vehicle windshields.",
      achievements: ["20% time reduction", "YOLOv5 implementation", "Production integration"],
      tech: ["Python", "OpenCV", "YOLOv5", "TensorFlow"],
      type: "Internship"
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            My professional journey in AI and data science
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <PremiumCard className="hover:shadow-xl transition-shadow">
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800">
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-5">
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
                  <p className="text-slate-600 dark:text-slate-300 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-base">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
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
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                      <Code size={16} className="text-blue-500" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {exp.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2 + i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// SKILLS SECTION (TAILLE UNIFORME)
// ----------------------------------------------------------------
const SkillsSection = () => {
  const skillCategories = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Reinforcement Learning", "MLOps"]
    },
    {
      category: "Data Engineering",
      icon: Database,
      skills: ["SQL & NoSQL", "Data Pipelines", "ETL Processes", "Big Data", "Data Warehousing", "Data Visualization"]
    },
    {
      category: "Programming & Tools",
      icon: Code,
      skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "Docker", "Git"]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS", "GCP", "Kubernetes", "CI/CD", "MLflow", "FastAPI"]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Comprehensive toolkit for building production-grade AI systems
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
              >
                <PremiumCard className="h-full">
                  {/* Icon Header - Taille uniforme */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Icon className="text-white" size={28} />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg text-center mb-3 sm:mb-4">
                    {category.category}
                  </h3>
                  
                  <div className="space-y-1 sm:space-y-2">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIdx * 0.05 }}
                        className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors text-center"
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// PROJECTS SECTION
// ----------------------------------------------------------------
const ProjectsSection = () => {
  const projects = [
    {
      title: "RecomSys-Flix - AI-Powered Movie Recommendation System",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      image: "/images/projects/RecomSys-Flix.png", 
      tech: ["Python", "TensorFlow", "Docker", "AWS", "REST API"],
      category: "Recommender Systems",
      impact: "1000+ req/min throughput",
      github: "https://github.com/FayssalSabri/RecomSys-Flix",
    },
    {
      title: "Multi-Agent RL System",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment.",
      image: "/images/projects/RLsystem.png", 
      tech: ["Python", "Reinforcement Learning", "OpenAI Gym"],
      category: "Reinforcement Learning",
      impact: "Research in cooperative AI",
      github: "#",
    },
    {
      title: "ChurnGuard - MLOps Pipeline",
      description: "End-to-end CI/CD pipeline with MLflow for automated training, versioning, and deployment with model monitoring.",
      image: "/images/projects/churnguard.jpg", 
      tech: ["Python", "MLflow", "FastAPI", "Docker"],
      category: "MLOps",
      impact: "Reduced deployment time by 60%",
      github: "#",
    },
    {
      title: "PredictFlow - Predictive Maintenance",
      description: "LSTM model for equipment failure prediction with real-time monitoring dashboard achieving 92% accuracy 24 hours in advance.",
      image: "/images/projects/predictflow.jpg", 
      tech: ["Python", "TensorFlow", "LSTM", "Streamlit"],
      category: "Deep Learning",
      impact: "92% accuracy, 24h advance warning",
      github: "https://github.com/FayssalSabri/PredictFlow",
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-20 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            A selection of my recent work in AI and data science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <PremiumCard className="h-full">
                {/* Project Image */}
                <div className="h-40 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden rounded-xl mb-4 sm:mb-6">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="px-2 py-1 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>

                  {/* Impact */}
                  {project.impact && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        ⚡ {project.impact}
                      </p>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs rounded-md">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                    {project.github && project.github !== "#" && (
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// CERTIFICATIONS SECTION (avec carousel de la version 2)
// ----------------------------------------------------------------
const CertificationsSection = () => {
  const certifications = [
    {
      title: "AI Model Deployment on AWS",
      issuer: "365 Data Science",
      date: "2025",
      image: "/images/certifications/AWS.jpg",
      link: "https://learn.365datascience.com/certificates/CC-60F987FA73/",
      skills: ["AWS", "AWS Lambda", "Amazon ECS (EC2 & Fargate)", "Amazon SageMaker", "Model Deployment", "Traffic Shifting", "A/B Testing", "Canary Deployments", "Blue-Green Deployment", "Shadow Deployment", "Cloud Computing"]
    },
    {
      title: "Intro to google cloud",
      issuer: "365 Data Science",
      date: "2025",
      image: "/images/certifications/GCP.jpg",
      link: "https://learn.365datascience.com/certificates/CC-B0DF0ACD3F/",
      skills: ["GCP", "Google Cloud Platform", "Cloud Computing", "Compute Engine", "Cloud Storage", "BigQuery", "Cloud Functions", "App Engine"]
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University (Coursera)",
      date: "2024",
      image: "/images/certifications/MLS-DBzv1e_Z.jpg", 
      link: "https://www.coursera.org/account/accomplishments/specialization/VF663RCLC57N",
      skills: ["Machine Learning", "Deep Learning", "AI Fundamentals"]
    },    
    {
      title: "Advanced SQL",
      issuer: "365 Data Science",
      date: "2023",
      image: "/images/certifications/ASQL-BsghoSsW.jpg", 
      link: "https://learn.365datascience.com/certificates/CC-FF10CFFD9D/",
      skills: ["SQL", "Database", "Data Analysis"]
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
      title: "Building Data Pipelines with Apache Airflow",
      issuer: "365 Data Science",
      date: "2025",
      image: "/images/certifications/Apach_airflow_CC-5C3E790667.jpg", 
      link: "https://learn.365datascience.com/certificates/CC-5C3E790667/",
      skills: ["Apache Airflow", "Data Pipelines", "ETL Processes"]
    },

    {
      title: "MCPs for Everyone: Supercharge Your AI Tooling Skills",
      issuer: "365 Data Science",
      date: "2023",
      image: "/images/certifications/MCP-CC-64FB4D650A_page-0001.jpg", 
      link: "https://learn.365datascience.com/certificates/CC-64FB4D650A/",
      skills: ["SQL", "Database", "Data Analysis"]
    },
    {
      title: "Git & GitHub",
      issuer: "365 Data Science",
      date: "2023",
      image: "/images/certifications/gitandgithub.jpg", 
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
      image: "/images/certifications/agile-CizRE1_S.jpg", 
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
    <section id="certifications" className="py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Continuous learning and professional development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md lg:max-w-2xl">
              <CertificationCarousel certifications={certifications.slice(0, 4)} />
            </div>
          </motion.div>

          {/* Certifications List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left mb-6 md:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Professional Certifications
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Browse through my certifications using the carousel or explore the detailed list below
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 p-3 sm:p-4 cursor-pointer transition-all duration-300"
                  onClick={() => openModal(cert)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Award className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-slate-500 dark:text-slate-500 text-xs">
                        {cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
                    {cert.skills.slice(0, 2).map((skill, i) => (
                      <span
                        key={i}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 2 && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-md">
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
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700"
            >
              {[
                { number: certifications.length, label: 'Certifications' },
                { number: '4', label: 'Platforms' },
                { number: '2023-2025', label: 'Period' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500">
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
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
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
                    className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 rounded-full backdrop-blur-sm transition-all shadow-lg"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {selectedCert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {selectedCert.issuer}
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">
                    Issued {selectedCert.date}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Skills Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.slice(0, 5).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {selectedCert.skills.length > 5 && (
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                          +{selectedCert.skills.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all text-sm sm:text-base"
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

// ----------------------------------------------------------------
// CONTACT SECTION
// ----------------------------------------------------------------
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:fayssal.sabri.pro@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-20 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Let's discuss your next project or opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 md:space-y-8"
          >
            <PremiumCard>
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  Let's connect
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base">
                  I'm always interested in new opportunities, collaborations, and discussions about AI and data science.
                </p>

                {/* Contact Methods */}
                <div className="space-y-3 sm:space-y-4">
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
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                    >
                      <div className="p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-110 transition-transform">
                        <item.icon className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                          {item.label}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <PremiumCard>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all resize-vertical text-sm sm:text-base"
                    placeholder="Write your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Mail size={20} />
                  Send Message
                </motion.button>
              </form>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// FOOTER
// ----------------------------------------------------------------
const Footer = () => {
  return (
    <footer className="py-6 md:py-8 px-4 sm:px-6 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="font-bold text-white text-sm">FS</div>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Fayssal Sabri</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">AI & Data Science Engineer</div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          
          {/* Social */}
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/fayssalsabri" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/fayssalsabri" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ----------------------------------------------------------------
// SCROLL TO TOP
// ----------------------------------------------------------------
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = throttle(() => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100);

    window.addEventListener('scroll', toggleVisibility);
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
          className="fixed bottom-6 right-6 z-50 p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRight size={20} className="-rotate-45" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ----------------------------------------------------------------
// MAIN PORTFOLIO COMPONENT
// ----------------------------------------------------------------
const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
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
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
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

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-500">
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navigation 
              activeSection={activeSection}
              onSectionClick={scrollToSection}
              darkMode={darkMode}
              onThemeToggle={() => setDarkMode(!darkMode)}
            />

            <HeroSection onSectionClick={scrollToSection} />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;