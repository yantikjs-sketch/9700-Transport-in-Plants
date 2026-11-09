import React, { useState } from 'react';
import { ORGAN_ANATOMY_DATA, ULTRASTRUCTURE_DATA } from '../../data/syllabusData';
import { OrganType, TissueLayer } from '../../types/biology';
import { Layers, Microscope, Info, Award, ZoomIn, CheckCircle2 } from 'lucide-react';

export const TissueExplorer: React.FC = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganType>('stem');
  const [viewMode, setViewMode] = useState<'plan' | 'histology'>('plan');
  const [selectedLayerId, setSelectedLayerId] = useState<string>('stem-xylem');
  const [ultrastructureTab, setUltrastructureTab] = useState<'xylem' | 'phloemSieve' | 'companionCell'>('xylem');

  const currentOrgan = ORGAN_ANATOMY_DATA[selectedOrgan];
  const activeLayer = currentOrgan.layers.find(l => l.id === selectedLayerId) || currentOrgan.layers[0];

  const handleOrganChange = (organ: OrganType) => {
    setSelectedOrgan(organ);
    setSelectedLayerId(ORGAN_ANATOMY_DATA[organ].layers[0].id);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Syllabus 7.1(a) & 7.1(b)
              </span>
              <span className="text-xs text-emerald-200/70 font-mono">Dicotyledonous Herbaceous Plants</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Microscope className="w-7 h-7 text-emerald-400" />
              Tissue Distribution & Plan Diagram Studio
            </h2>
            <p className="text-emerald-100/80 text-sm mt-1 max-w-2xl">
              Compare Cambridge low-power plan diagrams with histological cellular distributions in dicotyledonous stems, roots, and leaves.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-emerald-950/80 p-1.5 rounded-xl border border-emerald-600/40 self-start md:self-auto">
            <button
              onClick={() => setViewMode('plan')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'plan'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Award className="w-4 h-4" />
              Exam Plan Diagram (No Cells)
            </button>
            <button
              onClick={() => setViewMode('histology')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'histology'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-emerald-300 hover:text-white hover:bg-emerald-800/40'
              }`}
            >
              <Layers className="w-4 h-4" />
              Histology & Cellular Detail
            </button>
          </div>
        </div>

        {/* Organ Selector Tabs */}
        <div className="flex gap-2 mt-6 border-t border-emerald-800/60 pt-4">
          {(['stem', 'root', 'leaf'] as OrganType[]).map((org) => (
            <button
              key={org}
              onClick={() => handleOrganChange(org)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                selectedOrgan === org
                  ? 'bg-white text-emerald-950 shadow-lg scale-102 ring-2 ring-emerald-400'
                  : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/50 hover:text-white'
              }`}
            >
              {org === 'stem' && '🌱 Dicot Stem TS'}
              {org === 'root' && '🥕 Dicot Root TS'}
              {org === 'leaf' && '🍃 Dicot Leaf TS'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Diagram & Tissue Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive SVG Diagram Viewport (8 columns for maximum diagram size) */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between bg-slate-50/90 gap-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2.5">
                <span>{currentOrgan.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 font-mono font-bold">
                  {viewMode === 'plan' ? 'Official Cambridge Plan Rules' : 'Cellular Representation'}
                </span>
              </h3>
              <p className="text-sm text-slate-600 mt-1">Click any labeled tissue region to inspect its structure, function & mark scheme tips</p>
            </div>
            <div className="text-xs text-emerald-800 bg-emerald-100/90 px-3.5 py-1.5 rounded-full font-bold border border-emerald-300">
              {viewMode === 'plan' ? 'Lines Only • No Individual Cells' : 'Tissue Cellular Morphology'}
            </div>
          </div>

          <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-[540px]">
            {selectedOrgan === 'stem' && (
              <StemSvg
                viewMode={viewMode}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
              />
            )}
            {selectedOrgan === 'root' && (
              <RootSvg
                viewMode={viewMode}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
              />
            )}
            {selectedOrgan === 'leaf' && (
              <LeafSvg
                viewMode={viewMode}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
              />
            )}
          </div>

          {/* Plan Diagram Examination Golden Rules */}
          {viewMode === 'plan' && (
            <div className="p-5 bg-amber-50/90 border-t border-amber-200 text-amber-950 text-sm">
              <div className="font-bold flex items-center gap-2 text-amber-900 mb-2 text-base">
                <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                Cambridge 9700 Examiner Golden Rules for Low-Power Plan Diagrams:
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-amber-950/90 text-sm">
                {currentOrgan.planRules.slice(0, 4).map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-extrabold text-base">•</span>
                    <span className="leading-snug">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tissue Inspector Panel (4 columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Quick Tissue Layer Pills */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-2.5">
              Select Tissue Layer
            </label>
            <div className="flex flex-wrap gap-2">
              {currentOrgan.layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedLayerId === layer.id
                      ? 'bg-emerald-600 text-white shadow-md scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Layer Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {activeLayer.location}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {activeLayer.id}</span>
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 mt-2.5">{activeLayer.name}</h4>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Appearance in Cambridge Plan Diagram
                </span>
                <p className="text-slate-900 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm leading-relaxed">
                  {activeLayer.appearanceInPlan}
                </p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Structure & Cell Types
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {activeLayer.structure}
                </p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
                  Biological Function
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {activeLayer.function}
                </p>
              </div>

              {/* Cambridge Examiner Alert Box */}
              <div className="bg-emerald-50/90 border border-emerald-300 p-4 rounded-xl text-sm text-emerald-950">
                <div className="font-extrabold flex items-center gap-2 text-emerald-900 mb-1 text-sm">
                  <Info className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  Cambridge Examiner Marking Note:
                </div>
                <p className="text-emerald-900/95 leading-relaxed text-xs sm:text-sm">{activeLayer.cambridgeTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Power Ultrastructure Section: Xylem Elements vs Phloem Sieve Tubes & Companion Cells */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 font-mono">
                Syllabus 7.1(c) & 7.1(d)
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cellular Ultrastructure & Adaptations</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ZoomIn className="w-5 h-5 text-emerald-600" />
              High-Power Cell Comparison & Adaptation Links
            </h3>
          </div>

          {/* Cell Type Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setUltrastructureTab('xylem')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                ultrastructureTab === 'xylem'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Xylem Vessel Element
            </button>
            <button
              onClick={() => setUltrastructureTab('phloemSieve')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                ultrastructureTab === 'phloemSieve'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Phloem Sieve Tube Element
            </button>
            <button
              onClick={() => setUltrastructureTab('companionCell')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                ultrastructureTab === 'companionCell'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Companion Cell
            </button>
          </div>
        </div>

        {/* Ultrastructure Visual & Adaptation Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Detailed Schematic Graphic */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
            {ultrastructureTab === 'xylem' && <XylemCellDiagram />}
            {ultrastructureTab === 'phloemSieve' && <PhloemSieveDiagram />}
            {ultrastructureTab === 'companionCell' && <CompanionCellDiagram />}
          </div>

          {/* Adaptations & Marking Points */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                {ULTRASTRUCTURE_DATA[ultrastructureTab].title}
              </h4>
              <p className="text-xs text-emerald-700 font-medium">
                {ULTRASTRUCTURE_DATA[ultrastructureTab].subheading}
              </p>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {ULTRASTRUCTURE_DATA[ultrastructureTab].features.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.feature}</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        <span className="font-semibold text-emerald-800">Function & Adaptation: </span>
                        {item.adaptation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning Alert */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2">
              <span className="text-rose-600 font-bold text-sm">⚠️</span>
              <div>
                <span className="font-bold text-rose-900">Examiner Penalty Alert: </span>
                <span>{ULTRASTRUCTURE_DATA[ultrastructureTab].cambridgeWarning}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SVG Subcomponents for Stem, Root, Leaf
// ==========================================

interface SvgProps {
  viewMode: 'plan' | 'histology';
  selectedLayerId: string;
  onSelectLayer: (id: string) => void;
}

const StemSvg: React.FC<SvgProps> = ({ viewMode, selectedLayerId, onSelectLayer }) => {
  // Stem has ring of ~8 vascular bundles, large central pith
  const bundleAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const cx = 200;
  const cy = 200;
  const rOuter = 180;
  const rCollenchyma = 168;
  const rCortex = 150;
  const rBundlesCenter = 122;
  const rPith = 94;

  const isSelected = (id: string) => selectedLayerId === id;

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[540px] md:max-w-[600px] h-auto select-none drop-shadow-sm">
      <defs>
        <radialGradient id="pithGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0.4" />
        </radialGradient>
        <pattern id="cellMesh" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="3.5" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
        </pattern>
      </defs>

      {/* Central Pith (Medulla) */}
      <circle
        cx={cx}
        cy={cy}
        r={rPith}
        fill={viewMode === 'histology' ? 'url(#pithGrad)' : '#fafafa'}
        stroke={isSelected('stem-pith') ? '#059669' : '#475569'}
        strokeWidth={isSelected('stem-pith') ? 3.5 : 2}
        strokeDasharray={viewMode === 'plan' ? '4 3' : 'none'}
        className="cursor-pointer transition-all hover:opacity-80"
        onClick={() => onSelectLayer('stem-pith')}
      />
      {viewMode === 'histology' && (
        <circle cx={cx} cy={cy} r={rPith - 5} fill="url(#cellMesh)" opacity="0.35" pointerEvents="none" />
      )}
      <text x={cx} y={cy} textAnchor="middle" className="text-[14px] font-sans fill-slate-800 font-extrabold pointer-events-none">
        Pith (Medulla)
      </text>

      {/* Cortex Region Ring */}
      <circle
        cx={cx}
        cy={cy}
        r={rCortex}
        fill="none"
        stroke={isSelected('stem-cortex') ? '#059669' : '#64748b'}
        strokeWidth={isSelected('stem-cortex') ? 3.5 : 1.5}
        strokeDasharray={viewMode === 'plan' ? '4 3' : 'none'}
        className="cursor-pointer"
        onClick={() => onSelectLayer('stem-cortex')}
      />

      {/* Collenchyma Ring */}
      <circle
        cx={cx}
        cy={cy}
        r={rCollenchyma}
        fill="none"
        stroke={isSelected('stem-collenchyma') ? '#059669' : '#64748b'}
        strokeWidth={isSelected('stem-collenchyma') ? 3.5 : 1.8}
        className="cursor-pointer"
        onClick={() => onSelectLayer('stem-collenchyma')}
      />

      {/* Outer Epidermis & Cuticle */}
      <circle
        cx={cx}
        cy={cy}
        r={rOuter}
        fill="none"
        stroke={isSelected('stem-epidermis') ? '#059669' : '#0f172a'}
        strokeWidth={isSelected('stem-epidermis') ? 4 : 2.5}
        className="cursor-pointer transition-all"
        onClick={() => onSelectLayer('stem-epidermis')}
      />

      {/* Vascular Bundles in a Peripheral Ring */}
      {bundleAngles.map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const bx = cx + rBundlesCenter * Math.cos(rad);
        const by = cy + rBundlesCenter * Math.sin(rad);

        // Vector pointing outwards from centre
        const nx = Math.cos(rad);
        const ny = Math.sin(rad);

        // Sclerenchyma Cap (outermost of bundle)
        const capX = bx + nx * 18;
        const capY = by + ny * 18;

        // Phloem (middle-outer)
        const phloemX = bx + nx * 8;
        const phloemY = by + ny * 8;

        // Cambium (middle line)
        const cambiumX = bx;
        const cambiumY = by;

        // Xylem (inner towards pith)
        const xylemX = bx - nx * 14;
        const xylemY = by - ny * 14;

        return (
          <g key={idx} className="transition-all">
            {/* Bundle Outer Contour */}
            <ellipse
              cx={bx}
              cy={by}
              rx={16}
              ry={28}
              transform={`rotate(${angle + 90} ${bx} ${by})`}
              fill={viewMode === 'histology' ? '#f8fafc' : 'none'}
              stroke="#64748b"
              strokeWidth="1.2"
            />

            {/* Sclerenchyma Cap */}
            <ellipse
              cx={capX}
              cy={capY}
              rx={12}
              ry={8}
              transform={`rotate(${angle + 90} ${capX} ${capY})`}
              fill={viewMode === 'histology' ? '#e2e8f0' : '#f1f5f9'}
              stroke={isSelected('stem-sclerenchyma') ? '#059669' : '#334155'}
              strokeWidth={isSelected('stem-sclerenchyma') ? 3 : 1.5}
              className="cursor-pointer hover:fill-emerald-200"
              onClick={() => onSelectLayer('stem-sclerenchyma')}
            />

            {/* Phloem */}
            <ellipse
              cx={phloemX}
              cy={phloemY}
              rx={11}
              ry={7}
              transform={`rotate(${angle + 90} ${phloemX} ${phloemY})`}
              fill={isSelected('stem-phloem') ? '#a7f3d0' : viewMode === 'histology' ? '#bae6fd' : '#ffffff'}
              stroke={isSelected('stem-phloem') ? '#059669' : '#0284c7'}
              strokeWidth={isSelected('stem-phloem') ? 3 : 1.5}
              className="cursor-pointer hover:fill-sky-200"
              onClick={() => onSelectLayer('stem-phloem')}
            />

            {/* Vascular Cambium Line */}
            <line
              x1={cambiumX - 12 * Math.sin(rad)}
              y1={cambiumY + 12 * Math.cos(rad)}
              x2={cambiumX + 12 * Math.sin(rad)}
              y2={cambiumY - 12 * Math.cos(rad)}
              stroke={isSelected('stem-cambium') ? '#059669' : '#f59e0b'}
              strokeWidth={isSelected('stem-cambium') ? 3.5 : 1.8}
              className="cursor-pointer"
              onClick={() => onSelectLayer('stem-cambium')}
            />

            {/* Xylem (Wedge towards pith) */}
            <ellipse
              cx={xylemX}
              cy={xylemY}
              rx={13}
              ry={12}
              transform={`rotate(${angle + 90} ${xylemX} ${xylemY})`}
              fill={isSelected('stem-xylem') ? '#bbf7d0' : viewMode === 'histology' ? '#fecdd3' : '#ffffff'}
              stroke={isSelected('stem-xylem') ? '#059669' : '#e11d48'}
              strokeWidth={isSelected('stem-xylem') ? 3 : 1.6}
              className="cursor-pointer hover:fill-rose-200"
              onClick={() => onSelectLayer('stem-xylem')}
            />

            {/* In histology mode: show vessel lumens */}
            {viewMode === 'histology' && (
              <>
                <circle cx={xylemX - 3} cy={xylemY - 2} r="3" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
                <circle cx={xylemX + 4} cy={xylemY + 2} r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
                <circle cx={xylemX - 1} cy={xylemY + 5} r="2.5" fill="#ffffff" stroke="#be123c" strokeWidth="1" />
              </>
            )}
          </g>
        );
      })}

      {/* Representative Pointer Label on One Bundle */}
      <line x1="280" y1="120" x2="335" y2="65" stroke="#059669" strokeWidth="2" />
      <text x="340" y="62" className="text-[13px] font-sans fill-emerald-900 font-extrabold">Vascular Bundle Ring</text>

      <line x1="200" y1="20" x2="200" y2="7" stroke="#334155" strokeWidth="1.5" />
      <text x="200" y="5" textAnchor="middle" className="text-[13px] font-sans fill-slate-800 font-bold">Epidermis</text>
    </svg>
  );
};

const RootSvg: React.FC<SvgProps> = ({ viewMode, selectedLayerId, onSelectLayer }) => {
  const cx = 200;
  const cy = 200;
  const rRoot = 180;
  const rStele = 58;

  const isSelected = (id: string) => selectedLayerId === id;

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[540px] md:max-w-[600px] h-auto select-none drop-shadow-sm">
      <defs>
        <pattern id="rootCortexMesh" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="5" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
        </pattern>
      </defs>

      {/* Root Hairs protruding from Piliferous layer */}
      {viewMode === 'histology' && (
        <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M 380,200 Q 405,195 410,185" />
          <path d="M 200,380 Q 205,405 190,412" />
          <path d="M 20,200 Q -5,210 -12,225" />
          <path d="M 200,20 Q 210,-5 225,-10" />
          <path d="M 327,73 Q 355,50 365,40" />
          <path d="M 73,327 Q 45,350 40,365" />
        </g>
      )}

      {/* Broad Cortex Area */}
      <circle
        cx={cx}
        cy={cy}
        r={rRoot}
        fill={viewMode === 'histology' ? '#fcfbf7' : '#ffffff'}
        stroke={isSelected('root-cortex') ? '#059669' : '#64748b'}
        strokeWidth={isSelected('root-cortex') ? 3.5 : 1.8}
        className="cursor-pointer"
        onClick={() => onSelectLayer('root-cortex')}
      />
      {viewMode === 'histology' && (
        <circle cx={cx} cy={cy} r={rRoot - 4} fill="url(#rootCortexMesh)" opacity="0.6" pointerEvents="none" />
      )}

      {/* Piliferous Layer / Epidermis */}
      <circle
        cx={cx}
        cy={cy}
        r={rRoot}
        fill="none"
        stroke={isSelected('root-epidermis') ? '#059669' : '#0f172a'}
        strokeWidth={isSelected('root-epidermis') ? 4 : 2.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('root-epidermis')}
      />

      {/* Endodermis Ring (with Casparian strip) */}
      <circle
        cx={cx}
        cy={cy}
        r={rStele + 6}
        fill={isSelected('root-endodermis') ? '#fed7aa' : viewMode === 'histology' ? '#fff7ed' : '#ffffff'}
        stroke={isSelected('root-endodermis') ? '#ea580c' : '#c2410c'}
        strokeWidth={isSelected('root-endodermis') ? 4 : 2.2}
        strokeDasharray={viewMode === 'plan' ? 'none' : '4 2'}
        className="cursor-pointer hover:stroke-orange-500"
        onClick={() => onSelectLayer('root-endodermis')}
      />

      {/* Pericycle Ring */}
      <circle
        cx={cx}
        cy={cy}
        r={rStele}
        fill="none"
        stroke={isSelected('root-pericycle') ? '#059669' : '#0d9488'}
        strokeWidth={isSelected('root-pericycle') ? 3.5 : 1.8}
        className="cursor-pointer hover:stroke-teal-600"
        onClick={() => onSelectLayer('root-pericycle')}
      />

      {/* Central Star/Cross Xylem */}
      <path
        d={`
          M ${cx - 7},${cy - 48}
          L ${cx + 7},${cy - 48}
          L ${cx + 10},${cy - 12}
          L ${cx + 48},${cy - 7}
          L ${cx + 48},${cy + 7}
          L ${cx + 10},${cy + 12}
          L ${cx + 7},${cy + 48}
          L ${cx - 7},${cy + 48}
          L ${cx - 10},${cy + 12}
          L ${cx - 48},${cy + 7}
          L ${cx - 48},${cy - 7}
          L ${cx - 10},${cy - 12}
          Z
        `}
        fill={isSelected('root-xylem') ? '#bbf7d0' : viewMode === 'histology' ? '#fecdd3' : '#f8fafc'}
        stroke={isSelected('root-xylem') ? '#059669' : '#be123c'}
        strokeWidth={isSelected('root-xylem') ? 4 : 2.4}
        className="cursor-pointer hover:fill-rose-100"
        onClick={() => onSelectLayer('root-xylem')}
      />

      {/* If Histology Mode: Large central metaxylem vessels & small protoxylem at tips */}
      {viewMode === 'histology' && (
        <g pointerEvents="none">
          {/* Metaxylem central vessels */}
          <circle cx={cx} cy={cy} r="9" fill="#ffffff" stroke="#be123c" strokeWidth="1.8" />
          <circle cx={cx - 10} cy={cy - 10} r="7" fill="#ffffff" stroke="#be123c" strokeWidth="1.4" />
          <circle cx={cx + 10} cy={cy + 10} r="7" fill="#ffffff" stroke="#be123c" strokeWidth="1.4" />
          <circle cx={cx + 10} cy={cy - 10} r="7" fill="#ffffff" stroke="#be123c" strokeWidth="1.4" />
          <circle cx={cx - 10} cy={cy + 10} r="7" fill="#ffffff" stroke="#be123c" strokeWidth="1.4" />

          {/* Protoxylem at tips of star */}
          <circle cx={cx} cy={cy - 38} r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
          <circle cx={cx + 38} cy={cy} r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
          <circle cx={cx} cy={cy + 38} r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
          <circle cx={cx - 38} cy={cy} r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
        </g>
      )}

      {/* Phloem Patches between the 4 arms of the Xylem Cross */}
      {[
        { x: cx + 24, y: cy - 24 },
        { x: cx + 24, y: cy + 24 },
        { x: cx - 24, y: cy + 24 },
        { x: cx - 24, y: cy - 24 }
      ].map((pos, idx) => (
        <circle
          key={idx}
          cx={pos.x}
          cy={pos.y}
          r="12"
          fill={isSelected('root-phloem') ? '#a7f3d0' : viewMode === 'histology' ? '#bae6fd' : '#ffffff'}
          stroke={isSelected('root-phloem') ? '#059669' : '#0284c7'}
          strokeWidth={isSelected('root-phloem') ? 3.5 : 1.8}
          className="cursor-pointer hover:fill-sky-100"
          onClick={() => onSelectLayer('root-phloem')}
        />
      ))}

      {/* Labels */}
      <text x={cx} y={cy + 85} textAnchor="middle" className="text-[13px] font-sans fill-slate-900 font-extrabold">
        Central Stele (Cylinder)
      </text>
      <text x={cx} y={110} textAnchor="middle" className="text-[14px] font-sans fill-slate-600 font-bold">
        Broad Cortex Parenchyma (&gt;65% area)
      </text>
    </svg>
  );
};

const LeafSvg: React.FC<SvgProps> = ({ viewMode, selectedLayerId, onSelectLayer }) => {
  const isSelected = (id: string) => selectedLayerId === id;

  return (
    <svg viewBox="0 0 420 320" className="w-full max-w-[560px] md:max-w-[620px] h-auto select-none drop-shadow-sm">
      <defs>
        <pattern id="airSpaces" width="24" height="20" patternUnits="userSpaceOnUse">
          <ellipse cx="12" cy="10" rx="9" ry="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
        </pattern>
        <pattern id="palisadeCols" width="14" height="60" patternUnits="userSpaceOnUse">
          <rect x="2" y="2" width="10" height="56" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Blade & Midrib Contour */}
      {/* Upper surface */}
      <path
        d="M 10,70 L 150,70 Q 210,50 270,70 L 410,70"
        stroke={isSelected('leaf-upper-cuticle') ? '#059669' : '#047857'}
        strokeWidth={isSelected('leaf-upper-cuticle') ? 4.5 : 3}
        fill="none"
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-upper-cuticle')}
      />

      {/* Palisade Mesophyll Region (Upper half of blade) */}
      <rect
        x="10"
        y="72"
        width="140"
        height="55"
        fill={viewMode === 'histology' ? 'url(#palisadeCols)' : '#f8fafc'}
        stroke={isSelected('leaf-palisade') ? '#059669' : '#16a34a'}
        strokeWidth={isSelected('leaf-palisade') ? 3 : 1.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-palisade')}
      />
      <rect
        x="270"
        y="72"
        width="140"
        height="55"
        fill={viewMode === 'histology' ? 'url(#palisadeCols)' : '#f8fafc'}
        stroke={isSelected('leaf-palisade') ? '#059669' : '#16a34a'}
        strokeWidth={isSelected('leaf-palisade') ? 3 : 1.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-palisade')}
      />

      {/* Spongy Mesophyll Region (Lower half of blade) */}
      <rect
        x="10"
        y="127"
        width="140"
        height="50"
        fill={viewMode === 'histology' ? 'url(#airSpaces)' : '#ffffff'}
        stroke={isSelected('leaf-spongy') ? '#059669' : '#64748b'}
        strokeWidth={isSelected('leaf-spongy') ? 3 : 1.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-spongy')}
      />
      <rect
        x="270"
        y="127"
        width="140"
        height="50"
        fill={viewMode === 'histology' ? 'url(#airSpaces)' : '#ffffff'}
        stroke={isSelected('leaf-spongy') ? '#059669' : '#64748b'}
        strokeWidth={isSelected('leaf-spongy') ? 3 : 1.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-spongy')}
      />

      {/* Lower Epidermis (Left and Right) */}
      <path
        d="M 10,178 L 150,178"
        stroke={isSelected('leaf-lower-epidermis') ? '#059669' : '#334155'}
        strokeWidth={isSelected('leaf-lower-epidermis') ? 4 : 2.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-lower-epidermis')}
      />
      <path
        d="M 270,178 L 410,178"
        stroke={isSelected('leaf-lower-epidermis') ? '#059669' : '#334155'}
        strokeWidth={isSelected('leaf-lower-epidermis') ? 4 : 2.5}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-lower-epidermis')}
      />

      {/* Midrib Bulge (Protruding below) */}
      <path
        d="M 150,178 Q 210,265 270,178"
        stroke={isSelected('leaf-lower-epidermis') ? '#059669' : '#334155'}
        strokeWidth={isSelected('leaf-lower-epidermis') ? 4 : 2.5}
        fill="#f8fafc"
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-lower-epidermis')}
      />

      {/* Midrib Vascular Bundle Sheath */}
      <ellipse
        cx="210"
        cy="155"
        rx="42"
        ry="36"
        fill={isSelected('leaf-midrib-bundle') ? '#f0fdf4' : '#ffffff'}
        stroke={isSelected('leaf-midrib-bundle') ? '#059669' : '#475569'}
        strokeWidth={isSelected('leaf-midrib-bundle') ? 3.5 : 2}
        className="cursor-pointer"
        onClick={() => onSelectLayer('leaf-midrib-bundle')}
      />

      {/* Leaf XYLEM: UPPER (Adaxial) Half of Bundle */}
      <path
        d="M 172,152 A 38 28 0 0 1 248,152 Z"
        fill={isSelected('leaf-xylem') ? '#bbf7d0' : viewMode === 'histology' ? '#fecdd3' : '#ffffff'}
        stroke={isSelected('leaf-xylem') ? '#059669' : '#be123c'}
        strokeWidth={isSelected('leaf-xylem') ? 3.5 : 2}
        className="cursor-pointer hover:fill-rose-100"
        onClick={() => onSelectLayer('leaf-xylem')}
      />

      {/* In histology: xylem vessel lumens */}
      {viewMode === 'histology' && (
        <g pointerEvents="none">
          <circle cx="192" cy="142" r="5" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="210" cy="138" r="6" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="228" cy="142" r="5" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="202" cy="148" r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
          <circle cx="218" cy="148" r="4" fill="#ffffff" stroke="#be123c" strokeWidth="1.2" />
        </g>
      )}

      {/* Leaf PHLOEM: LOWER (Abaxial) Half of Bundle */}
      <path
        d="M 172,156 A 38 24 0 0 0 248,156 Z"
        fill={isSelected('leaf-phloem') ? '#a7f3d0' : viewMode === 'histology' ? '#bae6fd' : '#ffffff'}
        stroke={isSelected('leaf-phloem') ? '#059669' : '#0284c7'}
        strokeWidth={isSelected('leaf-phloem') ? 3.5 : 2}
        className="cursor-pointer hover:fill-sky-100"
        onClick={() => onSelectLayer('leaf-phloem')}
      />

      {/* Cambridge High-Yield Orientation Callout */}
      <g>
        <line x1="210" y1="108" x2="210" y2="128" stroke="#be123c" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="210" y="103" textAnchor="middle" className="text-[13px] font-sans fill-rose-800 font-extrabold">
          XYLEM (UPPER / Adaxial)
        </text>

        <line x1="210" y1="202" x2="210" y2="178" stroke="#0284c7" strokeWidth="2" />
        <text x="210" y="218" textAnchor="middle" className="text-[13px] font-sans fill-sky-900 font-extrabold">
          PHLOEM (LOWER / Abaxial)
        </text>
      </g>
    </svg>
  );
};

// ==========================================
// High-Power Ultrastructure Diagrams
// ==========================================

const XylemCellDiagram: React.FC = () => (
  <svg viewBox="0 0 220 280" className="w-full max-w-[290px] h-auto select-none drop-shadow-sm">
    {/* Long empty lignified cylinder */}
    <rect x="40" y="20" width="140" height="240" rx="6" fill="#fff1f2" stroke="#e11d48" strokeWidth="3.5" />
    
    {/* Thick lignified cell wall bands */}
    <rect x="40" y="20" width="18" height="240" fill="#fda4af" />
    <rect x="162" y="20" width="18" height="240" fill="#fda4af" />

    {/* Completely dissolved end walls */}
    <line x1="58" y1="20" x2="162" y2="20" stroke="#e11d48" strokeWidth="3" strokeDasharray="3 3" />
    <line x1="58" y1="260" x2="162" y2="260" stroke="#e11d48" strokeWidth="3" strokeDasharray="3 3" />

    {/* Lignification Annular / Spiral rings */}
    <path d="M 58,60 Q 110,75 162,60" fill="none" stroke="#be123c" strokeWidth="4.5" />
    <path d="M 58,110 Q 110,125 162,110" fill="none" stroke="#be123c" strokeWidth="4.5" />
    <path d="M 58,160 Q 110,175 162,160" fill="none" stroke="#be123c" strokeWidth="4.5" />
    <path d="M 58,210 Q 110,225 162,210" fill="none" stroke="#be123c" strokeWidth="4.5" />

    {/* Pits (Bordered pits in walls) */}
    <ellipse cx="49" cy="85" rx="6" ry="10" fill="#ffffff" stroke="#9f1239" strokeWidth="1.8" />
    <ellipse cx="49" cy="185" rx="6" ry="10" fill="#ffffff" stroke="#9f1239" strokeWidth="1.8" />
    <ellipse cx="171" cy="135" rx="6" ry="10" fill="#ffffff" stroke="#9f1239" strokeWidth="1.8" />

    {/* Flow Arrow indicating Mass Flow */}
    <line x1="110" y1="230" x2="110" y2="40" stroke="#0284c7" strokeWidth="3" strokeDasharray="6 4" />
    <polygon points="103,44 110,28 117,44" fill="#0284c7" />

    {/* Labels */}
    <text x="110" y="145" textAnchor="middle" className="text-[13px] font-sans fill-slate-900 font-extrabold">
      Hollow Lumen (Dead)
    </text>
    <text x="49" y="66" textAnchor="middle" className="text-[12px] font-sans fill-rose-950 font-extrabold">
      Pit
    </text>
  </svg>
);

const PhloemSieveDiagram: React.FC = () => (
  <svg viewBox="0 0 220 280" className="w-full max-w-[290px] h-auto select-none drop-shadow-sm">
    {/* Living cylinder with cellulose walls */}
    <rect x="40" y="20" width="140" height="240" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="3" />

    {/* Thin peripheral layer of cytoplasm */}
    <rect x="40" y="20" width="14" height="240" fill="#bae6fd" />
    <rect x="166" y="20" width="14" height="240" fill="#bae6fd" />

    {/* Top & Bottom Sieve Plates with Pores */}
    <g stroke="#0369a1" strokeWidth="2.5">
      <line x1="54" y1="25" x2="166" y2="25" />
      <circle cx="75" cy="25" r="3.5" fill="#ffffff" />
      <circle cx="95" cy="25" r="3.5" fill="#ffffff" />
      <circle cx="115" cy="25" r="3.5" fill="#ffffff" />
      <circle cx="135" cy="25" r="3.5" fill="#ffffff" />

      <line x1="54" y1="255" x2="166" y2="255" />
      <circle cx="75" cy="255" r="3.5" fill="#ffffff" />
      <circle cx="95" cy="255" r="3.5" fill="#ffffff" />
      <circle cx="115" cy="255" r="3.5" fill="#ffffff" />
      <circle cx="135" cy="255" r="3.5" fill="#ffffff" />
    </g>

    {/* Few mitochondria in peripheral cytoplasm */}
    <ellipse cx="47" cy="70" rx="4" ry="7" fill="#f97316" />
    <ellipse cx="173" cy="160" rx="4" ry="7" fill="#f97316" />

    {/* Longitudinal Mass Flow */}
    <line x1="110" y1="50" x2="110" y2="230" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" />
    <polygon points="103,226 110,242 117,226" fill="#059669" />

    {/* Labels */}
    <text x="110" y="128" textAnchor="middle" className="text-[13px] font-sans fill-slate-900 font-extrabold">
      Sap Stream (Sucrose)
    </text>
    <text x="110" y="152" textAnchor="middle" className="text-[12px] font-sans fill-sky-900 font-bold">
      NO Nucleus / NO Vacuole
    </text>
    <text x="110" y="14" textAnchor="middle" className="text-[12px] font-sans fill-sky-950 font-extrabold">
      Sieve Plate with Pores
    </text>
  </svg>
);

const CompanionCellDiagram: React.FC = () => (
  <svg viewBox="0 0 220 280" className="w-full max-w-[290px] h-auto select-none drop-shadow-sm">
    {/* Companion cell alongside sieve tube */}
    <rect x="25" y="30" width="85" height="220" rx="8" fill="#fdf4ff" stroke="#a21caf" strokeWidth="3" />
    <rect x="125" y="10" width="70" height="260" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 3" />

    {/* Numerous Plasmodesmata connecting the two */}
    {[60, 90, 120, 150, 180, 210].map((y) => (
      <line key={y} x1="110" y1={y} x2="125" y2={y} stroke="#a21caf" strokeWidth="3.5" />
    ))}

    {/* Prominent Nucleus in Companion Cell */}
    <circle cx="65" cy="110" r="20" fill="#86198f" />
    <circle cx="68" cy="108" r="7" fill="#fbcfe8" />

    {/* Dense Mitochondria */}
    {[
      { x: 50, y: 55 },
      { x: 80, y: 65 },
      { x: 45, y: 160 },
      { x: 75, y: 175 },
      { x: 60, y: 215 }
    ].map((m, idx) => (
      <ellipse key={idx} cx={m.x} cy={m.y} rx="6" ry="10" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
    ))}

    {/* Active Transport Proton Pump symbol */}
    <circle cx="25" cy="80" r="9" fill="#ef4444" />
    <text x="25" y="84" textAnchor="middle" className="text-[10px] font-sans fill-white font-bold">H⁺</text>

    {/* Labels */}
    <text x="65" y="148" textAnchor="middle" className="text-[12px] font-sans fill-purple-950 font-extrabold">
      Dense Protoplast
    </text>
    <text x="117" y="48" textAnchor="middle" className="text-[11px] font-sans fill-fuchsia-900 font-extrabold">
      Plasmodesmata
    </text>
    <text x="160" y="140" textAnchor="middle" className="text-[12px] font-sans fill-sky-900 font-bold">
      Sieve Tube
    </text>
  </svg>
);
