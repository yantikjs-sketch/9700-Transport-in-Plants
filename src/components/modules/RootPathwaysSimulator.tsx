import React, { useState } from 'react';
import { ShieldAlert, Route, Play, Pause, Info, Award, CheckCircle2 } from 'lucide-react';

export const RootPathwaysSimulator: React.FC = () => {
  const [activePathway, setActivePathway] = useState<'both' | 'apoplast' | 'symplast' | 'vacuolar'>('both');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showCasparianDetails, setShowCasparianDetails] = useState<boolean>(false);

  const steps = [
    {
      title: 'Step 1: Water & Ion Absorption at Root Hair',
      desc: 'Root hair cell actively pumps in mineral ions using ATP, lowering its water potential (Ψ becomes more negative). Water enters from the soil solution down a water potential gradient by osmosis across the partially permeable cell surface membrane.',
      focus: 'roothair'
    },
    {
      title: 'Step 2: Dual Pathways Across Cortex Parenchyma',
      desc: 'Water travels towards the stele via two primary routes: Apoplast (fast mass flow through cellulose cell wall matrix and air spaces) and Symplast (through cytoplasm connected by plasmodesmata channels).',
      focus: 'cortex'
    },
    {
      title: 'Step 3: The Endodermis & Suberin Casparian Strip',
      desc: 'At the endodermis, radial and transverse cell walls are impregnated with a waterproof band of SUBERIN (the Casparian strip). This completely halts the apoplast pathway, leaving no gaps.',
      focus: 'endodermis'
    },
    {
      title: 'Step 4: Forced Crossing into the Living Symplast',
      desc: 'Because suberin is impermeable to water, all water and dissolved mineral ions are forced into the cytoplasm across the selectively permeable cell surface membrane of endodermal cells.',
      focus: 'symplast-force'
    },
    {
      title: 'Step 5: Selective Entry into Pericycle & Xylem',
      desc: 'Carrier proteins actively pump required mineral ions into xylem vessels, lowering xylem Ψ. Water follows by osmosis through pits into the hollow xylem vessels, ready for transpiration pull.',
      focus: 'xylem'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Syllabus 7.2(b)
              </span>
              <span className="text-sm text-emerald-200/90 font-mono">Endodermis & Selective Solute Regulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Route className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              Root Cortex Pathways & Casparian Strip Simulator
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Visualize how water and dissolved mineral ions journey from soil particles through root hairs, across cortex parenchyma, and how the suberin Casparian strip forces apoplastic water into living protoplasts.
            </p>
          </div>

          {/* Pathway Filter Switch */}
          <div className="flex flex-wrap items-center bg-emerald-950/90 p-2 rounded-2xl border border-emerald-700/50 self-start md:self-auto gap-1.5 shadow-inner">
            {(['both', 'apoplast', 'symplast', 'vacuolar'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setActivePathway(p)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                  activePathway === p
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-emerald-200 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                {p === 'both' ? 'All Routes' : `${p} Pathway`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Diagram & Animation Viewport */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Motion' : 'Resume Water Flow'}
            </button>
            <div className="text-sm text-slate-700 font-semibold">
              Active Display: <span className="font-extrabold text-emerald-700 capitalize text-base">{activePathway} Route</span>
            </div>
          </div>

          <button
            onClick={() => setShowCasparianDetails(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-sm font-extrabold rounded-xl transition-all shadow-xs"
          >
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            Inspect Casparian Suberin Barrier
          </button>
        </div>

        {/* Dynamic Animated Root Cross-Section SVG Canvas */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-slate-50 via-white to-emerald-50/20 flex flex-col items-center justify-center min-h-[460px]">
          <RootCrossSectionSvg
            activePathway={activePathway}
            isPlaying={isPlaying}
            step={currentStep}
          />
        </div>

        {/* Legend Bar */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-rose-500 ring-2 ring-rose-200" />
            <span className="text-slate-800"><strong className="text-rose-700 font-extrabold">Apoplast:</strong> Through cell walls & intercellular spaces (Blocked by Suberin)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
            <span className="text-slate-800"><strong className="text-emerald-700 font-extrabold">Symplast:</strong> Through living cytoplasm via plasmodesmata</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-500 ring-2 ring-amber-200" />
            <span className="text-slate-800"><strong className="text-amber-700 font-extrabold">Casparian Strip:</strong> Suberin waterproof band in endodermis</span>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Walkthrough */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step Selector Pills (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-md border border-slate-200 space-y-3">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
            5-Stage Water Absorption Sequence
          </h4>
          {steps.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-full text-left p-4 rounded-2xl text-sm font-semibold transition-all flex items-start gap-3.5 ${
                currentStep === idx
                  ? 'bg-emerald-600 text-white font-extrabold shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                currentStep === idx ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {idx + 1}
              </span>
              <span className="leading-snug">{st.title}</span>
            </button>
          ))}
        </div>

        {/* Current Stage Explanation & Cambridge Marking Key (8 cols) */}
        <div className="lg:col-span-8 bg-white p-7 sm:p-8 rounded-3xl shadow-md border border-slate-200 space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Stage {currentStep + 1} of 5
            </span>
            <span className="text-xs text-slate-500 font-mono font-semibold">Cambridge 9700 LO 7.2(b)</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{steps[currentStep].title}</h3>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
            {steps[currentStep].desc}
          </p>

          <div className="bg-emerald-50/90 border border-emerald-200 p-5 rounded-2xl text-sm text-emerald-950 space-y-3">
            <div className="font-extrabold text-base flex items-center gap-2 text-emerald-800">
              <Award className="w-5 h-5 text-emerald-600" />
              Essential Mark Scheme Points for this Stage:
            </div>
            <ul className="space-y-2 text-emerald-900/90 pl-1 text-sm sm:text-base leading-relaxed">
              {currentStep === 0 && (
                <>
                  <li>• Active uptake of mineral ions into root hair creates a steeper water potential (Ψ) gradient.</li>
                  <li>• Water moves by <em>osmosis</em> down water potential gradient across partially permeable cell surface membrane.</li>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <li>• Apoplast = movement through cell wall matrix and intercellular spaces by mass flow / cohesion.</li>
                  <li>• Symplast = movement through cytoplasm connected across cells by plasmodesmata.</li>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <li>• Casparian strip consists of <strong>suberin</strong>, an impermeable / waterproof wax-like substance.</li>
                  <li>• Embedded in radial and transverse walls of the endodermal cells.</li>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <li>• Blocks apoplast route, forcing water and dissolved ions into the <strong>symplast (living protoplast)</strong>.</li>
                  <li>• Forces solutes to cross the selectively permeable cell surface membrane via transport proteins.</li>
                </>
              )}
              {currentStep === 4 && (
                <>
                  <li>• Allows selective regulation of mineral ions entering the xylem and prevents toxic ions from entering.</li>
                  <li>• Prevents mineral ions already in the xylem from leaking back into the cortex.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Casparian Strip Deep Dive Modal */}
      {showCasparianDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-7 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
                <h4 className="text-lg font-bold text-slate-900">The Casparian Strip: Chemical Nature & Role</h4>
              </div>
              <button
                onClick={() => setShowCasparianDetails(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
                <div className="font-extrabold text-base text-amber-900">Chemical Composition: Suberin</div>
                <p className="text-amber-950 text-sm leading-relaxed">
                  Suberin is a complex hydrophobic (waterproof) biopolymer made of cross-linked hydroxy fatty acids and phenolics. It impregnates the cellulose microfibrils in the radial and transverse walls of endodermal cells.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-extrabold text-base text-slate-900">Why doesn't water just pass around it?</div>
                <p className="text-sm">
                  Because the Casparian strip forms an uninterrupted, completely continuous ring around every single endodermal cell, there are no gaps between cell walls. Thus, water in the apoplast is physically blocked from reaching the pericycle and xylem through the wall matrix.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-extrabold text-base text-slate-900">Two Vital Biological Roles:</div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Selective Regulation:</strong> Forces all ions across the plasma membrane where specific carrier proteins and ion channels can admit or reject solutes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Backflow Prevention:</strong> Maintains root pressure by preventing accumulated ions inside the xylem from leaking back out into the cortex and soil.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCasparianDetails(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all shadow-md"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SVG Longitudinal Cross-Section of Root Pathways
// ==========================================

interface RootSvgProps {
  activePathway: 'both' | 'apoplast' | 'symplast' | 'vacuolar';
  isPlaying: boolean;
  step: number;
}

const RootCrossSectionSvg: React.FC<RootSvgProps> = ({ activePathway, isPlaying, step }) => {
  return (
    <svg viewBox="0 0 680 320" className="w-full max-w-[840px] h-auto select-none">
      <defs>
        {/* Animated Water Particle Markers */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Section Zones */}
      {/* Soil Solution Zone */}
      <rect x="0" y="0" width="100" height="320" fill="#f5f5f4" />
      <text x="50" y="26" textAnchor="middle" className="text-[13px] font-sans fill-stone-700 font-extrabold uppercase tracking-wider">
        Soil Water
      </text>

      {/* Soil particles */}
      <circle cx="25" cy="80" r="14" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
      <circle cx="75" cy="130" r="18" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
      <circle cx="35" cy="220" r="16" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
      <circle cx="70" cy="275" r="12" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />

      {/* Root Hair Cell (Epidermis) */}
      <g>
        {/* Hair projection */}
        <path
          d="M 100,120 L 40,140 Q 25,160 40,180 L 100,200 L 160,200 L 160,120 Z"
          fill="#f0fdf4"
          stroke="#16a34a"
          strokeWidth="3.5"
        />
        {/* Cellulose Cell Wall */}
        <path
          d="M 100,116 L 36,137 Q 19,160 36,183 L 100,204 L 164,204 L 164,116 Z"
          fill="none"
          stroke="#86efac"
          strokeWidth="4"
        />
        {/* Nucleus */}
        <circle cx="125" cy="160" r="14" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
        <text x="100" y="306" textAnchor="middle" className="text-[12px] font-sans fill-emerald-900 font-extrabold">
          Root Hair Cell
        </text>
      </g>

      {/* Cortex Parenchyma Cells (Two columns of cells) */}
      {/* Cortex Cell 1 (Upper) */}
      <rect x="180" y="40" width="100" height="110" rx="16" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
      <rect x="176" y="36" width="108" height="118" rx="18" fill="none" stroke="#cbd5e1" strokeWidth="4" />
      {/* Vacuole */}
      <rect x="200" y="60" width="60" height="70" rx="10" fill="#e0f2fe" opacity="0.6" />

      {/* Cortex Cell 2 (Middle) */}
      <rect x="180" y="165" width="100" height="110" rx="16" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
      <rect x="176" y="161" width="108" height="118" rx="18" fill="none" stroke="#cbd5e1" strokeWidth="4" />
      {/* Vacuole */}
      <rect x="200" y="185" width="60" height="70" rx="10" fill="#e0f2fe" opacity="0.6" />

      {/* Cortex Cell 3 (Right Column Upper) */}
      <rect x="300" y="40" width="100" height="110" rx="16" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
      <rect x="296" y="36" width="108" height="118" rx="18" fill="none" stroke="#cbd5e1" strokeWidth="4" />
      <rect x="320" y="60" width="60" height="70" rx="10" fill="#e0f2fe" opacity="0.6" />

      {/* Cortex Cell 4 (Right Column Lower) */}
      <rect x="300" y="165" width="100" height="110" rx="16" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
      <rect x="296" y="161" width="108" height="118" rx="18" fill="none" stroke="#cbd5e1" strokeWidth="4" />
      <rect x="320" y="185" width="60" height="70" rx="10" fill="#e0f2fe" opacity="0.6" />

      {/* Plasmodesmata channels connecting cells */}
      <line x1="160" y1="160" x2="180" y2="160" stroke="#059669" strokeWidth="5" />
      <line x1="280" y1="220" x2="300" y2="220" stroke="#059669" strokeWidth="5" />
      <line x1="230" y1="150" x2="230" y2="165" stroke="#059669" strokeWidth="5" />
      <line x1="350" y1="150" x2="350" y2="165" stroke="#059669" strokeWidth="5" />

      <text x="290" y="26" textAnchor="middle" className="text-[13px] font-sans fill-slate-800 font-extrabold uppercase tracking-wide">
        Cortex Parenchyma
      </text>

      {/* Endodermis Layer with Casparian Strip */}
      <g>
        {/* Endodermal Cell 1 (Upper) */}
        <rect x="420" y="40" width="85" height="110" rx="12" fill="#fff7ed" stroke="#c2410c" strokeWidth="3" />
        {/* Endodermal Cell 2 (Lower) */}
        <rect x="420" y="165" width="85" height="110" rx="12" fill="#fff7ed" stroke="#c2410c" strokeWidth="3" />

        {/* CASPARIAN STRIP BANDS (Suberin) in Radial and Transverse Walls */}
        {/* Upper cell strip */}
        <rect x="450" y="32" width="25" height="18" rx="3" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
        <rect x="450" y="142" width="25" height="18" rx="3" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
        {/* Lower cell strip */}
        <rect x="450" y="267" width="25" height="18" rx="3" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />

        <text x="462" y="26" textAnchor="middle" className="text-[13px] font-sans fill-orange-900 font-extrabold uppercase tracking-wide">
          Endodermis
        </text>
        <text x="462" y="306" textAnchor="middle" className="text-[12px] font-sans fill-orange-800 font-extrabold">
          Casparian Strip (Suberin)
        </text>
      </g>

      {/* Pericycle Layer */}
      <rect x="520" y="40" width="35" height="235" rx="6" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2.5" />
      <text x="537" y="26" textAnchor="middle" className="text-[12px] font-sans fill-teal-800 font-extrabold uppercase">
        Pericycle
      </text>

      {/* Xylem Vessel Element (Hollow tube on right) */}
      <rect x="575" y="20" width="80" height="275" rx="6" fill="#fff1f2" stroke="#be123c" strokeWidth="3.5" />
      {/* Pits in xylem wall */}
      <ellipse cx="575" cy="100" rx="4" ry="8" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
      <ellipse cx="575" cy="200" rx="4" ry="8" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
      
      {/* Annular lignin bands */}
      <path d="M 575,60 Q 615,70 655,60" fill="none" stroke="#be123c" strokeWidth="3" />
      <path d="M 575,150 Q 615,160 655,150" fill="none" stroke="#be123c" strokeWidth="3" />
      <path d="M 575,240 Q 615,250 655,240" fill="none" stroke="#be123c" strokeWidth="3" />

      {/* Transpiration stream arrow inside xylem */}
      <line x1="615" y1="260" x2="615" y2="40" stroke="#0284c7" strokeWidth="3.5" strokeDasharray="6 4" />
      <polygon points="610,42 615,30 620,42" fill="#0284c7" />

      <text x="615" y="16" textAnchor="middle" className="text-[13px] font-sans fill-rose-950 font-extrabold uppercase tracking-wide">
        Xylem Vessel
      </text>

      {/* ========================================== */}
      {/* PATHWAY TRACES */}
      {/* ========================================== */}

      {/* 1. APOPLAST PATHWAY (Red/Rose Line along cell walls) */}
      {(activePathway === 'both' || activePathway === 'apoplast') && (
        <g>
          {/* Path along root hair wall, across cortex walls, up to Casparian strip */}
          <path
            d="M 60,136 L 100,116 L 176,116 L 296,116 L 420,116 L 450,142"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="4"
            strokeDasharray={isPlaying ? '6 4' : 'none'}
            className="transition-all"
          />
          {/* BLOCKED SIGN AT CASPARIAN STRIP */}
          <circle cx="452" cy="144" r="9" fill="#dc2626" />
          <line x1="446" y1="138" x2="458" y2="150" stroke="#ffffff" strokeWidth="3" />
          <line x1="458" y1="138" x2="446" y2="150" stroke="#ffffff" strokeWidth="3" />

          {/* Forced redirection into cytoplasm arrow */}
          <path
            d="M 440,120 Q 435,90 460,90 L 520,90"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
            strokeDasharray="4 2"
            markerEnd="url(#arrow)"
          />
          <text x="445" y="168" textAnchor="middle" className="text-[11px] font-mono fill-rose-800 font-extrabold">
            BLOCKED!
          </text>
        </g>
      )}

      {/* 2. SYMPLAST PATHWAY (Emerald Line through Cytoplasm & Plasmodesmata) */}
      {(activePathway === 'both' || activePathway === 'symplast') && (
        <g>
          <path
            d="M 70,160 L 140,160 L 170,160 L 230,160 L 230,220 L 290,220 L 350,220 L 420,220 L 460,220 L 537,200 L 575,200"
            fill="none"
            stroke="#059669"
            strokeWidth="4"
            strokeDasharray={isPlaying ? '8 4' : 'none'}
            className="transition-all"
          />
          {/* Animated Water Droplet along Symplast */}
          <circle cx="350" cy="220" r="5" fill="#10b981" filter="url(#glow)" />
          <circle cx="460" cy="220" r="5" fill="#10b981" filter="url(#glow)" />
        </g>
      )}

      {/* 3. VACUOLAR PATHWAY (Sky Blue Line across vacuoles) */}
      {(activePathway === 'both' || activePathway === 'vacuolar') && (
        <g>
          <path
            d="M 70,160 L 125,160 L 230,100 L 350,100 L 460,95 L 537,95 L 575,100"
            fill="none"
            stroke="#0284c7"
            strokeWidth="3"
            strokeDasharray="5 4"
            opacity="0.9"
          />
        </g>
      )}
    </svg>
  );
};
