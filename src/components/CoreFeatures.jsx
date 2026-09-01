import React from 'react';
import { ShieldAlert, Zap, Cpu, Database, Network, FileKey2, RefreshCw, EyeOff, Lock, CheckCircle2 } from 'lucide-react';

export default function CoreFeatures() {
  const features = [
    {
      icon: EyeOff,
      color: "cyan",
      title: "Zero-Footprint In-Memory Triage",
      desc: "Eliminates the forensic 'Heisenberg Effect' by running micro-binaries entirely within memory streams, leaving zero disk artifacts and preserving fragile volatile RAM."
    },
    {
      icon: ShieldAlert,
      color: "rose",
      title: "DKOM & Unlinked Process Discovery",
      desc: "Directly traverses internal kernel memory pools (ActiveProcessLinks, CSRSS handle structures) to detect hidden rootkit processes invisible to standard APIs."
    },
    {
      icon: FileKey2,
      color: "amber",
      title: "BYOVD Vulnerable Driver Defense",
      desc: "Validates loaded kernel module certificates against WHQL chains and known vulnerable driver catalogs to neutralize privilege escalation vectors in real-time."
    },
    {
      icon: Zap,
      color: "purple",
      title: "Reflective Injection & Hook Analysis",
      desc: "Deep-scans Virtual Address Descriptors (VAD) and unbacked executable memory pages (PAGE_EXECUTE_READWRITE) for fileless shellcode execution."
    },
    {
      icon: RefreshCw,
      color: "emerald",
      title: "Unified Cross-Platform Forensics",
      desc: "Write one JOCKY script that compiles to native Win32/NT binaries on Windows and high-speed eBPF kprobe programs on Linux automatically."
    },
    {
      icon: Network,
      color: "blue",
      title: "High-Concurrency Fleet Orchestration",
      desc: "Dispatches compiled forensic playbooks to tens of thousands of distributed enterprise endpoints simultaneously via an encrypted, authenticated gRPC bus."
    }
  ];

  return (
    <section id="features" className="py-16 bg-[#080d1a] relative border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Advanced Defensive Capabilities & Forensic Depth
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered to overcome the stealthiest evasion tactics while providing deterministic, court-admissible digital forensics.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0b1224] border border-cyber-border hover:border-cyan-500/40 transition-all hover:bg-[#0e162c] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>JOCKY Native Implementation</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
