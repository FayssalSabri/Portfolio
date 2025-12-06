'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Mail, Linkedin, Github, 
  School, Languages, ChevronRight, ChevronDown,
  Calendar, ArrowUpRight, ExternalLink, ChevronLeft,
  Brain, Code, Database, Cloud, Rocket, Award, 
  FileText, Zap, Sparkles, Menu, X,
  BarChart, Target as TargetIcon,
  GitBranch, Server, Layers, Palette, Terminal,
  Award as AwardIcon, Check, Star, Image,Sun, Moon
} from 'lucide-react';

// ----------------------------------------------------------------
// LOADING SCREEN
// ----------------------------------------------------------------
const LoadingScreen = ({ darkMode }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-gray-950' : 'bg-white'}`}
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-2 border-cyan-600 border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading portfolio...</p>
    </div>
  </motion.div>
);

// ----------------------------------------------------------------
// BACKGROUND PATTERN
// ----------------------------------------------------------------
const BackgroundPattern = ({ darkMode }) => (
  <div className={`fixed inset-0 -z-10 h-full w-full ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
    <div className={`absolute inset-0 opacity-[0.015] ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-black'
        : ''
    }`}
      style={{
        backgroundImage: `linear-gradient(to right, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px),
                         linear-gradient(to bottom, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }}
    ></div>
  </div>
);

// ----------------------------------------------------------------
// THEME TOGGLE
// ----------------------------------------------------------------
const ThemeToggle = ({ darkMode, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:opacity-80 transition-all`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {darkMode ? (
      <Sun size={20} />
    ) : (
      <Moon size={20} />
    )}
  </motion.button>
);

// ----------------------------------------------------------------
// MINIMAL CARD COMPONENT
// ----------------------------------------------------------------
const MinimalCard = ({ children, className = "", darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`rounded-xl ${darkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200'} shadow-sm ${className}`}
    >
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------
// NAVIGATION
// ----------------------------------------------------------------
const Navigation = ({ activeSection, onSectionClick, darkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      <nav className={`fixed top-6 inset-x-0 max-w-6xl mx-auto z-50 px-6 hidden lg:block transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-sm' : ''
      }`}>
        <div className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
          darkMode 
            ? isScrolled 
              ? 'bg-gray-900/90 border border-gray-800 shadow-lg'
              : 'bg-gray-900/50 border border-gray-800'
            : isScrolled 
              ? 'bg-white/90 border border-gray-200 shadow-lg'
              : 'bg-white border border-gray-100'
        }`}>
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-cyan-600' : 'bg-black'
            }`}>
              <span className="text-white font-medium text-sm">FS</span>
            </div>
            <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Portfolio
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? darkMode ? 'text-white bg-gray-800' : 'text-gray-900 bg-white shadow-sm'
                    : darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 block lg:hidden w-full px-4`}>
        <div className={`flex items-center justify-between p-4 rounded-lg ${
          darkMode 
            ? 'bg-gray-900/90 border border-gray-800 backdrop-blur-sm'
            : 'bg-white/90 border border-gray-200 backdrop-blur-sm'
        }`}>
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              darkMode ? 'bg-cyan-600' : 'bg-black'
            }`}>
              <span className="text-white font-medium text-sm">FS</span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg ${
                darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="py-2">
                {sections.map((section) => {
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleNavClick(section.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-all ${
                        activeSection === section.id
                          ? darkMode 
                            ? 'bg-cyan-600/10 text-cyan-500'
                            : 'bg-cyan-50 text-cyan-600'
                          : darkMode 
                            ? 'text-gray-300 hover:bg-gray-800'
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// ----------------------------------------------------------------
// HERO SECTION
// ----------------------------------------------------------------
const HeroSection = ({ onSectionClick, darkMode }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    'AI & Data Science',
    'Machine Learning',
    'NLP & LLMs',
    'MLOps & Deployment'
  ];

  useEffect(() => {
    const role = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseDuration = 1500;

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
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <BackgroundPattern darkMode={darkMode} />
      
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className={`inline-block mb-8 px-3 py-1.5 rounded-full border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className={`text-xs font-medium tracking-wide ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            AI & DATA SCIENCE ENGINEER
          </span>
        </div>

        {/* Main Title */}
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <span>Fayssal</span>
          <br />
          <span className="text-cyan-600">Sabri</span>
        </h1>

        {/* Typing Effect */}
        <div className="mb-8 h-8">
          <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Passionate about{' '}
            <span className="text-cyan-600 font-medium">{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className={`inline-block w-1 h-6 align-middle ${darkMode ? 'bg-gray-400' : 'bg-gray-600'}`}
            />
          </span>
        </div>

        {/* Subtitle */}
        <p className={`text-lg max-w-2xl mx-auto mb-12 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Building enterprise-grade AI solutions through machine learning, 
          computer vision, and scalable data pipelines.
        </p>


        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => onSectionClick('about')}
        >
          <ChevronDown className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
        </motion.div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// ABOUT SECTION
// ----------------------------------------------------------------
const AboutSection = ({ darkMode }) => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              About
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Professional Background
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4">
            <MinimalCard darkMode={darkMode} className="lg:sticky lg:top-24">
              {/* Profile Image */}
              <div className="mb-8">
                <div className={`w-40 h-40 rounded-full overflow-hidden mx-auto border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <img
                    src="/images/profile/FayssalSB.png"
                    alt="Fayssal Sabri"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.outerHTML = `
                        <div class="w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center">
                          <span class="text-2xl font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}">FS</span>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-8">
                <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Fayssal Sabri
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  AI & Data Science Engineer
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: MapPin, text: 'Paris, France' },
                  { icon: Briefcase, text: 'Open to opportunities' },
                  { icon: Mail, text: 'fayssal.sabri.pro@gmail.com' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <item.icon size={16} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
                <motion.a
                  href="https://linkedin.com/in/fayssalsabri"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="https://github.com/fayssalsabri"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </MinimalCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Background Card */}
            <MinimalCard darkMode={darkMode}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <User size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    About Me
                  </h3>
                </div>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Dual-degree engineer from <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Arts et Métiers</span> and 
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}> École Centrale de Lyon</span>, specializing in AI and Data Science. 
                  My journey combines rigorous engineering fundamentals with cutting-edge machine learning expertise.
                </p>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  I focus on building end-to-end AI systems that deliver measurable impact, from conceptualization and data exploration to 
                  deployment and monitoring in production environments.
                </p>
              </div>
            </MinimalCard>

            {/* Education & Languages Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education Card */}
              <MinimalCard darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <School size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </div>
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Education
                    </h3>
                  </div>
                  
                  <div className="space-y-5">
                    {[
                      { 
                        degree: "M.Eng. Data & AI", 
                        school: "École Centrale de Lyon", 
                        year: "2024-2025"
                      },
                      { 
                        degree: "DESECL - Risk Management", 
                        school: "École Centrale de Lyon", 
                        year: "2024-2025"
                      },
                      { 
                        degree: "Engineer - AI & Data Science", 
                        school: "ENSAM Meknès", 
                        year: "2020-2025"
                      }
                    ].map((edu, idx) => (
                      <div
                        key={idx}
                        className={`relative pl-5 border-l ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                      >
                        <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`} />
                        <h4 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h4>
                        <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.school}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </MinimalCard>

              {/* Languages Card */}
              <MinimalCard darkMode={darkMode}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <Languages size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </div>
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Languages
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { language: "French", level: "Native", levelNum: 100 },
                      { language: "English", level: "Professional (C1)", levelNum: 85 },
                      { language: "Arabic", level: "Native", levelNum: 100 },
                      { language: "Spanish", level: "Basic (A1)", levelNum: 30 }
                    ].map((lang, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{lang.language}</span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{lang.level}</span>
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.levelNum}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full bg-cyan-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MinimalCard>
            </div>

            {/* Interests */}
            <MinimalCard darkMode={darkMode}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Sparkles size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Interests
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI Research", "Open Source", "Robotics", "Technical Innovation", 
                    "Hackathons", "Problem Solving", "Continuous Learning", "Technical Writing"
                  ].map((interest, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </MinimalCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// EXPERIENCE SECTION
// ----------------------------------------------------------------
const ExperienceSection = ({ darkMode }) => {
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
      achievements: ["Reduced diagnostic time by 20%", "YOLOv5 implementation", "Production integration"],
      tech: ["Python", "OpenCV", "YOLOv5", "TensorFlow"],
      type: "Internship"
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Experience
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Professional Journey
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <MinimalCard darkMode={darkMode}>
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
                          {exp.type}
                        </span>
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                      </div>
                      <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {exp.role}
                      </h3>
                      <p className="text-cyan-600 font-medium">
                        {exp.company}
                      </p>
                      <div className={`flex items-center gap-2 mt-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      <Zap size={14} className="text-yellow-500" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                          <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full mt-1.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      <Code size={14} className="text-cyan-600" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MinimalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// SKILLS SECTION
// ----------------------------------------------------------------
const SkillsSection = ({ darkMode }) => {
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
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Skills
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Expertise
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <MinimalCard darkMode={darkMode} className="h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                    <Icon size={24} className={
                      idx === 0 ? 'text-cyan-600' :
                      idx === 1 ? 'text-blue-600' :
                      idx === 2 ? 'text-purple-600' :
                      'text-green-600'
                    } />
                  </div>
                  
                  <h3 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.category}
                  </h3>
                  
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIdx) => (
                      <div
                        key={skillIdx}
                        className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </MinimalCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// PROJECTS SECTION (avec images)
// ----------------------------------------------------------------
const ProjectsSection = ({ darkMode }) => {
  const projects = [
    {
      title: "RecomSys-Flix",
      subtitle: "AI-Powered Movie Recommendation System",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      image: "/images/projects/RecomSys-Flix.png",
      tech: ["Python", "TensorFlow", "Docker", "AWS", "REST API"],
      category: "Recommender Systems",
      impact: "1000+ req/min throughput",
      github: "https://github.com/FayssalSabri/RecomSys-Flix",
    },
    {
      title: "Multi-Agent RL System",
      subtitle: "Cooperative AI Research",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment.",
      image: "/images/projects/RLsystem.png",
      tech: ["Python", "Reinforcement Learning", "OpenAI Gym"],
      category: "Reinforcement Learning",
      impact: "Research in cooperative AI",
      github: "#",
    },
    {
      title: "ChurnGuard",
      subtitle: "MLOps Pipeline",
      description: "End-to-end CI/CD pipeline with MLflow for automated training, versioning, and deployment with model monitoring.",
      image: "/images/projects/churnguard.jpg",
      tech: ["Python", "MLflow", "FastAPI", "Docker"],
      category: "MLOps",
      impact: "Reduced deployment time by 60%",
      github: "https://github.com/FayssalSabri/ChurnGuard",
    },
    {
      title: "PredictFlow",
      subtitle: "Predictive Maintenance",
      description: "LSTM model for equipment failure prediction with real-time monitoring dashboard achieving 92% accuracy 24 hours in advance.",
      image: "/images/projects/predictflow.jpg",
      tech: ["Python", "TensorFlow", "LSTM", "Streamlit"],
      category: "Deep Learning",
      impact: "92% accuracy, 24h advance warning",
      github: "https://github.com/FayssalSabri/PredictFlow",
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Projects
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Work
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <MinimalCard darkMode={darkMode} className="h-full">
                {/* Project Image */}
                <div className="mb-6 -mx-6 -mt-6">
                  <div className={`relative h-48 w-full overflow-hidden rounded-t-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                              <div class="w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </div>
                              <span class="${darkMode ? 'text-gray-500' : 'text-gray-400'} text-sm">Project Image</span>
                            </div>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-900/80 text-gray-300' : 'bg-white/90 text-gray-700'}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Header */}
                <div>
                  <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  {project.description}
                </p>

                {/* Impact */}
                {project.impact && (
                  <div className={`mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-cyan-50'}`}>
                    <p className={`text-sm font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
                      ⚡ {project.impact}
                    </p>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
                  {project.github && project.github !== "#" && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-sm flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      <Github size={16} />
                      View Code
                    </motion.a>
                  )}
                  <ArrowUpRight className={darkMode ? 'text-gray-600' : 'text-gray-400'} size={18} />
                </div>
              </MinimalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// CERTIFICATION CAROUSEL
// ----------------------------------------------------------------
const CertificationCarousel = ({ certifications, darkMode }) => {
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

  // Timeout fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadedImages[currentIndex]) {
        setLoadedImages(prev => ({ ...prev, [currentIndex]: true }));
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, loadedImages]);

  // Preload images
  useEffect(() => {
    certifications.forEach((cert, index) => {
      const img = new window.Image();
      img.onload = () => handleImageLoad(index);
      img.onerror = () => handleImageError(index);
      img.src = cert.image;
    });
  }, [certifications]);

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
      <div className={`relative w-full h-full rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
                  <div className={`absolute inset-0 flex items-center justify-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <Image className={`${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-3 animate-pulse h-12 w-12`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Loading certification...</p>
                    </div>
                  </div>
                )}
                {imageErrors[currentIndex] ? (
                  <div className={`absolute inset-0 flex items-center justify-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="text-center">
                      <AwardIcon className={`${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-3 h-12 w-12`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Certificate image unavailable</p>
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
            <div className={`absolute bottom-0 left-0 right-0 p-6 ${darkMode ? 'bg-gradient-to-t from-black/80 to-transparent' : 'bg-gradient-to-t from-white/90 to-transparent'}`}>
              <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {certifications[currentIndex].title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>
                {certifications[currentIndex].issuer}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {certifications[currentIndex].date}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all z-10 ${
          darkMode ? 'bg-gray-800/80 hover:bg-gray-700 text-gray-300' : 'bg-white/80 hover:bg-white text-gray-700'
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={handleNext}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all z-10 ${
          darkMode ? 'bg-gray-800/80 hover:bg-gray-700 text-gray-300' : 'bg-white/80 hover:bg-white text-gray-700'
        }`}
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
                ? darkMode ? 'bg-cyan-400 scale-125' : 'bg-cyan-600 scale-125'
                : darkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-300 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------
// CERTIFICATIONS SECTION (avec carrousel)
// ----------------------------------------------------------------

const CertificationsSection = ({ darkMode }) => {
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
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Certifications
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Professional Development
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <CertificationCarousel certifications={certifications.slice(0, 4)} darkMode={darkMode} />
          </motion.div>

          {/* Certifications List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Professional Certifications
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Browse through my certifications using the carousel or explore the list below.
                </p>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openModal(cert)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      darkMode 
                        ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                        <AwardIcon className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {cert.title}
                        </h4>
                        <p className="text-cyan-600 text-xs font-medium mb-1">
                          {cert.issuer}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {cert.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden ${
                  darkMode ? 'bg-gray-900' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-48 bg-cyan-600">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-black rounded-full backdrop-blur-sm transition-all shadow-lg"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCert.title}
                  </h3>
                  <p className="text-cyan-600 font-medium mb-3">
                    {selectedCert.issuer}
                  </p>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Issued {selectedCert.date}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      Skills Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.slice(0, 5).map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode 
                              ? 'bg-cyan-900/30 text-cyan-400'
                              : 'bg-cyan-100 text-cyan-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {selectedCert.skills.length > 5 && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode 
                            ? 'bg-cyan-900/30 text-cyan-400'
                            : 'bg-cyan-100 text-cyan-700'
                        }`}>
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
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-all text-sm"
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
    </section>
  );
};

// ----------------------------------------------------------------
// CONTACT SECTION
// ----------------------------------------------------------------
const ContactSection = ({ darkMode }) => {
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
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className={`text-xs uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Contact
            </span>
          </div>
          <h2 className={`text-3xl font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
          </h2>
          <div className="w-12 h-0.5 bg-cyan-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-5">
            <MinimalCard darkMode={darkMode} className="h-full">
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Let's connect
                  </h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    I'm always interested in new opportunities, collaborations, and discussions about AI and data science.
                  </p>
                </div>

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
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <item.icon size={18} className="text-cyan-600" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MinimalCard>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <MinimalCard darkMode={darkMode}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors`}
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-vertical`}
                    placeholder="Write your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </MinimalCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------
// FOOTER
// ----------------------------------------------------------------
const Footer = ({ darkMode }) => {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-cyan-600' : 'bg-black'}`}>
              <span className="text-white font-medium text-sm">FS</span>
            </div>
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Fayssal Sabri
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                AI & Data Science Engineer
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} All rights reserved.
          </div>
          
          {/* Social */}
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com/in/fayssalsabri" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/fayssalsabri" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              <Github size={18} />
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
const ScrollToTop = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

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
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-lg shadow-lg ${
            darkMode 
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
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
  const [darkMode, setDarkMode] = useState(false);
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
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  if (!mounted) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
        <AnimatePresence>
          {isLoading && <LoadingScreen darkMode={darkMode} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navigation 
              activeSection={activeSection}
              onSectionClick={scrollToSection}
              darkMode={darkMode}
              toggleTheme={() => setDarkMode(!darkMode)}
            />

            <HeroSection 
              onSectionClick={scrollToSection} 
              darkMode={darkMode}
            />
            <AboutSection darkMode={darkMode} />
            <ExperienceSection darkMode={darkMode} />
            <SkillsSection darkMode={darkMode} />
            <ProjectsSection darkMode={darkMode} />
            <CertificationsSection darkMode={darkMode} />
            <ContactSection darkMode={darkMode} />
            <Footer darkMode={darkMode} />
            <ScrollToTop darkMode={darkMode} />
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;