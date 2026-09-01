import React, { useState, useEffect } from 'react';
import { SAMPLE_SCRIPTS } from '../data/forensicScripts';
import { Play, RotateCcw, Copy, Check, Terminal, Cpu, Code2, FileCode, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Layers, Activity } from 'lucide-react';

export default function CodePlayground({ externalScript }) {
  const [selectedScript, setSelectedScript] = useState(SAMPLE_SCRIPTS[0]);
  const [activeView, setActiveView] = useState('code'); // 'code' | 'ast' | 'llvm'
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState(SAMPLE_SCRIPTS[0].simulationOutput);
  const [copied, setCopied] = useState(false);

  // Sync with externalScript if loaded from playbook catalog
  useEffect(() => {
    if (externalScript) {
      setSelectedScript(externalScript);
    }
  }, [externalScript]);

  // When script changes, reset logs
  useEffect(() => {
    setTerminalLogs(selectedScript.simulationOutput);
    setCompileStep(0);
    setIsCompiling(false);
  }, [selectedScript]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCompile = () => {
    setIsCompiling(true);
    setCompileStep(1);
    setTerminalLogs([]);

    // Step 1: Lex & Parse
    setTimeout(() => {
      setCompileStep(2);
    }, 600);

    // Step 2: AST & TypeCheck
    setTimeout(() => {
      setCompileStep(3);
    }, 1200);

    // Step 3: LLVM IR & Optimize
    setTimeout(() => {
      setCompileStep(4);
    }, 1800);

    // Step 4: Dispatch & Stream Logs
    setTimeout(() => {
      setCompileStep(5);
      setIsCompiling(false);

      // Stream logs sequentially
      let currentLogs = [];
      selectedScript.simulationOutput.forEach((log, index) => {
        setTimeout(() => {
          currentLogs = [...selectedScript.simulationOutput.slice(0, index + 1)];
          setTerminalLogs([...currentLogs]);
        }, index * 220);
      });
    }, 2400);
  };

  const getLogBadge = (log) => {
    if (log.level === 'CRITICAL' || log.type === 'ALERT') {
      return <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/40">CRITICAL</span>;
    }
    if (log.level === 'HIGH') {
      return <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40">HIGH RISK</span>;
    }
    if (log.type === 'SUCCESS') {
      return <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/40">SUCCESS</span>;
    }
    if (log.type === 'COMPILE') {
      return <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/40">LLVM IR</span>;
    }
    return <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">{log.type}</span>;
  };

  return (
    <section id="live-studio" className="py-16 bg-[#070b14] relative border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
              <Terminal className="w-4 h-4" />
              <span>INTERACTIVE FORENSIC WORKBENCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              JOCKY Code Studio & Compiler Sandbox
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Write or inspect human-readable JOCKY DSL scripts. Watch the LLVM compiler generate micro-binaries that execute deep forensic checks with zero evidence contamination.
            </p>
          </div>

          {/* Target Selector */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#0d1527] px-3 py-1.5 rounded-lg border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target OS: <strong className="text-white">{selectedScript.targetOS}</strong></span>
            <span className="text-slate-600">|</span>
            <span>Est. Binary: <strong className="text-cyan-400">{selectedScript.binarySize}</strong></span>
          </div>
        </div>

        {/* Script Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {SAMPLE_SCRIPTS.map((script) => {
            const isSelected = selectedScript.id === script.id;
            return (
              <button
                key={script.id}
                onClick={() => setSelectedScript(script)}
                className={`p-3.5 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#101b33] border-cyan-400 shadow-neon-cyan'
                    : 'bg-[#0d1527] border-slate-800/80 hover:border-slate-700 hover:bg-[#121c35]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {script.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{script.binarySize}</span>
                </div>
                <h4 className="text-sm font-semibold text-white truncate">{script.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{script.description}</p>
              </button>
            );
          })}
        </div>

        {/* Main IDE & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Code Editor & Compiler View (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#0a0f1d] border border-cyber-border overflow-hidden shadow-2xl">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-[#0d1427] border-b border-cyber-border flex items-center justify-between gap-3">
              {/* Tab views */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveView('code')}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                    activeView === 'code'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>JOCKY DSL (.jky)</span>
                </button>

                <button
                  onClick={() => setActiveView('ast')}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                    activeView === 'ast'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>AST Parse Tree</span>
                </button>

                <button
                  onClick={() => setActiveView('llvm')}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                    activeView === 'llvm'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>LLVM IR Bytecode</span>
                </button>
              </div>

              {/* Copy action */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-all"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Code / Content Area */}
            <div className="p-4 flex-1 overflow-x-auto bg-[#070b14] font-mono text-xs sm:text-[13px] leading-relaxed min-h-[380px] max-h-[440px] select-text">
              {activeView === 'code' && (
                <pre className="text-slate-200">
                  <code>
                    {selectedScript.code.split('\n').map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell pr-4 text-slate-600 select-none text-right font-mono text-xs">
                          {i + 1}
                        </span>
                        <span className="table-cell">
                          {line.startsWith('//') ? (
                            <span className="text-slate-500 italic">{line}</span>
                          ) : line.includes('module ') || line.includes('import ') || line.includes('workflow ') ? (
                            <span className="text-purple-400 font-bold">{line}</span>
                          ) : line.includes('let ') || line.includes('for ') || line.includes('if ') ? (
                            <span className="text-cyan-300">{line}</span>
                          ) : line.includes('sink.emit_alert') || line.includes('CRITICAL') ? (
                            <span className="text-rose-400">{line}</span>
                          ) : (
                            <span className="text-slate-300">{line}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              )}

              {activeView === 'ast' && (
                <pre className="text-purple-300">
                  <code>{JSON.stringify(selectedScript.ast, null, 2)}</code>
                </pre>
              )}

              {activeView === 'llvm' && (
                <pre className="text-emerald-300">
                  <code>{selectedScript.llvmIR}</code>
                </pre>
              )}
            </div>

            {/* Compilation Action Bar */}
            <div className="p-3 bg-[#0d1427] border-t border-cyber-border flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunCompile}
                  disabled={isCompiling}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isCompiling
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-neon-cyan'
                  }`}
                >
                  <Play className={`w-4 h-4 fill-current ${isCompiling ? 'animate-spin' : ''}`} />
                  <span>{isCompiling ? 'Compiling & Sweeping...' : 'Compile & Execute Triage'}</span>
                </button>

                <button
                  onClick={() => setTerminalLogs(selectedScript.simulationOutput)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                  title="Reset Logs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Deterministic Zero-Allocation Execution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Compiler Pipeline & Terminal (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Step Pipeline Progress Card */}
            <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyber-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  LLVM Micro-Compiler Pipeline
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Optimization: -O3 Non-Reloc
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
                <div className={`p-2 rounded-lg border transition-all ${
                  compileStep >= 1 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  1. Lex/Parse
                </div>
                <div className={`p-2 rounded-lg border transition-all ${
                  compileStep >= 2 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  2. AST Type
                </div>
                <div className={`p-2 rounded-lg border transition-all ${
                  compileStep >= 3 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  3. LLVM IR
                </div>
                <div className={`p-2 rounded-lg border transition-all ${
                  compileStep >= 4 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  4. Micro-PE
                </div>
              </div>
            </div>

            {/* Streaming Forensic Terminal Output */}
            <div className="flex-1 rounded-2xl bg-[#050811] border border-cyber-border overflow-hidden flex flex-col shadow-2xl">
              <div className="px-4 py-2.5 bg-[#090e1c] border-b border-cyber-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-300 ml-2">JOCKY Live Forensic Stream</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">ENCRYPTED gRPC SINK</span>
              </div>

              <div className="p-4 flex-1 overflow-y-auto max-h-[300px] space-y-2.5 font-mono text-xs">
                {terminalLogs.length === 0 ? (
                  <div className="text-slate-600 italic py-8 text-center">
                    Click 'Compile & Execute Triage' to trigger live inspection...
                  </div>
                ) : (
                  terminalLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2.5 leading-snug">
                      <span className="text-slate-600 text-[10px] shrink-0">{log.timestamp}</span>
                      {getLogBadge(log)}
                      <span className={`flex-1 break-words ${
                        log.level === 'CRITICAL' ? 'text-rose-300 font-semibold' :
                        log.level === 'HIGH' ? 'text-amber-300 font-semibold' :
                        log.type === 'SUCCESS' ? 'text-emerald-300' :
                        'text-slate-300'
                      }`}>
                        {log.text}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Triage Summary Footer */}
              <div className="px-4 py-2 bg-[#090e1c] border-t border-cyber-border flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Footprint: <strong className="text-cyan-400">{selectedScript.compiledMetrics.memoryAllocBytes}</strong></span>
                <span>Latency: <strong className="text-emerald-400">{selectedScript.compiledMetrics.compileTimeMs} ms</strong></span>
                <span>Severity: <strong className={selectedScript.compiledMetrics.riskScore === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'}>{selectedScript.compiledMetrics.riskScore}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
