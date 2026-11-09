import React, { useState } from 'react';
import { MCQ_QUESTIONS, STRUCTURED_QUESTIONS, COMMON_EXAM_ERRORS } from '../data/examQuestionsData';
import { Award, CheckCircle2, XCircle, AlertTriangle, BookOpen, RefreshCw, Trophy, HelpCircle, ChevronRight, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamPracticeSection: React.FC = () => {
  const [examMode, setExamMode] = useState<'paper1' | 'paper2' | 'spotError'>('paper1');

  // Paper 1 (MCQ) State
  const [currentMcqIndex, setCurrentMcqIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Paper 2 (Structured) State
  const [currentStructIndex, setCurrentStructIndex] = useState<number>(0);
  const [revealedMarkSchemes, setRevealedMarkSchemes] = useState<{ [partKey: string]: boolean }>({});
  const [userAwardedMarks, setUserAwardedMarks] = useState<{ [partKey: string]: number }>({});

  // Spot the Error State
  const [currentErrorIndex, setCurrentErrorIndex] = useState<number>(0);
  const [revealedCorrection, setRevealedCorrection] = useState<boolean>(false);

  const currentMcq = MCQ_QUESTIONS[currentMcqIndex];
  const currentStruct = STRUCTURED_QUESTIONS[currentStructIndex];
  const currentError = COMMON_EXAM_ERRORS[currentErrorIndex];

  const handleSelectOption = (optionId: string) => {
    if (selectedAnswers[currentMcq.id]) return; // already answered

    const isCorrect = optionId === currentMcq.correctOptionId;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentMcq.id]: optionId
    });
    setShowExplanation(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextMcq = () => {
    setShowExplanation(false);
    if (currentMcqIndex < MCQ_QUESTIONS.length - 1) {
      setCurrentMcqIndex((prev) => prev + 1);
    }
  };

  const toggleMarkScheme = (partKey: string) => {
    setRevealedMarkSchemes((prev) => ({
      ...prev,
      [partKey]: !prev[partKey]
    }));
  };

  const handleSelfAwardMark = (partKey: string, marks: number) => {
    setUserAwardedMarks((prev) => ({
      ...prev,
      [partKey]: marks
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Cambridge 9700 Past Paper Format
              </span>
              <span className="text-sm text-emerald-200/90 font-mono">Paper 1 (MCQ) & Paper 2 (Structured)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              Cambridge Exam Practice & Mark Scheme Studio
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Master official Cambridge exam questions with authentic mark schemes, underlined compulsory keywords, reject notes, and examiner report feedback.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center bg-emerald-950/90 p-2 rounded-2xl border border-emerald-700/50 self-start md:self-auto gap-2 shadow-inner">
            <button
              onClick={() => setExamMode('paper1')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                examMode === 'paper1'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              Paper 1 (MCQ)
            </button>
            <button
              onClick={() => setExamMode('paper2')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                examMode === 'paper2'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              Paper 2 (Structured)
            </button>
            <button
              onClick={() => setExamMode('spotError')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                examMode === 'spotError'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              Spot the Examiner Penalty
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: PAPER 1 (MULTIPLE CHOICE QUESTIONS) */}
      {/* ========================================================= */}
      {examMode === 'paper1' && (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 sm:p-8 space-y-7">
          {/* Header & Score Tracker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                Question {currentMcqIndex + 1} of {MCQ_QUESTIONS.length}
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-mono font-semibold ml-3">LO: {currentMcq.learningObjectiveId}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl">
                <Trophy className="w-5 h-5 text-amber-500" />
                Score: {score} / {Object.keys(selectedAnswers).length}
              </div>

              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowExplanation(false);
                  setCurrentMcqIndex(0);
                  setScore(0);
                }}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-900 font-semibold"
                title="Restart Quiz"
              >
                <RefreshCw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
            {currentMcq.question}
          </div>

          {/* Options List */}
          <div className="space-y-3.5">
            {currentMcq.options.map((opt) => {
              const hasAnswered = !!selectedAnswers[currentMcq.id];
              const isSelected = selectedAnswers[currentMcq.id] === opt.id;
              const isCorrect = opt.id === currentMcq.correctOptionId;

              let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-500/30';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border text-sm sm:text-base font-semibold transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono font-extrabold flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${
                    hasAnswered && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : hasAnswered && isSelected
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="leading-relaxed flex-grow">{opt.text}</span>
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 ml-auto flex-shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 ml-auto flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Cambridge Examiner Feedback */}
          {showExplanation && (
            <div className="space-y-5 pt-3">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-sm">
                <span className="font-extrabold text-slate-900 block text-base">Biological Rationale:</span>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{currentMcq.explanation}</p>
              </div>

              <div className="bg-emerald-50/90 border border-emerald-200 p-5 rounded-2xl text-sm text-emerald-950 space-y-2">
                <div className="font-extrabold flex items-center gap-2 text-emerald-800 text-base">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Cambridge Examiner Comment:
                </div>
                <p className="text-emerald-900/95 leading-relaxed text-sm sm:text-base">{currentMcq.examinerComment}</p>
              </div>

              {/* Next Question Button */}
              <div className="flex justify-end pt-3">
                <button
                  onClick={handleNextMcq}
                  disabled={currentMcqIndex === MCQ_QUESTIONS.length - 1}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-sm font-bold rounded-2xl transition-all flex items-center gap-2.5 shadow-md"
                >
                  Next Question <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: PAPER 2 (STRUCTURED QUESTIONS WITH MARK SCHEMES) */}
      {/* ========================================================= */}
      {examMode === 'paper2' && (
        <div className="space-y-7">
          {/* Question Selector Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {STRUCTURED_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentStructIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  currentStructIndex === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Question {idx + 1} ({q.totalMarks} Marks)
              </button>
            ))}
          </div>

          {/* Active Question Paper */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 sm:p-8 space-y-7">
            <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Cambridge 9700 Paper 2 Theory • {currentStruct.totalMarks} Marks Total
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">{currentStruct.title}</h3>
              </div>
              <span className="text-sm text-slate-500 font-mono font-semibold">Syllabus: {currentStruct.syllabusCode}</span>
            </div>

            {/* Context Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm sm:text-base text-slate-700 font-serif italic leading-relaxed">
              {currentStruct.context}
            </div>

            {/* Parts */}
            <div className="space-y-7">
              {currentStruct.parts.map((part, pIdx) => {
                const partKey = `${currentStruct.id}-${part.partLabel}`;
                const isRevealed = !!revealedMarkSchemes[partKey];
                const awarded = userAwardedMarks[partKey] || 0;

                return (
                  <div key={pIdx} className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-3">
                        <span className="font-mono text-emerald-700 font-extrabold">{part.partLabel}</span>
                        <span className="leading-relaxed">{part.questionText}</span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-mono flex-shrink-0 shadow-xs">
                        [{part.marks}]
                      </span>
                    </div>

                    {/* Reveal Mark Scheme Button */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        onClick={() => toggleMarkScheme(partKey)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-bold rounded-xl transition-all shadow-xs"
                      >
                        <Eye className="w-4 h-4 text-emerald-600" />
                        {isRevealed ? 'Hide Official Mark Scheme' : 'Reveal Cambridge Mark Scheme & Model Answer'}
                      </button>

                      {isRevealed && (
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <span>Self-Mark:</span>
                          <div className="flex gap-1.5">
                            {Array.from({ length: part.marks + 1 }).map((_, m) => (
                              <button
                                key={m}
                                onClick={() => handleSelfAwardMark(partKey, m)}
                                className={`w-8 h-8 rounded-xl text-sm font-mono font-bold transition-all ${
                                  awarded === m
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Official Mark Scheme Details */}
                    {isRevealed && (
                      <div className="space-y-4 pt-4 border-t border-slate-200 text-sm">
                        {/* Model Answer */}
                        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-1.5">
                          <span className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider block">
                            Cambridge Model Answer (Full Marks):
                          </span>
                          <p className="text-slate-900 leading-relaxed font-sans whitespace-pre-line text-sm sm:text-base">
                            {part.modelAnswer}
                          </p>
                        </div>

                        {/* Official Marking Criteria Points */}
                        <div className="space-y-2">
                          <span className="font-extrabold text-slate-700 uppercase tracking-wider text-xs block">
                            Marking Criteria (1 mark each; underlined keywords compulsory):
                          </span>
                          <ul className="space-y-2">
                            {part.markSchemePoints.map((mp, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
                                <span className="font-mono font-extrabold text-emerald-600 text-sm">[1]</span>
                                <span className="text-slate-800 leading-relaxed text-sm sm:text-base">{mp.point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Examiner Report Excerpt */}
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 space-y-1.5">
                          <span className="font-extrabold text-amber-900 block text-xs uppercase tracking-wider">
                            Cambridge Examiner Report Feedback:
                          </span>
                          <p className="leading-relaxed text-xs sm:text-sm">{part.examinerReportSnippet}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: SPOT THE CAMBRIDGE ERROR */}
      {/* ========================================================= */}
      {examMode === 'spotError' && (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 sm:p-8 space-y-7">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-extrabold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Case Study {currentErrorIndex + 1} of {COMMON_EXAM_ERRORS.length}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Identify the Cambridge Examiner Penalty</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRevealedCorrection(false);
                  setCurrentErrorIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentErrorIndex === 0}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-sm font-bold rounded-xl text-slate-800 transition-all"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setRevealedCorrection(false);
                  setCurrentErrorIndex((prev) => Math.min(COMMON_EXAM_ERRORS.length - 1, prev + 1));
                }}
                disabled={currentErrorIndex === COMMON_EXAM_ERRORS.length - 1}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-sm font-bold rounded-xl text-white transition-all shadow-xs"
              >
                Next Case
              </button>
            </div>
          </div>

          {/* Student's Flawed Answer */}
          <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3">
            <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider block">
              Sample Student Answer (Marks Lost):
            </span>
            <div className="text-lg sm:text-xl font-serif italic text-rose-950 font-bold bg-white p-5 rounded-2xl border border-rose-200 leading-relaxed shadow-xs">
              "{currentError.trap}"
            </div>
            <p className="text-sm text-rose-800 font-semibold">
              Why did the Cambridge examiner penalize or withhold marks for this statement?
            </p>
          </div>

          {/* Reveal Button */}
          {!revealedCorrection ? (
            <button
              onClick={() => setRevealedCorrection(true)}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all flex items-center gap-2.5 shadow-md"
            >
              <Eye className="w-5 h-5 text-emerald-400" />
              Reveal Examiner Justification & Correction
            </button>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Correct Statement */}
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2 text-sm">
                <span className="font-extrabold text-emerald-900 text-base block">Examiner-Approved Correct Answer:</span>
                <p className="text-slate-900 font-bold leading-relaxed bg-white p-4 rounded-xl border border-emerald-200 text-sm sm:text-base">
                  {currentError.correction}
                </p>
              </div>

              {/* Why Penalized */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-sm space-y-1.5">
                <span className="font-extrabold text-slate-800 text-xs uppercase tracking-wider block">
                  Scientific Rationale Behind Penalty:
                </span>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{currentError.whyExaminerPenalizes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
