import React, { useState } from 'react';
import { Layers, Cpu, ShieldCheck, Server, Lock, Database, ArrowDown, CheckCircle2, ChevronRight, Terminal, Network } from 'lucide-react';

export default function ArchitectureView() {
  const [selectedLayer, setSelectedLayer] = useState(0);

  const layers = [
    {
      id: 0,
      title: "1. Language & Grammar Layer",
      subtitle: "JOCKY Domain-Specific Language (DSL)",
      icon: Terminal,
      color: "cyan",
      badge: "Grammar Core",
      summary: "Statically typed, high-level forensic syntax designed specifically for digital evidence extraction and threat hunting.",
      details: [
        "Native Forensic Types: First-class support for `process`, `thread`, `vad_node`, `kernel_module`, `mft_entry`, and `syscall`.",
        "Deterministic Compilation: Strictly bounds loops and memory allocations to guarantee execution without runtime panics or stack overflows.",
        "Lexer & Parser Frontend: Built with Rust/ANTLR for sub-millisecond AST construction and immediate syntax verification.",
        "Declarative Threat Assertions: Allows expressing complex memory anomalies and DKOM checks in concise, readable scripts."
      ]
    },
    {
      id: 1,
      title: "2. LLVM Optimization & IR Core",
      subtitle: "Machine Code Generation & Micro-Packaging",
      icon: Cpu,
      color: "purple",
      badge: "LLVM 18.1",
      summary: "Translates JOCKY AST into optimized LLVM Intermediate Representation, generating ultra-compact native micro-binaries.",
      details: [
        "Zero External Runtime: Produces stand-alone, static binaries (<850 KB) requiring no Python, .NET, or daemon runtimes.",
        "Dead Code & Memory Stripping: Aggressive compiler passes remove all unused symbol tables to minimize memory and disk footprints.",
        "In-Memory Execution Engine: Generates position-independent code (PIC) capable of executing directly in memory streams without disk drop.",
        "Cross-Target Generation: Single compilation pipeline generates PE32+ for Windows and ELF64/eBPF bytecode for Linux."
      ]
    },
    {
      id: 2,
      title: "3. Cross-Platform Native Sensors",
      subtitle: "Safe Low-Level Windows & Linux Introspection",
      icon: ShieldCheck,
      color: "emerald",
      badge: "Kernel & eBPF",
      summary: "Performs non-invasive live introspection across memory structures, driver certificates, and filesystem timelines.",
      details: [
        "Direct NT Subsystem Calls (Windows): Bypasses user-mode hooks by interfacing directly with ntdll internal memory syscalls.",
        "eBPF & kprobes Sensor (Linux): Hooks kernel tracepoints safely without module crashes or host system instability.",
        "BYOVD & Driver Integrity Engine: Scans loaded drivers against Microsoft WHQL certificates and known vulnerable hash databases.",
        "Volatile Memory Inspector: Recursively inspects Virtual Address Descriptors (VAD) and unbacked executable (RWX) memory pages."
      ]
    },
    {
      id: 3,
      title: "4. Central SOC Ingestion & Threat Mesh",
      subtitle: "Encrypted Fleet Orchestration & MITRE Correlation",
      icon: Server,
      color: "amber",
      badge: "Cloud Broker / SOC",
      summary: "Aggregates, correlates, and displays real-time forensic telemetry from 50,000+ distributed endpoints concurrently.",
      details: [
        "Mutual TLS 1.3 & gRPC Backbone: High-throughput telemetry streaming protected by end-to-end cryptographic verification.",
        "MITRE ATT&CK Auto-Mapping: Automatically classifies extracted artifacts into tactics (T1055 Process Injection, T1014 Rootkits, T1068 Privilege Escalation).",
        "Central Playbook Dispatcher: Instant fleet-wide broadcast of newly compiled JOCKY investigation modules.",
        "Court-Ready Chain of Custody: Automatically signs evidence snapshots with SHA-256 hashes and RFC-3161 timestamps."
      ]
    }
  ];

  return (
    <section id="architecture" className="py-16 bg-[#080d1a] relative border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>MODULAR DEFENSE STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Architecture & Deep Engine Design
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Click through the architecture layers below to explore how JOCKY bridges high-level forensic scripts with low-level kernel introspection safely.
          </p>
        </div>

        {/* Interactive Layer Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Layer Selector Stack (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {layers.map((layer, index) => {
              const isSelected = selectedLayer === index;
              const Icon = layer.icon;

              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(index)}
                  className={`p-4 rounded-2xl text-left transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0f1830] border-cyan-400 shadow-neon-cyan'
                      : 'bg-[#0b1224] border-slate-800 hover:border-slate-700 hover:bg-[#0e162c]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{layer.badge}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {layer.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{layer.subtitle}</p>
                    </div>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Selected Layer Detailed Blueprint (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0b1224] border border-cyber-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-cyber-border pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Layer Deep Dive
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {layers[selectedLayer].title}
                </h3>
                <p className="text-xs text-slate-400">{layers[selectedLayer].subtitle}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                {layers[selectedLayer].badge}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              {layers[selectedLayer].summary}
            </p>

            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-4">
              Core Technical Guarantees & Implementation:
            </h4>

            <div className="space-y-3.5">
              {layers[selectedLayer].details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#070c18] border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200 leading-snug">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
