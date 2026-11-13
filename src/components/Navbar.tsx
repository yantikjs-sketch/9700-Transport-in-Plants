import React from 'react';
import { BookOpen, Sprout, GraduationCap } from 'lucide-react';
import { ASTopicId } from '../data/asBiologyData';

export type SubModuleType =
  | 'tissues'
  | 'waterPotential'
  | 'rootPathways'
  | 'transpiration'
  | 'potometer'
  | 'massFlow'
  | 'xerophytes';

export type ThemeMode = 'botanical' | 'microscope' | 'parchment';

interface NavbarProps {
  activeTopicId: ASTopicId;
  onSelectTopics1to6: () => void;
  onSelectTransportInPlants: () => void;
  theme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTopicId,
  onSelectTopics1to6,
  onSelectTransportInPlants,
  theme,
  onSelectTheme
}) => {
  const isDark = theme === 'microscope';
  const isTopic7 = activeTopicId === 'plant-transport';

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
        isDark
          ? 'bg-slate-950/90 border-emerald-900/40 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
          {/* Brand Zone: Single clean lockup */}
          <button
            type="button"
            onClick={onSelectTopics1to6}
            className="text-left flex items-center gap-3 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1
                className={`text-base sm:text-lg font-extrabold tracking-tight leading-tight whitespace-nowrap ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                Biology 9700 Revision Hub Semester 1
              </h1>
              <p
                className={`text-[11px] font-medium whitespace-nowrap ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Cambridge AS Level · Topics 1–7
              </p>
            </div>
          </button>

          {/* Primary Desktop Navigation: Topics 1-6 & Topic 7 Transport in Plants */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <button
              onClick={onSelectTopics1to6}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                !isTopic7
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Revision Hub (Topics 1–6)</span>
            </button>

            <button
              onClick={onSelectTransportInPlants}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isTopic7
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <Sprout className="w-4 h-4 shrink-0" />
              <span>Transport in Plants (Topic 7)</span>
            </button>
          </nav>

          {/* Theme Switcher */}
          <div
            className={`flex items-center p-1 rounded-xl border text-xs font-bold shrink-0 ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <button
              onClick={() => onSelectTheme('botanical')}
              title="Botanical Light Theme"
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                theme === 'botanical'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => onSelectTheme('microscope')}
              title="Dark Microscope Theme"
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                theme === 'microscope'
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-xs'
                  : 'hover:text-emerald-700 dark:hover:text-emerald-300'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => onSelectTheme('parchment')}
              title="Exam Parchment Theme"
              className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                theme === 'parchment'
                  ? 'bg-amber-100 text-amber-950 border border-amber-300 shadow-xs'
                  : 'hover:text-amber-800'
              }`}
            >
              Paper
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div
          className={`flex md:hidden overflow-x-auto py-2 gap-2 border-t text-xs font-bold ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}
        >
          <button
            onClick={onSelectTopics1to6}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap shrink-0 ${
              !isTopic7
                ? 'bg-emerald-700 text-white'
                : isDark
                  ? 'text-slate-300 bg-slate-900'
                  : 'text-slate-700 bg-slate-100'
            }`}
          >
            Revision Hub (Topics 1–6)
          </button>
          <button
            onClick={onSelectTransportInPlants}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap shrink-0 ${
              isTopic7
                ? 'bg-emerald-700 text-white'
                : isDark
                  ? 'text-slate-300 bg-slate-900'
                  : 'text-slate-700 bg-slate-100'
            }`}
          >
            Transport in Plants (Topic 7)
          </button>
        </div>
      </div>
    </header>
  );
};
