import React, { useState } from 'react';
import { Wind, Droplets, Sun, CheckCircle2, Shield, Eye } from 'lucide-react';

export const XerophyteAdaptations: React.FC = () => {
  const [isDrought, setIsDrought] = useState<boolean>(true); // Hinge cells flaccid -> rolled
  const [selectedPlant, setSelectedPlant] = useState<'marram' | 'pine'>('marram');
  const [activeCallout, setActiveCallout] = useState<string>('hinge');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Syllabus 7.2(e)
              </span>
              <span className="text-sm text-amber-200/90 font-mono">Structural Adaptations of Xerophytes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-400 flex-shrink-0" />
              Xerophytic Leaf Adaptations Explorer
            </h2>
            <p className="text-amber-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Discover how Marram grass (<em>Ammophila arenaria</em>) and Pine needles minimize water vapour potential gradients through rolled leaves, hinge cells, trichomes, and sunken stomata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPlant('marram')}
              className={`px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all shadow-md ${
                selectedPlant === 'marram'
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                  : 'bg-amber-950/70 text-amber-200 border border-amber-700/40 hover:bg-amber-900/50'
              }`}
            >
              🌾 Marram Grass (Ammophila)
            </button>
            <button
              onClick={() => setSelectedPlant('pine')}
              className={`px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all shadow-md ${
                selectedPlant === 'pine'
                  ? 'bg-amber-500 text-slate-950 shadow-lg font-black'
                  : 'bg-amber-950/70 text-amber-200 border border-amber-700/40 hover:bg-amber-900/50'
              }`}
            >
              🌲 Pine Needle (Pinus)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram & Microclimate Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Leaf Cross-Section (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {selectedPlant === 'marram' ? 'Ammophila arenaria Transverse Section' : 'Pinus Needle Transverse Section'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                {selectedPlant === 'marram'
                  ? (isDrought ? 'Drought State: Hinge cells flaccid → Leaf rolled tightly' : 'Hydrated State: Hinge cells turgid → Leaf open')
                  : 'Circular/semicircular outline minimizing surface area to volume ratio'}
              </p>
            </div>

            {selectedPlant === 'marram' && (
              <button
                onClick={() => setIsDrought(!isDrought)}
                className={`px-4 py-2 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 shadow-xs ${
                  isDrought
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-sky-600 text-white shadow-md'
                }`}
              >
                {isDrought ? '💧 Hydrate Leaf (Open)' : '☀️ Apply Drought (Roll Leaf)'}
              </button>
            )}
          </div>

          <div className="p-6 sm:p-10 bg-gradient-to-b from-stone-50 via-white to-amber-50/20 flex flex-col items-center justify-center min-h-[460px]">
            {selectedPlant === 'marram' ? (
              <MarramGrassSvg isDrought={isDrought} onSelectFeature={setActiveCallout} />
            ) : (
              <PineNeedleSvg onSelectFeature={setActiveCallout} />
            )}
          </div>

          {/* Microclimate telemetry bar */}
          <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-5 text-sm font-semibold">
            <div className="flex items-center gap-2.5">
              <Droplets className="w-5 h-5 text-sky-600" />
              <span>Trapped Air Humidity: <strong className="text-slate-900 font-extrabold">{isDrought ? '92% (High / Protected)' : '55% (Exposed)'}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Wind className="w-5 h-5 text-teal-600" />
              <span>Air Current Speed: <strong className="text-slate-900 font-extrabold">{isDrought ? '0.0 m/s (Zero turbulence)' : '2.5 m/s'}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-emerald-700">Transpiration Reduction:</span>
              <span className="font-mono font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-xl text-sm border border-emerald-300">
                {isDrought ? '-85%' : '-30%'}
              </span>
            </div>
          </div>
        </div>

        {/* Adaptations Explanation Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Cambridge 9700 Xerophytic Key Adaptations
            </h4>

            <div className="space-y-3 text-sm">
              <div
                onClick={() => setActiveCallout('rolled')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeCallout === 'rolled'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  1. Rolled / Curled Leaf & Hinge Cells
                </div>
                <p className="text-slate-700 mt-1.5 leading-relaxed text-sm">
                  Hinge cells (large, thin-walled bulliform cells) lose water in drought, becoming flaccid and pulling the leaf into a cylinder. This encloses stomata in a confined chamber, trapping moist air.
                </p>
              </div>

              <div
                onClick={() => setActiveCallout('sunken')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeCallout === 'sunken'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  2. Sunken Stomata in Grooves / Pits
                </div>
                <p className="text-slate-700 mt-1.5 leading-relaxed text-sm">
                  Stomata are recessed inside pits or longitudinal grooves. Water vapour evaporating from stomata accumulates in the pit, shortening the diffusion pathway and reducing the concentration gradient.
                </p>
              </div>

              <div
                onClick={() => setActiveCallout('trichomes')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeCallout === 'trichomes'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  3. Epidermal Hairs (Trichomes)
                </div>
                <p className="text-slate-700 mt-1.5 leading-relaxed text-sm">
                  Stiff hairs projecting from the inner epidermis trap a boundary layer of still, humid air, preventing wind from blowing water vapour away.
                </p>
              </div>

              <div
                onClick={() => setActiveCallout('cuticle')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeCallout === 'cuticle'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  4. Thick Hydrophobic Waxy Cuticle
                </div>
                <p className="text-slate-700 mt-1.5 leading-relaxed text-sm">
                  A thick continuous layer of cutin/wax on the exposed outer epidermis provides an impermeable waterproof barrier, eliminating cuticular transpiration.
                </p>
              </div>
            </div>
          </div>

          {/* Examiner Golden Tip */}
          <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-3xl text-sm text-amber-950 space-y-2">
            <span className="font-extrabold text-amber-900 text-base block">The Cambridge Examiner Keyword Rule:</span>
            <p className="leading-relaxed">
              When describing <strong>ANY</strong> of these adaptations, you must explain that it <em>"traps a layer of moist / humid air"</em> which <em>"decreases the water vapour potential gradient between the inside of the leaf and the external air"</em>, thereby reducing the rate of diffusion / transpiration!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SVG Diagrams for Marram Grass & Pine Needle
// ==========================================

interface MarramSvgProps {
  isDrought: boolean;
  onSelectFeature: (f: string) => void;
}

const MarramGrassSvg: React.FC<MarramSvgProps> = ({ isDrought, onSelectFeature }) => {
  return (
    <svg viewBox="0 0 460 300" className="w-full max-w-[600px] h-auto select-none">
      {/* Outer thick waxy cuticle line */}
      <path
        d={
          isDrought
            ? 'M 60,150 C 60,60 200,30 230,30 C 260,30 400,60 400,150 C 400,240 280,260 230,260 C 180,260 60,240 60,150'
            : 'M 40,160 Q 230,80 420,160'
        }
        fill="none"
        stroke="#ca8a04"
        strokeWidth="7"
        className="cursor-pointer"
        onClick={() => onSelectFeature('cuticle')}
      />

      {/* Mesophyll Tissue Body */}
      <path
        d={
          isDrought
            ? 'M 80,150 C 80,80 200,50 230,50 C 260,50 380,80 380,150 C 380,220 280,240 230,240 C 180,240 80,220 80,150'
            : 'M 50,175 Q 230,105 410,175'
        }
        fill={isDrought ? '#fef3c7' : '#f0fdf4'}
        stroke="#16a34a"
        strokeWidth="2.5"
      />

      {/* Inner Ridges / Grooves (Where stomata hide) */}
      {isDrought ? (
        <g>
          {/* Inner Trapped Humid Microclimate Chamber */}
          <ellipse cx="230" cy="145" rx="90" ry="60" fill="#e0f2fe" opacity="0.6" />
          <text x="230" y="145" textAnchor="middle" className="text-[13px] font-sans fill-sky-950 font-extrabold">
            Trapped Humid Air Chamber
          </text>
          <text x="230" y="162" textAnchor="middle" className="text-[11px] font-sans fill-sky-800 font-bold">
            (Shallow diffusion gradient)
          </text>

          {/* Trichomes / Hairs pointing into the cavity */}
          {[
            { x: 160, y: 120, dx: 15, dy: 10 },
            { x: 180, y: 100, dx: 10, dy: 15 },
            { x: 230, y: 90, dx: 0, dy: 18 },
            { x: 280, y: 100, dx: -10, dy: 15 },
            { x: 300, y: 120, dx: -15, dy: 10 },
            { x: 170, y: 170, dx: 15, dy: -10 },
            { x: 230, y: 195, dx: 0, dy: -18 },
            { x: 290, y: 170, dx: -15, dy: -10 }
          ].map((h, i) => (
            <line
              key={i}
              x1={h.x}
              y1={h.y}
              x2={h.x + h.dx}
              y2={h.y + h.dy}
              stroke="#65a30d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}

          {/* Sunken Stomata in pits */}
          <ellipse cx="230" cy="85" rx="5" ry="3" fill="#0284c7" />
          <ellipse cx="170" cy="115" rx="5" ry="3" fill="#0284c7" />
          <ellipse cx="290" cy="115" rx="5" ry="3" fill="#0284c7" />
        </g>
      ) : (
        /* Open leaf when hydrated */
        <g>
          <text x="230" y="70" textAnchor="middle" className="text-[14px] font-sans fill-slate-700 font-extrabold">
            Hydrated Leaf: Flat / Unrolled
          </text>
          {/* Hinge cells swollen in grooves */}
          <circle cx="160" cy="130" r="11" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="230" cy="120" r="13" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <circle cx="300" cy="130" r="11" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <text x="230" y="145" textAnchor="middle" className="text-[12px] font-sans fill-blue-950 font-extrabold">
            Turgid Hinge Cells
          </text>
        </g>
      )}

      {/* Vascular Bundles */}
      <circle cx="150" cy="190" r="9" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
      <circle cx="230" cy="225" r="10" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
      <circle cx="310" cy="190" r="9" fill="#fda4af" stroke="#be123c" strokeWidth="2" />

      {/* Outer Labels */}
      <text x="230" y="284" textAnchor="middle" className="text-[12px] font-sans fill-amber-950 font-extrabold">
        Thick Waxy Cuticle on Outer Surface
      </text>
    </svg>
  );
};

interface PineSvgProps {
  onSelectFeature: (f: string) => void;
}

const PineNeedleSvg: React.FC<PineSvgProps> = ({ onSelectFeature }) => (
  <svg viewBox="0 0 420 300" className="w-full max-w-[560px] h-auto select-none">
    {/* Semicircular Outline */}
    <path
      d="M 60,180 A 150 150 0 0 1 360,180 Z"
      fill="#f0fdf4"
      stroke="#16a34a"
      strokeWidth="3.5"
    />

    {/* Thick Cuticle & Sclerenchymatous Hypodermis */}
    <path
      d="M 60,180 A 150 150 0 0 1 360,180 Z"
      fill="none"
      stroke="#ca8a04"
      strokeWidth="6"
    />

    {/* Sunken Stomata Pits */}
    {[
      { x: 110, y: 120, angle: -45 },
      { x: 160, y: 80, angle: -25 },
      { x: 210, y: 65, angle: 0 },
      { x: 260, y: 80, angle: 25 },
      { x: 310, y: 120, angle: 45 }
    ].map((pit, idx) => (
      <g key={idx} transform={`translate(${pit.x}, ${pit.y}) rotate(${pit.angle})`}>
        <rect x="-7" y="-7" width="14" height="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="2" />
        <circle cx="0" cy="0" r="2.5" fill="#0369a1" />
      </g>
    ))}

    {/* Resin Ducts */}
    <circle cx="120" cy="145" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
    <circle cx="300" cy="145" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
    <text x="120" y="149" textAnchor="middle" className="text-[11px] font-sans fill-amber-950 font-extrabold">Resin</text>
    <text x="300" y="149" textAnchor="middle" className="text-[11px] font-sans fill-amber-950 font-extrabold">Resin</text>

    {/* Central Vascular Bundle (2 bundles enclosed in endodermis) */}
    <ellipse cx="210" cy="145" rx="44" ry="26" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
    <circle cx="195" cy="145" r="9" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
    <circle cx="225" cy="145" r="9" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
    <text x="210" y="149" textAnchor="middle" className="text-[11px] font-sans fill-purple-950 font-extrabold">Stele</text>

    {/* Labels */}
    <text x="210" y="44" textAnchor="middle" className="text-[12px] font-sans fill-slate-800 font-extrabold">
      Sunken Stomata in Pits along Perimeter
    </text>
    <text x="210" y="215" textAnchor="middle" className="text-[12px] font-sans fill-slate-700 font-extrabold">
      Flat Surface • Reduced Surface Area : Volume
    </text>
  </svg>
);
