import React, { useState, useEffect } from 'react';
import {
  AS_BIOLOGY_CHAPTERS,
  ASTopicId,
  TOPIC7_OVERVIEW_DATA
} from '../data/asBiologyData';
import { SubModuleType } from './Navbar';
import { TissueExplorer } from './modules/TissueExplorer';
import { WaterPotentialVisualizer } from './modules/WaterPotentialVisualizer';
import { RootPathwaysSimulator } from './modules/RootPathwaysSimulator';
import { TranspirationCohesionEngine } from './modules/TranspirationCohesionEngine';
import { VirtualPotometerLab } from './modules/VirtualPotometerLab';
import { XerophyteAdaptations } from './modules/XerophyteAdaptations';
import { MassFlowSimulator } from './modules/MassFlowSimulator';
import { NotesSection } from './NotesSection';
import { ExamPracticeSection } from './ExamPracticeSection';
import { FlashcardsSection } from './FlashcardsSection';
import { SyllabusChecklist } from './SyllabusChecklist';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award,
  RotateCcw,
  Microscope,
  Layers,
  Image as ImageIcon,
  Droplets,
  Route,
  Activity,
  Gauge,
  Shield,
  Zap,
  Sparkles,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type Topic7SubTab = 'simulators' | 'notes' | 'exam' | 'flashcards' | 'checklist';

interface ASRevisionHubProps {
  activeTopicId: ASTopicId;
  onSelectTopic: (id: ASTopicId) => void;
  topic7SubTab: Topic7SubTab;
  onSelectTopic7SubTab: (tab: Topic7SubTab) => void;
  activeModule: SubModuleType;
  onSelectModule: (mod: SubModuleType) => void;
  isDark: boolean;
}

export const ASRevisionHub: React.FC<ASRevisionHubProps> = ({
  activeTopicId,
  onSelectTopic,
  topic7SubTab,
  onSelectTopic7SubTab,
  activeModule,
  onSelectModule,
  isDark
}) => {
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('bio9700_as_mcq_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [revealedStructured, setRevealedStructured] = useState<Record<string, boolean>>({});
  const [studentDrafts, setStudentDrafts] = useState<Record<string, string>>({});
  const [completedObjectives, setCompletedObjectives] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('bio9700_as_lo_done');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const [showObjectives, setShowObjectives] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem('bio9700_as_mcq_answers', JSON.stringify(selectedMcqAnswers));
    } catch {
      // ignore storage quota errors
    }
  }, [selectedMcqAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('bio9700_as_lo_done', JSON.stringify(completedObjectives));
    } catch {
      // ignore storage quota errors
    }
  }, [completedObjectives]);

  const isTopic7 = activeTopicId === 'plant-transport';
  const currentIndex = AS_BIOLOGY_CHAPTERS.findIndex((c) => c.id === activeTopicId);
  const chapter = AS_BIOLOGY_CHAPTERS[currentIndex] || AS_BIOLOGY_CHAPTERS[0];

  const totalMcqsAcross1to6 = AS_BIOLOGY_CHAPTERS.reduce((acc, ch) => acc + ch.mcqs.length, 0);
  const totalCorrectAcross1to6 = AS_BIOLOGY_CHAPTERS.reduce(
    (acc, ch) =>
      acc +
      ch.mcqs.filter((q) => selectedMcqAnswers[q.id] === q.correctOptionId).length,
    0
  );

  const handleSelectTopicInternal = (id: ASTopicId) => {
    onSelectTopic(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerMcq = (questionId: string, optionId: string, correctOptionId: string) => {
    if (selectedMcqAnswers[questionId]) return;
    setSelectedMcqAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (optionId === correctOptionId) {
      confetti({
        particleCount: 36,
        spread: 55,
        origin: { y: 0.75 }
      });
    }
  };

  const handleResetChapterQuestions = () => {
    setSelectedMcqAnswers((prev) => {
      const next = { ...prev };
      chapter.mcqs.forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
    setRevealedStructured((prev) => {
      const next = { ...prev };
      chapter.structuredQuestions.forEach((sq) => {
        delete next[sq.id];
      });
      return next;
    });
  };

  const toggleObjective = (code: string) => {
    setCompletedObjectives((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const surfaceClass = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white/95 border-slate-200 text-slate-900';

  const subtleSurfaceClass = isDark
    ? 'bg-slate-950/70 border-slate-800 text-slate-200'
    : 'bg-slate-50 border-slate-200 text-slate-800';

  const topic7Simulators: {
    id: SubModuleType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'tissues',
      label: '7.1 Tissues & Plan Diagrams',
      icon: <Layers className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'waterPotential',
      label: '7.2(a) Water Potential (Ψ = Ψs + Ψp)',
      icon: <Droplets className="w-4 h-4 text-sky-500" />
    },
    {
      id: 'rootPathways',
      label: '7.2(b) Root Pathways & Casparian Strip',
      icon: <Route className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 'transpiration',
      label: '7.2(c) Transpiration & Cohesion-Tension',
      icon: <Activity className="w-4 h-4 text-sky-500" />
    },
    {
      id: 'potometer',
      label: '7.2(d) Virtual Potometer Lab',
      icon: <Gauge className="w-4 h-4 text-teal-500" />
    },
    {
      id: 'xerophytes',
      label: '7.2(e) Xerophytic Adaptations',
      icon: <Shield className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'massFlow',
      label: '7.2(f,g) Phloem Active Loading & Mass Flow',
      icon: <Zap className="w-4 h-4 text-purple-500" />
    }
  ];

  const handleNavigateToTopic7Module = (modId: string) => {
    onSelectTopic('plant-transport');
    onSelectTopic7SubTab('simulators');
    onSelectModule(modId as SubModuleType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Semester 1 Chapter Directory Header (Topics 1–7) */}
      <section className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition-colors ${surfaceClass}`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span>Cambridge International AS Level Biology (9700)</span>
              <span aria-hidden="true">·</span>
              <span>Semester 1 Complete Revision Hub</span>
              <span aria-hidden="true">·</span>
              <span>Topics 1 – 7</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
              Biology 9700 Revision Hub Semester 1
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Select any chapter from Topic 1 to Topic 7 for syllabus-aligned summaries, anatomical & molecular illustrations, interactive Plant Transport labs, and end-of-topic revision questions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <div className={`px-4 py-3 rounded-2xl border ${subtleSurfaceClass}`}>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Topics 1–6 Quiz Mastery
              </div>
              <div className="text-xl font-extrabold font-mono tabular-nums text-emerald-700 dark:text-emerald-400 mt-0.5">
                {totalCorrectAcross1to6} / {totalMcqsAcross1to6} MCQs
              </div>
            </div>
          </div>
        </div>

        {/* All 7 Semester 1 Chapters Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
          {AS_BIOLOGY_CHAPTERS.map((ch) => {
            const isActive = ch.id === activeTopicId;
            const chCorrect = ch.mcqs.filter(
              (q) => selectedMcqAnswers[q.id] === q.correctOptionId
            ).length;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectTopicInternal(ch.id)}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-sm'
                      : 'bg-emerald-50/90 border-emerald-600 text-slate-950 shadow-sm'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span
                    className={
                      isActive
                        ? 'font-bold text-emerald-700 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    0{ch.topicNumber}. {ch.code}
                  </span>
                  <span className="tabular-nums text-slate-500 dark:text-slate-400">
                    {chCorrect}/{ch.mcqs.length} MCQs
                  </span>
                </div>
                <div className="font-bold text-base leading-snug">{ch.title}</div>
              </button>
            );
          })}

          {/* Topic 7: Transport in Plants Card inside Revision Hub */}
          <button
            onClick={() => handleSelectTopicInternal('plant-transport')}
            className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
              isTopic7
                ? isDark
                  ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-sm'
                  : 'bg-emerald-50/90 border-emerald-600 text-slate-950 shadow-sm'
                : isDark
                  ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <span
                className={
                  isTopic7
                    ? 'font-bold text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-slate-400'
                }
              >
                07. Topic 7
              </span>
              <span className="text-slate-500 dark:text-slate-400">7 Interactive Labs</span>
            </div>
            <div className="font-bold text-base leading-snug">
              Transport in Plants
            </div>
          </button>
        </div>
      </section>

      {/* ============================================================
          VIEW A: TOPICS 1–6 CHAPTER CONTENT
         ============================================================ */}
      {!isTopic7 && (
        <article className="space-y-8">
          {/* Chapter Overview & Figure Showcase */}
          <section className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${surfaceClass}`}>
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>
                  0{chapter.topicNumber}. {chapter.code}
                </span>
                <span aria-hidden="true">·</span>
                <span>{chapter.syllabusScope}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
                {chapter.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                {chapter.overview}
              </p>
            </div>

            {/* 2-Column Visual Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white overflow-hidden">
                <div className="p-4 bg-white flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
                  {!imageErrorMap[chapter.id] ? (
                    <img
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrorMap((prev) => ({ ...prev, [chapter.id]: true }))
                      }
                      className="w-full h-auto max-h-[420px] object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-72 rounded-xl bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-700 border border-slate-200">
                      <ImageIcon className="w-10 h-10 text-emerald-600 mb-3" />
                      <div className="font-bold text-base">{chapter.imageTitle}</div>
                      <p className="text-xs text-slate-500 mt-1 max-w-md">{chapter.imageCaption}</p>
                    </div>
                  )}
                </div>
                <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 text-slate-700">
                  <div className="font-bold text-sm text-slate-900">{chapter.imageTitle}</div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {chapter.imageCaption}
                  </p>
                </div>
              </div>

              {/* Visual Figure Legend */}
              <div
                className={`lg:col-span-5 rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${subtleSurfaceClass}`}
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Visual Diagram Key
                  </h4>
                  <div className="space-y-3">
                    {chapter.figureKey.map((item, idx) => (
                      <div
                        key={idx}
                        className="pb-2.5 border-b border-slate-200/80 dark:border-slate-800 last:border-b-0 last:pb-0"
                      >
                        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                          {item.label}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Objectives Checklist */}
            <div className={`rounded-2xl border p-5 ${subtleSurfaceClass}`}>
              <button
                onClick={() => setShowObjectives((prev) => !prev)}
                className="w-full flex items-center justify-between text-left cursor-pointer"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Cambridge 9700 Learning Objectives ({chapter.learningObjectives.length})
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tick off each syllabus statement once you can explain it from memory.
                  </p>
                </div>
                {showObjectives ? (
                  <ChevronUp className="w-5 h-5 text-slate-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {showObjectives && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {chapter.learningObjectives.map((lo) => {
                    const checked = Boolean(completedObjectives[lo.code]);
                    return (
                      <button
                        key={lo.code}
                        onClick={() => toggleObjective(lo.code)}
                        className={`text-left p-3.5 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer ${
                          checked
                            ? isDark
                              ? 'bg-emerald-950/50 border-emerald-700/70 text-emerald-100'
                              : 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                            : isDark
                              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            checked
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                        <div className="text-sm leading-relaxed">
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 mr-1.5">
                            {lo.code}
                          </span>
                          <span>{lo.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Core Syllabus Summary Notes */}
          <section className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-8 ${surfaceClass}`}>
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold">High-Yield Syllabus Summary Notes</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Concise, mark-scheme-ready explanations strictly within Cambridge 9700 boundaries
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {chapter.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {sec.heading}
                    </h4>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {sec.subRef}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={`p-3.5 rounded-xl border ${subtleSurfaceClass}`}>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {sec.keyRule && (
                    <div
                      className={`p-4 rounded-xl border font-mono text-xs sm:text-sm font-semibold ${
                        isDark
                          ? 'bg-sky-950/40 border-sky-800/60 text-sky-200'
                          : 'bg-sky-50 border-sky-200 text-sky-950'
                      }`}
                    >
                      {sec.keyRule}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {chapter.comparisonTable.title}
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className={isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-900'}>
                    <tr>
                      {chapter.comparisonTable.headers.map((head, hIdx) => (
                        <th
                          key={hIdx}
                          className="p-3.5 font-bold border-b border-slate-200 dark:border-slate-700"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {chapter.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3.5 leading-relaxed ${
                              cIdx === 0
                                ? 'font-bold text-slate-900 dark:text-white'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Examiner Tips */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Cambridge 9700 Examiner Pitfalls to Avoid
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.examinerTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDark
                        ? 'bg-amber-950/20 border-amber-800/50'
                        : 'bg-amber-50/60 border-amber-200'
                    }`}
                  >
                    <div className="text-sm">
                      <span className="font-bold text-rose-700 dark:text-rose-400">Common Trap: </span>
                      <span className="text-slate-700 dark:text-slate-300">{tip.trap}</span>
                    </div>
                    <div className="text-sm pt-2 border-t border-amber-200/70 dark:border-amber-800/40">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        Exam-Ready Answer:{' '}
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">
                        {tip.correction}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* End-of-Topic Revision Questions for Topics 1–6 */}
          <section className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-8 ${surfaceClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex items-start gap-3">
                <Award className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold">
                    End-of-Topic Revision Questions: {chapter.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Test your mastery with Cambridge Paper 1 multiple-choice and Paper 2 structured questions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div
                  className={`px-3.5 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${subtleSurfaceClass}`}
                >
                  Score:{' '}
                  {
                    chapter.mcqs.filter(
                      (q) => selectedMcqAnswers[q.id] === q.correctOptionId
                    ).length
                  }{' '}
                  / {chapter.mcqs.length}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                    (
                    {chapter.mcqs.filter((q) => Boolean(selectedMcqAnswers[q.id])).length}{' '}
                    answered)
                  </span>
                </div>
                <button
                  onClick={handleResetChapterQuestions}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Quiz
                </button>
              </div>
            </div>

            {/* Part A: Paper 1 MCQs */}
            <div className="space-y-5">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Part A: Multiple Choice Practice (Paper 1 Style)
              </h4>

              <div className="space-y-5">
                {chapter.mcqs.map((q, qIdx) => {
                  const chosenId = selectedMcqAnswers[q.id];
                  const isAnswered = Boolean(chosenId);
                  const isCorrect = chosenId === q.correctOptionId;

                  return (
                    <div key={q.id} className={`p-5 rounded-2xl border space-y-4 ${subtleSurfaceClass}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>
                          Question {qIdx + 1} of {chapter.mcqs.length}
                        </span>
                        <span>Syllabus Ref: {q.syllabusRef}</span>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {q.options.map((opt) => {
                          const isSelected = chosenId === opt.id;
                          const isOptionCorrect = opt.id === q.correctOptionId;

                          let btnStyle = isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/40';

                          if (isAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = isDark
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100'
                                : 'bg-emerald-50 border-emerald-600 text-emerald-950';
                            } else if (isSelected && !isOptionCorrect) {
                              btnStyle = isDark
                                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                                : 'bg-rose-50 border-rose-500 text-rose-950';
                            } else {
                              btnStyle = isDark
                                ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                                : 'bg-white/60 border-slate-200 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              disabled={isAnswered}
                              onClick={() => handleAnswerMcq(q.id, opt.id, q.correctOptionId)}
                              className={`p-3.5 rounded-xl border text-left text-sm transition-colors flex items-start gap-3 ${
                                isAnswered ? 'cursor-default' : 'cursor-pointer'
                              } ${btnStyle}`}
                            >
                              <span className="font-mono font-bold shrink-0">{opt.id}.</span>
                              <span className="flex-1 leading-snug">{opt.text}</span>
                              {isAnswered && isOptionCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              )}
                              {isAnswered && isSelected && !isOptionCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div
                          className={`p-4 rounded-xl border text-sm leading-relaxed ${
                            isCorrect
                              ? isDark
                                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : isDark
                                ? 'bg-slate-900 border-slate-700 text-slate-200'
                                : 'bg-white border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="font-bold mb-1 flex items-center gap-2">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Correct ({q.correctOptionId})</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                                <span>Incorrect — Correct Answer is {q.correctOptionId}</span>
                              </>
                            )}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part B: Paper 2 Structured Exam Questions */}
            <div className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Part B: Structured Short-Answer Practice (Paper 2 Style)
              </h4>

              <div className="space-y-5">
                {chapter.structuredQuestions.map((sq, sqIdx) => {
                  const isOpen = Boolean(revealedStructured[sq.id]);
                  return (
                    <div key={sq.id} className={`p-5 rounded-2xl border space-y-4 ${subtleSurfaceClass}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>
                          Structured Question {sqIdx + 1} · Syllabus {sq.syllabusRef}
                        </span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          [{sq.marks} marks]
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                        {sq.question}
                      </p>

                      <textarea
                        rows={3}
                        value={studentDrafts[sq.id] || ''}
                        onChange={(e) =>
                          setStudentDrafts((prev) => ({ ...prev, [sq.id]: e.target.value }))
                        }
                        placeholder="Draft your key bullet points here before checking the official mark scheme..."
                        className={`w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />

                      <button
                        onClick={() =>
                          setRevealedStructured((prev) => ({
                            ...prev,
                            [sq.id]: !prev[sq.id]
                          }))
                        }
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                          isOpen
                            ? isDark
                              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                              : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800'
                        }`}
                      >
                        <span>{isOpen ? 'Hide Mark Scheme' : 'Show Official Mark Scheme'}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isOpen && (
                        <div
                          className={`p-4 rounded-xl border space-y-3 ${
                            isDark
                              ? 'bg-slate-900 border-emerald-800/60 text-slate-200'
                              : 'bg-white border-emerald-200 text-slate-800'
                          }`}
                        >
                          <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                            Mark Scheme Points (1 mark per point up to [{sq.marks}]):
                          </div>
                          <ul className="space-y-1.5 text-sm leading-relaxed">
                            {sq.markSchemePoints.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                            <span className="font-bold text-amber-700 dark:text-amber-400">
                              Examiner Advice:{' '}
                            </span>
                            {sq.examinerNote}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Chapter Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() =>
                  currentIndex > 0 &&
                  handleSelectTopicInternal(AS_BIOLOGY_CHAPTERS[currentIndex - 1].id)
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800'
                    : isDark
                      ? 'border-slate-700 text-slate-200 hover:bg-slate-800 cursor-pointer'
                      : 'border-slate-300 text-slate-800 hover:bg-slate-100 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>
                  {currentIndex > 0
                    ? `Topic ${AS_BIOLOGY_CHAPTERS[currentIndex - 1].topicNumber}: ${
                        AS_BIOLOGY_CHAPTERS[currentIndex - 1].title
                      }`
                    : 'Start of Semester 1'}
                </span>
              </button>

              {currentIndex < AS_BIOLOGY_CHAPTERS.length - 1 ? (
                <button
                  onClick={() =>
                    handleSelectTopicInternal(AS_BIOLOGY_CHAPTERS[currentIndex + 1].id)
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    Next: Topic {AS_BIOLOGY_CHAPTERS[currentIndex + 1].topicNumber} —{' '}
                    {AS_BIOLOGY_CHAPTERS[currentIndex + 1].title}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleSelectTopicInternal('plant-transport')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Next: Topic 7 — Transport in Plants</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        </article>
      )}

      {/* ============================================================
          VIEW B: TOPIC 7 (TRANSPORT IN PLANTS) INSIDE REVISION HUB
         ============================================================ */}
      {isTopic7 && (
        <article className="space-y-8">
          {/* Topic 7 Header, Overview Diagram & Workspace Mode Switcher */}
          <section className={`rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 ${surfaceClass}`}>
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>07. {TOPIC7_OVERVIEW_DATA.code}</span>
                <span aria-hidden="true">·</span>
                <span>{TOPIC7_OVERVIEW_DATA.syllabusScope}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-balance">
                {TOPIC7_OVERVIEW_DATA.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                {TOPIC7_OVERVIEW_DATA.overview}
              </p>
            </div>

            {/* 2-Column Visual Stage for Topic 7 Overview Figure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white overflow-hidden">
                <div className="p-4 bg-white flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
                  {!imageErrorMap['plant-transport'] ? (
                    <img
                      src={TOPIC7_OVERVIEW_DATA.image}
                      alt={TOPIC7_OVERVIEW_DATA.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImageErrorMap((prev) => ({ ...prev, 'plant-transport': true }))
                      }
                      className="w-full h-auto max-h-[380px] object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-xl bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-700 border border-slate-200">
                      <ImageIcon className="w-10 h-10 text-emerald-600 mb-3" />
                      <div className="font-bold text-base">{TOPIC7_OVERVIEW_DATA.imageTitle}</div>
                      <p className="text-xs text-slate-500 mt-1 max-w-md">
                        {TOPIC7_OVERVIEW_DATA.imageCaption}
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 text-slate-700">
                  <div className="font-bold text-sm text-slate-900">
                    {TOPIC7_OVERVIEW_DATA.imageTitle}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {TOPIC7_OVERVIEW_DATA.imageCaption}
                  </p>
                </div>
              </div>

              <div
                className={`lg:col-span-5 rounded-2xl border p-5 flex flex-col justify-between space-y-4 ${subtleSurfaceClass}`}
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Visual Diagram Key
                  </h4>
                  <div className="space-y-3">
                    {TOPIC7_OVERVIEW_DATA.figureKey.map((item, idx) => (
                      <div
                        key={idx}
                        className="pb-2.5 border-b border-slate-200/80 dark:border-slate-800 last:border-b-0 last:pb-0"
                      >
                        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                          {item.label}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Topic 7 Workspace Section Tabs (Simulators + Potometer Lab, Notes, Exam, Flashcards, LO Matrix) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onSelectTopic7SubTab('simulators')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    topic7SubTab === 'simulators'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Microscope className="w-4 h-4" />
                  <span>Simulators & Potometer Lab (7.1–7.2)</span>
                </button>

                <button
                  onClick={() => onSelectTopic7SubTab('notes')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    topic7SubTab === 'notes'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Summary Notes & Glossary</span>
                </button>

                <button
                  onClick={() => onSelectTopic7SubTab('exam')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    topic7SubTab === 'exam'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Topic 7 Exam & Revision Questions</span>
                </button>

                <button
                  onClick={() => onSelectTopic7SubTab('flashcards')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    topic7SubTab === 'flashcards'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Topic 7 Flashcards</span>
                </button>

                <button
                  onClick={() => onSelectTopic7SubTab('checklist')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    topic7SubTab === 'checklist'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Syllabus LO Matrix</span>
                </button>
              </div>

              {/* Simulator Sub-Selector when Interactive Simulators is active */}
              {topic7SubTab === 'simulators' && (
                <div
                  className={`p-3 rounded-2xl border overflow-x-auto ${subtleSurfaceClass}`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold">
                    {topic7Simulators.map((sim) => (
                      <button
                        key={sim.id}
                        onClick={() => onSelectModule(sim.id)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          activeModule === sim.id
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : isDark
                              ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                        }`}
                      >
                        {sim.icon}
                        <span>{sim.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Topic 7 Active Workspace Content */}
          {topic7SubTab === 'simulators' && (
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

          {topic7SubTab === 'notes' && (
            <div className="animate-in fade-in duration-200">
              <NotesSection />
            </div>
          )}

          {topic7SubTab === 'exam' && (
            <div className="animate-in fade-in duration-200">
              <ExamPracticeSection />
            </div>
          )}

          {topic7SubTab === 'flashcards' && (
            <div className="animate-in fade-in duration-200">
              <FlashcardsSection />
            </div>
          )}

          {topic7SubTab === 'checklist' && (
            <div className="animate-in fade-in duration-200">
              <SyllabusChecklist onNavigateToModule={handleNavigateToTopic7Module} />
            </div>
          )}

          {/* Topic 7 Back Pagination */}
          <div className={`rounded-3xl border p-6 shadow-sm flex items-center justify-between ${surfaceClass}`}>
            <button
              onClick={() => handleSelectTopicInternal('nucleic-acids')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isDark
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Topic 6 — Nucleic Acids & Protein Synthesis</span>
            </button>

            <button
              onClick={() => handleSelectTopicInternal('cell-structure')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Return to Topic 1: Cell Structure</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
