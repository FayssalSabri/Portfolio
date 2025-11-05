'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Code, Database, Brain, Cloud, ChevronDown, ExternalLink, Menu, X, ArrowRight, Sparkles, Target } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'about', 'experience', 'projects', 'skills'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      color: "blue"
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
      color: "purple"
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
      color: "indigo"
    }
  ];

  const projects = [
    {
      title: "ChurnGuard",
      subtitle: "End-to-End MLOps Pipeline",
      description: "Built complete CI/CD pipeline with MLflow for automated training, versioning, and deployment. Includes model monitoring, A/B testing, and automated retraining triggers.",
      tech: "Python, Scikit-Learn, FastAPI, Docker, MLflow, GitHub Actions, GCP",
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "PredictFlow",
      subtitle: "Predictive Maintenance System",
      description: "Developed LSTM model for equipment failure prediction from sensor data. Real-time monitoring dashboard with 92% accuracy in failure detection 24 hours in advance.",
      tech: "Python, TensorFlow (Keras), Pandas, Scikit-Learn, Streamlit, Docker",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "RecomSys-Flix",
      subtitle: "Recommendation Engine",
      description: "Implemented hybrid recommendation system combining collaborative filtering with neural embeddings. Containerized REST API serving 1000+ requests/min on AWS EC2.",
      tech: "Python, PyTorch, Pandas, FastAPI, Docker, AWS (EC2)",
      icon: Code,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const skills = {
    "AI & Machine Learning": {
      items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
      icon: Brain,
      color: "blue"
    },
    "Frameworks & Libraries": {
      items: ["Scikit-Learn", "PyTorch", "TensorFlow", "HuggingFace", "LangChain"],
      icon: Code,
      color: "purple"
    },
    "Data Engineering": {
      items: ["Pandas", "SQL", "PostgreSQL", "Apache Spark", "PySpark", "Hadoop", "ETL"],
      icon: Database,
      color: "emerald"
    },
    "Cloud & DevOps": {
      items: ["Docker", "Kubernetes", "FastAPI", "Git", "AWS", "GCP", "MLflow"],
      icon: Cloud,
      color: "sky"
    }
  };

  const certifications = [
    { 
      name: "Machine Learning Specialization", 
      org: "Stanford",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/YOUR_CERT_ID"
    },
    { 
      name: "Deep Learning Specialization", 
      org: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/YOUR_CERT_ID"
    },
    { 
      name: "SQL for Data Science", 
      org: "IBM",
      link: "https://www.coursera.org/account/accomplishments/certificate/YOUR_CERT_ID"
    },
    { 
      name: "Certified Lean Management Professional", 
      org: "Professional",
      link: "#"
    },
    { 
      name: "Git & GitHub", 
      org: "Coursera",
      link: "https://www.coursera.org/account/accomplishments/certificate/YOUR_CERT_ID"
    }
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
                className="text-2xl font-bold"
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
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
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
                Data Scientist Engineer
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transforming data into actionable insights • Machine Learning & Cloud Expert
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
                Open to Remote & Hybrid
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
        <section id="about" className="py-24 px-6 bg-white/50 dark:bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
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

            <div className="grid md:grid-cols-2 gap-8">
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
                    <h4 className="font-bold text-lg mb-1">M.Sc. Data & AI in Industrial Engineering</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">École Centrale de Lyon</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2024-2025 • Lyon, France</p>
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
                  Specialized in the <span className="font-semibold text-gray-900 dark:text-white">complete data science lifecycle</span>—from business scoping and data exploration to model development and cloud-based deployment.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Proficient in <span className="font-semibold text-gray-900 dark:text-white">Python, SQL, and Spark</span>, I excel at translating complex business challenges into scalable AI solutions within collaborative, agile environments.
                </p>
              </motion.div>
            </div>
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
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`p-2 rounded-xl bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 text-white mt-1`}>
                            <Briefcase size={20} />
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
              ))}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.subtitle}</p>

                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono leading-relaxed">
                      {project.tech}
                    </p>
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
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{cert.org}</p>
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
                ))}
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
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <span className="text-4xl">🇫🇷</span>
                  <div>
                    <p className="font-bold text-lg">French</p>
                    <p className="text-sm opacity-90">Professional Proficiency (C1)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
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
        <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
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
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  View My Work
                </a>
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
                <p className="text-gray-600 dark:text-gray-400">Data Scientist Engineer</p>
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
                © 2025 Fayssal Sabri. Crafted with passion for innovation and excellence.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;