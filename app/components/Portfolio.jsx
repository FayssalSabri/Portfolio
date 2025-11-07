'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Code, Database, Brain, Cloud, ChevronDown, ExternalLink, Menu, X, ArrowRight, Sparkles, Target, Users, TrendingUp, Zap, Shield, Activity, BookOpen, Lightbulb, Rocket, Cpu, Palette, Server, Terminal,ClipboardCheck, 
  Workflow 
 } from 'lucide-react';

// ----------------------------------------------------------------
// UTILITY FUNCTION: THROTTLE
// ----------------------------------------------------------------
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ----------------------------------------------------------------
// FIXED: FLOATING PARTICLES WITH CONSISTENT RANDOM VALUES
// ----------------------------------------------------------------
const useDeterministicRandom = (seed = 0) => {
  return useCallback((index) => {
    const x = Math.sin(index * 12.9898 + seed * 7.233) * 43758.5453;
    return x - Math.floor(x);
  }, [seed]);
};

// Enhanced Floating AI Elements Component
const FloatingAIElements = () => {
  const getRandom = useDeterministicRandom(1);
  
  const aiIcons = [Brain, Code, Cloud, Cpu, Rocket, Lightbulb, Shield, Database, Activity, Zap];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Neural Network Grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="text-blue-500">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating AI Icons */}
      {aiIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/10 dark:text-blue-300/10"
          style={{
            left: `${getRandom(index) * 100}%`,
            top: `${getRandom(index + 100) * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeInOut"
          }}
        >
          <Icon size={32 + getRandom(index + 200) * 32} />
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Gradient Orb Component
const GradientOrb = ({ className, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Enhanced Background Component
const EnhancedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main Gradient Orbs */}
      <GradientOrb className="top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-500 to-purple-600" />
      <GradientOrb className="bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-pink-500 to-blue-600" delay={2} />
      <GradientOrb className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-green-500 to-cyan-600" delay={4} />
      
      {/* Pulsing Central Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <FloatingAIElements />
    </div>
  );
};

const AITypewriter = ({ text, delay = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, delay / 2);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
    }
  }, [currentIndex, isDeleting, text, delay]);
  
  return (
    <span className={`${className} inline-flex`}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// Interactive card component with 3D tilt effect
const TiltCard = ({ children, className = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    
    const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100); 
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

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
        "Implemented YOLOv5 model reducing diagnostic time by 20%",
        "Industrialized PoC for production team integration",
        "Applied Python, OpenCV, YOLOv5, and TensorFlow"
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
      metrics: ["60% faster deployment", "Auto-retraining", "A/B testing"]
    },
    {
      title: "Revue Systématique IA & NVH",
      subtitle: "AI Consulting Study for Stellantis",
      description: "Led team in conducting systematic review of AI applications in NVH (Noise, Vibration, Harshness) modeling. Synthesized cutting-edge research and presented actionable insights to Stellantis engineering teams.",
      tech: "Python, TensorFlow, Signal Processing, Research Analysis, Technical Reporting",
      icon: Users,
      gradient: "from-emerald-500 to-teal-500",
      impact: "Delivered to Stellantis engineers",
      institution: "École Centrale de Lyon & Stellantis",
      period: "Dec 2024 – Apr 2025",
      role: "Team Leader",
      metrics: ["Team leadership", "Research synthesis", "Industry presentation"]
    },
    {
      title: "PredictFlow",
      subtitle: "Predictive Maintenance System",
      description: "Developed LSTM model for equipment failure prediction from sensor data. Real-time monitoring dashboard with 92% accuracy in failure detection 24 hours in advance.",
      tech: "Python, TensorFlow (Keras), Pandas, Scikit-Learn, Streamlit, Docker",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      impact: "92% accuracy, 24h advance warning",
      metrics: ["92% accuracy", "24h prediction", "Real-time dashboard"]
    },
    {
      title: "SmartCancer Detector",
      subtitle: "Medical AI Diagnostic Tool",
      description: "Implemented intelligent application for early cancer detection across breast, skin, and lung cancer types. Leveraged deep learning models trained on medical imaging datasets with transfer learning techniques.",
      tech: "Python, TensorFlow, Keras, CNNs, Medical Imaging, Transfer Learning",
      icon: Brain,
      gradient: "from-rose-500 to-pink-500",
      impact: "Multi-cancer classification system",
      metrics: ["Multi-cancer detection", "Transfer learning", "Medical imaging"]
    },
    {
      title: "RecomSys-Flix",
      subtitle: "Recommendation Engine",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      tech: "Python, PyTorch, Pandas, FastAPI, Docker, AWS (EC2)",
      icon: Code,
      gradient: "from-orange-500 to-red-500",
      impact: "1000+ req/min throughput",
      metrics: ["Hybrid recommendation", "High throughput", "AWS deployment"]
    },
    {
      title: "Multi-Agent RL System",
      subtitle: "Cooperative Intelligence Research",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment to simulate multi-agent scenarios and emergent behaviors.",
      tech: "Python, PyTorch, OpenAI Gym, Q-Learning, Actor-Critic, RL",
      icon: Lightbulb,
      gradient: "from-violet-500 to-purple-500",
      impact: "Research in cooperative AI",
      metrics: ["Multi-agent RL", "Custom environment", "Cooperative AI"]
    }
  ];

  const skills = {
    "AI & Machine Learning": {
      items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps", "Reinforcement Learning"],
      icon: Brain,
      color: "blue",
    },
    "Frameworks & Libraries": {
      items: ["Scikit-Learn", "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "Keras"],
      icon: Code,
      color: "purple",
    },
    "Data Engineering": {
      items: ["Pandas", "SQL", "PostgreSQL", "Supabase", "Apache Spark", "PySpark", "Hadoop", "ETL"],
      icon: Database,
      color: "emerald",
    },
    "Cloud & DevOps": {
      items: ["Docker", "Kubernetes", "FastAPI", "Git", "AWS", "GCP", "MLflow", "CI/CD"],
      icon: Cloud,
      color: "sky",
    }
  };

  const certifications = [
    { 
      name: "Machine Learning Specialization", 
      issuer: "Stanford University (Coursera)", 
      link: "https://www.coursera.org/account/accomplishments/specialization/VF663RCLC57N",
      icon: Award,
      date: "2024"
    },
    { 
      name: "Deep Learning & Keras", 
      issuer: "Coursera", 
      link: "https://www.coursera.org/account/accomplishments/verify/PT37U2NJCWDR",
      icon: Brain,
      date: "2024"
    },
    { 
      name: "Advanced SQL", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-FF10CFFD9D/",
      icon: Database,
      date: "2023"
    },
    { 
      name: "Git & GitHub", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-6FB9E230D9/",
      icon: Code,
      date: "2023"
    },
    { 
      name: "Certified Lean Management Professional", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-7553a73d-7a62-4d32-983f-20b2d6f470ca/",
      icon: ClipboardCheck,
      date: "2024"
    },
    { 
      name: "Kanban+Agile Kanban Productivity & Efficiency+Agile Scrum", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-9cd64e94-cdd1-43b3-a548-d1cf5ed2f1d6/",
      icon: Workflow,
      date: "2024"
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

  if (!mounted) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900" />
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-500 overflow-hidden">

        {/* Enhanced Unified Background */}
        <EnhancedBackground />

        {/* Custom Cursor */}
        <motion.div
          className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 bg-blue-500 ${
            isHoveringInteractive ? 'scale-150 mix-blend-normal' : 'scale-100 mix-blend-difference'
          }`}
          animate={{
            x: cursorPosition.x - 16,
            y: cursorPosition.y - 16,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold cursor-pointer group"
                onClick={() => scrollToSection('hero')}
              >
                <div className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    FS
                  </span>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300"
                  />
                </div>
              </motion.div>

              <div className="hidden md:flex items-center gap-1">
                {['about', 'experience', 'projects', 'skills', 'certifications'].map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all capitalize relative overflow-hidden ${
                      activeSection === section
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
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

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800"
              >
                <div className="px-6 py-4 space-y-2">
                  {['about', 'experience', 'projects', 'skills', 'certifications'].map((section) => (
                    <motion.button
                      key={section}
                      onClick={() => scrollToSection(ssection)}
                      whileHover={{ x: 5 }}
                      className="block w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 capitalize font-medium transition-colors"
                    >
                      {section}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/30 shadow-2xl"
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
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
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
              <h2 className="text-2xl md:text-4xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <AITypewriter  
                  text="AI & Data Science Engineer" 
                  delay={90}
                  className="font-bold"
                />
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transforming data into intelligent solutions • Machine Learning & Cloud
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg mb-10 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Dual degree from <span className="font-semibold text-gray-900 dark:text-white">Arts et Métiers</span> & <span className="font-semibold text-gray-900 dark:text-white">École Centrale de Lyon</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <motion.a
                href="mailto:fayssal.sabri.pro@gmail.com"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all hover:shadow-2xl shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHoveringInteractive(true)}
                onMouseLeave={() => setIsHoveringInteractive(false)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%]"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 0.8 }}
                />
                <Mail size={20} />
                <span>Get in Touch</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 font-medium transition-all hover:shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHoveringInteractive(true)}
                onMouseLeave={() => setIsHoveringInteractive(false)}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
              {[
                { icon: MapPin, text: "Paris, France", color: "blue" },
                { icon: Target, text: "Open to work", color: "green" },
                { icon: Cpu, text: "AI & ML", color: "purple" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
                >
                  <item.icon size={16} className={`text-${item.color}-600 dark:text-${item.color}-400`} />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16 cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown size={32} className="mx-auto text-gray-400 dark:text-gray-600" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate about leveraging AI to solve real-world business challenges
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <TiltCard className="group p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "M.Eng. Data & AI in Industrial Engineering", school: "École Centrale de Lyon", period: "2024-2025", location: "Lyon, France", color: "blue" },
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
                      <h4 className="font-bold text-lg mb-1">{edu.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{edu.period} • {edu.location}</p>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>

              <TiltCard className="group p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform">
                    <Brain size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Expertise</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Specialized in the <span className="font-semibold text-gray-900 dark:text-white">complete data science lifecycle</span> - from business scoping and data exploration to model development and cloud-based deployment.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Proficient in <span className="font-semibold text-gray-900 dark:text-white">Python, SQL, and Spark</span>, I excel at translating complex business challenges into scalable AI solutions within collaborative, agile environments.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Rocket, label: "Innovation", color: "blue", value: 95 },
                    { icon: Users, label: "Leadership", color: "purple", value: 90 },
                    { icon: Zap, label: "Fast Learner", color: "yellow", value: 98 },
                    { icon: Target, label: "Goal-Oriented", color: "green", value: 92 }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <item.icon className={`mx-auto mb-2 text-${item.color}-600 dark:text-${item.color}-400`} size={20} />
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{item.label}</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
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
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Achievements
                </span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all backdrop-blur-sm"
                >
                  <Award className="text-yellow-600 dark:text-yellow-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-bold mb-2">Top 7/200 – Think AI Morocco Hackathon</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    Developed full-stack application with React and Flask, integrating multimodal LLMs and adaptive RAG architecture for intelligent document processing
                  </p>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                    May 2024 • UM6P
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all backdrop-blur-sm"
                >
                  <Github className="text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-bold mb-2">HuggingFace LeRobot Contributor</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                    Active contributor to open-source robotics projects, implementing reinforcement learning algorithms and AI-driven control systems
                  </p>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    2024 • Open Source
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Journey
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Building intelligent systems across cybersecurity, manufacturing, and automotive industries
              </p>
            </motion.div>

            <div className="space-y-8">
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
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                    <TiltCard className="p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 relative">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 text-white group-hover:scale-110 transition-transform`}>
                              <Icon size={24} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{exp.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.achievements.map((achievement, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                          <p className="font-medium text-lg">{exp.period}</p>
                          <p className="flex items-center gap-1 md:justify-end mt-1">
                            <MapPin size={14} />
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {exp.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 text-gray-700 dark:text-gray-300 group/item"
                          >
                            <motion.span
                              whileHover={{ scale: 1.2 }}
                              className="text-blue-600 dark:text-blue-400 font-bold mt-1 flex-shrink-0"
                            >
                              ▹
                            </motion.span>
                            <span className="leading-relaxed group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
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
        <section id="projects" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Production-ready solutions showcasing end-to-end ML capabilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <TiltCard className="h-full p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} text-white group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </motion.div>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.subtitle}</p>

                      {project.role && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {project.role}
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {project.impact && (
                        <div className="mb-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                          <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                            <TrendingUp size={14} />
                            {project.impact}
                          </p>
                        </div>
                      )}

                      {project.metrics && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.metrics.map((metric, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-500 font-mono leading-relaxed mb-3">
                        {project.tech}
                      </p>

                      {project.institution && (
                        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
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
        <section id="skills" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Technical Arsenal
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Comprehensive toolkit for building production-grade ML systems
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                    <TiltCard className="p-6 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2.5 rounded-xl bg-${data.color}-100 dark:bg-${data.color}-900/30 group-hover:scale-110 transition-transform`}>
                          <Icon className={`text-${data.color}-600 dark:text-${data.color}-400`} size={24} />
                        </div>
                        <h3 className="text-base font-bold leading-tight">{category}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {data.items.map((skill, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 cursor-default"
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

        {/* Certifications Section */}
        <section id="certifications" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Certifications & Training
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Continuous learning and professional development
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, i) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all border border-gray-200/50 dark:border-gray-700/50 group"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 mt-1 group-hover:scale-110 transition-transform">
                        <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-500">{cert.date}</span>
                          {cert.link && (
                            <motion.a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            >
                              View
                              <ExternalLink size={14} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
              <h3 className="text-2xl font-bold mb-6 relative z-10">Languages</h3>
              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                {[
                  { flag: "🇫🇷", language: "French", level: "Professional Proficiency (C1)", color: "blue" },
                  { flag: "🇬🇧", language: "English", level: "Professional Proficiency (C1)", color: "red" },
                ].map((lang, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all border border-white/20"
                  >
                    <span className="text-4xl">{lang.flag}</span>
                    <div>
                      <p className="font-bold text-lg">{lang.language}</p>
                      <p className="text-sm opacity-90">{lang.level}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Creative CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Animated Header with Typewriter Effect */}
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/30 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    <Rocket size={20} className="text-white" />
                  </motion.div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Ready for Next Challenge
                  </span>
                </motion.div>

                <motion.h2
                  className="text-5xl md:text-7xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Turning Data into 
                  </span>
                  <br />
                  <motion.span
                    className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0%', '100%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                    style={{
                      backgroundSize: '200% 100%',
                    }}
                  >
                    Intelligent Solutions
                  </motion.span>
                </motion.h2>
              </div>


              {/* Interactive CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                {/* Primary CTA */}
                <motion.a
                  href="mailto:fayssal.sabri.pro@gmail.com"
                  className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-2xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(45deg, #2563eb, #7c3aed, #ec4899)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHoveringInteractive(true)}
                  onMouseLeave={() => setIsHoveringInteractive(false)}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%]"
                    whileHover={{ translateX: "200%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Mail size={24} />
                    </motion.div>
                    <span>Contact Me</span>
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </div>

                  {/* Particle effects on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                        }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.a>

                {/* Secondary CTA */}
                <motion.button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-400 font-semibold text-gray-800 dark:text-white shadow-xl transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHoveringInteractive(true)}
                  onMouseLeave={() => setIsHoveringInteractive(false)}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 transform -skew-x-12 translate-x-[-100%]"
                    whileHover={{ translateX: "200%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Explore My Work
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <ExternalLink size={18} />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>

              {/* Quick Contact Links */}
              <motion.div
                className="flex items-center justify-center gap-6 pt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/fayssalsabri", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/fayssalsabri", label: "GitHub" },
                  { icon: Mail, href: "mailto:fayssal.sabri.pro@gmail.com", label: "Email" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setIsHoveringInteractive(true)}
                    onMouseLeave={() => setIsHoveringInteractive(false)}
                  >
                    <social.icon 
                      size={20} 
                      className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Fayssal Sabri
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400">AI & Data Science Engineer</p>
              </div>
              <div className="flex gap-4">
                {[
                  { icon: Mail, href: "mailto:fayssal.sabri.pro@gmail.com", label: "Email", color: "blue" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/fayssalsabri", label: "LinkedIn", color: "blue" },
                  { icon: Github, href: "https://github.com/fayssalsabri", label: "GitHub", color: "purple" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setIsHoveringInteractive(true)}
                    onMouseLeave={() => setIsHoveringInteractive(false)}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
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