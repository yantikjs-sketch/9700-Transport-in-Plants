import React, { useState } from 'react';
import { SYLLABUS_OBJECTIVES } from '../data/syllabusData';
import { CheckCircle2, Circle, Clock, CheckSquare, Sparkles, BookOpen } from 'lucide-react';

interface ChecklistProps {
  onNavigateToModule: (moduleId: string) => void;
}

export const SyllabusChecklist: React.FC<ChecklistProps> = ({ onNavigateToModule }) => {
  const [statuses, setStatuses] = useState<{ [id: string]: 'not-started' | 'reviewing' | 'mastered' }>({
    '7.1.a': 'mastered',
    '7.1.b': 'mastered',
    '7.1.c': 'reviewing',
    '7.1.d': 'reviewing',
    '7.2.a': 'mastered',
    '7.2.b': 'mastered',
    '7.2.c': 'reviewing',
    '7.2.d': 'mastered',
    '7.2.e': 'not-started',
    '7.2.f': 'not-started',
    '7.2.g': 'reviewing'
  });

  const total = SYLLABUS_OBJECTIVES.length;
  const masteredCount = Object.values(statuses).filter((s) => s === 'mastered').length;
  const reviewingCount = Object.values(statuses).filter((s) => s === 'reviewing').length;

  const handleCycleStatus = (id: string) => {
    setStatuses((prev) => {
      const current = prev[id] || 'not-started';
      const next = current === 'not-started' ? 'reviewing' : current === 'reviewing' ? 'mastered' : 'not-started';
      return { ...prev, [id]: next };
    });
  };

  const getModuleForObjective = (code: string): string => {
    if (code.startsWith('7.1(a)') || code.startsWith('7.1(b)') || code.startsWith('7.1(c)') || code.startsWith('7.1(d)')) {
      return 'tissues';
    }
    if (code.startsWith('7.2(a)')) return 'waterPotential';
    if (code.startsWith('7.2(b)')) return 'rootPathways';
    if (code.startsWith('7.2(c)')) return 'transpiration';
    if (code.startsWith('7.2(d)')) return 'potometer';
    if (code.startsWith('7.2(e)')) return 'xerophytes';
    return 'massFlow';
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Cambridge AS Biology 9700
              </span>
              <span className="text-sm text-emerald-200/90 font-mono">Official Specification Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              Syllabus Learning Objectives Mastery Tracker
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Track your individual revision progress against all 11 official Cambridge learning objectives in Topic 7. Click any status badge to cycle between Not Started, Reviewing, and Mastered.
            </p>
          </div>
        </div>

        {/* Global Statistics Bar */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 border-t border-emerald-800/60 pt-5 text-sm font-mono">
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/40">
            <span className="text-emerald-300 block text-xs uppercase font-extrabold">Mastered</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{masteredCount} / {total}</span>
          </div>

          <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-700/40">
            <span className="text-amber-300 block text-xs uppercase font-extrabold">Reviewing</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{reviewingCount} / {total}</span>
          </div>

          <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/40">
            <span className="text-slate-300 block text-xs uppercase font-extrabold">Readiness Score</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {Math.round((masteredCount / total) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Syllabus Matrix Items */}
      <div className="space-y-4">
        {SYLLABUS_OBJECTIVES.map((obj) => {
          const status = statuses[obj.id] || 'not-started';

          return (
            <div
              key={obj.id}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-emerald-300 transition-all"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-xl text-xs sm:text-sm font-mono font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                    {obj.code}
                  </span>
                  <span className="font-extrabold text-base sm:text-lg text-slate-900">{obj.title}</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">{obj.description}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {obj.keyTerms.map((term, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs bg-slate-50 text-slate-700 font-semibold px-2.5 py-1 rounded-lg border border-slate-200 font-mono"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Toggle & Jump Button */}
              <div className="flex items-center gap-3 self-end md:self-auto flex-shrink-0">
                <button
                  onClick={() => onNavigateToModule(getModuleForObjective(obj.code))}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-800 text-sm font-bold rounded-2xl transition-all shadow-xs"
                >
                  Open Simulator
                </button>

                <button
                  onClick={() => handleCycleStatus(obj.id)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs ${
                    status === 'mastered'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : status === 'reviewing'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status === 'mastered' && <CheckCircle2 className="w-4 h-4" />}
                  {status === 'reviewing' && <Clock className="w-4 h-4" />}
                  {status === 'not-started' && <Circle className="w-4 h-4" />}
                  <span className="capitalize">{status.replace('-', ' ')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
