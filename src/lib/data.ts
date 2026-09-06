// ---------------------------------------------------------------------------
// Central content file for the portfolio.
// Edit the values here to update the site — no need to touch the components.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ayush Bhardwaj",
  firstName: "AYUSH",
  role: "AI & Automation Engineer",
  tagline: "I build reliable systems and thoughtful interfaces.",
  location: "India",
  availability: "Open to internships & full-time roles",
  email: "ayush406bhardwaj@gmail.com",
  phone: "+916203764676",
  resumeUrl: "/resume.pdf",
  avatar: "/ayush-portrait-clean.png",
  about: [
    "I'm someone who learns best by doing — quietly building, experimenting, and digging deeper than what's immediately visible.",
    "I'm drawn to systems that are elegant in their logic, solutions that genuinely solve problems, and challenges that demand more than a quick fix. I find joy in connecting the dots — between ideas, technologies, and people.",
    "Over time, I've developed expertise in backend development and full-stack engineering — areas where building reliable, thoughtful infrastructure matters just as much as the interface users see.",
  ],
  // Short version shown in Recruiter Mode
  recruiterSummary:
    "BCA graduate (2026) with experience in AI automation, full-stack development, authentication security, and production reliability. Currently exploring business analysis, with an interest in understanding problems, defining requirements, and building useful software. See Work Experience for the role details.",
};

export const socials = {
  github: "https://github.com/ayushbhardwaj683",
  linkedin: "https://www.linkedin.com/in/ayush-bhardwaj-1b0215254/",
  twitter: "https://x.com/bhardwaj683",
  leetcode: "https://leetcode.com/u/bhardwaj683/",
};

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    role: "AI & Automation Intern", company: "The Elite Point",
    period: "Jun 2026 — Present", location: "Remote", current: true,
    points: [
      "Owned the lead-generation and intent-prospecting engine from problem definition to rollout, turning a multi-day manual research cycle into a few hours.",
      "Shipped 20+ production n8n workflows and AI agents, with defined edge cases, retries, token-exhaustion handling, and empty-result paths.",
      "Built a four-stage prospecting pipeline with parallel sub-workflows and PostgreSQL persistence, deduplicating records across profile IDs, URLs, and name-company keys.",
      "Combined deterministic ICP scoring with LLM classification, reaching 80% qualified-lead accuracy and reducing manual review by 60–70%.",
      "Scaled throughput from 700 to 3,000 records per week using custom scrapers, Apify token rotation, and continuous enrichment improvements.",
      "Automated per-segment Excel reporting and Gmail delivery, with formula-injection guarding and database logs tracing every output to its run.",
    ],
    stack: ["n8n", "LLMs", "PostgreSQL", "Supabase", "Apify", "REST APIs"],
  },
  {
    role: "Full Stack Developer Intern", company: "Avijo Healthcare",
    period: "Mar 2026 — May 2026", location: "Remote",
    points: [
      "Identified and patched a critical production flaw that exposed OTPs in network responses, securing the email-OTP authentication flow.",
      "Resolved 15+ UI and API defects across patient profiles, medical records, payments, subscriptions, uploads, and PDF generation, verifying each fix before release.",
      "Restored account-management flows including email verification, password changes, linked social accounts, privacy controls, and display settings.",
      "Hardened the React frontend and MongoDB/Mongoose backend against undefined-data edge cases, aligning API contracts and tightening queries and schema validation.",
    ],
    stack: ["React.js", "MongoDB", "Mongoose", "REST APIs", "Authentication", "QA"],
  },
];

// ---------------------------------------------------------------------------
// SKILLS & TOOLS  (grouped by category — used by the skills section)
// ---------------------------------------------------------------------------
export interface SkillGroup {
  title: string;
  accent: string; // gradient tailwind classes
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "AI & Automation", accent: "", skills: ["n8n", "Claude / GPT / Gemini", "Prompt engineering", "RAG pipelines", "Web scraping", "Apify", "Tavily"] },
  { title: "Engineering", accent: "", skills: ["JavaScript", "TypeScript", "Python", "Java", "React.js", "Next.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS"] },
  { title: "Data & Tools", accent: "", skills: ["PostgreSQL", "Supabase", "MongoDB", "SQL", "Excel / Google Sheets", "Git / GitHub", "Postman", "Notion"] },
  { title: "Product & Delivery", accent: "", skills: ["Specification writing", "Workflow design", "Structured QA", "API integration", "Metric definition", "Release documentation", "Backlog tracking"] },
];

// Logos grid (kept from your original site)
export const technologies = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/html5.svg", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/css3.svg", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/javascript.svg", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
  { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/tailwindcss.svg", color: "text-teal-400", bgColor: "bg-teal-500/20" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nodedotjs.svg", color: "text-green-400", bgColor: "bg-green-500/20" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mongodb.svg", color: "text-green-400", bgColor: "bg-green-500/20" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mysql.svg", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/react.svg", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/nextdotjs.svg", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/typescript.svg", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/express.svg", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/python.svg", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
];

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  category: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Study Planner",
    description:
      "A full-stack AI-powered study planner that helps students organize learning schedules and track progress.",
    longDescription:
      "An intelligent study planning tool that uses AI to recommend optimal study schedules based on user goals, available time, and learning preferences. It helps students stay organized and make the most of their study time.",
    tech: ["Node.js", "React", "Tailwind CSS", "MongoDB", "Express.js", "JavaScript"],
    githubUrl: "https://github.com/ayushbhardwaj683/AI-Study-Planner",
    category: "AI",
    features: [
      "Instantly converts PDF syllabus files into structured, actionable weekly roadmaps using Gemini AI.",
      "Customizes study plans based on your daily availability and target completion deadline.",
      "Visualizes performance with interactive dashboards and detailed analytics.",
      "Provides dynamic AI-driven feedback.",
    ],
  },
  {
    id: 2,
    title: "E-com API",
    description:
      "A backend e-commerce API with secure endpoints for products, users, orders, and authentication.",
    longDescription:
      "A scalable and secure e-commerce backend API built using Node.js and Express. It supports authentication, product management, order processing, and role-based access control using JWT.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Socket.io"],
    githubUrl: "https://github.com/ayushbhardwaj683/ECOM-API",
    category: "Backend",
    features: [
      "Product catalog management",
      "Order processing",
      "JWT authentication",
      "Role-based access control",
      "Inventory tracking",
      "Secure API endpoints",
    ],
  },
  {
    id: 3,
    title: "My Portfolio",
    description:
      "My personal portfolio website showcasing skills, projects, and experience as a full-stack developer.",
    longDescription:
      "A modern and responsive personal portfolio website built with Next.js and Tailwind CSS. It highlights my skills, projects, and experience, with smooth animations and an interactive design.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "CSS animations"],
    githubUrl: "https://github.com/ayushbhardwaj683/Ayush-s-Portfolio",
    category: "Web",
    features: [
      "Explains my skills and expertise",
      "Showcases projects and experience",
      "Responsive design for all devices",
      "Interactive UI with animations",
      "Fast loading and optimized performance",
    ],
  },
  {
    id: 4,
    title: "Chat Application",
    description:
      "A full-stack, real-time messaging app that replicates the core functionality and UI/UX of WhatsApp Web.",
    longDescription:
      "A real-time chat application built with Next.js and Convex, designed to replicate the core functionality and user experience of WhatsApp Web. It features instant messaging, group chats, and a sleek, responsive design.",
    tech: ["Next.js", "Tailwind CSS", "React", "Convex", "Clerk"],
    githubUrl: "https://github.com/ayushbhardwaj683/chat-application-web",
    category: "Web",
    features: [
      "Real-time database powered by Convex — messages appear instantly across clients.",
      "Typing indicators that appear live and auto-clear after inactivity.",
      "Group chats with multiple members, custom names, and member counts.",
    ],
  },
  {
    id: 5,
    title: "AI Assistant",
    description:
      "A full-stack AI study assistant that turns YouTube videos and PDFs into interactive learning experiences.",
    longDescription:
      "An AI-powered study assistant that converts YouTube videos and PDF documents into interactive learning experiences. It provides flashcards, quizzes, and chat with the material using a Retrieval-Augmented Generation (RAG) pipeline.",
    tech: ["Next.js", "Tailwind CSS", "React", "FastAPI", "Python", "Supabase"],
    githubUrl: "https://github.com/ayushbhardwaj683/ai-assistant",
    category: "AI",
    features: [
      "User authentication",
      "Multimodal input (video + PDF)",
      "Vector search (RAG)",
      "AI chat tutoring",
      "Flashcard generation",
      "Quiz creation",
    ],
  },
];

export const projectFilters = ["All", "AI", "Backend", "Web"];

// ---------------------------------------------------------------------------
// CHATBOT KNOWLEDGE BASE
// A tiny local "AI" — no API key needed. Each entry has trigger keywords and
// an answer. The chatbot scores the user's message against these keywords.
// Add more entries any time to make the bot smarter.
// ---------------------------------------------------------------------------
export interface KBEntry {
  keywords: string[];
  answer: string;
}

export const knowledgeBase: KBEntry[] = [
  {
    keywords: ["who", "you", "about", "yourself", "ayush", "introduce"],
    answer:
      "I'm Ayush Bhardwaj, a full-stack developer who loves building reliable backends and clean, thoughtful interfaces. I work mostly with Next.js, Node.js, React, MongoDB and Python.",
  },
  {
    keywords: ["skill", "tech", "stack", "technolog", "language", "know", "tools"],
    answer:
      "My core stack: React, Next.js & TypeScript on the frontend; Node.js, Express & FastAPI on the backend; MongoDB, SQL & Supabase for data. I also work with Python, Git, and deploy on Vercel.",
  },
  {
    keywords: ["project", "built", "work", "portfolio", "made", "app"],
    answer:
      "A few favourites: an AI Study Planner (turns a PDF syllabus into a study roadmap with Gemini), a secure e-commerce REST API, a real-time WhatsApp-style chat app on Convex, and an AI study assistant with a RAG pipeline. Scroll to the Projects section to explore them all.",
  },
  {
    keywords: ["experience", "job", "intern", "company", "worked", "role"],
    answer:
      "I’m an AI & Automation Intern at The Elite Point (June 2026–present), where I shipped 20+ workflows and AI agents. Previously, I was a Full Stack Developer Intern at Avijo Healthcare (March–May 2026), improving authentication security and fixing 15+ production defects.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "message", "available"],
    answer:
      "You can reach me at ayush406bhardwaj@gmail.com, or connect on LinkedIn and GitHub. I'm open to internships and full-time roles — the Contact section has all the links.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "You can grab my resume from “Download résumé” in the opening section — it opens the PDF in a new tab.",
  },
  {
    keywords: ["backend", "api", "server", "database", "node"],
    answer:
      "Backend is my happy place. I build REST APIs with Node.js/Express and FastAPI, handle JWT auth and role-based access, add real-time features with Socket.io, and model data in MongoDB and SQL.",
  },
  {
    keywords: ["frontend", "react", "next", "ui", "design", "css"],
    answer:
      "On the frontend I use React, Next.js and TypeScript with Tailwind CSS, and add subtle motion with CSS and scroll-triggered reveals. I care about responsive, accessible UI and smooth micro-interactions — like the ones on this site.",
  },
  {
    keywords: ["ai", "ml", "machine", "gemini", "rag", "llm"],
    answer:
      "I've built AI-powered apps: an AI Study Planner using Gemini, and an AI study assistant with a Retrieval-Augmented Generation (RAG) pipeline over YouTube videos and PDFs.",
  },
  {
    keywords: ["hello", "hi", "hey", "yo", "greetings"],
    answer:
      "Hey! 👋 I'm Ayush's assistant. Ask me about his skills, projects, experience, or how to get in touch.",
  },
  {
    keywords: ["thanks", "thank", "cool", "awesome", "nice"],
    answer: "Anytime! 😄 Feel free to ask anything else, or reach out to Ayush directly via the Contact section.",
  },
];

export const chatSuggestions = [
  "What's your tech stack?",
  "Tell me about your projects",
  "Are you available to hire?",
  "What backend experience do you have?",
];

export const chatFallback =
  "Good question! I'm a lightweight assistant, so I might not have that one. Try asking about Ayush's skills, projects, experience, or contact info — or email him at ayush406bhardwaj@gmail.com.";
