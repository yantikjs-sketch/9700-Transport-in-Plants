import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Zap, AlertOctagon, CheckCircle2, ChevronRight, ChevronLeft, Info } from 'lucide-react';

export const MassFlowSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [atpInhibited, setAtpInhibited] = useState<boolean>(false);
  const [sourceType, setSourceType] = useState<'leaf' | 'sprouting-tuber'>('leaf');
  const [sinkType, setSinkType] = useState<'root-tip' | 'developing-fruit'>('root-tip');

  const steps = [
    {
      title: 'Step 1: Primary Active Proton Pumping (H⁺-ATPase)',
      desc: 'H⁺-ATPase proton pumps in the cell surface membrane of companion cells hydrolyse ATP to actively pump H⁺ ions (protons) out of the companion cell cytoplasm into the cell wall matrix.',
      atpRequired: true,
      badge: 'Primary Active Transport'
    },
    {
      title: 'Step 2: H⁺ / Sucrose Cotransport (Secondary Active)',
      desc: 'A steep electrochemical and concentration gradient of H⁺ builds up outside. H⁺ ions diffuse back into the companion cell down their gradient through a cotransporter carrier protein, simultaneously bringing sucrose molecules against their concentration gradient into the companion cell.',
      atpRequired: false,
      badge: 'Secondary Cotransport'
    },
    {
      title: 'Step 3: Symplastic Diffusion into Sieve Tube',
      desc: 'Sucrose diffuses from the companion cell into the sieve tube element through numerous plasmodesmata (cytoplasmic channels connecting the two sister cells).',
      atpRequired: false,
      badge: 'Plasmodesmata Channel'
    },
    {
      title: 'Step 4: Osmotic Entry of Water & High Hydrostatic Pressure',
      desc: 'The high concentration of sucrose in the sieve tube element lowers its water potential (Ψ becomes strongly negative). Water enters from the adjacent xylem vessel by osmosis down a water potential gradient, creating high hydrostatic pressure inside the sieve tube at the source.',
      atpRequired: false,
      badge: 'Osmosis & Pressure Build-up'
    },
    {
      title: 'Step 5: Mass Flow Down Hydrostatic Pressure Gradient',
      desc: 'Phloem sap (water + sucrose + amino acids) moves rapidly by mass flow along the sieve tube through perforated sieve plates towards the sink, driven by the hydrostatic pressure gradient.',
      atpRequired: false,
      badge: 'Mass Flow (High to Low P)'
    },
    {
      title: 'Step 6: Unloading at the Sink & Water Exit',
      desc: 'At the sink (e.g., growing root tip or developing fruit), sucrose is unloaded and converted to starch or respired. This increases water potential in the sieve tube; water exits by osmosis back into the xylem, maintaining low hydrostatic pressure at the sink.',
      atpRequired: false,
      badge: 'Sink Unloading'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-400/20 text-purple-300 border border-purple-400/30">
                Syllabus 7.2(f) & 7.2(g)
              </span>
              <span className="text-sm text-purple-200/90 font-mono">Mass Flow Hypothesis & Active Loading</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
              Active Phloem Loading & Mass Flow Simulator
            </h2>
            <p className="text-purple-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Explore how companion cells actively pump protons using ATP to load sucrose via cotransporters, generating high hydrostatic pressure that drives mass flow from source to sink.
            </p>
          </div>

          {/* Cyanide / Metabolic Inhibitor Test */}
          <button
            onClick={() => setAtpInhibited(!atpInhibited)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all shadow-md self-start md:self-auto ${
              atpInhibited
                ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-purple-400/30'
            }`}
          >
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            {atpInhibited ? 'Cyanide Active: ATP Blocked!' : 'Apply Metabolic Poison (Cyanide)'}
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700">Source:</span>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value as any)}
              className="text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold shadow-xs focus:ring-2 focus:ring-purple-500"
            >
              <option value="leaf">Photosynthesising Green Leaf (Summer)</option>
              <option value="sprouting-tuber">Sprouting Potato Tuber (Spring)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700">Sink:</span>
            <select
              value={sinkType}
              onChange={(e) => setSinkType(e.target.value as any)}
              className="text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-bold shadow-xs focus:ring-2 focus:ring-purple-500"
            >
              <option value="root-tip">Growing Root Tip (Cell Division)</option>
              <option value="developing-fruit">Developing Fruit / Seed (Storage)</option>
            </select>
          </div>
        </div>

        {/* SVG Mechanism Diagram Canvas */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-slate-50 via-white to-purple-50/20 flex flex-col items-center justify-center min-h-[460px]">
          <MassFlowSvg
            step={currentStep}
            atpInhibited={atpInhibited}
            sourceType={sourceType}
            sinkType={sinkType}
          />
        </div>

        {/* Stepper Navigation Bar */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-800 text-sm font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Stage
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
            >
              Next Stage <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Step Pill Indicators */}
          <div className="flex items-center gap-2">
            {steps.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-9 h-9 rounded-2xl text-sm font-mono font-bold transition-all ${
                  currentStep === idx
                    ? 'bg-purple-600 text-white shadow-md scale-110'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanatory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Active Stage Details (7 cols) */}
        <div className="md:col-span-7 bg-white p-7 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs sm:text-sm font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
              {steps[currentStep].badge}
            </span>
            {steps[currentStep].atpRequired && (
              <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-bold ${
                atpInhibited ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                ⚡ Requires ATP (Inhibited by Cyanide)
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{steps[currentStep].title}</h3>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
            {steps[currentStep].desc}
          </p>

          {atpInhibited && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-sm text-rose-950 flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-900 font-extrabold">Metabolic Inhibitor Effect:</strong> Cyanide inhibits ATP synthesis in companion cell mitochondria. Without ATP, the H⁺-ATPase pump cannot function, destroying the proton gradient. Phloem loading halts immediately! This experimental proof confirms loading is an active metabolic process.
              </div>
            </div>
          )}
        </div>

        {/* Source vs Sink Concept & Pressure Difference (5 cols) */}
        <div className="md:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block border-b border-slate-700 pb-2.5">
              Hydrostatic Pressure Differential
            </span>

            <div className="flex items-center justify-between p-4 bg-slate-800/90 rounded-2xl border border-slate-700">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">SOURCE Sieve Tube</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">High Pressure (+1500 kPa)</span>
              </div>
              <ArrowDown className="w-6 h-6 text-purple-400 animate-bounce" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/90 rounded-2xl border border-slate-700">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">SINK Sieve Tube</span>
                <span className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono">Low Pressure (+200 kPa)</span>
              </div>
              <ArrowUp className="w-6 h-6 text-sky-400" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>Mass Flow Law:</strong> The contents of the phloem move in bulk down the hydrostatic pressure gradient from source to sink at speeds of 20 to 100 cm · hour⁻¹.
            </p>
          </div>

          <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-2">
            <div className="font-extrabold text-base text-amber-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              Cambridge Critical Exam Distinction:
            </div>
            <p>
              Candidates frequently lose marks by writing: <em>"Phloem sap moves down a water potential gradient"</em>.
            </p>
            <p className="font-bold text-amber-900 text-sm bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
              CORRECT: Water enters and leaves by osmosis down a <strong>water potential gradient</strong>, but the bulk flow along the sieve tube is driven by a <strong>HYDROSTATIC PRESSURE GRADIENT</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SVG Schematic of Phloem Active Loading & Mass Flow
// ==========================================

interface MassFlowSvgProps {
  step: number;
  atpInhibited: boolean;
  sourceType: string;
  sinkType: string;
}

const MassFlowSvg: React.FC<MassFlowSvgProps> = ({ step, atpInhibited, sourceType, sinkType }) => {
  return (
    <svg viewBox="0 0 660 360" className="w-full max-w-[820px] h-auto select-none">
      <defs>
        <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0,0 L 6,3 L 0,6 Z" fill="#9333ea" />
        </marker>
        <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0,0 L 6,3 L 0,6 Z" fill="#0284c7" />
        </marker>
      </defs>

      {/* Columns:
          Col 1 (Left): Adjacent Xylem Vessel (Water source)
          Col 2 (Middle): Sieve Tube (Source top to Sink bottom)
          Col 3 (Right Top): Companion Cell & Source Cell (Mesophyll)
          Col 4 (Right Bottom): Companion Cell & Sink Cell (Root)
      */}

      {/* 1. ADJACENT XYLEM VESSEL (Left Column) */}
      <rect x="30" y="20" width="80" height="320" rx="4" fill="#fff1f2" stroke="#be123c" strokeWidth="2.5" />
      <rect x="30" y="20" width="10" height="320" fill="#fda4af" />
      <rect x="100" y="20" width="10" height="320" fill="#fda4af" />
      <text x="70" y="15" textAnchor="middle" className="text-[12px] font-sans fill-rose-950 font-extrabold uppercase tracking-wide">
        Xylem Vessel
      </text>
      <line x1="70" y1="300" x2="70" y2="40" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6 3" />

      {/* 2. SIEVE TUBE ELEMENT COLUMN (Center Column) */}
      <rect x="180" y="20" width="130" height="320" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
      
      {/* Sieve Plate in middle */}
      <line x1="180" y1="180" x2="310" y2="180" stroke="#6d28d9" strokeWidth="3.5" strokeDasharray="8 6" />
      <text x="245" y="174" textAnchor="middle" className="text-[11px] font-sans fill-purple-950 font-extrabold">
        Sieve Plate with Pores
      </text>

      {/* Source End (Top of Sieve Tube) */}
      <rect x="185" y="25" width="120" height="70" rx="4" fill="#ede9fe" opacity="0.6" />
      <text x="245" y="45" textAnchor="middle" className="text-[12px] font-sans fill-purple-950 font-extrabold">
        SOURCE REGION
      </text>
      <text x="245" y="62" textAnchor="middle" className="text-[11px] font-mono fill-emerald-800 font-extrabold">
        Ψ = -1800 kPa (Low)
      </text>
      <text x="245" y="78" textAnchor="middle" className="text-[11px] font-mono fill-purple-800 font-extrabold">
        Hydrostatic P = HIGH
      </text>

      {/* Sink End (Bottom of Sieve Tube) */}
      <rect x="185" y="260" width="120" height="70" rx="4" fill="#ede9fe" opacity="0.6" />
      <text x="245" y="280" textAnchor="middle" className="text-[12px] font-sans fill-purple-950 font-extrabold">
        SINK REGION
      </text>
      <text x="245" y="296" textAnchor="middle" className="text-[11px] font-mono fill-rose-800 font-extrabold">
        Ψ = -400 kPa (High)
      </text>
      <text x="245" y="312" textAnchor="middle" className="text-[11px] font-mono fill-purple-800 font-extrabold">
        Hydrostatic P = LOW
      </text>

      {/* Mass Flow Arrow inside Sieve Tube */}
      <line x1="245" y1="90" x2="245" y2="250" stroke="#7c3aed" strokeWidth="4.5" strokeDasharray="8 4" markerEnd="url(#arrowPurple)" />
      <text x="252" y="140" textAnchor="start" className="text-[12px] font-sans fill-purple-950 font-extrabold">
        Mass Flow of Sap
      </text>

      {/* 3. COMPANION CELL (SOURCE) Top Right */}
      <rect x="360" y="30" width="120" height="110" rx="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2.5" />
      <text x="420" y="24" textAnchor="middle" className="text-[12px] font-sans fill-fuchsia-950 font-extrabold uppercase tracking-wide">
        Companion Cell (Source)
      </text>
      {/* Mitochondria */}
      <ellipse cx="390" cy="55" rx="6" ry="10" fill="#ea580c" />
      <ellipse cx="450" cy="55" rx="6" ry="10" fill="#ea580c" />
      <text x="420" y="58" textAnchor="middle" className="text-[10px] font-sans fill-slate-700 font-bold">Mitochondria</text>
      {/* Nucleus */}
      <circle cx="420" cy="95" r="16" fill="#86198f" />
      <circle cx="422" cy="93" r="5" fill="#fbcfe8" />

      {/* Source Cell (Mesophyll) Far Top Right */}
      <rect x="525" y="35" width="115" height="100" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
      <text x="582" y="52" textAnchor="middle" className="text-[12px] font-sans fill-emerald-950 font-extrabold">
        {sourceType === 'leaf' ? 'Leaf Mesophyll' : 'Sprouting Tuber'}
      </text>
      <text x="582" y="70" textAnchor="middle" className="text-[11px] font-sans fill-emerald-800 font-bold">
        Produces Sucrose
      </text>

      {/* 4. COMPANION CELL (SINK) Bottom Right */}
      <rect x="360" y="220" width="120" height="110" rx="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2.5" />
      <text x="420" y="214" textAnchor="middle" className="text-[12px] font-sans fill-fuchsia-950 font-extrabold uppercase tracking-wide">
        Companion Cell (Sink)
      </text>
      <circle cx="420" cy="275" r="16" fill="#86198f" />

      {/* Sink Cell (Root/Fruit) Far Bottom Right */}
      <rect x="525" y="225" width="115" height="100" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
      <text x="582" y="245" textAnchor="middle" className="text-[12px] font-sans fill-amber-950 font-extrabold">
        {sinkType === 'root-tip' ? 'Root Growing Tip' : 'Developing Fruit'}
      </text>
      <text x="582" y="264" textAnchor="middle" className="text-[10px] font-sans fill-amber-800 font-bold">
        Sucrose → Starch / Respired
      </text>

      {/* ========================================== */}
      {/* ACTIVE LOADING APPARATUS & ARROWS */}
      {/* ========================================== */}

      {/* 1. H+-ATPase Proton Pump */}
      <g>
        <circle cx="480" cy="80" r="11" fill={atpInhibited ? '#94a3b8' : '#ef4444'} stroke="#b91c1c" strokeWidth="1.5" />
        <text x="480" y="84" textAnchor="middle" className="text-[10px] font-mono fill-white font-extrabold">H⁺</text>
        {!atpInhibited ? (
          <path d="M 465,75 Q 480,50 495,65" fill="none" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowPurple)" />
        ) : (
          <line x1="472" y1="72" x2="488" y2="88" stroke="#ffffff" strokeWidth="3" />
        )}
      </g>

      {/* 2. H+/Sucrose Cotransporter */}
      <g>
        <rect x="495" y="95" width="18" height="26" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
        <text x="504" y="112" textAnchor="middle" className="text-[9px] font-sans fill-white font-extrabold">Co</text>
        {/* Sucrose entering companion cell */}
        <path d="M 540,115 L 485,115" fill="none" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
        <text x="515" y="132" textAnchor="middle" className="text-[10px] font-sans fill-blue-800 font-extrabold">
          Sucrose + H⁺
        </text>
      </g>

      {/* 3. Plasmodesmata connecting Companion Cell to Sieve Tube */}
      <g>
        <line x1="310" y1="65" x2="360" y2="65" stroke="#a21caf" strokeWidth="7" />
        <line x1="310" y1="95" x2="360" y2="95" stroke="#a21caf" strokeWidth="7" />
        {/* Sucrose diffusion */}
        <line x1="355" y1="80" x2="315" y2="80" stroke="#9333ea" strokeWidth="3" markerEnd="url(#arrowPurple)" />
        <text x="335" y="58" textAnchor="middle" className="text-[10px] font-sans fill-fuchsia-900 font-extrabold">
          Plasmodesmata
        </text>
      </g>

      {/* 4. Water entering by osmosis from Xylem into Sieve Tube at Source */}
      <g>
        <path d="M 110,65 L 175,65" fill="none" stroke="#0284c7" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
        <text x="142" y="56" textAnchor="middle" className="text-[11px] font-sans fill-sky-900 font-extrabold">
          Osmosis (H₂O)
        </text>
      </g>

      {/* 5. Water leaving Sieve Tube back to Xylem at Sink */}
      <g>
        <path d="M 180,295 L 115,295" fill="none" stroke="#0284c7" strokeWidth="3.5" markerEnd="url(#arrowBlue)" />
        <text x="147" y="286" textAnchor="middle" className="text-[11px] font-sans fill-sky-900 font-extrabold">
          Osmosis (H₂O)
        </text>
      </g>

      {/* 6. Sucrose unloading to Sink */}
      <g>
        <line x1="310" y1="285" x2="360" y2="285" stroke="#a21caf" strokeWidth="6" />
        <path d="M 360,285 L 520,285" fill="none" stroke="#9333ea" strokeWidth="3" markerEnd="url(#arrowPurple)" />
        <text x="440" y="276" textAnchor="middle" className="text-[11px] font-sans fill-purple-950 font-extrabold">
          Sucrose Unloading
        </text>
      </g>
    </svg>
  );
};
