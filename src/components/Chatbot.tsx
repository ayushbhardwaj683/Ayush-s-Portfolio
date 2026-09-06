"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { knowledgeBase, chatSuggestions, chatFallback } from "@/lib/data";

function getAnswer(input: string): string {
  const words = input.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let best = { score: 0, priority: 0, answer: chatFallback };
  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((sum, keyword) => sum + (words.some(word => word === keyword || (keyword.length > 3 && word.startsWith(keyword))) ? 2 : 0), 0);
    const priority = entry.priority ?? 0;
    if (score > best.score || (score > 0 && score === best.score && priority > best.priority)) best = { score, priority, answer: entry.answer };
  }
  return best.answer;
}

const welcomeMessage = { from: "bot", text: "Hi, I’m Ayush’s portfolio guide. I can help with his experience, projects, skills, and contact details. What would you like to know?" };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"typing" | "revealing" | "ready">("revealing");
  const pendingAnswer = useRef("");
  const busy = phase !== "ready";
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [messages, open, phase]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open || phase === "ready") return;
    const timer = window.setTimeout(() => {
      if (phase === "typing") {
        setMessages(current => [...current, { from: "bot", text: pendingAnswer.current }]);
        setPhase("revealing");
      } else {
        setPhase("ready");
      }
    }, phase === "typing" ? 650 : 700);
    return () => window.clearTimeout(timer);
  }, [open, phase]);
  const close = () => {
    setOpen(false);
    setMessages([welcomeMessage]);
    setInput("");
    pendingAnswer.current = "";
    setPhase("revealing");
    launcherRef.current?.focus();
  };
  const send = (raw?: string) => {
    const question = (raw ?? input).trim();
    if (!question || busy) return;
    pendingAnswer.current = getAnswer(question);
    setMessages(m => [...m, { from: "user", text: question }]);
    setPhase("typing");
    setInput(""); inputRef.current?.focus();
  };
  return <>
    <button ref={launcherRef} className="chat-launcher" aria-expanded={open} aria-controls="portfolio-guide" onClick={() => open ? close() : setOpen(true)}><MessageCircle /><span>{open ? "Close guide" : "Ask about me"}</span></button>
    {open && <section id="portfolio-guide" className="chat-panel" aria-label="Portfolio guide" onKeyDown={e => { if (e.key === "Escape") { e.stopPropagation(); close(); } }}>
      <div className="chat-header"><div><strong>Ayush’s portfolio guide</strong><small>Quick answers from this portfolio</small></div><button className="icon-button" aria-label="Close portfolio guide" onClick={close}><X /></button></div>
      <div ref={scrollRef} className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message, index) => <div key={index} className={`chat-message ${message.from === "user" ? "user" : ""}`}>{message.text}</div>)}
        {phase === "typing" && <div className="chat-message chat-typing" role="status" aria-label="Preparing an answer"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></div>}
        {phase === "ready" && <div className="chat-suggestions" role="group" aria-label="Suggested questions">{chatSuggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>}
      </div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}><input ref={inputRef} aria-label="Your question" value={input} maxLength={500} onChange={e => setInput(e.target.value)} placeholder="Ask about experience, projects…" /><button className="icon-button" type="submit" disabled={!input.trim() || busy} aria-label="Send question"><Send /></button></form>
    </section>}
  </>;
}
