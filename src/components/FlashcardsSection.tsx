import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/flashcardsData';
import { Flashcard } from '../types/biology';
import { RotateCw, Check, X, Shuffle, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FlashcardsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS_DATA);

  const filteredCards = activeCategory === 'all'
    ? cards
    : cards.filter((c) => c.category === activeCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = masteredIds.includes(currentCard?.id);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleToggleMastered = () => {
    if (!currentCard) return;
    if (isMastered) {
      setMasteredIds((prev) => prev.filter((id) => id !== currentCard.id));
    } else {
      setMasteredIds((prev) => [...prev, currentCard.id]);
      if (masteredIds.length + 1 === cards.length) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Active Recall & Spaced Repetition
              </span>
              <span className="text-sm text-emerald-200/90 font-mono">14 High-Yield Flashcards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              Plant Transport Active Recall Deck
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Reinforce vital definitions, Casparian strip facts, potometer formulas, and mass flow sequences for rapid exam recall.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl border border-emerald-500/40 transition-all shadow-md"
            >
              <Shuffle className="w-4 h-4" /> Shuffle Deck
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mt-6 border-t border-emerald-800/60 pt-5">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'anatomy', label: 'Tissue Anatomy' },
            { id: 'water-potential', label: 'Water Potential' },
            { id: 'transpiration', label: 'Transpiration & Roots' },
            { id: 'practical', label: 'Potometer Practical' },
            { id: 'translocation', label: 'Phloem Translocation' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-white text-emerald-950 font-black shadow-md'
                  : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mastery Progress Bar */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 space-y-2.5">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="font-bold text-slate-800">Mastery Progress:</span>
          <span className="font-mono text-emerald-700 font-extrabold text-base">
            {masteredIds.length} of {cards.length} cards mastered ({Math.round((masteredIds.length / cards.length) * 100)}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${(masteredIds.length / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main 3D Flashcard */}
      <div className="flex flex-col items-center justify-center space-y-7">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full max-w-2xl h-96 sm:h-[420px] cursor-pointer perspective-1000 select-none"
        >
          <div
            className={`w-full h-full rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-500 transform-style-3d border ${
              isFlipped
                ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white border-emerald-600/50 rotate-y-180'
                : 'bg-white text-slate-900 border-slate-200'
            } flex flex-col justify-between`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider ${
                isFlipped ? 'bg-emerald-800/90 text-emerald-200' : 'bg-slate-100 text-slate-700'
              }`}>
                {currentCard?.category}
              </span>

              <span className={`text-sm font-mono font-bold ${isFlipped ? 'text-emerald-300' : 'text-slate-400'}`}>
                {currentIndex + 1} / {filteredCards.length}
              </span>
            </div>

            {/* Content (Front vs Back) */}
            <div className="text-center space-y-4 my-auto">
              {!isFlipped ? (
                <div className="text-xl sm:text-2xl font-extrabold leading-relaxed px-4 text-slate-900">
                  {currentCard?.front}
                </div>
              ) : (
                <div className="text-base sm:text-lg leading-relaxed px-4 whitespace-pre-line text-emerald-50 font-medium">
                  {currentCard?.back}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100/20 text-xs sm:text-sm font-semibold">
              <span className={`flex items-center gap-2 ${isFlipped ? 'text-emerald-300' : 'text-slate-500'}`}>
                <RotateCw className="w-4 h-4" />
                {isFlipped ? 'Click to view question' : 'Click card to flip for answer'}
              </span>

              {currentCard?.examinerAlert && isFlipped && (
                <span className="text-xs font-bold text-amber-300 bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-700/60">
                  ⚡ {currentCard.examinerAlert}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handlePrev}
            className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm transition-all"
            title="Previous card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleToggleMastered}
            className={`px-6 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 shadow-md ${
              isMastered
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Check className="w-5 h-5" />
            {isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
          </button>

          <button
            onClick={handleNext}
            className="p-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl shadow-sm transition-all"
            title="Next card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
