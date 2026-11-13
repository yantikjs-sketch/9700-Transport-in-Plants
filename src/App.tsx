import React, { useState, useEffect } from 'react';
import { Navbar, SubModuleType, ThemeMode } from './components/Navbar';
import { ASRevisionHub, Topic7SubTab } from './components/ASRevisionHub';
import { ASTopicId } from './data/asBiologyData';

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState<ASTopicId>('cell-structure');
  const [topic7SubTab, setTopic7SubTab] = useState<Topic7SubTab>('simulators');
  const [activeModule, setActiveModule] = useState<SubModuleType>('tissues');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('plant_transport_theme') as ThemeMode;
    return saved === 'microscope' || saved === 'parchment' ? saved : 'botanical';
  });

  useEffect(() => {
    localStorage.setItem('plant_transport_theme', theme);
    if (theme === 'microscope') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSelectTopics1to6 = () => {
    if (activeTopicId === 'plant-transport') {
      setActiveTopicId('cell-structure');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTransportInPlants = () => {
    setActiveTopicId('plant-transport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'microscope';

  return (
    <div
      className={`min-h-screen font-sans flex flex-col transition-colors duration-300 relative selection:bg-emerald-500 selection:text-white ${
        theme === 'microscope'
          ? 'theme-microscope text-slate-100'
          : theme === 'parchment'
          ? 'theme-parchment text-slate-900'
          : 'theme-botanical text-slate-900'
      }`}
    >
      {/* Background Layer 1: High-Precision Plant Cell Parenchyma & Leaf Vein Lattice Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-plant-cells z-0" aria-hidden="true" />

      {/* Background Layer 2: Floating Ambient Organic Lighting Pools */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl animate-ambient-pulse ${
            isDark ? 'bg-emerald-500/15' : 'bg-emerald-400/20'
          }`}
        />
        <div
          className={`absolute top-20 -right-32 w-[480px] h-[480px] rounded-full blur-3xl animate-ambient-pulse ${
            isDark ? 'bg-cyan-500/15' : 'bg-sky-400/20'
          }`}
          style={{ animationDelay: '3s' }}
        />
        <div
          className={`absolute bottom-10 left-1/3 w-[440px] h-[440px] rounded-full blur-3xl ${
            isDark ? 'bg-amber-500/10' : 'bg-amber-300/15'
          }`}
        />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTopicId={activeTopicId}
        onSelectTopics1to6={handleSelectTopics1to6}
        onSelectTransportInPlants={handleSelectTransportInPlants}
        theme={theme}
        onSelectTheme={setTheme}
      />

      {/* Unified Semester 1 Revision Hub (Topics 1–7) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        <ASRevisionHub
          activeTopicId={activeTopicId}
          onSelectTopic={setActiveTopicId}
          topic7SubTab={topic7SubTab}
          onSelectTopic7SubTab={setTopic7SubTab}
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          isDark={isDark}
        />
      </main>

      {/* Footer */}
      <footer
        className={`border-t text-xs py-8 mt-12 relative z-10 transition-colors ${
          isDark
            ? 'bg-slate-950 text-slate-400 border-slate-800'
            : 'bg-slate-900 text-slate-400 border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
              9700
            </div>
            <div>
              <p className="text-slate-200 font-bold">
                Biology 9700 Revision Hub Semester 1
              </p>
              <p className="text-slate-400 text-[11px]">
                Cambridge International AS Level Biology (9700) · Topics 1–7 Strict Syllabus Alignment
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px]">
            <span>1. Cell Structure</span>
            <span aria-hidden="true">·</span>
            <span>2. Biological Molecules</span>
            <span aria-hidden="true">·</span>
            <span>3. Enzymes</span>
            <span aria-hidden="true">·</span>
            <span>4. Membranes & Transport</span>
            <span aria-hidden="true">·</span>
            <span>5. Mitosis</span>
            <span aria-hidden="true">·</span>
            <span>6. Nucleic Acids</span>
            <span aria-hidden="true">·</span>
            <span>7. Plant Transport</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
