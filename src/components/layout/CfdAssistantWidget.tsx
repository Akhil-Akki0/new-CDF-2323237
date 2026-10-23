import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, HelpCircle, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  actionRoute?: string;
  actionLabel?: string;
}

const SCRIPTED_KNOWLEDGE: Record<string, { answer: string; route?: string; label?: string }> = {
  reynolds: {
    answer: "The Reynolds number (Re = ρVL/μ) quantifies the ratio of inertial forces to viscous forces. In our 2D browser solver, Re < 2300 produces strictly laminar behavior (such as steady symmetric flow past a cylinder at Re=20). For Re between 47 and ~1000, you will observe the periodic alternate Kármán vortex street shedding instability.",
    route: 'calculators',
    label: 'Open Reynolds Calculator',
  },
  cfl: {
    answer: "The Courant–Friedrichs–Lewy (CFL = u·Δt/Δx) condition governs numerical stability in explicit solvers. In the Lattice Boltzmann method, the dimensionless lattice velocity must remain strictly below the lattice speed of sound (c_s = 1/√3 ≈ 0.577), typically maintaining u < 0.1 to avoid compressibility error and numerical explosion.",
    route: 'docs',
    label: 'View Numerical Stability Docs',
  },
  yplus: {
    answer: "y+ is the non-dimensional wall distance: y+ = y·u_τ/ν. For resolved near-wall boundary layers (without wall functions), you want y+ ≈ 1.0 to resolve the viscous sublayer. If using standard high-Re wall functions, target 30 < y+ < 300.",
    route: 'calculators',
    label: 'Open y+ Mesh Height Estimator',
  },
  cavity: {
    answer: "The 2D Lid-Driven Cavity is simulated with three stationary no-slip walls and an upper top boundary moving horizontally at velocity U=1.0. At Re=1000, our browser solver correlates within 0.41% max error against the seminal benchmark data of Ghia, Ghia & Shin (1982).",
    route: 'validation',
    label: 'Compare against Ghia et al. 1982',
  },
  excel: {
    answer: "The 'Download Excel' pipeline creates an audit-grade .xlsx file containing 6 structured sheets: 1) Run Summary & Parameters, 2) Time-Series Force Balances (Cd & Cl), 3) Residual Convergence log, 4) Surface Probes history, 5) Centerline Velocity Line-Profiles, and 6) 2D Grid Point Samples. All numbers are formatted with scientific units and frozen header panes.",
    route: 'simulator',
    label: 'Test Live Excel Export',
  },
};

export const CfdAssistantWidget: React.FC = () => {
  const { assistantOpen, setAssistantOpen, setRoute } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am the AetherCFD Engineering Co-pilot. Ask me anything about Navier-Stokes formulations, Reynolds numbers, boundary layer mesh resolution (y+), or benchmark comparisons.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulated technical reasoning response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = SCRIPTED_KNOWLEDGE.reynolds;

      if (lower.includes('cfl') || lower.includes('stability') || lower.includes('timestep') || lower.includes('diverg')) {
        matched = SCRIPTED_KNOWLEDGE.cfl;
      } else if (lower.includes('y+') || lower.includes('wall') || lower.includes('boundary layer') || lower.includes('mesh')) {
        matched = SCRIPTED_KNOWLEDGE.yplus;
      } else if (lower.includes('cavity') || lower.includes('ghia') || lower.includes('benchmark')) {
        matched = SCRIPTED_KNOWLEDGE.cavity;
      } else if (lower.includes('excel') || lower.includes('export') || lower.includes('sheet') || lower.includes('data')) {
        matched = SCRIPTED_KNOWLEDGE.excel;
      } else {
        matched = {
          answer: `Regarding "${query}": AetherCFD solves the 2D incompressible Navier-Stokes equations via discrete Lattice Boltzmann collision-streaming steps. All fluid properties, boundary conditions, and probe histories can be inspected live in the Simulator or exported to Excel.`,
          route: 'simulator',
          label: 'Open Simulation Workspace',
        };
      }

      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: matched.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionRoute: matched.route,
        actionLabel: matched.label,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {assistantOpen ? (
        <div className="w-[360px] sm:w-[400px] h-[520px] glass-panel rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white">CFD Engineering Assistant</span>
                <span className="text-[10px] text-slate-400 block font-mono">Domain Scripted · LLM Adapter Ready</span>
              </div>
            </div>
            <button
              onClick={() => setAssistantOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick prompt suggestions */}
          <div className="px-3 py-2 border-b border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend("What is the stability CFL limit?")}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap"
            >
              CFL Stability Limit?
            </button>
            <button
              onClick={() => handleSend("How to calculate y+ for first cell?")}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap"
            >
              y+ Target?
            </button>
            <button
              onClick={() => handleSend("Explain Ghia cavity benchmark")}
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 whitespace-nowrap"
            >
              Ghia Cavity?
            </button>
          </div>

          {/* Chat message body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600 text-white font-medium'
                      : 'bg-white/5 border border-white/10 text-slate-200'
                  }`}
                >
                  {msg.text}

                  {msg.actionRoute && (
                    <button
                      onClick={() => {
                        setRoute(msg.actionRoute as any);
                        setAssistantOpen(false);
                      }}
                      className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-semibold transition-colors"
                    >
                      <span>{msg.actionLabel || 'Learn more'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 text-slate-400 text-xs">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">Analyzing physics formulation...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input field */}
          <div className="p-3 border-t border-white/10 bg-slate-950/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Reynolds number, y+, or solver..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg disabled:opacity-40 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      ) : (
        <button
          onClick={() => setAssistantOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 border border-cyan-500/30 text-white shadow-xl hover:border-cyan-400 hover:shadow-cyan-500/20 transition-all cursor-pointer"
          aria-label="Open CFD Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide">CFD Assistant</span>
        </button>
      )}
    </div>
  );
};
