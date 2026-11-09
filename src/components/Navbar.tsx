import React from 'react';
import { Microscope, Gauge, BookOpen, Award, Sparkles, CheckSquare, Layers, Route, Activity, Zap, Shield, Droplets, Sun, Moon, Compass } from 'lucide-react';

export type MainTabType = 'simulators' | 'potometer' | 'notes' | 'exam' | 'flashcards' | 'checklist';
export type SubModuleType = 'tissues' | 'waterPotential' | 'rootPathways' | 'transpiration' | 'potometer' | 'massFlow' | 'xerophytes';
export type ThemeMode = 'botanical' | 'microscope' | 'parchment';

interface NavbarProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  activeModule: SubModuleType;
  onSelectModule: (mod: SubModuleType) => void;
  theme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeModule,
  onSelectModule,
  theme,
  onSelectTheme
}) => {
  const isDark = theme === 'microscope';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      isDark
        ? 'bg-slate-950/90 border-emerald-900/40 text-slate-100'
        : 'bg-white/90 border-emerald-900/10 text-slate-900 shadow-xs'
    }`}>
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Syllabus Badge */}
          <div className="flex items-center gap-3.5 cursor-pointer shrink-0" onClick={() => onSelectTab('simulators')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className={`text-lg sm:text-xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  Plant Transport Master
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Cambridge 9700
                </span>
              </div>
              <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                AS Level Biology • Topic 7 Specification
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-bold">
            <button
              onClick={() => onSelectTab('simulators')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'simulators'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Microscope className="w-5 h-5 text-emerald-300" />
              Explorers
            </button>

            <button
              onClick={() => {
                onSelectTab('simulators');
                onSelectModule('potometer');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'simulators' && activeModule === 'potometer'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Gauge className="w-5 h-5 text-teal-500" />
              Potometer Lab
            </button>

            <button
              onClick={() => onSelectTab('notes')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'notes'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Notes & Traps
            </button>

            <button
              onClick={() => onSelectTab('exam')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'exam'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Award className="w-5 h-5" />
              Exam Practice
            </button>

            <button
              onClick={() => onSelectTab('flashcards')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'flashcards'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Flashcards
            </button>

            <button
              onClick={() => onSelectTab('checklist')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
                currentTab === 'checklist'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              LO Matrix
            </button>
          </nav>

          {/* Theme Switcher Widget */}
          <div className={`flex items-center p-1 rounded-2xl border text-xs font-bold shrink-0 ${
            isDark
              ? 'bg-slate-900/90 border-emerald-900/50 text-slate-300'
              : 'bg-slate-100/90 border-slate-200/80 text-slate-700'
          }`}>
            <button
              onClick={() => onSelectTheme('botanical')}
              title="Lush Botanical Garden Theme"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                theme === 'botanical'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
            >
              <span>🌿</span>
              <span className="hidden sm:inline">Lush</span>
            </button>
            <button
              onClick={() => onSelectTheme('microscope')}
              title="Fluorescent Confocal Dark Field Theme"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                theme === 'microscope'
                  ? 'bg-slate-800 text-emerald-400 shadow-xs border border-emerald-500/40 font-extrabold'
                  : 'hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
            >
              <span>🔬</span>
              <span className="hidden sm:inline">Microscope</span>
            </button>
            <button
              onClick={() => onSelectTheme('parchment')}
              title="Cambridge Exam Parchment Grid Theme"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                theme === 'parchment'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs font-extrabold'
                  : 'hover:text-amber-800'
              }`}
            >
              <span>📜</span>
              <span className="hidden sm:inline">Parchment</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className={`flex lg:hidden overflow-x-auto py-2.5 gap-1.5 border-t text-sm font-bold ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <button
            onClick={() => onSelectTab('simulators')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${currentTab === 'simulators' ? 'bg-emerald-600 text-white' : isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Explorers
          </button>
          <button
            onClick={() => {
              onSelectTab('simulators');
              onSelectModule('potometer');
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Potometer
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${currentTab === 'notes' ? 'bg-emerald-600 text-white' : isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Notes
          </button>
          <button
            onClick={() => onSelectTab('exam')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${currentTab === 'exam' ? 'bg-emerald-600 text-white' : isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Exam Practice
          </button>
          <button
            onClick={() => onSelectTab('flashcards')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${currentTab === 'flashcards' ? 'bg-emerald-600 text-white' : isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Flashcards
          </button>
          <button
            onClick={() => onSelectTab('checklist')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap ${currentTab === 'checklist' ? 'bg-emerald-600 text-white' : isDark ? 'text-slate-300 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
          >
            Syllabus LOs
          </button>
        </div>
      </div>

      {/* Sub-Module Selector Bar (When 'simulators' tab is active) */}
      {currentTab === 'simulators' && (
        <div className={`border-t transition-colors ${
          isDark
            ? 'bg-slate-950/80 border-slate-800'
            : 'bg-emerald-50/50 border-emerald-900/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm font-bold whitespace-nowrap">
              <span className={`text-xs font-extrabold uppercase tracking-wider mr-1 ${
                isDark ? 'text-emerald-400' : 'text-emerald-900'
              }`}>
                Topic 7 Simulators:
              </span>

              <button
                onClick={() => onSelectModule('tissues')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'tissues'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                7.1 Tissues & Plan Diagrams
              </button>

              <button
                onClick={() => onSelectModule('waterPotential')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'waterPotential'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Droplets className="w-4 h-4 text-sky-400" />
                7.2(a) Water Potential (Ψ = Ψs + Ψp)
              </button>

              <button
                onClick={() => onSelectModule('rootPathways')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'rootPathways'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Route className="w-4 h-4 text-emerald-400" />
                7.2(b) Root Pathways & Casparian Strip
              </button>

              <button
                onClick={() => onSelectModule('transpiration')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'transpiration'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Activity className="w-4 h-4 text-sky-400" />
                7.2(c) Transpiration & Cohesion-Tension
              </button>

              <button
                onClick={() => onSelectModule('potometer')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'potometer'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Gauge className="w-4 h-4 text-teal-400" />
                7.2(d) Virtual Potometer Lab
              </button>

              <button
                onClick={() => onSelectModule('xerophytes')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'xerophytes'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-400" />
                7.2(e) Xerophytic Adaptations
              </button>

              <button
                onClick={() => onSelectModule('massFlow')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  activeModule === 'massFlow'
                    ? 'bg-emerald-700 text-white font-bold shadow-sm'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-850'
                      : 'bg-white border border-emerald-200/80 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Zap className="w-4 h-4 text-purple-400" />
                7.2(f,g) Phloem Active Loading & Mass Flow
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
