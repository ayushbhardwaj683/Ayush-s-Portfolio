"use client";

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { ArrowUpRight, ArrowDown, ArrowUp, Github, Linkedin, Download, Moon, Sun, Menu, X, MapPin, Code2, Workflow, Database, Layers, GraduationCap, Search, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chatbot from "@/components/Chatbot";
import Link from "next/link";
import { profile, socials, experiences, skillGroups, projects, projectFilters, type Project } from "@/lib/data";

const NAV = ["home", "about", "experience", "projects", "skills", "education", "contact"];
const skillIcons = [Workflow, Code2, Database, Layers];

function Reveal({ children, className = "", delay = 100 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Keep server-rendered content visible; stage only elements below the viewport.
    if (element.getBoundingClientRect().top < window.innerHeight - 60) return;
    element.classList.add("pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.replace("pending", "shown"); observer.unobserve(element); }
    }, { threshold: 0.08, rootMargin: "0px 0px -65px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}

function Modal({ children, title, onClose, className = "" }: { children: ReactNode; title: string; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal(); document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={ref} className={`dialog ${className}`} aria-label={title} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    <div className="dialog-header"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X /></button></div>{children}
  </dialog>;
}

export default function Portfolio() {
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [recruiter, setRecruiter] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
    const onScroll = () => {
      setShowTop(window.scrollY > 700);
      let current = "home";
      NAV.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 180) current = id; });
      setActive(current);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette(v => !v); }
      if (e.key === "Escape") setMenuOpen(false);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next); document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* Storage is optional. */ }
  };
  const navigate = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); };
  const commands = [
    ...NAV.map(id => ({ label: `Go to ${id}`, run: () => navigate(id) })),
    { label: "View resume", run: () => window.open(profile.resumeUrl, "_blank", "noopener,noreferrer") },
    { label: "Toggle color theme", run: toggleTheme },
    { label: "Recruiter snapshot", run: () => setRecruiter(true) },
    { label: "Open GitHub", run: () => window.open(socials.github, "_blank", "noopener,noreferrer") },
    { label: "Open LinkedIn", run: () => window.open(socials.linkedin, "_blank", "noopener,noreferrer") },
    { label: "Email Ayush", run: () => { window.location.href = `mailto:${profile.email}`; } },
  ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  const shown = (filter === "All" ? projects : projects.filter(p => p.category === filter)).slice().sort((a,b) => ([1,5,4,2,3].indexOf(a.id) - [1,5,4,2,3].indexOf(b.id)));

  return <>
    <a className="skip-link" href="#home">Skip to content</a>
    <header className="header"><div className="container nav-inner">
      <a href="#home" className="logo" aria-label="Ayush Bhardwaj home">AB<span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{NAV.map(id => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`nav-link ${active === id ? "active" : ""}`}>{id[0].toUpperCase() + id.slice(1)}</a>)}</nav>
      <div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>{theme === "light" ? <Moon /> : <Sun />}</button><button className="icon-button menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </div>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{NAV.map(id => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={`nav-link ${active === id ? "active" : ""}`}>{id[0].toUpperCase() + id.slice(1)}</a>)}</nav>}</header>
    <main>
      <section id="home" className="hero container"><div className="hero-grid">
        <div className="hero-enter"><div className="eyebrow">Ayush · Developer & builder</div><h1> Be Thoughtful <br /><span>Real-world impact.</span></h1><p className="hero-description">I build <strong> automations</strong> and <strong>full-stack web apps </strong></p><div className="hero-actions"><a className="primary-button" href="#projects">Explore my work <ArrowUpRight /></a><a href={profile.resumeUrl} className="text-link" download="Ayush_20683_Resume.pdf">Download résumé <Download /></a></div><div className="social-row"><a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><span className="social-divider" /><span className="hero-location-tools"><span className="location"><MapPin /> India</span><span className="recruiter-divider" aria-hidden="true">|</span><button type="button" className="hero-recruiter" aria-haspopup="dialog" onClick={() => setRecruiter(true)}>Recruiter mode</button></span></div></div>
        <div className="portrait-composition hero-enter"><div className="portrait-frame">
          {/* Portrait with a clean background and no overlapping labels. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar} alt="Ayush Bhardwaj" width={1126} height={1397} fetchPriority="high" />
        </div></div>
      </div><div className="hero-bottom"><a href="#about"><ArrowDown /> Scroll to get to know me</a><span>IDEA → BUILD → TEST → SHIP</span></div></section>

      <section id="about" className="section"><div className="container"><div className="about-grid"><Reveal><div className="eyebrow">01 / A little about me</div><h2 className="about-title">Curiosity starts it.<br />Ownership ships it.<br /><span>Iteration makes it better.</span></h2></Reveal><Reveal className="body-copy" delay={180}><p>I’m Ayush, a <strong>BCA graduate and hands-on builder</strong> who enjoys taking a problem from the first question to software people actually use.</p><p>I’m drawn to useful ideas, thoughtful interfaces, and systems that make everyday tasks simpler.</p><p>I care about the whole loop: understanding the problem, defining the details, building, testing, and learning from what ships.</p><p className="learning-note">Currently exploring <strong>business analysis</strong> — </p></Reveal></div></div></section>

      <section id="experience" className="section"><div className="container"><Reveal className="section-heading"><div><div className="eyebrow">02 / The journey so far</div><h2>Work that made a difference.</h2></div><p>Real teams, real problems, and a little more responsibility with every release.</p></Reveal><div className="experience-list">{experiences.map(exp => <Reveal key={exp.company} className="experience-row"><div className="experience-meta"><span className="period">{exp.period}</span><h3>{exp.company}</h3><p>{exp.location}</p>{exp.current && <span className="current-badge">● Currently here</span>}</div><div className="experience-content"><h4>{exp.role}</h4><ul>{exp.points.map(p => <li key={p}>{p}</li>)}</ul><div className="tags">{exp.stack.map(t => <span key={t} className="tag">{t}</span>)}</div></div></Reveal>)}</div></div></section>

      <section id="projects" className="section projects-section"><div className="container"><Reveal className="section-heading"><div><div className="eyebrow">03 / Selected work</div><h2>Ideas, brought to life.</h2></div><a href={socials.github} target="_blank" rel="noreferrer" className="text-link">More on GitHub <ArrowUpRight /></a></Reveal><div className="project-filters" aria-label="Filter projects">{projectFilters.map(f => <button key={f} className="filter-button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f === "All" ? "All projects" : f}</button>)}</div><div className="projects-grid">{shown.map((project, index) => <Reveal key={`${filter}-${project.id}`} delay={index % 2 ? 200 : 100}><article className="project-card"><div className="project-cover"><div className="project-cover-top"><span>PROJECT / 0{project.id}</span><Code2 size={18} /></div><div className="project-cover-title">{project.title}</div><div className="project-cover-bottom"><span>{project.id === 1 ? "PDF → a plan of action" : project.id === 5 ? "Your content. Connected knowledge." : project.id === 2 ? "Products. Orders. Secure APIs." : project.id === 4 ? "Conversations, in real time." : "A space for the things I build."}</span><ArrowUpRight size={20} /></div></div><div className="project-body"><div className="project-title-row"><h3>{project.title}</h3><a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`}><Github /></a></div><p>{project.description}</p><div className="tags">{project.tech.slice(0,4).map(t => <span className="tag" key={t}>{t}</span>)}</div><div className="project-footer"><button className="text-link" onClick={() => setSelected(project)}>Explore project <ArrowUpRight /></button><span className="project-category">{project.category}</span></div></div></article></Reveal>)}</div><article className="case-study-preview"><div><span className="eyebrow">Learning business analysis / Case study 01</span><h3>AI in Indian hospitals: what happens to the staff?</h3><p>How could AI change the work and skills of doctors, technicians and other hospital staff? My first case study, with hospital examples and a simple dashboard.</p></div><Link href="/case-studies/healthcare-ai-india/" className="text-link">Read my case study <ArrowUpRight /></Link></article></div></section>

      <section id="skills" className="section"><div className="container"><Reveal className="section-heading"><div><div className="eyebrow">04 / My toolkit</div><h2>The right tools. Thoughtfully used.</h2></div><p>From the first spec to the final API call, a practical toolkit for getting things done.</p></Reveal><div className="skills-grid">{skillGroups.map((group, i) => { const Icon = skillIcons[i % skillIcons.length]; return <Reveal className="skill-group" key={group.title} delay={i % 2 ? 180 : 100}><div className="skill-heading"><Icon /><h3>{group.title}</h3></div><div className="tags">{group.skills.map(s => <span key={s} className="tag">{s}</span>)}</div></Reveal>; })}</div></div></section>

      <section id="education" className="section"><div className="container"><Reveal className="section-heading"><div><div className="eyebrow">05 / The foundation</div><h2>Always a student.</h2></div></Reveal><Reveal className="education-card"><div className="education-meta"><GraduationCap />AUG 2023 — AUG 2026</div><div><h3>Bachelor of Computer Applications</h3><p>Dehradun Institute of Technology University · Dehradun</p><span className="tag">CGPA 7.02</span><p className="education-note"><strong>Technical Member, IEEE Student Branch</strong><br />Organised technical events, workshops, and hackathons across teams.</p></div></Reveal></div></section>

      <section id="contact" className="section contact-section"><div className="container"><Reveal className="contact-grid"><div><div className="eyebrow">06 / What’s next?</div><h2>Good things start<br />with a hello.</h2><p>Have an interesting problem, an opportunity, or an idea worth building? I’d love to hear about it.</p></div><div className="contact-links"><a className="contact-link" href={`mailto:${profile.email}`}><div><small>Drop me a line</small><span>{profile.email}</span></div><ArrowUpRight /></a><a className="contact-link" href={socials.linkedin} target="_blank" rel="noreferrer"><div><small>Let’s connect</small><span>Find me on LinkedIn</span></div><ArrowUpRight /></a><a className="contact-link" href={`tel:${profile.phone}`}><div><small>Prefer a conversation?</small><span>+91 62037 64676</span></div><ArrowUpRight /></a></div></Reveal></div></section>
    </main>
    <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Bhardwaj. Built with care.</span><div className="footer-tools"><a href={socials.twitter} target="_blank" rel="noreferrer">X / Twitter</a><a href={socials.leetcode} target="_blank" rel="noreferrer">LeetCode</a><button onClick={() => setRecruiter(true)}>For recruiters</button><button onClick={() => { setQuery(""); setPalette(true); }} aria-label="Open quick navigation, Control K"><Search size={15} /></button></div></div></footer>
    {showTop && <button className="icon-button back-top" aria-label="Back to top" onClick={() => navigate("home")}><ArrowUp /></button>}
    <Chatbot />
    {selected && <Modal title={selected.title} onClose={() => setSelected(null)} className="project-dialog"><div className="eyebrow">{selected.category} / Project details</div><p>{selected.longDescription}</p><h3>What it does</h3><ul>{selected.features.map(f => <li key={f}>{f}</li>)}</ul><div className="tags">{selected.tech.map(t => <span className="tag" key={t}>{t}</span>)}</div><a href={selected.githubUrl} target="_blank" rel="noreferrer" className="primary-button">View source on GitHub <Github /></a>{selected.liveUrl && <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="text-link">Live project <ExternalLink /></a>}</Modal>}
    {palette && <Modal title="Jump to something" onClose={() => setPalette(false)}><input autoFocus aria-label="Search navigation commands" className="palette-input" placeholder="Search pages, résumé, links…" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && commands[0]) { setPalette(false); commands[0].run(); } }} /><div className="palette-results">{commands.map(c => <button key={c.label} onClick={() => { setPalette(false); c.run(); }}>{c.label}</button>)}{!commands.length && <p>No matching commands.</p>}</div></Modal>}
    {recruiter && <Modal title="A quick introduction" onClose={() => setRecruiter(false)}><div className="eyebrow"><Briefcase size={16} /> Recruiter snapshot</div><p>{profile.recruiterSummary}</p><div className="snapshot-facts"><span className="tag">BCA · Class of 2026</span><span className="tag">Based in India</span><span className="tag">{profile.availability}</span></div><a className="primary-button" href={profile.resumeUrl} download="Ayush_Bhardwaj_Resume.pdf">Download résumé <Download /></a><Button variant="ghost" className="ml-4" onClick={() => { window.location.href = `mailto:${profile.email}`; }}>Get in touch <ArrowUpRight className="ml-2" /></Button></Modal>}
  </>;
}
