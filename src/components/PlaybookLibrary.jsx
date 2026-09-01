import React, { useState } from 'react';
import { SAMPLE_SCRIPTS } from '../data/forensicScripts';
import { BookOpen, Copy, Check, Terminal, Code2, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';

export default function PlaybookLibrary({ onSelectPlaybook }) {
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Memory Forensics', 'Kernel Defense', 'Threat Detection', 'Incident Response'];

  const filteredScripts = SAMPLE_SCRIPTS.filter((script) => {
    const matchesCategory = filter === 'All' || script.category === filter;
    const matchesSearch = script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          script.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          script.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="playbooks" className="py-16 bg-[#070b14] relative border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>FORENSIC PLAYBOOK CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Modular Incident Response Playbooks
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Ready-to-deploy, verified JOCKY DSL modules for enterprise forensic sweeps and automated threat correlation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search playbooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0c1324] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                filter === cat
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-neon-cyan'
                  : 'bg-[#0d1527] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Playbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScripts.map((script) => (
            <div
              key={script.id}
              className="p-6 rounded-3xl bg-[#0a0f1e] border border-cyber-border hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {script.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Target: {script.targetOS}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5">{script.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{script.description}</p>

                {/* Code Preview Box */}
                <div className="p-3 rounded-xl bg-[#060912] border border-slate-800/80 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto mb-4 select-text">
                  <pre>
                    <code>{script.code}</code>
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <a
                  href="#live-studio"
                  onClick={() => onSelectPlaybook(script)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Load in Live Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleCopy(script.id, script.code)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === script.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy DSL Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
