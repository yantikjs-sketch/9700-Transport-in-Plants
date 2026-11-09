import { LearningObjective, OrganAnatomy, GlossaryTerm, OrganType } from '../types/biology';

export const SYLLABUS_OBJECTIVES: LearningObjective[] = [
  {
    id: '7.1.a',
    section: '7.1',
    code: '7.1(a)',
    title: 'Plan Diagrams of Dicot Stem, Root & Leaf',
    description: 'Draw plan diagrams of transverse sections (TS) of stems, roots, and leaves of herbaceous dicotyledonous plants from temporary mounts or permanent slides, photomicrographs, or diagrams.',
    keyTerms: ['Plan diagram', 'Tissue proportions', 'Epidermis', 'Cortex', 'Endodermis', 'Pericycle', 'Xylem', 'Phloem', 'Pith / Medulla', 'Vascular cambium']
  },
  {
    id: '7.1.b',
    section: '7.1',
    code: '7.1(b)',
    title: 'Distribution of Xylem and Phloem',
    description: 'Describe the distribution of xylem and phloem in transverse sections of stems, roots, and leaves of herbaceous dicotyledonous plants.',
    keyTerms: ['Peripheral ring', 'Centripetal xylem', 'Centrifugal phloem', 'Star-shaped xylem', 'Adaxial xylem', 'Abaxial phloem']
  },
  {
    id: '7.1.c',
    section: '7.1',
    code: '7.1(c)',
    title: 'Structure of Xylem Vessel Elements, Sieve Tubes & Companion Cells',
    description: 'Describe the structure of xylem vessel elements, phloem sieve tube elements, and companion cells.',
    keyTerms: ['Lignified cell wall', 'Pits', 'End walls broken down', 'Sieve plate', 'Sieve pores', 'Peripheral cytoplasm', 'Plasmodesmata', 'Mitochondria']
  },
  {
    id: '7.1.d',
    section: '7.1',
    code: '7.1(d)',
    title: 'Relate Structure to Function',
    description: 'Relate the structure of xylem vessel elements, phloem sieve tube elements, and companion cells to their functions in transport and support.',
    keyTerms: ['Resistance to flow', 'Unbroken water column', 'Negative hydrostatic pressure', 'Active loading of assimilates', 'ATP generation']
  },
  {
    id: '7.2.a',
    section: '7.2',
    code: '7.2(a)',
    title: 'Water Potential & Movement Between Cells',
    description: 'Explain movement of water between plant cells, and between plant cells and environment, in terms of water potential (solute potential and pressure potential: Ψ = Ψs + Ψp).',
    keyTerms: ['Water potential (Ψ)', 'Solute potential (Ψs)', 'Pressure potential (Ψp)', 'Incipient plasmolysis', 'Turgor pressure', 'Water potential gradient']
  },
  {
    id: '7.2.b',
    section: '7.2',
    code: '7.2(b)',
    title: 'Root Absorption & Pathways across Cortex',
    description: 'Explain how water moves into root hairs and across the root cortex into the xylem via the apoplast, symplast, and vacuolar pathways, and the role of the Casparian strip in the endodermis.',
    keyTerms: ['Root hair cell', 'Apoplast pathway', 'Symplast pathway', 'Vacuolar pathway', 'Casparian strip', 'Suberin', 'Endodermis', 'Selective regulation']
  },
  {
    id: '7.2.c',
    section: '7.2',
    code: '7.2(c)',
    title: 'Transpiration & Cohesion-Tension Theory',
    description: 'Explain transpiration as the loss of water vapour from plant leaves, and explain the transpiration stream in terms of cohesion-tension theory (cohesion, adhesion, transpiration pull).',
    keyTerms: ['Transpiration', 'Spongy mesophyll evaporation', 'Stomatal diffusion', 'Water vapour potential gradient', 'Cohesion', 'Adhesion', 'Transpiration pull', 'Tension']
  },
  {
    id: '7.2.d',
    section: '7.2',
    code: '7.2(d)',
    title: 'Investigating Transpiration & Potometers',
    description: 'Investigate and explain factors affecting transpiration rate (light intensity, temperature, humidity, wind speed), and explain the use and precautions of potometers.',
    keyTerms: ['Capillary / bubble potometer', 'Water uptake rate', 'Cut under water at angle', 'Airtight petroleum jelly seal', 'Equilibration', 'Volume = πr²d']
  },
  {
    id: '7.2.e',
    section: '7.2',
    code: '7.2(e)',
    title: 'Xerophytic Leaf Adaptations',
    description: 'Describe and explain the structural adaptations of leaves of xerophytic plants to reduce water loss by transpiration.',
    keyTerms: ['Sunken stomata in pits', 'Curled / rolled leaves', 'Hinge cells', 'Trichomes / epidermal hairs', 'Thick waxy cuticle', 'Reduced leaf area']
  },
  {
    id: '7.2.f',
    section: '7.2',
    code: '7.2(f)',
    title: 'Translocation from Sources to Sinks',
    description: 'Explain translocation as the transfer of assimilates (sucrose and amino acids) from sources to sinks in the phloem tissue.',
    keyTerms: ['Translocation', 'Assimilates', 'Sucrose', 'Amino acids', 'Source', 'Sink', 'Bidirectional flow']
  },
  {
    id: '7.2.g',
    section: '7.2',
    code: '7.2(g)',
    title: 'Phloem Loading & Mass Flow Hypothesis',
    description: 'Explain the mechanism of phloem transport: active loading of sucrose into companion cells using proton pumps and cotransporters, and mass flow down a hydrostatic pressure gradient.',
    keyTerms: ['H+-ATPase pump', 'H+/sucrose cotransporter', 'Active loading', 'Hydrostatic pressure gradient', 'Mass flow', 'Osmosis from xylem', 'Sink unloading']
  }
];

export const ORGAN_ANATOMY_DATA: Record<OrganType, OrganAnatomy> = {
  stem: {
    id: 'stem',
    name: 'Dicotyledonous Stem TS',
    specimen: 'Herbaceous Dicotyledonous Stem (e.g., Helianthus)',
    description: 'In a herbaceous dicot stem, vascular bundles are arranged in a distinct circle/ring near the periphery, surrounding a large central pith (medulla).',
    planRules: [
      'Draw tissue boundaries only. NEVER draw individual cells in a plan diagram.',
      'Show correct relative proportions: cortex thickness vs vascular bundle depth vs large central pith.',
      'Vascular bundles are oval/wedge-shaped arranged in a ring.',
      'Xylem is towards the centre (inside), phloem towards the outside, separated by vascular cambium.',
      'Each bundle has a cap of sclerenchyma fibres on the outer edge of phloem.',
      'All label lines must be ruled with a pencil and touch the exact tissue layer.'
    ],
    layers: [
      {
        id: 'stem-epidermis',
        name: 'Epidermis & Cuticle',
        location: 'Outermost layer of cells',
        appearanceInPlan: 'Single continuous outer boundary line',
        structure: 'Single layer of tightly packed cells covered with a waxy cuticle',
        function: 'Protects inner tissues from mechanical damage and reduces water loss by cuticular transpiration',
        cambridgeTip: 'Never draw double cellular outlines in a low power plan diagram. One clear line for the epidermis.'
      },
      {
        id: 'stem-collenchyma',
        name: 'Collenchyma (Hypodermis)',
        location: 'Immediately inside the epidermis',
        appearanceInPlan: 'Continuous layer beneath epidermis, often thickened at corners',
        structure: 'Living cells with unevenly thickened primary cellulose and pectin cell walls',
        function: 'Provides flexible mechanical support to growing young stems without restricting elongation',
        cambridgeTip: 'Examiners check that this layer is shown as a discrete tissue zone outer to the cortex parenchyma.'
      },
      {
        id: 'stem-cortex',
        name: 'Cortex Parenchyma',
        location: 'Between collenchyma and vascular bundles',
        appearanceInPlan: 'Broad band bounded by outer collenchyma and inner vascular bundles',
        structure: 'Thin-walled spherical/polyhedral living parenchyma cells with intercellular air spaces',
        function: 'Packing tissue, storage of starch grains and water; allows gas diffusion',
        cambridgeTip: 'Ensure cortex is drawn with correct proportion—often occupying 15-20% of stem radius.'
      },
      {
        id: 'stem-sclerenchyma',
        name: 'Sclerenchyma Cap (Bundle Sheath Fibres)',
        location: 'Outer edge of each vascular bundle, crowning the phloem',
        appearanceInPlan: 'Distinct crescent / arch cap on the outer pole of each vascular bundle',
        structure: 'Elongated, dead cells with heavily lignified, thick secondary cell walls and narrow lumen',
        function: 'Provides high tensile strength and rigidity to resist bending forces from wind',
        cambridgeTip: 'Always label as "sclerenchyma fibres" or "sclerenchyma cap", NOT simply "fibres".'
      },
      {
        id: 'stem-phloem',
        name: 'Phloem',
        location: 'Outer part of vascular bundle, between sclerenchyma cap and vascular cambium',
        appearanceInPlan: 'Tissue region between sclerenchyma cap and the cambium line',
        structure: 'Composed of sieve tube elements, companion cells, phloem parenchyma, and fibers',
        function: 'Translocation of assimilates (sucrose, amino acids) from sources to sinks',
        cambridgeTip: 'Do not confuse phloem with xylem. Phloem is ALWAYS on the outer side in stems.'
      },
      {
        id: 'stem-cambium',
        name: 'Vascular Cambium',
        location: 'Between xylem and phloem in each bundle',
        appearanceInPlan: 'Narrow band or line separating xylem and phloem within the bundle',
        structure: 'Layer of active meristematic cells',
        function: 'Divides by mitosis to produce secondary xylem to the inside and secondary phloem to the outside',
        cambridgeTip: 'Draw as a thin discrete line separating xylem and phloem.'
      },
      {
        id: 'stem-xylem',
        name: 'Xylem',
        location: 'Inner part of vascular bundle, facing the pith',
        appearanceInPlan: 'Radial wedges or columns towards the centre with prominent large vessel lumens',
        structure: 'Xylem vessel elements with lignified cell walls and empty lumen, plus tracheids and xylem parenchyma',
        function: 'Transports water and dissolved mineral ions upwards from roots; provides structural support',
        cambridgeTip: 'Larger vessels (metaxylem) are outer to smaller initial vessels (protoxylem) towards the centre.'
      },
      {
        id: 'stem-pith',
        name: 'Pith (Medulla)',
        location: 'Central core of the stem',
        appearanceInPlan: 'Large circular central area within the ring of vascular bundles',
        structure: 'Large, rounded parenchyma cells with thin cellulose walls and large vacuoles',
        function: 'Storage of water, nutrients, and starch; maintains stem turgor',
        cambridgeTip: 'Usually constitutes a large proportion (>40%) of the diameter of young herbaceous dicot stems.'
      }
    ]
  },
  root: {
    id: 'root',
    name: 'Dicotyledonous Root TS',
    specimen: 'Herbaceous Dicotyledonous Root (e.g., Ranunculus)',
    description: 'In a herbaceous dicot root, the vascular tissue is concentrated in a tight central cylinder (stele). Xylem forms a central star/cross pattern with phloem groups in the grooves between the arms.',
    planRules: [
      'Draw the central stele in accurate proportion to the very thick cortex (stele is small, cortex is broad).',
      'Draw xylem as a central star or cross (usually 4 or 5 radiating arms).',
      'Draw phloem patches in the bays between the xylem arms.',
      'Include endodermis as a single ring encircling the stele, with pericycle immediately inside.',
      'Root hairs (piliferous layer) shown without internal cross walls.',
      'No cells drawn in tissue plan.'
    ],
    layers: [
      {
        id: 'root-epidermis',
        name: 'Piliferous Layer (Epidermis with Root Hairs)',
        location: 'Outermost layer of the root',
        appearanceInPlan: 'Single continuous outer line with occasional hair-like extensions',
        structure: 'Single layer of thin-walled cells; some epidermal cells develop tubular root hair outgrowths',
        function: 'Greatly increases surface area for absorption of water (by osmosis) and mineral ions (by active transport)',
        cambridgeTip: 'No cuticle present on root hairs, ensuring no barrier to rapid water uptake.'
      },
      {
        id: 'root-cortex',
        name: 'Root Cortex Parenchyma',
        location: 'Broad region occupying most of the root cross-section',
        appearanceInPlan: 'Extensive region between piliferous layer and central stele',
        structure: 'Large unspecialised parenchyma cells with large intercellular air spaces',
        function: 'Stores food (starch); provides apoplast and symplast pathways for water movement towards stele',
        cambridgeTip: 'Crucial for exams: Cortex represents >60-70% of root diameter in dicots.'
      },
      {
        id: 'root-endodermis',
        name: 'Endodermis with Casparian Strip',
        location: 'Innermost single-celled layer of the cortex enclosing the stele',
        appearanceInPlan: 'Distinct circle directly enclosing the central vascular cylinder',
        structure: 'Single layer of cells whose radial and transverse walls contain a band of suberin (Casparian strip)',
        function: 'Blocks the apoplast pathway, forcing water and dissolved mineral ions into the living symplast for selective regulation',
        cambridgeTip: 'High-frequency exam keyword: Suberin is waterproof / impermeable to water.'
      },
      {
        id: 'root-pericycle',
        name: 'Pericycle',
        location: 'Layer of cells immediately inside the endodermis',
        appearanceInPlan: 'Narrow ring just inside the endodermis outline',
        structure: 'Layer of parenchyma/meristematic cells',
        function: 'Gives rise to lateral (branch) roots and contributes to vascular cambium in secondary growth',
        cambridgeTip: 'Label between the endodermis and the xylem/phloem.'
      },
      {
        id: 'root-xylem',
        name: 'Xylem (Central Star / Cross)',
        location: 'Center of the stele',
        appearanceInPlan: 'Radiating star-shaped or cross-shaped central core',
        structure: 'Lignified vessel elements. Protoxylem with narrow vessels at tips of arms; metaxylem with wide vessels at centre',
        function: 'Transports water and minerals upwards to stem and leaves; provides central tensile strength against pulling forces',
        cambridgeTip: 'Exarch arrangement: protoxylem on the outside of arms, metaxylem at the center.'
      },
      {
        id: 'root-phloem',
        name: 'Phloem Patches',
        location: 'In the notches / bays between the radiating xylem arms',
        appearanceInPlan: 'Distinct rounded clusters between the arms of the xylem cross',
        structure: 'Sieve tube elements with companion cells',
        function: 'Translocates sucrose and amino acids downwards from the shoot to nourish root growing tips and storage cells',
        cambridgeTip: 'Never draw phloem at the very centre of a root—xylem occupies the central axis.'
      }
    ]
  },
  leaf: {
    id: 'leaf',
    name: 'Dicotyledonous Leaf TS',
    specimen: 'Dicotyledonous Leaf Midrib and Blade (e.g., Ligustrum)',
    description: 'A bifacial dicot leaf has dorsiventral organisation. The midrib houses a prominent vascular bundle where xylem is on the upper (adaxial) side and phloem is on the lower (abaxial) side.',
    planRules: [
      'Draw upper and lower epidermis as single lines.',
      'Show the distinctive palisade mesophyll layer under upper epidermis (about 1/3 to 1/2 of leaf blade thickness).',
      'Show spongy mesophyll with extensive intercellular spaces.',
      'In the midrib vascular bundle, XYLEM MUST BE UPPER (adaxial), PHLOEM LOWER (abaxial).',
      'Show bundle sheath surrounding the vascular bundle and collenchyma supporting the midrib.',
      'Include stomata on lower epidermis.'
    ],
    layers: [
      {
        id: 'leaf-upper-cuticle',
        name: 'Upper Cuticle & Epidermis',
        location: 'Top surface of leaf',
        appearanceInPlan: 'Continuous flat upper boundary line',
        structure: 'Single layer of transparent cells coated with thick hydrophobic waxy cuticle; virtually no chloroplasts or stomata',
        function: 'Reduces cuticular water loss; protects inner mesophyll; allows light penetration to palisade cells',
        cambridgeTip: 'Thick cuticle is a primary adaptation against desiccation.'
      },
      {
        id: 'leaf-palisade',
        name: 'Palisade Mesophyll',
        location: 'Upper half of leaf blade, beneath upper epidermis',
        appearanceInPlan: 'Regular vertical band bounded by upper epidermis and lower spongy mesophyll',
        structure: 'Closely packed, columnar (rod-shaped) cells rich in chloroplasts; small intercellular air spaces',
        function: 'Primary site of photosynthesis; columnar shape facilitates light absorption along cell length',
        cambridgeTip: 'Do not draw individual columnar cells in a plan diagram—draw only the upper and lower boundary lines.'
      },
      {
        id: 'leaf-spongy',
        name: 'Spongy Mesophyll',
        location: 'Lower half of leaf blade, above lower epidermis',
        appearanceInPlan: 'Irregular zone between palisade mesophyll and lower epidermis',
        structure: 'Loosely arranged, irregularly shaped cells with large intercellular air spaces',
        function: 'Allows rapid gas exchange (CO2 and O2) and provides large moist surface area for evaporation of water into air spaces',
        cambridgeTip: 'Evaporation happens from the wet surfaces of spongy mesophyll cell walls!'
      },
      {
        id: 'leaf-midrib-bundle',
        name: 'Midrib Vascular Bundle',
        location: 'Centered inside the midrib bulge',
        appearanceInPlan: 'Prominent circular or crescent-shaped bundle surrounded by bundle sheath',
        structure: 'Contains upper xylem vessels and lower phloem sieve tubes, supported by collenchyma/parenchyma',
        function: 'Delivers water and mineral ions via xylem; exports manufactured sugars via phloem',
        cambridgeTip: 'MEMORISE: Xylem = Top (adaxial), Phloem = Bottom (abaxial). Confusing these is the #1 leaf error!'
      },
      {
        id: 'leaf-xylem',
        name: 'Leaf Xylem',
        location: 'Upper part of midrib vascular bundle',
        appearanceInPlan: 'Upper portion of the midrib bundle with thick-walled vessel outlines',
        structure: 'Lignified vessel elements running continuously from stem',
        function: 'Transports water and dissolved minerals to all mesophyll cells for turgidity and photosynthesis',
        cambridgeTip: 'Water moves out of xylem vessels into spongy mesophyll cell walls down a water potential gradient.'
      },
      {
        id: 'leaf-phloem',
        name: 'Leaf Phloem',
        location: 'Lower part of midrib vascular bundle',
        appearanceInPlan: 'Lower portion of the midrib bundle',
        structure: 'Sieve tube elements and companion cells',
        function: 'Loads sucrose synthesized by photosynthetic mesophyll cells and exports it to sinks',
        cambridgeTip: 'Positioned towards the abaxial (lower) surface.'
      },
      {
        id: 'leaf-lower-epidermis',
        name: 'Lower Epidermis & Stomata',
        location: 'Bottom surface of leaf',
        appearanceInPlan: 'Continuous bottom line with small interruptions representing stomatal pores',
        structure: 'Single layer of cells with numerous stomatal pores, each flanked by a pair of guard cells',
        function: 'Regulates transpiration and gas exchange; guard cells change shape to open or close stomata',
        cambridgeTip: 'Cambridge mark schemes reward noting that stomata are predominantly on the lower surface to reduce exposure to direct sunlight and wind.'
      }
    ]
  }
};

export const ULTRASTRUCTURE_DATA = {
  xylem: {
    title: 'Xylem Vessel Elements',
    subheading: 'Specialised for low-resistance water transport & mechanical support',
    features: [
      {
        feature: 'Dead cells with empty lumen (no cytoplasm, nucleus, or organelles)',
        adaptation: 'Creates a hollow tube with no living protoplast to obstruct the longitudinal flow of water and mineral ions.'
      },
      {
        feature: 'End walls completely broken down (perforation plates absent/lost)',
        adaptation: 'Forms a continuous, uninterrupted non-living tube allowing continuous mass flow of water under tension without barriers.'
      },
      {
        feature: 'Cell walls heavily impregnated with lignin',
        adaptation: 'Provides immense tensile strength and rigidity, preventing vessels from collapsing inward under extreme negative hydrostatic pressure (tension) generated by transpiration pull. Also provides waterproof lining and mechanical support to the plant stem.'
      },
      {
        feature: 'Lignification patterns: annular (rings), spiral, reticulate, pitted',
        adaptation: 'Annular and spiral patterns allow elongation of young stems during growth; reticulate and pitted walls provide maximum support in mature tissues.'
      },
      {
        feature: 'Pits (unlignified areas where only primary cellulose wall remains)',
        adaptation: 'Allows lateral movement of water and dissolved minerals between adjacent vessels, and bypasses gas airlocks (cavitation).'
      },
      {
        feature: 'Narrow diameter (approx. 15 to 200 µm)',
        adaptation: 'Prevents the water column from breaking (cavitation); increases adhesion of water molecules to hydrophilic xylem walls, supporting the water column.'
      }
    ],
    cambridgeWarning: 'Do NOT say "xylem is a dead tissue". Say "xylem vessel elements are dead cells at maturity". Lignin prevents collapse under tension (not bursting!).'
  },
  phloemSieve: {
    title: 'Phloem Sieve Tube Elements',
    subheading: 'Specialised for mass flow of assimilates (sucrose & amino acids)',
    features: [
      {
        feature: 'Living cells with thin peripheral layer of cytoplasm and no nucleus, ribosomes, or Golgi apparatus',
        adaptation: 'Greatly reduces resistance to the mass flow of phloem sap while maintaining cell membrane integrity for osmotic retention.'
      },
      {
        feature: 'End walls perforated into sieve plates with sieve pores',
        adaptation: 'Permits continuous mass flow of phloem sap from one sieve tube element to the next, while retaining structural support against pressure differences.'
      },
      {
        feature: 'Cell walls made of cellulose (no lignin)',
        adaptation: 'Allows flexibility and maintains permeability for osmotic water entry and lateral plasmodesmatal connections.'
      },
      {
        feature: 'Elongated cells joined end-to-end',
        adaptation: 'Creates continuous transport tubes running from leaves (sources) to roots/fruits (sinks).'
      }
    ],
    cambridgeWarning: 'Sieve tube elements are LIVING cells! They have a plasma membrane, mitochondria, and cytoplasm, but LACK a nucleus and vacuoles at maturity.'
  },
  companionCell: {
    title: 'Companion Cells',
    subheading: 'Metabolic life-support and active loading machinery for sieve tubes',
    features: [
      {
        feature: 'Abundant mitochondria with extensive cristae',
        adaptation: 'Produces large quantities of ATP via oxidative phosphorylation to fuel the active pumping of H+ protons out into the cell wall by H+-ATPase pumps.'
      },
      {
        feature: 'Dense cytoplasm with large prominent nucleus and numerous ribosomes',
        adaptation: 'High rate of protein synthesis to manufacture transport proteins (proton pumps, H+/sucrose cotransporters) and enzymes needed by itself and the connected sieve tube element.'
      },
      {
        feature: 'Numerous plasmodesmata connecting to sieve tube elements',
        adaptation: 'Provides direct symplastic cytoplasmic channels for rapid diffusion of loaded sucrose into the sieve tube lumen.'
      },
      {
        feature: 'Folded cell surface membrane (in transfer cells)',
        adaptation: 'Greatly expands surface area available for H+-ATPase pumps and H+/sucrose cotransporter carrier proteins, accelerating loading rate.'
      }
    ],
    cambridgeWarning: 'Companion cells and sieve tube elements originate from the SAME mother meristematic cell by unequal cell division!'
  }
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Water Potential (Ψ)',
    definition: 'The tendency of water molecules to move from one place to another; pure water at 20°C and atmospheric pressure has a water potential of zero (0 kPa). Solutes always lower water potential, making it negative.',
    syllabusRef: '7.2(a)',
    formulaOrRule: 'Ψ = Ψs + Ψp (Water moves from higher/less negative Ψ to lower/more negative Ψ)'
  },
  {
    term: 'Solute Potential (Ψs)',
    definition: 'The contribution of dissolved solute molecules to water potential. Adding solutes lowers the concentration of free water molecules, making solute potential always zero or negative.',
    syllabusRef: '7.2(a)',
    formulaOrRule: 'Pure water: Ψs = 0; Solution: Ψs < 0'
  },
  {
    term: 'Pressure Potential (Ψp)',
    definition: 'The hydrostatic pressure exerted on a cell contents by the rigid cell wall as water enters by osmosis. In turgid cells it is positive (+); in flaccid/plasmolysed cells it is 0 kPa.',
    syllabusRef: '7.2(a)',
    formulaOrRule: 'Turgid: Ψp > 0; Incipient plasmolysis: Ψp = 0'
  },
  {
    term: 'Apoplast Pathway',
    definition: 'The route by which water and dissolved mineral ions travel through cell walls and intercellular spaces by mass flow, without crossing any cell surface membranes. Blocked at the endodermis by the Casparian strip.',
    syllabusRef: '7.2(b)',
    formulaOrRule: 'Cell wall matrix pathway -> Blocked by suberin'
  },
  {
    term: 'Symplast Pathway',
    definition: 'The route by which water and solutes move through the cytoplasm of living cells, passing from cell to cell via cytoplasmic channels called plasmodesmata.',
    syllabusRef: '7.2(b)',
    formulaOrRule: 'Living cytoplasm + plasmodesmata pathway'
  },
  {
    term: 'Casparian Strip',
    definition: 'An impermeable, waterproof band of suberin embedded in the radial and transverse walls of endodermal cells in roots. It blocks the apoplast pathway, forcing water and ions into the symplast.',
    syllabusRef: '7.2(b)',
    formulaOrRule: 'Suberin band -> Forces apoplast into symplast'
  },
  {
    term: 'Cohesion',
    definition: 'The attraction between like molecules; in water, hydrogen bonding between water molecules keeps the continuous column of water intact under tension in xylem vessels.',
    syllabusRef: '7.2(c)',
    formulaOrRule: 'Hydrogen bonds between water molecules'
  },
  {
    term: 'Adhesion',
    definition: 'The attraction between unlike molecules; water molecules form hydrogen bonds with the hydrophilic cellulose and lignin components of xylem vessel walls.',
    syllabusRef: '7.2(c)',
    formulaOrRule: 'Hydrogen bonds between water and hydrophilic xylem wall'
  },
  {
    term: 'Transpiration Pull',
    definition: 'The pulling force generated at the leaf surface when water evaporates from mesophyll cell walls into air spaces and diffuses out stomata, creating negative hydrostatic pressure (tension) in leaf xylem.',
    syllabusRef: '7.2(c)',
    formulaOrRule: 'Evaporation -> Meniscus curvature -> Tension pull'
  },
  {
    term: 'Translocation',
    definition: 'The transport of assimilates (mainly sucrose and amino acids) in phloem sieve tubes from sources to sinks throughout the plant.',
    syllabusRef: '7.2(f)',
    formulaOrRule: 'Bidirectional assimilate movement in phloem'
  },
  {
    term: 'Source',
    definition: 'A site in a plant where assimilates are produced or released from storage (e.g., mature photosynthesising leaves, germinating seeds, sprouting potato tubers).',
    syllabusRef: '7.2(f)'
  },
  {
    term: 'Sink',
    definition: 'A site in a plant where assimilates are utilised or stored (e.g., growing root tips, shoot apical meristems, developing flowers, fruits, seeds, developing tubers).',
    syllabusRef: '7.2(f)'
  },
  {
    term: 'Mass Flow',
    definition: 'The bulk movement of a liquid and its dissolved solutes down a hydrostatic pressure gradient, where all components move together at the same velocity.',
    syllabusRef: '7.2(g)',
    formulaOrRule: 'Driven by hydrostatic pressure differences (High -> Low)'
  },
  {
    term: 'Potometer',
    definition: 'An apparatus used to measure the rate of water uptake by a cut leafy shoot, providing an indirect estimate of transpiration rate.',
    syllabusRef: '7.2(d)',
    formulaOrRule: 'Water uptake rate = (π × r² × d) / time'
  }
];
