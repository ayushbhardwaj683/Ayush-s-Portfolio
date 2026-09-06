"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { knowledgeBase, chatSuggestions, chatFallback } from "@/lib/data";

function getAnswer(input: string): string {
  const words = input.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  let best = { score: 0, answer: chatFallback };
  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((sum, keyword) => sum + (words.some(word => word === keyword || (keyword.length > 3 && word.startsWith(keyword))) ? 2 : 0), 0);
    if (score > best.score) best = { score, answer: entry.answer };
  }
  return best.answer;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi, I’m Ayush’s portfolio guide. I can help with his experience, projects, skills, and contact details. What would you like to know?" }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "instant" }); }, [messages, open]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  const close = () => { setOpen(false); launcherRef.current?.focus(); };
  const send = (raw?: string) => {
    const question = (raw ?? input).trim();
    if (!question) return;
    setMessages(m => [...m, { from: "user", text: question }, { from: "bot", text: getAnswer(question) }]);
    setInput(""); inputRef.current?.focus();
  };
  return <>
    <button ref={launcherRef} className="chat-launcher" aria-expanded={open} aria-controls="portfolio-guide" onClick={() => open ? close() : setOpen(true)}><MessageCircle /><span>{open ? "Close guide" : "Ask about me"}</span></button>
    {open && <section id="portfolio-guide" className="chat-panel" aria-label="Portfolio guide" onKeyDown={e => { if (e.key === "Escape") { e.stopPropagation(); close(); } }}>
      <div className="chat-header"><div><strong>Ayush’s portfolio guide</strong><small>Quick answers from this portfolio</small></div><button className="icon-button" aria-label="Close portfolio guide" onClick={close}><X /></button></div>
      <div ref={scrollRef} className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message, index) => <div key={index} className={`chat-message ${message.from === "user" ? "user" : ""}`}>{message.text}</div>)}
        {messages.length === 1 && <div className="chat-suggestions">{chatSuggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>}
      </div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); send(); }}><input ref={inputRef} aria-label="Your question" value={input} maxLength={500} onChange={e => setInput(e.target.value)} placeholder="Ask about experience, projects…" /><button className="icon-button" type="submit" disabled={!input.trim()} aria-label="Send question"><Send /></button></form>
    </section>}
  </>;
}
