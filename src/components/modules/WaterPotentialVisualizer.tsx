import React, { useState } from 'react';
import { Droplet, HelpCircle, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WaterPotentialVisualizer: React.FC = () => {
  // Cell parameters
  const [cellPsiS, setCellPsiS] = useState<number>(-700); // kPa (Solute potential, negative)
  const [extPsi, setExtPsi] = useState<number>(-300); // kPa (External solution water potential)

  // Calculations:
  // Water moves down Ψ gradient.
  // If extPsi > cellPsiS: water enters until PsiCell = extPsi, meaning PsiP = extPsi - cellPsiS (> 0, turgid)
  // If extPsi == cellPsiS: incipient plasmolysis, PsiP = 0
  // If extPsi < cellPsiS: water exits, protoplast shrinks, PsiP = 0, PsiCell = cellPsiS (plasmolysed)
  let cellPsiP = 0;
  let cellPsi = cellPsiS;
  let cellState: 'turgid' | 'incipient' | 'plasmolysed' = 'turgid';
  let protoplastScale = 1.0;

  if (extPsi > cellPsiS) {
    // Water enters, develops turgor pressure
    cellPsiP = Math.min(800, extPsi - cellPsiS);
    cellPsi = cellPsiS + cellPsiP;
    cellState = cellPsiP > 50 ? 'turgid' : 'incipient';
    protoplastScale = 0.98; // touching wall
  } else if (extPsi === cellPsiS) {
    cellPsiP = 0;
    cellPsi = cellPsiS;
    cellState = 'incipient';
    protoplastScale = 0.94; // just touching
  } else {
    // Hypertonic: water leaves, plasmolysis
    cellPsiP = 0;
    cellPsi = cellPsiS;
    cellState = 'plasmolysed';
    const deficit = Math.abs(extPsi - cellPsiS);
    protoplastScale = Math.max(0.65, 0.92 - (deficit / 1000) * 0.3);
  }

  const netWaterDirection =
    extPsi > cellPsiS + cellPsiP
      ? 'into-cell'
      : extPsi < cellPsiS + cellPsiP
      ? 'out-of-cell'
      : 'equilibrium';

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-cyan-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                Syllabus 7.2(a)
              </span>
              <span className="text-sm text-cyan-200/90 font-mono">Formula: Ψ = Ψs + Ψp</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Droplet className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              Water Potential & Plant Cell Osmosis Visualizer
            </h2>
            <p className="text-cyan-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Understand the equilibrium between Solute Potential (Ψs) and Turgor Pressure Potential (Ψp). Observe how plant cells respond to hypotonic, isotonic, and hypertonic media.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 bg-blue-950/90 p-2 rounded-2xl border border-blue-700/50 self-start md:self-auto shadow-inner">
            <button
              onClick={() => {
                setCellPsiS(-700);
                setExtPsi(0); // pure water
              }}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-800/80 hover:bg-blue-700 text-white transition-all shadow-xs"
            >
              Pure Water (Turgid)
            </button>
            <button
              onClick={() => {
                setCellPsiS(-600);
                setExtPsi(-600);
              }}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-800/80 hover:bg-blue-700 text-white transition-all shadow-xs"
            >
              Incipient Plasmolysis
            </button>
            <button
              onClick={() => {
                setCellPsiS(-500);
                setExtPsi(-1000);
              }}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-800/80 hover:bg-blue-700 text-white transition-all shadow-xs"
            >
              Hypertonic (Plasmolysed)
            </button>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Plant Cell Graphic (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Plant Cell in Solution</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                Cell State:{' '}
                <strong className={`font-mono text-sm font-extrabold ${
                  cellState === 'turgid'
                    ? 'text-emerald-700'
                    : cellState === 'incipient'
                    ? 'text-amber-700'
                    : 'text-rose-700'
                }`}>
                  {cellState === 'turgid'
                    ? `Fully Turgid (Protoplast presses firmly on wall, Ψp = +${cellPsiP} kPa)`
                    : cellState === 'incipient'
                    ? 'Incipient Plasmolysis (Protoplast just touches wall, Ψp = 0 kPa)'
                    : 'Plasmolysed (Protoplast retracted from wall, Ψp = 0 kPa)'}
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold font-mono border shadow-xs ${
                cellState === 'turgid'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : cellState === 'incipient'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-rose-100 text-rose-900 border-rose-300'
              }`}>
                {cellState === 'turgid' && `Fully Turgid (Ψp = +${cellPsiP} kPa)`}
                {cellState === 'incipient' && 'Incipient Plasmolysis (Ψp = 0 kPa)'}
                {cellState === 'plasmolysed' && 'Plasmolysed (Ψp = 0 kPa)'}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 bg-gradient-to-b from-sky-50/40 via-white to-blue-50/30 flex flex-col items-center justify-center min-h-[460px]">
            <CellOsmosisSvg
              scale={protoplastScale}
              state={cellState}
              cellPsiS={cellPsiS}
              cellPsiP={cellPsiP}
              extPsi={extPsi}
            />
          </div>

          {/* Telemetry Bar */}
          <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-around gap-4 text-sm font-mono">
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase font-bold block mb-1">External Solution Ψ</span>
              <span className="text-base sm:text-lg font-extrabold text-blue-800">{extPsi} kPa</span>
            </div>
            <div className="text-slate-400 font-bold text-lg">vs</div>
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Cell Solute Ψs</span>
              <span className="text-base sm:text-lg font-extrabold text-slate-800">{cellPsiS} kPa</span>
            </div>
            <div className="text-slate-400 font-bold text-lg">+</div>
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Pressure Potential Ψp</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-600">+{cellPsiP} kPa</span>
            </div>
            <div className="text-slate-400 font-bold text-lg">=</div>
            <div className="text-center">
              <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Net Cell Ψ</span>
              <span className="text-base sm:text-lg font-extrabold text-purple-700">{cellPsi} kPa</span>
            </div>
          </div>
        </div>

        {/* Sliders & Formula Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Formula Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 block border-b border-slate-700 pb-2.5">
              Cambridge 9700 Water Potential Equation
            </span>
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 font-mono text-center shadow-inner">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">Ψ = Ψs + Ψp</div>
              <div className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 font-semibold">
                Water Potential = Solute Potential + Pressure Potential
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
              <p>• <strong>Pure Water:</strong> Has Ψ = 0 kPa (the highest possible water potential).</p>
              <p>• <strong>Dissolving Solute:</strong> Solutes attract water molecules, reducing their free kinetic energy. Therefore, Ψs is <em>always negative</em> (or 0).</p>
              <p>• <strong>Turgor Pressure:</strong> As water enters, protoplast swells and presses on rigid cell wall; wall pushes back with equal positive pressure (Ψp).</p>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 space-y-5">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Adjust Solution Parameters
            </h4>

            {/* External Solution Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800">External Solution Ψ (kPa)</span>
                <span className="font-mono text-blue-600 font-extrabold text-base">{extPsi} kPa</span>
              </div>
              <input
                type="range"
                min="-1200"
                max="0"
                step="50"
                value={extPsi}
                onChange={(e) => setExtPsi(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2"
              />
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>-1200 kPa (Concentrated Solute)</span>
                <span>0 kPa (Pure Water)</span>
              </div>
            </div>

            {/* Cell Solute Potential Slider */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800">Cell Cytoplasm Solute Potential Ψs (kPa)</span>
                <span className="font-mono text-purple-600 font-extrabold text-base">{cellPsiS} kPa</span>
              </div>
              <input
                type="range"
                min="-1000"
                max="-200"
                step="50"
                value={cellPsiS}
                onChange={(e) => setCellPsiS(parseInt(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-2"
              />
            </div>
          </div>

          {/* Incipient Plasmolysis Examiner Alert */}
          <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-3xl text-sm text-amber-950 space-y-2">
            <div className="font-extrabold text-base text-amber-800 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              What is Incipient Plasmolysis?
            </div>
            <p className="leading-relaxed">
              Incipient plasmolysis is the exact point at which the protoplast no longer exerts pressure against the cell wall.
            </p>
            <p className="font-mono font-extrabold text-amber-900 bg-amber-100/70 p-2 rounded-xl text-center text-sm border border-amber-200">
              At incipient plasmolysis: Ψp = 0 kPa, so Ψcell = Ψs.
            </p>
            <p className="text-xs text-amber-900/90 font-medium">
              In plant tissue strips (e.g. potato cylinders), incipient plasmolysis corresponds to 50% of cells being plasmolysed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SVG Diagram of Single Plant Cell Under Osmosis
// ==========================================

interface CellSvgProps {
  scale: number;
  state: 'turgid' | 'incipient' | 'plasmolysed';
  cellPsiS: number;
  cellPsiP: number;
  extPsi: number;
}

const CellOsmosisSvg: React.FC<CellSvgProps> = ({ scale, state, cellPsiS, cellPsiP, extPsi }) => {
  const netCellPsi = cellPsiS + cellPsiP;

  return (
    <svg viewBox="0 0 540 330" className="w-full max-w-[620px] h-auto select-none drop-shadow-sm">
      <defs>
        {/* Outward Turgor Pressure Arrowhead */}
        <marker
          id="turgorArrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#15803d" />
        </marker>

        {/* Inward Water Diffusion Arrowhead */}
        <marker
          id="waterArrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
        </marker>
      </defs>

      {/* External Solution Beaker Background */}
      <rect x="15" y="15" width="510" height="300" rx="20" fill="#f0f9ff" opacity="0.6" stroke="#bae6fd" strokeWidth="2" />

      {/* Top Banner inside Beaker */}
      <g id="top-beaker-labels">
        {/* Left: External Solution Info */}
        <rect x="25" y="24" width="220" height="24" rx="6" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
        <text x="35" y="40" className="text-[11px] font-sans fill-blue-900 font-extrabold">
          External Medium: Ψ = {extPsi} kPa
        </text>

        {/* Right: State indicator badge */}
        <rect
          x="285"
          y="24"
          width="230"
          height="24"
          rx="6"
          fill={state === 'turgid' ? '#dcfce7' : state === 'incipient' ? '#fef3c7' : '#fee2e2'}
          stroke={state === 'turgid' ? '#86efac' : state === 'incipient' ? '#fde047' : '#fca5a5'}
          strokeWidth="1"
        />
        <text
          x="400"
          y="40"
          textAnchor="middle"
          className={`text-[11px] font-sans font-extrabold ${
            state === 'turgid' ? 'fill-emerald-950' : state === 'incipient' ? 'fill-amber-950' : 'fill-rose-950'
          }`}
        >
          {state === 'turgid'
            ? `Turgid State (Ψp = +${cellPsiP} kPa)`
            : state === 'incipient'
            ? 'Incipient Plasmolysis (Ψp = 0 kPa)'
            : 'Plasmolysed State (Ψp = 0 kPa)'}
        </text>
      </g>

      {/* Rigid Cellulose Cell Wall (Fixed boundaries: X=85 to 435, Y=60 to 240) */}
      <rect x="85" y="60" width="350" height="180" rx="16" fill="#f8fafc" stroke="#15803d" strokeWidth="9" />
      
      {/* Cell Wall Label Badge at Top */}
      <rect x="135" y="52" width="250" height="18" rx="4" fill="#ffffff" stroke="#15803d" strokeWidth="1" />
      <text x="260" y="65" textAnchor="middle" className="text-[10px] font-sans fill-emerald-950 font-extrabold">
        Rigid Cellulose Cell Wall (Freely Permeable)
      </text>

      {/* If Plasmolysed: Callout indicating external solution filling the gap */}
      {state === 'plasmolysed' && (
        <text x="155" y="86" textAnchor="middle" className="text-[10px] font-sans fill-sky-800 font-bold bg-white">
          External solution fills gap
        </text>
      )}

      {/* Selectively Permeable Plasma Membrane & Protoplast (Scales dynamically) */}
      <g transform={`translate(260, 150) scale(${scale}) translate(-260, -150)`} className="transition-all duration-300">
        {/* Cytoplasm Background */}
        <rect
          x="94"
          y="69"
          width="332"
          height="162"
          rx="12"
          fill={state === 'turgid' ? '#dcfce7' : state === 'incipient' ? '#fef9c3' : '#fee2e2'}
          stroke="#059669"
          strokeWidth="3.5"
        />

        {/* Large Central Cell Sap Vacuole */}
        <ellipse cx="260" cy="150" rx="100" ry="52" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
        <text x="260" y="145" textAnchor="middle" className="text-[13px] font-sans fill-slate-900 font-extrabold">
          Cell Sap Vacuole
        </text>
        <text x="260" y="165" textAnchor="middle" className="text-[12px] font-mono fill-blue-950 font-extrabold">
          Solute Potential Ψs = {cellPsiS} kPa
        </text>

        {/* Nucleus */}
        <circle cx="145" cy="115" r="15" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
        <circle cx="147" cy="113" r="4.5" fill="#ffffff" />
        <text x="145" y="138" textAnchor="middle" className="text-[9px] font-sans fill-purple-950 font-bold">
          Nucleus
        </text>

        {/* Chloroplasts */}
        <ellipse cx="370" cy="105" rx="13" ry="7" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        <ellipse cx="375" cy="180" rx="13" ry="7" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
        <ellipse cx="145" cy="185" rx="13" ry="7" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
      </g>

      {/* Plasma Membrane Label with Leader Line */}
      <line x1="94" y1="150" x2="45" y2="150" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="25" y="138" width="55" height="24" rx="4" fill="#ffffff" stroke="#059669" strokeWidth="1" />
      <text x="52" y="148" textAnchor="middle" className="text-[9px] font-sans fill-emerald-950 font-bold">
        Plasma
      </text>
      <text x="52" y="158" textAnchor="middle" className="text-[9px] font-sans fill-emerald-950 font-bold">
        Membrane
      </text>

      {/* Turgor Pressure Representation when Cell is Turgid (cellPsiP > 0) */}
      {cellPsiP > 0 && (
        <g id="turgor-pressure-indicators">
          {/* Outward Force Arrows pushing from Protoplast against Cell Wall */}
          <path d="M 260,82 L 260,66" stroke="#15803d" strokeWidth="3" markerEnd="url(#turgorArrow)" />
          <path d="M 260,218 L 260,234" stroke="#15803d" strokeWidth="3" markerEnd="url(#turgorArrow)" />
          <path d="M 112,150 L 92,150" stroke="#15803d" strokeWidth="3" markerEnd="url(#turgorArrow)" />
          <path d="M 408,150 L 428,150" stroke="#15803d" strokeWidth="3" markerEnd="url(#turgorArrow)" />

          {/* Prominent Turgor Label Badge below Cell */}
          <rect x="70" y="252" width="380" height="28" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <text x="260" y="271" textAnchor="middle" className="text-[12px] font-sans fill-emerald-950 font-extrabold">
            Turgor Pressure (Pressure Potential Ψp = +{cellPsiP} kPa) pressing on wall
          </text>

          {/* Secondary Subtitle clarifying equilibrium and wall pressure */}
          <text x="260" y="296" textAnchor="middle" className="text-[10px] font-sans fill-slate-700 font-semibold">
            Rigid wall exerts equal inward pressure • Cell Ψ = Ψs + Ψp = {netCellPsi} kPa (Resists cell bursting)
          </text>
        </g>
      )}

      {/* Incipient Plasmolysis Label when cellPsiP == 0 and not plasmolysed */}
      {state === 'incipient' && (
        <g id="incipient-labels">
          <rect x="80" y="255" width="360" height="28" rx="8" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
          <text x="260" y="274" textAnchor="middle" className="text-[12px] font-sans fill-amber-950 font-extrabold">
            Incipient Plasmolysis: Pressure Potential Ψp = 0 kPa (Cell is flaccid)
          </text>
          <text x="260" y="296" textAnchor="middle" className="text-[10px] font-sans fill-slate-700 font-semibold">
            Protoplast just touches the wall without exerting pressure • Cell Ψ = Ψs = {cellPsiS} kPa
          </text>
        </g>
      )}

      {/* Plasmolysed State Label */}
      {state === 'plasmolysed' && (
        <g id="plasmolysed-labels">
          <rect x="80" y="255" width="360" height="28" rx="8" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="260" y="274" textAnchor="middle" className="text-[12px] font-sans fill-rose-950 font-extrabold">
            Plasmolysed Cell: Protoplast pulled completely away from cell wall (Ψp = 0 kPa)
          </text>
          <text x="260" y="296" textAnchor="middle" className="text-[10px] font-sans fill-slate-700 font-semibold">
            External hypertonic solution permeates cell wall into gap • Cell Ψ = Ψs = {cellPsiS} kPa
          </text>
        </g>
      )}
    </svg>
  );
};
