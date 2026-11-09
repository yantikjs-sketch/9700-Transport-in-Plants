import React, { useState } from 'react';
import { GLOSSARY_TERMS, ULTRASTRUCTURE_DATA } from '../data/syllabusData';
import { COMMON_EXAM_ERRORS } from '../data/examQuestionsData';
import { BookOpen, Search, AlertTriangle, FileText, CheckCircle2, Bookmark, Layers } from 'lucide-react';

export const NotesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | '7.1' | '7.2' | 'glossary' | 'examiner-traps'>('all');

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Cambridge International AS Level Biology (9700)
              </span>
              <span className="text-sm text-emerald-200/90 font-mono">Topic 7: Transport in Plants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              Comprehensive Syllabus Notes & Reference Guide
            </h2>
            <p className="text-emerald-100/90 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
              Complete, authoritative notes aligned precisely with the 9700 syllabus learning objectives, including official definitions, comparative histology tables, and Cambridge examiner traps.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search notes, terms, formulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/95 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-6 border-t border-slate-800 pt-5">
          {[
            { id: 'all', label: 'All Notes Overview' },
            { id: '7.1', label: '7.1 Transport Tissues Anatomy' },
            { id: '7.2', label: '7.2 Transport Mechanisms' },
            { id: 'glossary', label: 'Official 9700 Glossary' },
            { id: 'examiner-traps', label: 'Cambridge Examiner Traps' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Notes Content */}
      <div className="space-y-8">
        {/* Section 7.1 Notes */}
        {(activeTab === 'all' || activeTab === '7.1') && (
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-slate-200 space-y-7">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Topic 7.1
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Structure of Transport Tissues</h3>
              </div>
              <span className="text-sm text-slate-500 font-mono font-semibold">Dicotyledonous Herbaceous Plants</span>
            </div>

            {/* Tissue Distribution Summary Table */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-emerald-600" />
                Distribution of Xylem and Phloem Across Plant Organs
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-800 font-extrabold text-sm">
                    <tr>
                      <th className="p-4 border-b border-slate-200">Organ (TS)</th>
                      <th className="p-4 border-b border-slate-200">Xylem Distribution & Position</th>
                      <th className="p-4 border-b border-slate-200">Phloem Distribution & Position</th>
                      <th className="p-4 border-b border-slate-200">Other Characteristic Tissues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-extrabold text-slate-900 whitespace-nowrap">Herbaceous Dicot Stem</td>
                      <td className="p-4 leading-relaxed">Towards the inside (centripetal) of vascular bundles facing the central pith</td>
                      <td className="p-4 leading-relaxed">Towards the outside (centrifugal) of vascular bundles facing cortex</td>
                      <td className="p-4 leading-relaxed">Vascular bundles in a peripheral ring; sclerenchyma fibre caps outer to phloem; vascular cambium in between</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-extrabold text-slate-900 whitespace-nowrap">Herbaceous Dicot Root</td>
                      <td className="p-4 leading-relaxed">Central star / cross-shaped core in the center of the stele</td>
                      <td className="p-4 leading-relaxed">In isolated patches/clusters in the bays between the radiating arms of xylem</td>
                      <td className="p-4 leading-relaxed">Vascular cylinder (stele) small in centre; broad cortex parenchyma (&gt;65% diameter); endodermis with Casparian strip; pericycle</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 font-extrabold text-slate-900 whitespace-nowrap">Dicot Leaf Blade & Midrib</td>
                      <td className="p-4 leading-relaxed">Upper / adaxial surface of midrib vascular bundle</td>
                      <td className="p-4 leading-relaxed">Lower / abaxial surface of midrib vascular bundle</td>
                      <td className="p-4 leading-relaxed">Dorsiventral anatomy: upper palisade mesophyll (photosynthesis), lower spongy mesophyll (air spaces for transpiration), bundle sheath</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Xylem Vessel Element vs Phloem Comparison Table */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-600" />
                Ultrastructure: Xylem Vessel Elements vs Sieve Tube Elements & Companion Cells
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-100 text-slate-800 font-extrabold text-sm">
                    <tr>
                      <th className="p-4 border-b border-slate-200">Feature</th>
                      <th className="p-4 border-b border-slate-200 text-rose-800">Xylem Vessel Element</th>
                      <th className="p-4 border-b border-slate-200 text-sky-800">Phloem Sieve Tube Element</th>
                      <th className="p-4 border-b border-slate-200 text-purple-800">Companion Cell</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Living Status</td>
                      <td className="p-4 text-rose-700 font-extrabold">Dead at maturity (non-living)</td>
                      <td className="p-4 text-sky-700 font-extrabold">Living cell (membrane intact)</td>
                      <td className="p-4 text-purple-700 font-extrabold">Living cell (highly active)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Cell Wall Composition</td>
                      <td className="p-4 leading-relaxed">Cellulose impregnated with thick, waterproof <strong>lignin</strong></td>
                      <td className="p-4 leading-relaxed">Thin cellulose cell wall (NO lignin)</td>
                      <td className="p-4 leading-relaxed">Cellulose cell wall (NO lignin)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">End Walls</td>
                      <td className="p-4 leading-relaxed">Completely broken down / dissolved forming a continuous open pipe</td>
                      <td className="p-4 leading-relaxed">Perforated into <strong>sieve plates</strong> with sieve pores</td>
                      <td className="p-4 leading-relaxed">Complete end walls</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Cytoplasm & Organelles</td>
                      <td className="p-4 leading-relaxed">None (empty lumen) to eliminate resistance to flow</td>
                      <td className="p-4 leading-relaxed">Thin peripheral layer of cytoplasm; <strong>NO nucleus, NO vacuole</strong>, few mitochondria</td>
                      <td className="p-4 leading-relaxed">Dense cytoplasm, large nucleus, abundant mitochondria & ribosomes</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Intercellular Connections</td>
                      <td className="p-4 leading-relaxed"><strong>Pits</strong> (unlignified gaps in secondary wall) for lateral water bypass</td>
                      <td className="p-4 leading-relaxed">Connected to sister companion cell via numerous <strong>plasmodesmata</strong></td>
                      <td className="p-4 leading-relaxed">Connected to sieve tube via numerous <strong>plasmodesmata</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section 7.2 Notes */}
        {(activeTab === 'all' || activeTab === '7.2') && (
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-slate-200 space-y-7">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Topic 7.2
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Transport Mechanisms</h3>
              </div>
              <span className="text-sm text-slate-500 font-mono font-semibold">Water Potential, Transpiration & Translocation</span>
            </div>

            {/* Transport Mechanism Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              {/* Cohesion-Tension Theory Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 text-base block">1. Cohesion-Tension Theory of Water Transport</span>
                <p className="text-slate-700 leading-relaxed">
                  Water evaporates from moist spongy mesophyll cell walls into intercellular spaces, then diffuses through stomata down a water vapour potential gradient (transpiration).
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This generates a tension / negative hydrostatic pressure at the top of xylem vessels. Water molecules are drawn up in a continuous unbroken column due to <strong>cohesion</strong> (hydrogen bonds between water molecules) and <strong>adhesion</strong> (hydrogen bonds between water and hydrophilic xylem wall).
                </p>
              </div>

              {/* Mass Flow Hypothesis Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 text-base block">2. Mass Flow Hypothesis in Phloem Translocation</span>
                <p className="text-slate-700 leading-relaxed">
                  Companion cells use H⁺-ATPase pumps to pump H⁺ into the cell wall using ATP. H⁺ diffuses back in down its gradient via cotransporters, loading sucrose against its concentration gradient.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Loaded sucrose diffuses into the sieve tube via plasmodesmata, lowering Ψ. Water enters by osmosis from adjacent xylem, generating <strong>high hydrostatic pressure</strong>. Sap moves by mass flow down the hydrostatic pressure gradient to the sink, where sucrose is unloaded.
                </p>
              </div>

              {/* Casparian Strip Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 text-base block">3. Root Pathways & The Casparian Strip</span>
                <p className="text-slate-700 leading-relaxed">
                  Water travels across the cortex parenchyma via the <strong>apoplast</strong> (cell wall matrix) and <strong>symplast</strong> (cytoplasm via plasmodesmata).
                </p>
                <p className="text-slate-700 leading-relaxed">
                  At the endodermis, the apoplast pathway is blocked by the <strong>Casparian strip</strong> (a waterproof band of suberin in radial and transverse walls). Water and dissolved mineral ions are forced into the symplast across the selectively permeable membrane for selective regulation.
                </p>
              </div>

              {/* Xerophytic Adaptations Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-extrabold text-slate-900 text-base block">4. Xerophytic Structural Adaptations</span>
                <p className="text-slate-700 leading-relaxed">
                  Rolled leaves (hinge cells), sunken stomata in pits, and trichomes (epidermal hairs) all function to <strong>trap a layer of still, humid air</strong> around stomata.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  This dramatically reduces the water vapour potential gradient between the leaf interior and the outside atmosphere, slowing the rate of diffusion. Thick waxy cuticles eliminate cuticular water loss.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Official Glossary */}
        {(activeTab === 'all' || activeTab === 'glossary') && (
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-slate-200 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-mono font-extrabold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Official Definitions
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Cambridge 9700 Plant Transport Glossary</h3>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Word-for-word definitions rewarded with marks on Cambridge Paper 1 & Paper 2
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900">{item.term}</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      LO {item.syllabusRef}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.definition}</p>
                  {item.formulaOrRule && (
                    <div className="text-xs sm:text-sm font-mono font-bold text-purple-700 bg-purple-50 p-3 rounded-xl border border-purple-100">
                      {item.formulaOrRule}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cambridge Examiner Traps & Pitfalls */}
        {(activeTab === 'all' || activeTab === 'examiner-traps') && (
          <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-lg border border-slate-200 space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-extrabold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  Examiner Reports
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Cambridge Examiner Traps & Lost Marks</h3>
              </div>
              <span className="text-xs sm:text-sm text-rose-700 font-extrabold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                ⚠️ Avoid Penalties
              </span>
            </div>

            <div className="space-y-4">
              {COMMON_EXAM_ERRORS.map((err, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 w-full">
                      <div className="font-extrabold text-rose-950 text-base">
                        Frequent Student Mistake: <span className="line-through text-rose-700 font-normal">"{err.trap}"</span>
                      </div>
                      <div className="text-slate-800 font-bold text-sm bg-white p-3.5 rounded-xl border border-rose-200">
                        <span className="text-emerald-700 font-extrabold">What to write instead: </span>
                        {err.correction}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                        <strong>Why examiners penalize:</strong> {err.whyExaminerPenalizes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
