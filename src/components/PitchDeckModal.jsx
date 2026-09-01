import React, { useState, useEffect } from 'react';
import { PITCH_SLIDES } from '../data/forensicScripts';
import { X, ChevronLeft, ChevronRight, Presentation, Sparkles, CheckCircle2, Shield, ArrowRight, Zap, Target } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide((prev) => (prev < PITCH_SLIDES.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slide = PITCH_SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Modal Container */}
      <div className="w-full max-w-5xl bg-[#090e1c] border border-cyber-border rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#0d1427] border-b border-cyber-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold font-mono text-xs">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-mono">JOCKY | SIH Jury Pitch Deck</span>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  {slide.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">NTRO Problem Statement ID: 26148</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400">
              Slide <strong className="text-amber-400">{currentSlide + 1}</strong> of {PITCH_SLIDES.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{slide.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300 font-mono mb-8">
              {slide.subtitle}
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {slide.bullets.map((bullet, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0d152a] border border-slate-800 flex items-start gap-3.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Highlight Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-cyan-950/30 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-400" />
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">Key Value Metric</div>
                <div className="text-lg font-bold text-white">{slide.metric}</div>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-500 hidden sm:block">
              Use [←] / [→] keys to navigate
            </div>
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-6 py-4 bg-[#0d1427] border-t border-cyber-border flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
              currentSlide === 0
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {PITCH_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-8 bg-amber-400 shadow-neon-amber'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(PITCH_SLIDES.length - 1, prev + 1))}
            disabled={currentSlide === PITCH_SLIDES.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
              currentSlide === PITCH_SLIDES.length - 1
                ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold'
            }`}
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
