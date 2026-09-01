import React from 'react';
import { Shield, Terminal, Cpu, Layers, BarChart3, Presentation, BookOpen, Activity } from 'lucide-react';

export default function Navbar({ onOpenPitch, activeSection, setActiveSection }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b14]/90 border-b border-cyber-border">
      {/* Top micro-ticker */}
      <div className="bg-[#0a1020] border-b border-[#14203a] px-4 py-1 text-xs text-cyber-textMuted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            DEFENSE CORE ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400 font-mono">NTRO Problem Statement ID: 26148</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-emerald-400 font-mono">LLVM 18.1 Backend: ONLINE</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="text-slate-400">SIH 2024/2025 Innovation</span>
          <button
            onClick={onOpenPitch}
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Judge Pitch Mode</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-neon-cyan border border-cyan-400/40">
            <Shield className="w-6 h-6 text-black fill-current stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider font-mono text-white glow-cyan">JOCKY</span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                DSL v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans tracking-tight">Cyber Forensics & Threat Analysis Framework</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-1">
          <a
            href="#live-studio"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Live Studio
          </a>
          <a
            href="#architecture"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            Architecture
          </a>
          <a
            href="#benchmarks"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Benchmarks
          </a>
          <a
            href="#features"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 text-amber-400" />
            Capabilities
          </a>
          <a
            href="#playbooks"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            Playbooks
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPitch}
            className="px-3.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Presentation className="w-4 h-4" />
            <span className="hidden sm:inline">Pitch Presentation</span>
            <span className="sm:hidden">Pitch</span>
          </button>
          
          <a
            href="#live-studio"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-neon-cyan"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch IDE</span>
          </a>
        </div>
      </div>
    </header>
  );
}
