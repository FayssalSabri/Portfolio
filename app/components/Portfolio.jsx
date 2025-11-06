'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Code, Database, Brain, Cloud, ChevronDown, ExternalLink, Menu, X, ArrowRight, Sparkles, Target, Users, TrendingUp, Zap, Shield, Activity, BookOpen, Lightbulb, Rocket } from 'lucide-react';

// ----------------------------------------------------------------
// UTILITY FUNCTION: THROTTLE
// Limite la fréquence d'exécution d'une fonction.
// ----------------------------------------------------------------
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      // Exécutera la fonction après 'limit' millisecondes
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // activeSection pour la navigation, le throttle va la rendre plus fluide
  const [activeSection, setActiveSection] = useState('hero'); 

  // Utilisation de useCallback pour stabiliser la fonction de scroll
  const handleScroll = useCallback(() => {
    // 1. Mise à jour de scrollY pour la navbar (moins coûteux que la détection de section)
    setScrollY(window.scrollY);
    
    // 2. Calcul de la section active (l'opération coûteuse)
    const sections = ['hero', 'about', 'experience', 'projects', 'skills'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        // getBoundingClientRect est coûteux, mais est maintenant limité par le throttle.
        const rect = element.getBoundingClientRect();
        // Détection de section : si le haut de la section est au-dessus de 100px et son bas au-dessous de 100px (i.e., visible en haut du viewport)
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    // 3. Application du throttle (limitation à une exécution toutes les 100ms)
    const throttledScroll = throttle(handleScroll, 100); 
    
    window.addEventListener('scroll', throttledScroll);
    
    // Nettoyage de l'écouteur d'événement
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]); // handleScroll est stable grâce à useCallback


  // --- Données du Portfolio (inchangées) ---

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
      icon: Shield
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
      icon: Brain
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
      icon: Activity
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
      impact: "Reduced deployment time by 60%"
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
      role: "Team Leader"
    },
    {
      title: "PredictFlow",
      subtitle: "Predictive Maintenance System",
      description: "Developed LSTM model for equipment failure prediction from sensor data. Real-time monitoring dashboard with 92% accuracy in failure detection 24 hours in advance.",
      tech: "Python, TensorFlow (Keras), Pandas, Scikit-Learn, Streamlit, Docker",
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      impact: "92% accuracy, 24h advance warning"
    },
    {
      title: "SmartCancer Detector",
      subtitle: "Medical AI Diagnostic Tool",
      description: "Implemented intelligent application for early cancer detection across breast, skin, and lung cancer types. Leveraged deep learning models trained on medical imaging datasets with transfer learning techniques.",
      tech: "Python, TensorFlow, Keras, CNNs, Medical Imaging, Transfer Learning",
      icon: Brain,
      gradient: "from-rose-500 to-pink-500",
      impact: "Multi-cancer classification system"
    },
    {
      title: "RecomSys-Flix",
      subtitle: "Recommendation Engine",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      tech: "Python, PyTorch, Pandas, FastAPI, Docker, AWS (EC2)",
      icon: Code,
      gradient: "from-orange-500 to-red-500",
      impact: "1000+ req/min throughput"
    },
    {
      title: "Multi-Agent RL System",
      subtitle: "Cooperative Intelligence Research",
      description: "Explored cooperative behavior among agents using Q-Learning and Actor-Critic algorithms. Developed custom OpenAI Gym environment to simulate multi-agent scenarios and emergent behaviors.",
      tech: "Python, PyTorch, OpenAI Gym, Q-Learning, Actor-Critic, RL",
      icon: Lightbulb,
      gradient: "from-violet-500 to-purple-500",
      impact: "Research in cooperative AI"
    }
  ];

  const skills = {
    "AI & Machine Learning": {
      items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps", "Reinforcement Learning"],
      icon: Brain,
      color: "blue"
    },
    "Frameworks & Libraries": {
      items: ["Scikit-Learn", "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "Keras"],
      icon: Code,
      color: "purple"
    },
    "Data Engineering": {
      items: ["Pandas", "SQL", "PostgreSQL", "Apache Spark", "PySpark", "Hadoop", "ETL"],
      icon: Database,
      color: "emerald"
    },
    "Cloud & DevOps": {
      items: ["Docker", "Kubernetes", "FastAPI", "Git", "AWS", "GCP", "MLflow", "CI/CD"],
      icon: Cloud,
      color: "sky"
    }
  };

  const certifications = [
    { 
      name: "Machine Learning Specialization", 
      issuer: "Stanford University (Coursera)", 
      link: "https://www.coursera.org/account/accomplishments/specialization/VF663RCLC57N",
      icon: Award
    },
    { 
      name: "Deep Learning & Keras", 
      issuer: "Coursera", 
      link: "https://www.coursera.org/account/accomplishments/verify/PT37U2NJCWDR",
      icon: Brain
    },
    { 
      name: "Advanced SQL", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-FF10CFFD9D/",
      icon: Database
    },
    { 
      name: "Git & GitHub", 
      issuer: "365 Data Science", 
      link: "https://learn.365datascience.com/certificates/CC-6FB9E230D9/",
      icon: Code
    },
    { 
      name: "Certified Lean Management Professional", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-7553a73d-7a62-4d32-983f-20b2d6f470ca/",
      icon: TrendingUp
    },
    { 
      name: "Kanban + Agile Scrum Methodology", 
      issuer: "Udemy", 
      link: "https://www.udemy.com/certificate/UC-9cd64e94-cdd1-43b3-a548-d1cf5ed2f1d6/",
      icon: Users
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-500">

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.03, 0.05, 0.03]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.03, 0.05, 0.03]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-400 to-blue-600 rounded-full blur-3xl"
          />
        </div>

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold cursor-pointer"
                onClick={() => scrollToSection('hero')}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FS
                </span>
              </motion.div>

              <div className="hidden md:flex items-center gap-1">
                {['about', 'experience', 'projects', 'skills'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      activeSection === section
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {section}
                  </button>
                ))}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="ml-2 p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="px-6 py-4 space-y-2">
                  {['about', 'experience', 'projects', 'skills'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 capitalize"
                    >
                      {section}
                    </button>
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
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">Available for Full-Time Opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
                AI & Data Scientist Engineer
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transforming data into actionable insights • Machine Learning & Cloud
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
              <a
                href="mailto:fayssal.sabri.pro@gmail.com"
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <Mail size={20} />
                <span>Get in Touch</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 font-medium transition-all hover:scale-105 hover:shadow-lg"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://github.com/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 font-medium transition-all hover:scale-105 hover:shadow-lg"
              >
                <Github size={20} />
                GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                Paris, France
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                +33 7 58 97 36 19
              </div>
              <div className="flex items-center gap-2">
                <Target size={16} className="text-green-600 dark:text-green-400" />
                Open to work
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16"
            >
              <ChevronDown size={32} className="mx-auto text-gray-400 dark:text-gray-600" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-white/50 dark:bg-gray-800/30 relative">
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
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="group p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-900/10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:scale-110 transition-transform">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Education</h3>
                </div>
                <div className="space-y-6">
                  <div className="pl-4 border-l-2 border-blue-500">
                    <h4 className="font-bold text-lg mb-1">M.Eng. Data & AI in Industrial Engineering</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">École Centrale de Lyon</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2024-2025 • Lyon, France</p>
                  </div>
                  <div className="pl-4 border-l-2 border-emerald-500">
                    <h4 className="font-bold text-lg mb-1">DESECL - Industrial Risk Management Engineering</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">École Centrale de Lyon</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2024-2025 • Lyon, France</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Specialized training in industrial risk management and safety strategies</p>
                  </div>
                  <div className="pl-4 border-l-2 border-purple-500">
                    <h4 className="font-bold text-lg mb-1">State Engineer - AI & Data Science</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">ENSAM Meknès</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2020-2025 • Meknès, Morocco</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-900/10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white group-hover:scale-110 transition-transform">
                    <Brain size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Expertise</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Specialized in the <span className="font-semibold text-gray-900 dark:text-white">complete data science lifecycle</span> - from business scoping and data exploration to model development and cloud-based deployment.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Proficient in <span className="font-semibold text-gray-900 dark:text-white">Python, SQL, and Spark</span>, I excel at translating complex business challenges into scalable AI solutions within collaborative, agile environments.
                </p>
              </motion.div>
            </div>

            {/* Key Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: Rocket, label: "Innovation", color: "blue" },
                { icon: Users, label: "Leadership", color: "purple" },
                { icon: Zap, label: "Fast Learner", color: "yellow" },
                { icon: Target, label: "Goal-Oriented", color: "green" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 dark:from-${item.color}-900/20 dark:to-${item.color}-800/20 border border-${item.color}-200 dark:border-${item.color}-800 text-center`}
                  >
                    <Icon className={`mx-auto mb-2 text-${item.color}-600 dark:text-${item.color}-400`} size={32} />
                    <p className="font-bold text-gray-900 dark:text-white">{item.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6">
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
                    <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div className={`p-2 rounded-xl bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 text-white mt-1 group-hover:scale-110 transition-transform`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{exp.company}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                          <p className="font-medium">{exp.period}</p>
                          <p className="flex items-center gap-1 md:justify-end">
                            <MapPin size={14} />
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">▹</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-white/50 dark:bg-gray-800/30">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project, idx) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-2"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} text-white group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <ExternalLink className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={20} />
                    </div>

                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.subtitle}</p>

                    {project.role && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {project.role}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {project.impact && (
                      <div className="mb-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                          <TrendingUp size={14} />
                          {project.impact}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono leading-relaxed">
                      {project.tech}
                    </p>

                    {project.institution && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{project.institution}</span>
                          {project.period && <span> • {project.period}</span>}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="group p-6 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all"
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
                className="group p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all"
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
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6">
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
                    className="group p-6 rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl bg-${data.color}-100 dark:bg-${data.color}-900/30 group-hover:scale-110 transition-transform`}>
                        <Icon className={`text-${data.color}-600 dark:text-${data.color}-400`} size={24} />
                      </div>
                      <h3 className="text-base font-bold leading-tight">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <Award size={28} />
                </div>
                <h3 className="text-2xl font-bold">Certifications & Training</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, i) => {
                  const Icon = cert.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 mt-1">
                        <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cert.issuer}</p>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                          >
                            View Certificate
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
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
              className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">Languages</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                  <span className="text-4xl">🇫🇷</span>
                  <div>
                    <p className="font-bold text-lg">French</p>
                    <p className="text-sm opacity-90">Professional Proficiency (C1)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                  <span className="text-4xl">🇬🇧</span>
                  <div>
                    <p className="font-bold text-lg">English</p>
                    <p className="text-sm opacity-90">Professional Proficiency (C1)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-6"
              >
                <Rocket size={48} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                I'm actively seeking full-time opportunities where I can contribute to impactful AI projects and collaborate with talented teams.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:fayssal.sabri.pro@gmail.com"
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all hover:scale-105 shadow-xl"
                >
                  <Mail size={20} />
                  <span>Start a Conversation</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  View My Work
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Fayssal Sabri
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400">AI & Data Scientist Engineer</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="mailto:fayssal.sabri.pro@gmail.com"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/fayssalsabri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/fayssalsabri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
            <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © 2025 Fayssal Sabri
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;