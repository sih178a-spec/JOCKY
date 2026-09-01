import React from 'react';
import { Shield, Lock, Terminal, Github, Heart, Cpu, Sparkles } from 'lucide-react';

export default function Footer({ onOpenPitch }) {
  return (
    <footer className="bg-[#050811] border-t border-cyber-border text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Shield className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-bold text-white font-mono tracking-wider glow-cyan">JOCKY</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                SIH 2024/2025
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Next-Generation Cyber Forensics & Threat Analysis Programming Framework. A specialized DSL & LLVM-backed compiler engine for volatile memory triage and kernel integrity auditing with zero evidence pollution.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Technical Research Organisation (NTRO) | PS ID: 26148</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#live-studio" className="hover:text-cyan-400 transition-colors">JOCKY Code Studio</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">LLVM Engine Architecture</a></li>
              <li><a href="#benchmarks" className="hover:text-cyan-400 transition-colors">Performance Benchmarks</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Defensive Capabilities</a></li>
              <li><a href="#playbooks" className="hover:text-cyan-400 transition-colors">Forensic Playbook Library</a></li>
            </ul>
          </div>

          {/* SIH Resources & Links */}
          <div>
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-3">SIH Jury Kit</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenPitch} className="text-amber-400 hover:text-amber-300 transition-colors font-medium text-left">
                  Launch Pitch Deck (6 Slides)
                </button>
              </li>
              <li><span className="text-slate-500">Target Platforms: Win64 / Linux x64</span></li>
              <li><span className="text-slate-500">Compiler Backend: LLVM 18.1 Static</span></li>
              <li><span className="text-slate-500">Security Model: Zero-Footprint In-Memory</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} JOCKY Framework. Developed for Smart India Hackathon.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Sovereign Cyber Defense Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
