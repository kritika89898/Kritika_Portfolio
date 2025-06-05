import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple form handling - in real app would send to backend
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: "Cineverse",
      description: "An interactive entertainment platform for discovering movies, series, and episodes with personalized content. Built with modern web technologies for seamless user experience.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/kritika89898/cineverse",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      title: "AI-powered PYQ Predictor",
      description: "Intelligent system that predicts possible exam questions based on past year question papers using Natural Language Processing and Machine Learning algorithms.",
      tech: ["Python", "NLP", "Machine Learning"],
      github: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      title: "Fake News Detection Using ML",
      description: "Machine Learning model that classifies news articles as genuine or fake using Natural Language Processing techniques. Helps combat misinformation spread.",
      tech: ["Python", "NLP", "Scikit-learn"],
      github: "https://github.com/kritika89898/fake-news-detection",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Big Market Sales Prediction",
      description: "Predictive analytics model for retail sales forecasting using historical data. Helps businesses make data-driven decisions for inventory and marketing.",
      tech: ["Python", "Machine Learning", "Data Analysis"],
      github: "https://github.com/kritika89898/big-market-sales",
      image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg"
    }
  ];

  const skills = [
    { category: "Programming Languages", items: ["C++", "Python", "JavaScript", "HTML", "CSS", "MySQL"] },
    { category: "Frameworks & Libraries", items: ["Machine Learning", "Scikit-learn", "NLP", "DBMS"] },
    { category: "Tools & Technologies", items: ["VS Code", "Git/GitHub", "Jupyter Notebook", "OOPs"] },
    { category: "Cloud Platforms", items: ["AWS", "Google Cloud Platform", "Vertex AI"] }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold">Kritika Bhanaria</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kritika</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-300">
                A Software Engineering student passionate about{' '}
                <span className="text-cyan-400">web development</span>,{' '}
                <span className="text-cyan-400">AI</span>, and building{' '}
                <span className="text-cyan-400">real-world solutions</span>.
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                Currently pursuing B.Tech at IGDTUW, graduating in 2027. I love creating innovative solutions 
                using Machine Learning and Cloud technologies to solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  View My Work
                </a>
                <a 
                  href="https://drive.google.com/file/d/1GlrJrOhMUZU6q33OJ_U_EbvOLH6x0TZc/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl shadow-cyan-500/20">
                  <img 
                    src="https://images.unsplash.com/photo-1569012871812-f38ee64cd54c" 
                    alt="Kritika Bhanaria"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">Education & Background</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-xl font-semibold mb-2">B.Tech in Software Engineering</h4>
                  <p className="text-cyan-400 mb-2">Indira Gandhi Delhi Technical University for Women (IGDTUW)</p>
                  <p className="text-gray-400">Expected Graduation: 2027</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">Interests & Passion</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-lg">Web Development & Frontend Technologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-lg">Artificial Intelligence & Machine Learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-lg">Cloud Technologies & AWS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-lg">Building Real-world Solutions</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                I'm passionate about leveraging technology to create meaningful impact. Whether it's building 
                intelligent systems or crafting seamless user experiences, I love turning ideas into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Technologies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillCategory, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{skillCategory.category}</h3>
                <div className="space-y-3">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Code →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Let's Connect!</h3>
                <p className="text-gray-400 leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on projects, 
                  or just chat about technology. Feel free to reach out!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">📧</span>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold">Email</p>
                    <a href="mailto:kritikabhanariya101@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                      kritikabhanariya101@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">💼</span>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold">LinkedIn</p>
                    <a 
                      href="https://linkedin.com/in/kritika-bhanaria-434242285" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      linkedin.com/in/kritika-bhanaria
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">🔗</span>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold">GitHub</p>
                    <a 
                      href="https://github.com/kritika89898" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      github.com/kritika89898
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cyan-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Kritika Bhanaria. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;