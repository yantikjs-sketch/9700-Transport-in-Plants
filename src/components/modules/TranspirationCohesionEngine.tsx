import React, { useState } from 'react';
import { Wind, Sun, Droplets, Activity, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const TranspirationCohesionEngine: React.FC = () => {
  const [stomatalAperture, setStomatalAperture] = useState<number>(75); // 0 (closed) to 100 (wide open)
  const [temperature, setTemperature] = useState<number>(24); // °C
  const [atmosphericHumidity, setAtmosphericHumidity] = useState<number>(40); // %
  const [isCavitated, setIsCavitated] = useState<boolean>(false);
  const [showBondZoom, setShowBondZoom] = useState<boolean>(false);

  // Transpiration Rate calculation
  // Evaporation proportional to temp, aperture, and gradient = (100 - humidity)
  const vapourGradient = Math.max(5, 100 - atmosphericHumidity);
  const rawRate = isCavitated
    ? 0
    : (stomatalAperture / 100) * (vapourGradient / 60) * (0.6 + (temperature - 10) * 0.04);
  const transpirationRate = Math.max(0, Math.min(2.5, rawRate));

  // Hydrostatic pressure / tension (negative kPa)
  const xylemTensionKPa = isCavitated ? 0 : Math.round(-150 - transpirationRate * 600);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-sky-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-sky-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-400/20 text-sky-300 border border-sky-400/30">
                Syllabus 7.2(c)
              </span>
              <span className="text-sm text-sky-200/90 font-mono">Cohesion-Tension Theory & Transpiration Pull</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-sky-400 flex-shrink-0" />
              Cohesion-Tension & Transpiration Stream Engine
            </h2>
            <p className="text-sky-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Observe how evaporation from spongy mesophyll cell walls generates negative hydrostatic pressure (tension), pulling a continuous column of cohesive water molecules up the xylem against gravity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBondZoom(!showBondZoom)}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-sky-800/90 hover:bg-sky-700 text-white text-sm font-extrabold rounded-2xl border border-sky-400/40 transition-all shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-sky-300" />
              {showBondZoom ? 'Hide H-Bond Zoom' : 'Zoom into Hydrogen Bonds'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive SVG Leaf-to-Xylem Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Transpiration & Cohesion Column</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">From leaf mesophyll air spaces down the lignified xylem vessel</p>
            </div>
            <div className="flex items-center gap-2">
              {isCavitated ? (
                <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-rose-100 text-rose-800 flex items-center gap-1.5 border border-rose-300 shadow-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600" /> Cavitation Airlock!
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1.5 border border-emerald-300 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Continuous Water Column
                </span>
              )}
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="p-6 sm:p-10 bg-gradient-to-b from-sky-50/30 via-white to-slate-50 flex flex-col items-center justify-center min-h-[460px]">
            <TranspirationStreamSvg
              aperture={stomatalAperture}
              rate={transpirationRate}
              isCavitated={isCavitated}
            />
          </div>

          {/* Action Toolbar */}
          <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setIsCavitated(!isCavitated)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-extrabold transition-all shadow-md ${
                isCavitated
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              {isCavitated ? 'Repair Airlock (Restore Column)' : 'Simulate Air Bubble Break (Cavitation)'}
            </button>

            <span className="text-xs sm:text-sm font-semibold text-slate-600">
              {isCavitated ? 'Water column broken: tension lost, flow stops' : 'Tension transmitted intact to roots'}
            </span>
          </div>
        </div>

        {/* Physical Variables & Readouts (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Real-time Tension and Gradient Telemetry */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block border-b border-slate-700 pb-2.5">
              Biophysical Forces in Xylem Stream
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1 font-semibold">Xylem Hydrostatic Pressure</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 block">
                  {xylemTensionKPa} kPa
                </span>
                <span className="text-xs text-slate-400 block mt-1 font-sans">(Negative Tension)</span>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1 font-semibold">Transpiration Pull Intensity</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-300 block">
                  {(transpirationRate * 4).toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 block mt-1 font-sans">Arbitrary Units</span>
              </div>
            </div>

            <div className="bg-sky-950/70 p-4 rounded-2xl border border-sky-800/60 text-xs sm:text-sm text-sky-100 leading-relaxed">
              <span className="font-extrabold text-sky-300">Why doesn't xylem collapse? </span>
              Lignin deposited in spiral or annular patterns provides immense tensile strength, preventing inward collapse under high negative tension.
            </div>
          </div>

          {/* Interactive Environment Controls */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 space-y-5">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Control Leaf Microclimate & Aperture
            </h4>

            {/* Stomatal Aperture */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  Stomatal Pore Aperture (% Open)
                </span>
                <span className="font-mono text-amber-600 font-extrabold text-base">{stomatalAperture}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={stomatalAperture}
                onChange={(e) => setStomatalAperture(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2"
              />
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span>0% (Closed / Night)</span>
                <span>100% (Fully Open / Daylight)</span>
              </div>
            </div>

            {/* Atmospheric Humidity */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-500" />
                  Atmospheric Humidity (% RH)
                </span>
                <span className="font-mono text-sky-600 font-extrabold text-base">{atmosphericHumidity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={atmosphericHumidity}
                onChange={(e) => setAtmosphericHumidity(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-2"
              />
              <p className="text-xs text-slate-500 font-semibold">
                Water Vapour Gradient: <strong className="text-sky-700">{vapourGradient}%</strong> (Inside leaf air space is 100% saturated).
              </p>
            </div>

            {/* Temperature */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-rose-500" />
                  Ambient Temperature (°C)
                </span>
                <span className="font-mono text-rose-600 font-extrabold text-base">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="38"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Molecular Zoom: Hydrogen Bonding (Cohesion & Adhesion) */}
      {showBondZoom && (
        <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-8 border border-slate-700 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <h4 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2.5">
              <Droplets className="w-6 h-6 text-sky-400" />
              Sub-Microscopic View: Hydrogen Bonding in Cohesion vs Adhesion
            </h4>
            <button
              onClick={() => setShowBondZoom(false)}
              className="text-slate-400 hover:text-white text-base font-bold px-3 py-1 bg-slate-800 rounded-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Molecular SVG Diagram */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex justify-center">
              <MolecularBondsSvg />
            </div>

            {/* Cambridge 9700 Definitions Breakdown */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1.5">
                <div className="font-extrabold text-emerald-400 text-base">1. Cohesion (Water-to-Water)</div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Water is a dipolar molecule: oxygen carries a partial negative charge (δ⁻) and each hydrogen carries a partial positive charge (δ⁺). Neighboring water molecules form <strong>hydrogen bonds</strong> with one another, allowing the water column to withstand immense tensile stress without snapping.
                </p>
              </div>

              <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1.5">
                <div className="font-extrabold text-sky-400 text-base">2. Adhesion (Water-to-Xylem Wall)</div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Water molecules form hydrogen bonds with hydrophilic cellulose microfibrils and unlignified components of the xylem vessel wall. This supports the weight of the water column and prevents it from falling back down due to gravity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SVG Diagram of Leaf-to-Xylem Transpiration Stream
// ==========================================

interface StreamSvgProps {
  aperture: number;
  rate: number;
  isCavitated: boolean;
}

const TranspirationStreamSvg: React.FC<StreamSvgProps> = ({ aperture, rate, isCavitated }) => {
  const poreWidth = (aperture / 100) * 22;

  return (
    <svg viewBox="0 0 520 360" className="w-full max-w-[640px] h-auto select-none">
      <defs>
        <radialGradient id="waterVapourGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mesophyll Layer & Sub-stomatal air space */}
      {/* Spongy mesophyll cells */}
      <ellipse cx="70" cy="50" rx="35" ry="25" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
      <ellipse cx="140" cy="65" rx="30" ry="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
      <ellipse cx="80" cy="115" rx="32" ry="24" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />

      {/* Wet film of water on spongy mesophyll cell walls */}
      <ellipse cx="70" cy="50" rx="38" ry="28" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
      <ellipse cx="140" cy="65" rx="33" ry="25" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
      <ellipse cx="80" cy="115" rx="35" ry="27" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />

      {/* Evaporating Water Vapour Molecules into Sub-Stomatal Air Space */}
      {rate > 0 && (
        <g fill="#0284c7" opacity="0.8">
          <circle cx="115" cy="95" r="3.5" />
          <circle cx="145" cy="115" r="3.5" />
          <circle cx="120" cy="140" r="4" />
          <circle cx="160" cy="145" r="4" />
        </g>
      )}

      {/* Sub-Stomatal Chamber label */}
      <text x="145" y="98" textAnchor="middle" className="text-[12px] font-sans fill-slate-700 font-extrabold">
        Sub-Stomatal Air Space
      </text>

      {/* Lower Epidermis & Guard Cells */}
      <rect x="20" y="175" width="100" height="22" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
      <rect x="180" y="175" width="100" height="22" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />

      {/* Guard Cells flanking the stomatal pore */}
      <ellipse cx={130 - poreWidth / 2} cy="186" rx="11" ry="15" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />
      <ellipse cx={170 + poreWidth / 2} cy="186" rx="11" ry="15" fill="#86efac" stroke="#15803d" strokeWidth="2.5" />

      {/* Stomatal pore diffusion stream down to atmosphere */}
      {rate > 0 && poreWidth > 2 && (
        <g fill="#0284c7" opacity="0.75">
          <circle cx="150" cy="205" r="3.5" />
          <circle cx="145" cy="225" r="4" />
          <circle cx="155" cy="245" r="4.5" />
          <line x1="150" y1="190" x2="150" y2="255" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
        </g>
      )}

      <text x="150" y="275" textAnchor="middle" className="text-[13px] font-sans fill-sky-950 font-extrabold">
        Diffusion of Water Vapour into Atmosphere
      </text>

      {/* Lignified Xylem Vessel on the Right running top to bottom */}
      <g>
        <rect x="320" y="20" width="130" height="320" rx="4" fill="#fff1f2" stroke="#be123c" strokeWidth="3.5" />
        
        {/* Lignified secondary wall bands */}
        <rect x="320" y="20" width="16" height="320" fill="#fda4af" />
        <rect x="434" y="20" width="16" height="320" fill="#fda4af" />

        {/* Annular rings */}
        <path d="M 336,70 Q 385,85 434,70" fill="none" stroke="#be123c" strokeWidth="3.5" />
        <path d="M 336,150 Q 385,165 434,150" fill="none" stroke="#be123c" strokeWidth="3.5" />
        <path d="M 336,230 Q 385,245 434,230" fill="none" stroke="#be123c" strokeWidth="3.5" />
        <path d="M 336,310 Q 385,325 434,310" fill="none" stroke="#be123c" strokeWidth="3.5" />

        {/* Water Column inside Xylem (Cohesion chain) */}
        {!isCavitated ? (
          <g>
            {[50, 90, 130, 170, 210, 250, 290].map((y, idx) => (
              <g key={idx}>
                {/* Linked water molecules */}
                <circle cx="385" cy={y} r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="368" cy={y + 16} r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="402" cy={y + 16} r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                {/* Hydrogen bond linkages */}
                <line x1="385" y1={y + 9} x2="385" y2={y + 31} stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 2" />
              </g>
            ))}

            {/* Upward Pull Arrow */}
            <line x1="385" y1="310" x2="385" y2="38" stroke="#0284c7" strokeWidth="4" strokeDasharray="8 4" />
            <polygon points="377,42 385,26 393,42" fill="#0284c7" />

            <text x="385" y="16" textAnchor="middle" className="text-[13px] font-sans fill-rose-950 font-extrabold uppercase tracking-wide">
              Transpiration Pull (Tension)
            </text>
          </g>
        ) : (
          /* Cavitation / Air bubble breaking the column */
          <g>
            {/* Top segment */}
            <circle cx="385" cy="60" r="9" fill="#38bdf8" />
            <circle cx="385" cy="90" r="9" fill="#38bdf8" />

            {/* Giant Air Bubble Cavitation */}
            <ellipse cx="385" cy="180" rx="38" ry="48" fill="#fef2f2" stroke="#dc2626" strokeWidth="3.5" strokeDasharray="6 3" />
            <text x="385" y="174" textAnchor="middle" className="text-[13px] font-mono fill-rose-800 font-extrabold">
              AIR BUBBLE
            </text>
            <text x="385" y="193" textAnchor="middle" className="text-[11px] font-sans fill-rose-900 font-bold">
              (Airlock / Cavitation)
            </text>

            {/* Bottom segment with no tension */}
            <circle cx="385" cy="270" r="9" fill="#94a3b8" />
            <circle cx="385" cy="300" r="9" fill="#94a3b8" />
          </g>
        )}
      </g>

      {/* Water entering leaf mesophyll from xylem through pit */}
      <path
        d="M 336,110 Q 230,100 170,70"
        fill="none"
        stroke="#0284c7"
        strokeWidth="3"
        strokeDasharray="5 3"
      />
      <text x="250" y="85" textAnchor="middle" className="text-[12px] font-sans fill-sky-900 font-extrabold">
        Water to Mesophyll (Ψ gradient)
      </text>
    </svg>
  );
};

const MolecularBondsSvg: React.FC = () => (
  <svg viewBox="0 0 320 200" className="w-full max-w-[360px] h-auto select-none">
    {/* Hydrophilic Xylem Wall on Left */}
    <rect x="10" y="10" width="36" height="180" fill="#fda4af" stroke="#be123c" strokeWidth="2.5" rx="5" />
    <text x="28" y="105" textAnchor="middle" className="text-[11px] font-sans fill-rose-950 font-extrabold tracking-wide" transform="rotate(-90 28 105)">
      Cellulose / Lignin Wall
    </text>

    {/* Water Molecule 1 (Adhered to wall) */}
    <g transform="translate(95, 55)">
      <circle cx="0" cy="0" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" className="text-[12px] font-extrabold fill-white">O (δ⁻)</text>
      <circle cx="-14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      <text x="-14" y="-11" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-900">H (δ⁺)</text>
      <circle cx="14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      <text x="14" y="-11" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-900">H (δ⁺)</text>
    </g>

    {/* Adhesion H-Bond to wall */}
    <line x1="46" y1="55" x2="79" y2="55" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 2" />
    <text x="63" y="47" textAnchor="middle" className="text-[10px] font-sans fill-sky-400 font-extrabold">Adhesion</text>

    {/* Water Molecule 2 (Cohesive bond with Molecule 1) */}
    <g transform="translate(200, 90)">
      <circle cx="0" cy="0" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" className="text-[12px] font-extrabold fill-white">O (δ⁻)</text>
      <circle cx="-14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      <text x="-14" y="-11" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-900">H (δ⁺)</text>
      <circle cx="14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      <text x="14" y="-11" textAnchor="middle" className="text-[8px] font-extrabold fill-slate-900">H (δ⁺)</text>
    </g>

    {/* Cohesion H-Bond between Molecule 1 and 2 */}
    <line x1="111" y1="55" x2="184" y2="90" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray="4 2" />
    <text x="148" y="66" textAnchor="middle" className="text-[11px] font-sans fill-rose-400 font-extrabold">Cohesion</text>

    {/* Water Molecule 3 */}
    <g transform="translate(255, 155)">
      <circle cx="0" cy="0" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" className="text-[12px] font-extrabold fill-white">O (δ⁻)</text>
      <circle cx="-14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="14" cy="-14" r="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
    </g>
    <line x1="200" y1="106" x2="255" y2="139" stroke="#f43f5e" strokeWidth="3.5" strokeDasharray="4 2" />
  </svg>
);
