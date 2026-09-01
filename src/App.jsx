import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodePlayground from './components/CodePlayground';
import ArchitectureView from './components/ArchitectureView';
import BenchmarkMatrix from './components/BenchmarkMatrix';
import CoreFeatures from './components/CoreFeatures';
import PlaybookLibrary from './components/PlaybookLibrary';
import PitchDeckModal from './components/PitchDeckModal';
import Footer from './components/Footer';

export default function App() {
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);

  const handleSelectPlaybook = (playbook) => {
    setSelectedPlaybook(playbook);
    const studioElem = document.getElementById('live-studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar onOpenPitch={() => setIsPitchOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenPitch={() => setIsPitchOpen(true)} />
        <CodePlayground externalScript={selectedPlaybook} />
        <ArchitectureView />
        <BenchmarkMatrix />
        <CoreFeatures />
        <PlaybookLibrary onSelectPlaybook={handleSelectPlaybook} />
      </main>

      {/* Footer */}
      <Footer onOpenPitch={() => setIsPitchOpen(true)} />

      {/* SIH Judge Pitch Deck Fullscreen Modal */}
      <PitchDeckModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />
    </div>
  );
}
