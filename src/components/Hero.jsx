import React from 'react';
import { Shield, Terminal, Zap, Cpu, ArrowRight, CheckCircle2, Lock, FileSearch, Sparkles } from 'lucide-react';

export default function Hero({ onOpenPitch }) {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden cyber-grid border-b border-cyber-border">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-neon-cyan">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Smart India Hackathon Defense Innovation</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-semibold">NTRO Problem Statement ID: 26148</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Next-Gen Cyber Forensics & Threat Analysis{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 glow-cyan">
              Programming Framework
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
            A dedicated, <span className="text-cyan-300 font-semibold">LLVM-backed Domain Specific Language (DSL)</span> designed to inspect volatile memory, verify kernel driver integrity, and execute deep cross-platform incident response with <span className="text-emerald-300 font-semibold">near-zero evidence pollution</span>.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#live-studio"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm tracking-wider uppercase flex items-center gap-3 transition-all transform hover:-translate-y-0.5 shadow-neon-cyan"
            >
              <Terminal className="w-5 h-5 text-black" />
              <span>Explore Live Studio & Compiler</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <button
              onClick={onOpenPitch}
              className="px-8 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm tracking-wide flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Launch SIH Pitch Deck</span>
            </button>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-4 rounded-xl bg-[#0c1324]/80 border border-slate-800 backdrop-blur-sm hover:border-cyan-500/40 transition-all text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mb-1">&lt; 850 KB</div>
              <div className="text-xs text-slate-400 font-medium">Micro-Binary Footprint</div>
              <div className="text-[11px] text-slate-500 mt-1">Zero dependency runtime</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1324]/80 border border-slate-800 backdrop-blur-sm hover:border-emerald-500/40 transition-all text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mb-1">35 ms</div>
              <div className="text-xs text-slate-400 font-medium">Live Triage Latency</div>
              <div className="text-[11px] text-slate-500 mt-1">Direct NT/eBPF syscalls</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1324]/80 border border-slate-800 backdrop-blur-sm hover:border-purple-500/40 transition-all text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono mb-1">0.01%</div>
              <div className="text-xs text-slate-400 font-medium">Evidence Contamination</div>
              <div className="text-[11px] text-slate-500 mt-1">Preserves volatile RAM</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0c1324]/80 border border-slate-800 backdrop-blur-sm hover:border-amber-500/40 transition-all text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono mb-1">100%</div>
              <div className="text-xs text-slate-400 font-medium">Sovereign Architecture</div>
              <div className="text-[11px] text-slate-500 mt-1">Custom Compiler Core</div>
            </div>
          </div>
        </div>

        {/* Live System Comparison Strip */}
        <div className="mt-14 max-w-4xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-mono">The Forensic "Heisenberg Effect" Solved</h4>
              <p className="text-xs text-slate-400">Traditional tools overwrite memory while inspecting. JOCKY executes in-place with non-polluting micro-routines.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Cross-Platform Ready: Win64 / Linux x64</span>
          </div>
        </div>
      </div>
    </section>
  );
}
