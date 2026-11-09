import React, { useState, useEffect } from 'react';
import { Navbar, MainTabType, SubModuleType, ThemeMode } from './components/Navbar';
import { TissueExplorer } from './components/modules/TissueExplorer';
import { WaterPotentialVisualizer } from './components/modules/WaterPotentialVisualizer';
import { RootPathwaysSimulator } from './components/modules/RootPathwaysSimulator';
import { TranspirationCohesionEngine } from './components/modules/TranspirationCohesionEngine';
import { VirtualPotometerLab } from './components/modules/VirtualPotometerLab';
import { XerophyteAdaptations } from './components/modules/XerophyteAdaptations';
import { MassFlowSimulator } from './components/modules/MassFlowSimulator';
import { NotesSection } from './components/NotesSection';
import { ExamPracticeSection } from './components/ExamPracticeSection';
import { FlashcardsSection } from './components/FlashcardsSection';
import { SyllabusChecklist } from './components/SyllabusChecklist';
import { CheckCircle2, ShieldCheck, Sparkles, BookOpen, Layers, Droplets, Route, Activity, Gauge, Zap } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTabType>('simulators');
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

  const handleNavigateToModule = (moduleId: string) => {
    setCurrentTab('simulators');
    setActiveModule(moduleId as SubModuleType);
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
        {/* Top-Left: Photosynthetic Chloroplast Emerald Aura */}
        <div
          className={`absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl animate-ambient-pulse ${
            isDark ? 'bg-emerald-500/15' : 'bg-emerald-400/20'
          }`}
        />
        {/* Top-Right: Transpiration Stream Xylem Cyan Light */}
        <div
          className={`absolute top-20 -right-32 w-[480px] h-[480px] rounded-full blur-3xl animate-ambient-pulse ${
            isDark ? 'bg-cyan-500/15' : 'bg-sky-400/20'
          }`}
          style={{ animationDelay: '3s' }}
        />
        {/* Bottom-Center: Phloem Sucrose Translocation Amber Glow */}
        <div
          className={`absolute bottom-10 left-1/3 w-[440px] h-[440px] rounded-full blur-3xl ${
            isDark ? 'bg-amber-500/10' : 'bg-amber-300/15'
          }`}
        />
      </div>

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        theme={theme}
        onSelectTheme={setTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        {/* Cambridge 9700 Topic 7 Syllabus Quick Orientation Bar */}
        <section
          className={`p-4 sm:p-5 rounded-3xl border transition-all shadow-sm ${
            isDark
              ? 'bg-slate-900/80 border-emerald-900/40 text-slate-200 backdrop-blur-md'
              : 'bg-white/85 border-emerald-900/10 text-slate-800 backdrop-blur-md'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Syllabus 9700 Aligned
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Topic 7: Transport in Plants (7.1 & 7.2)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                  Full coverage of transverse section plan diagrams, water potential equations (Ψ = Ψs + Ψp), root apoplast/symplast routes, transpiration cohesion-tension, virtual potometer calculations, xerophytes, and phloem mass flow.
                </p>
              </div>
            </div>

            {/* Quick Learning Objective Jump Links */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0 text-xs font-bold">
              <span className="text-slate-400 dark:text-slate-500 text-[11px] mr-1 hidden sm:inline">Jump to:</span>
              <button
                onClick={() => handleNavigateToModule('tissues')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'tissues'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.1 Tissues
              </button>
              <button
                onClick={() => handleNavigateToModule('waterPotential')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'waterPotential'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(a) Ψ
              </button>
              <button
                onClick={() => handleNavigateToModule('rootPathways')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'rootPathways'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(b) Roots
              </button>
              <button
                onClick={() => handleNavigateToModule('transpiration')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'transpiration'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(c) Cohesion
              </button>
              <button
                onClick={() => handleNavigateToModule('potometer')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'potometer'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(d) Potometer
              </button>
              <button
                onClick={() => handleNavigateToModule('xerophytes')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'xerophytes'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(e) Xerophytes
              </button>
              <button
                onClick={() => handleNavigateToModule('massFlow')}
                className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                  currentTab === 'simulators' && activeModule === 'massFlow'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                7.2(f,g) Phloem
              </button>
            </div>
          </div>
        </section>

        {/* Simulators Tab */}
        {currentTab === 'simulators' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {activeModule === 'tissues' && <TissueExplorer />}
            {activeModule === 'waterPotential' && <WaterPotentialVisualizer />}
            {activeModule === 'rootPathways' && <RootPathwaysSimulator />}
            {activeModule === 'transpiration' && <TranspirationCohesionEngine />}
            {activeModule === 'potometer' && <VirtualPotometerLab />}
            {activeModule === 'xerophytes' && <XerophyteAdaptations />}
            {activeModule === 'massFlow' && <MassFlowSimulator />}
          </div>
        )}

        {/* Notes & Glossary Tab */}
        {currentTab === 'notes' && (
          <div className="animate-in fade-in duration-200">
            <NotesSection />
          </div>
        )}

        {/* Exam Practice Tab */}
        {currentTab === 'exam' && (
          <div className="animate-in fade-in duration-200">
            <ExamPracticeSection />
          </div>
        )}

        {/* Flashcards Tab */}
        {currentTab === 'flashcards' && (
          <div className="animate-in fade-in duration-200">
            <FlashcardsSection />
          </div>
        )}

        {/* Learning Objectives Matrix Checklist Tab */}
        {currentTab === 'checklist' && (
          <div className="animate-in fade-in duration-200">
            <SyllabusChecklist onNavigateToModule={handleNavigateToModule} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t text-xs py-8 mt-12 relative z-10 transition-colors ${
        isDark
          ? 'bg-slate-950 text-slate-400 border-slate-800'
          : 'bg-slate-900 text-slate-400 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              9700
            </div>
            <div>
              <p className="text-slate-200 font-bold">Cambridge International AS Level Biology (9700) • Topic 7</p>
              <p className="text-slate-400 text-[11px]">
                Strictly scoped to 7.1 (Structure of transport tissues) & 7.2 (Transport mechanisms).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
            <span>• No cells in low-power plan diagrams</span>
            <span>• Ψ = Ψs + Ψp</span>
            <span>• Suberin Casparian strip</span>
            <span>• Cohesion-Tension theory</span>
            <span>• Active H⁺/Sucrose loading</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
