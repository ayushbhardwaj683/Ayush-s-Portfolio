




"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Code, Mail, Phone, ExternalLink, Server, Database, Globe, Terminal, Layers, Cloud, X, Play } from 'lucide-react'

// Define Project interface for type safety
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  demoVideo: string;
  features: string[];
}

export default function FuturisticPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Custom cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    // Particle animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles: any[] = []
      const particleCount = 100

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        })
      }

      const animate = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`
          ctx.fill()
        })
        
        requestAnimationFrame(animate)
      }
      animate()
    }

    // Scroll handling
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const skills = [
    { name: "Backend Development", icon: Server, color: "from-cyan-400 to-blue-600", glowColor: "shadow-cyan-500/50" },
    { name: "DevOps", icon: Terminal, color: "from-green-400 to-emerald-600", glowColor: "shadow-green-500/50" },
    { name: "Full-Stack Engineering", icon: Globe, color: "from-purple-400 to-pink-600", glowColor: "shadow-purple-500/50" },
    { name: "Database Design", icon: Database, color: "from-orange-400 to-red-600", glowColor: "shadow-orange-500/50" },
    { name: "System Architecture", icon: Layers, color: "from-indigo-400 to-purple-600", glowColor: "shadow-indigo-500/50" },
    { name: "Cloud Infrastructure", icon: Cloud, color: "from-teal-400 to-cyan-600", glowColor: "shadow-teal-500/50" },
  ]

  const technologies = [
    { name: "Node.js", icon: "⚡", color: "text-green-400", bgColor: "bg-green-500/20" },
    { name: "Python", icon: "🐍", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    { name: "PostgreSQL", icon: "🗄️", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { name: "MongoDB", icon: "🍃", color: "text-green-400", bgColor: "bg-green-500/20" },
    { name: "Redis", icon: "⚡", color: "text-red-400", bgColor: "bg-red-500/20" },
    { name: "Docker", icon: "🐳", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { name: "AWS", icon: "☁️", color: "text-orange-400", bgColor: "bg-orange-500/20" },
    { name: "Kubernetes", icon: "⚙️", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    { name: "React", icon: "⚛️", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
    { name: "TypeScript", icon: "📘", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { name: "GraphQL", icon: "🔗", color: "text-pink-400", bgColor: "bg-pink-500/20" },
    { name: "Microservices", icon: "🔧", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  ]

  const projects: Project[] = [
    {
      id: 1,
      title: "Distributed Task Scheduler",
      description: "A scalable microservices-based task scheduling system with Redis queue management and Docker containerization.",
      longDescription: "This project implements a highly scalable distributed task scheduling system using microservices architecture. It features Redis-based queue management, Docker containerization, and real-time monitoring capabilities. The system can handle thousands of concurrent tasks with automatic load balancing and fault tolerance.",
      tech: ["Node.js", "Redis", "Docker", "PostgreSQL"],
      githubUrl: "https://github.com/ayushbhardwaj683",
      demoVideo: "/placeholder.svg?height=300&width=500",
      features: ["Real-time monitoring", "Auto-scaling", "Fault tolerance", "Load balancing"]
    },
    {
      id: 2,
      title: "Real-time Analytics Dashboard",
      description: "Full-stack application with WebSocket integration for live data visualization and user activity tracking.",
      longDescription: "A comprehensive real-time analytics platform built with modern web technologies. Features live data streaming, interactive charts, user behavior tracking, and customizable dashboards. Supports multiple data sources and provides real-time insights for business intelligence.",
      tech: ["React", "Express.js", "Socket.io", "MongoDB"],
      githubUrl: "https://github.com/ayushbhardwaj683",
      demoVideo: "/placeholder.svg?height=300&width=500",
      features: ["Live data streaming", "Interactive charts", "Custom dashboards", "Multi-source integration"]
    },
    {
      id: 3,
      title: "API Gateway & Auth Service",
      description: "Secure API gateway with JWT authentication, rate limiting, and comprehensive logging for microservices.",
      longDescription: "Enterprise-grade API gateway solution with advanced security features. Implements JWT-based authentication, intelligent rate limiting, request/response transformation, and comprehensive audit logging. Designed for high-throughput microservices environments.",
      tech: ["Express.js", "JWT", "Redis", "Docker"],
      githubUrl: "https://github.com/ayushbhardwaj683",
      demoVideo: "/placeholder.svg?height=300&width=500",
      features: ["JWT Authentication", "Rate limiting", "Request transformation", "Audit logging"]
    },
    {
      id: 4,
      title: "Cloud Infrastructure Automation",
      description: "Infrastructure as Code solution using Terraform and CI/CD pipelines for automated deployments.",
      longDescription: "Complete Infrastructure as Code solution for cloud deployment automation. Features Terraform modules, CI/CD pipeline integration, automated testing, and multi-environment management. Supports AWS, Azure, and GCP with cost optimization and security best practices.",
      tech: ["Terraform", "AWS", "GitHub Actions", "Docker"],
      githubUrl: "https://github.com/ayushbhardwaj683",
      demoVideo: "/placeholder.svg?height=300&width=500",
      features: ["Multi-cloud support", "Cost optimization", "Automated testing", "Security compliance"]
    },
  ]

  const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 transform animate-modal-enter">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors"
            >
              <X className="w-6 h-6 text-red-400" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src={project.demoVideo || "/placeholder.svg"} 
                alt={project.title}
                className="w-full rounded-lg border border-cyan-500/30"
              />
              <div className="flex gap-4 mt-4">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>
            
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.longDescription}</p>
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <Badge key={tech} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white relative overflow-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-cyan-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute inset-0 w-full h-full bg-cyan-400 rounded-full animate-ping"></div>
      </div>

      {/* 3D Particle Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ayush's Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {["about", "skills", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 text-lg relative ${
                    activeSection === section 
                      ? "text-cyan-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400" 
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {section === "skills" ? "Expertise" : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* About Me Section */}
      <section id="about" className="min-h-screen flex items-center pt-20 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}>
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                AYUSH
                <br />
                BHARDWAJ
              </h1>
              <div className="text-2xl text-gray-300 font-light">
                Backend Developer
              </div>
            </div>
            
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-2xl">
              <p className="text-xl text-cyan-300">
                I'm someone who learns best by doing — quietly building, experimenting, and digging deeper than what's immediately visible.
              </p>
              
              <p>
                I'm drawn to systems that are elegant in their logic, solutions that genuinely solve problems, and challenges that demand more than a quick fix. I find joy in connecting the dots — between ideas, technologies, and people.
              </p>
              
              <p>
                Over time, I've developed expertise in backend development and full-stack engineering — areas where building reliable, thoughtful infrastructure matters just as much as the interface users see.
              </p>
            </div>
            
            {/* <div className="flex gap-4">
              <Button 
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                Explore My Work
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection("contact")}
                className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div> */}
          </div>
          
          <div className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-black rounded-full border border-cyan-500/30 flex items-center justify-center">
                <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  A
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group perspective-1000 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                <Card className={`bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 transform-gpu group-hover:rotateY-12 group-hover:rotateX-6 group-hover:scale-105 backdrop-blur-sm ${skill.glowColor} hover:shadow-2xl`}>
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-6 rounded-full bg-gradient-to-r ${skill.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <skill.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Technologies */}
          <div>
            <h3 className="text-4xl font-semibold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Technologies I Master
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div 
                  key={tech.name}
                  className={`${tech.bgColor} rounded-2xl p-6 text-center hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-sm group`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isVisible ? 'fadeInScale 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <p className={`text-sm font-medium ${tech.color} group-hover:text-white transition-colors`}>
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group perspective-1000 cursor-pointer"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none'
                }}
                onClick={() => setSelectedProject(project)}
              >
                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 transform-gpu group-hover:rotateY-6 group-hover:scale-105 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={project.demoVideo || "/placeholder.svg"} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-black/50 hover:bg-cyan-500/20 transition-all duration-300 backdrop-blur-sm border border-cyan-500/30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5 text-cyan-400" />
                      </a>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors duration-300 mb-4">
                      {project.title}
                    </CardTitle>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech} className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-300 rounded-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to turn ideas into reality? Let's connect and create.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm">
              <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">ayush406bhardwaj@gmail.com</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
              <Github className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-300">@ayushbhardwaj683</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm">
              <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn
                
              </h3>
              <p className="text-gray-300">Connect with me</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/ayushbhardwaj683"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/25"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/ayush-bhardwaj-1b0215254/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="https://x.com/bhardwaj683"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-purple-500 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/25"
            >
              <Twitter className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="https://leetcode.com/u/bhardwaj683/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-orange-500/25"
            >
              <Code className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="mailto:ayush406bhardwaj@gmail.com"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-500 hover:to-emerald-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-green-500/25"
            >
              <Mail className="w-6 h-6 text-white" />
            </a>
            
            <a 
              href="tel:+916203764676"
              className="p-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-indigo-500/25"
            >
              <Phone className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-700/50 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Ayush Bhardwaj. Crafted with passion for elegant systems and meaningful solutions.
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.9) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotateY-12 {
          transform: rotateY(12deg);
        }
        
        .rotateX-6 {
          transform: rotateX(6deg);
        }
        
        .rotateY-6 {
          transform: rotateY(6deg);
        }
        
        .animate-modal-enter {
          animation: modal-enter 0.5s ease-out;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  )
}