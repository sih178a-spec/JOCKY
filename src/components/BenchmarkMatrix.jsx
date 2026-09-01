import React, { useState } from 'react';
import { BENCHMARK_DATA } from '../data/forensicScripts';
import { BarChart3, Check, X, Shield, Zap, Sparkles, TrendingUp } from 'lucide-react';

export default function BenchmarkMatrix() {
  const [activeMetric, setActiveMetric] = useState('memory'); // 'memory' | 'latency' | 'integrity'

  return (
    <section id="benchmarks" className="py-16 bg-[#070b14] relative border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>EMPIRICAL BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Performance & Forensic Footprint Comparison
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Independent benchmark comparison between JOCKY LLVM micro-binaries and conventional digital forensics toolchains.
          </p>
        </div>

        {/* Visual Comparison Chart */}
        <div className="mb-12 p-6 rounded-3xl bg-[#0a0f1e] border border-cyber-border">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-cyber-border pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Comparative Metric Benchmark</span>
            </h3>

            {/* Metric Switcher */}
            <div className="flex items-center gap-2 bg-[#070c18] p-1 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setActiveMetric('memory')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === 'memory'
                    ? 'bg-cyan-500 text-black font-bold shadow-neon-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Memory Footprint (MB)
              </button>
              <button
                onClick={() => setActiveMetric('latency')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === 'latency'
                    ? 'bg-emerald-500 text-black font-bold shadow-neon-green'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Execution Latency (ms)
              </button>
              <button
                onClick={() => setActiveMetric('integrity')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === 'integrity'
                    ? 'bg-purple-500 text-white font-bold shadow-neon-purple'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Evidence Preservation (%)
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4">
            {BENCHMARK_DATA.map((item, index) => {
              const isJocky = item.tool.includes('JOCKY');
              let barWidth = '10%';
              let valueDisplay = '';

              if (activeMetric === 'memory') {
                const maxMem = 185;
                const pct = Math.max(2, (item.rawMemoryMB / maxMem) * 100);
                barWidth = `${pct}%`;
                valueDisplay = item.memoryFootprint;
              } else if (activeMetric === 'latency') {
                const maxTime = 14200;
                const pct = Math.max(3, (item.executionTimeMs / maxTime) * 100);
                barWidth = `${pct}%`;
                valueDisplay = `${item.executionTimeMs} ms`;
              } else if (activeMetric === 'integrity') {
                barWidth = item.evidencePreservation;
                valueDisplay = item.evidencePreservation;
              }

              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-bold ${isJocky ? 'text-cyan-400 glow-cyan text-sm' : 'text-slate-300'}`}>
                      {item.tool} {isJocky && '⭐ (Proposed Framework)'}
                    </span>
                    <span className={`font-bold ${isJocky ? 'text-cyan-300 text-sm' : 'text-slate-400'}`}>
                      {valueDisplay}
                    </span>
                  </div>

                  <div className="w-full h-5 rounded-full bg-[#070c18] border border-slate-800 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isJocky
                          ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 shadow-neon-cyan'
                          : 'bg-slate-700/60'
                      }`}
                      style={{ width: barWidth }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-cyber-border bg-[#0a0f1e] shadow-2xl">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-[#0e162c] text-slate-300 border-b border-cyber-border">
                <th className="p-4 font-bold">Toolchain / Architecture</th>
                <th className="p-4 font-bold">Memory Footprint</th>
                <th className="p-4 font-bold">Avg. Triage Speed</th>
                <th className="p-4 font-bold">RAM Evidence Preservation</th>
                <th className="p-4 font-bold">Kernel Introspection Depth</th>
                <th className="p-4 font-bold">Zero Dependency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {BENCHMARK_DATA.map((row, index) => {
                const isJocky = row.tool.includes('JOCKY');
                return (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      isJocky
                        ? 'bg-cyan-950/20 text-white font-semibold'
                        : 'hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {isJocky && <Sparkles className="w-4 h-4 text-cyan-400" />}
                        <span className={isJocky ? 'text-cyan-300 font-bold' : ''}>{row.tool}</span>
                      </div>
                    </td>
                    <td className="p-4 text-cyan-400">{row.memoryFootprint}</td>
                    <td className="p-4 text-emerald-400">{row.executionTimeMs} ms</td>
                    <td className="p-4 text-purple-400 font-bold">{row.evidencePreservation}</td>
                    <td className="p-4">{row.kernelDepth}</td>
                    <td className="p-4">
                      {row.zeroDependency.startsWith('Yes') ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          <Check className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <X className="w-3.5 h-3.5 text-rose-400" /> No
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
