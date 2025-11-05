// app\components\Portfolio.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Code, Database, Brain, Cloud, ChevronDown, ExternalLink, FileText, Filter } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
        "ML pipeline for IoT intrusion detection (+18% precision improvement)",
        "Multi-agent LLM solution to enhance explainability (XAI)",
        "Stack: Python, Scikit-Learn, TensorFlow, LLM, MLOps"
      ]
    },
    {
      title: "Developer - Industrial Chatbot (RAG)",
      company: "3D Smart Factory",
      period: "Jul. 2024 – Sep. 2024",
      location: "Mohammadia, Morocco",
      highlights: [
        "Business requirements analysis and RAG assistant development to automate production queries",
        "Prototype deployment via REST API",
        "Tech: Python, LangChain, LLaMA 3, ChromaDB"
      ]
    },
    {
      title: "Computer Vision Engineer",
      company: "Renault Group",
      period: "Jul. 2023 – Sep. 2023",
      location: "Tangier, Morocco",
      highlights: [
        "YOLOv5 model scoping, modeling, and evaluation reducing diagnostic time by 20%",
        "PoC industrialization for production team integration",
        "Tech: Python, OpenCV, YOLOv5, TensorFlow"
      ]
    }
  ];

  const projects = [
    {
      title: "ChurnGuard",
      subtitle: "MLOps Churn Prediction Pipeline",
      tags: ["MLOps", "Cloud", "CI/CD"],
      description: "Complete CI/CD pipeline with MLflow for automating training, versioning, and model deployment",
      tech: "Python, Scikit-Learn, FastAPI, Docker, MLflow, GitHub Actions, GCP",
      icon: Cloud
    },
    {
      title: "PredictFlow",
      subtitle: "Industrial Predictive Maintenance",
      tags: ["Machine Learning", "Time Series"],
      description: "LSTM model to predict equipment failures from time-series sensor data with real-time monitoring dashboard",
      tech: "Python, TensorFlow (Keras), Pandas, Scikit-Learn, Streamlit, Docker",
      icon: Brain
    },
    {
      title: "RecomSys-Flix",
      subtitle: "E-commerce Recommendation Engine",
      tags: ["Deep Learning", "API"],
      description: "Recommendation system based on embeddings and collaborative filtering with containerized REST API",
      tech: "Python, PyTorch, Pandas, FastAPI, Docker, AWS (EC2)",
      icon: Code
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
      color: "green"
    },
    "Cloud & DevOps": {
      items: ["Docker", "Kubernetes", "FastAPI", "Git", "AWS", "GCP", "MLflow"],
      icon: Cloud,
      color: "indigo"
    },
    "Programming Languages": {
      items: ["Python", "R", "SQL", "Java", "JavaScript", "React"],
      icon: Code,
      color: "orange"
    }
  };

  const certifications = [
    "Machine Learning Specialization (Stanford)",
    "Deep Learning Specialization (Coursera)",
    "SQL for Data Science (IBM)",
    "Certified Lean Management Professional",
    "Git & GitHub (Coursera)"
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
      green: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
      indigo: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400',
      orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return colors[color] || colors.blue;
  };

  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg' : 'bg-white/70 dark:bg-gray-900/70'} border-b border-gray-200 dark:border-gray-800`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              FS
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">About</a>
              <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Experience</a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Projects</a>
              <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Skills</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-6 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
            >
              <span className="text-blue-600 dark:text-blue-400 font-medium"> Available for Full-Time Opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Fayssal Sabri
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl md:text-4xl font-semibold mb-6 opacity-90"
            >
              Data Scientist Engineer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 opacity-75 max-w-3xl mx-auto"
            >
              Machine Learning & Cloud • Dual Degree from Arts et Métiers & Ecole Centrale de Lyon
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <a
                href="mailto:fayssal.sabri.pro@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                Contact Me
              </a>
              <a
                href="https://www.linkedin.com/in/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://github.com/fayssalsabri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Github size={20} />
                GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm opacity-75"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Paris, France (Open to Remote & Hybrid)
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                +33 7 58 97 36 19
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="mt-16"
            >
              <ChevronDown size={32} className="mx-auto opacity-50" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                About Me
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <GraduationCap className="text-blue-600 mb-4" size={36} />
                <h3 className="text-2xl font-bold mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">M.Sc. Data & AI in Industrial Engineering</h4>
                    <p className="opacity-75">Ecole Centrale de Lyon • 2024-2025</p>
                    <p className="text-sm opacity-60">Lyon, France</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">State Engineer - AI & Data Science</h4>
                    <p className="opacity-75">ENSAM Meknès • 2020-2025</p>
                    <p className="text-sm opacity-60">Meknès, Morocco</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Brain className="text-purple-600 mb-4" size={36} />
                <h3 className="text-2xl font-bold mb-4">Expertise</h3>
                <p className="opacity-90 leading-relaxed mb-4">
                  Passionate Data Scientist experienced in the complete data project lifecycle: from business scoping
                  to modeling and industrialization of models on Cloud environments (AWS, GCP).
                </p>
                <p className="opacity-90 leading-relaxed">
                  Proficient in Python, SQL, and Spark, I thrive on solving concrete business challenges
                  within expert teams. Currently seeking full-time opportunities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Professional Experience
              </span>
            </h2>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 flex justify-between items-center w-full"
                >
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                      <p className="text-sm opacity-75 mb-2">{exp.period} • {exp.location}</p>
                      <ul className="text-sm opacity-90 text-left">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 mt-1">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md">
                    <Briefcase className="text-blue-600" />
                  </div>
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Key Projects
              </span>
            </h2>

            <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
              <Filter size={16} className="text-gray-500" />
              {['All', 'MLOps', 'Cloud', 'CI/CD', 'Machine Learning', 'Deep Learning'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeFilter === filter ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <AnimatePresence>
                {filteredProjects.map((project, idx) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                        <ExternalLink className="opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
                      </div>

                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-75 mb-3">{project.subtitle}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="opacity-90 text-sm mb-4 leading-relaxed">{project.description}</p>
                      <p className="text-xs opacity-75 font-mono">{project.tech}</p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Additional Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Award className="text-yellow-600 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">Top 7/200 – Think AI Morocco Hackathon</h3>
                <p className="opacity-90 text-sm mb-3 leading-relaxed">
                  Developed a full-stack app (React, Flask) with multimodal LLMs and adaptive RAG architecture
                </p>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  May 2024 • UM6P
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Github className="text-purple-600 mb-3" size={32} />
                <h3 className="text-xl font-bold mb-2">Participant – HuggingFace LeRobot</h3>
                <p className="opacity-90 text-sm mb-3 leading-relaxed">
                  Contributed to open-source robotics projects based on AI and reinforcement learning
                </p>
                <span className="px-3 py-1 rounded-full text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  2024 • Open Source
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Technical Skills
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(skills).map(([category, data], idx) => {
                const Icon = data.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`text-${data.color}-600`} size={28} />
                      <h3 className="text-lg font-bold">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default"
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="text-blue-600" size={32} />
                Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="opacity-90">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Languages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇫🇷</span>
                  <div>
                    <p className="font-semibold">French</p>
                    <p className="text-sm opacity-90">Bilingual (C1)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🇬🇧</span>
                  <div>
                    <p className="font-semibold">English</p>
                    <p className="text-sm opacity-90">Bilingual (C1)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center gap-6 mb-6">
              <a
                href="mailto:fayssal.sabri.pro@gmail.com"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/fayssal-sabri"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/fayssal-sabri"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
            <p className="opacity-75 mb-2">
              © 2025 Fayssal Sabri • Data Scientist Engineer
            </p>
            <p className="opacity-50 text-sm">
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;