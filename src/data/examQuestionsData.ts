import { MCQQuestion, StructuredQuestion } from '../types/biology';

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: 'mcq-1',
    learningObjectiveId: '7.1.b',
    question: 'Which row correctly identifies the distribution of xylem and phloem tissues in a transverse section of a herbaceous dicotyledonous stem and root?',
    options: [
      { id: 'A', text: 'Stem: Peripheral ring with xylem on the inside and phloem on the outside; Root: Central star of xylem with phloem in between the arms.' },
      { id: 'B', text: 'Stem: Scattered vascular bundles throughout the ground tissue; Root: Central ring of phloem surrounding a central core of xylem.' },
      { id: 'C', text: 'Stem: Peripheral ring with phloem on the inside and xylem on the outside; Root: Central star of phloem with xylem in between the arms.' },
      { id: 'D', text: 'Stem: Central cylinder with xylem surrounded by phloem; Root: Peripheral ring of vascular bundles.' }
    ],
    correctOptionId: 'A',
    explanation: 'In dicot stems, vascular bundles form a peripheral ring near the epidermis, with xylem on the inside (centripetal) and phloem on the outside (centrifugal), capped with sclerenchyma fibres. In dicot roots, xylem occupies the central core arranged as a 4 or 5-pointed star/cross, with phloem clusters nestled between the arms.',
    examinerComment: 'A very common exam error is confusing the orientation in stems. Remember: Phloem is closer to the Phoreign/outside (P for Periphery), while Xylem is towards the centre!'
  },
  {
    id: 'mcq-2',
    learningObjectiveId: '7.1.c',
    question: 'Which structural feature of a xylem vessel element is correctly paired with its functional significance?',
    options: [
      { id: 'A', text: 'Thick lignified secondary walls prevent the vessel from collapsing inward when negative hydrostatic pressure is generated.' },
      { id: 'B', text: 'Sieve plates with pores allow rapid diffusion of sucrose without osmotic hindrance.' },
      { id: 'C', text: 'Peripheral layer of living cytoplasm facilitates active proton pumping into the lumen.' },
      { id: 'D', text: 'End walls with numerous plasmodesmata allow lateral movement of water between adjacent vessels.' }
    ],
    correctOptionId: 'A',
    explanation: 'Transpiration generates a pulling force (tension / negative hydrostatic pressure) inside xylem vessels. Without the rigid, lignified walls, the vessels would be sucked inward and collapse. Note that xylem vessel elements are dead and end walls are completely broken down, not perforated with plasmodesmata.',
    examinerComment: 'Examiners frequently highlight that lignin prevents COLLAPSE under tension, NOT bursting. Bursting would only happen under positive hydrostatic pressure (like in phloem).'
  },
  {
    id: 'mcq-3',
    learningObjectiveId: '7.2.a',
    question: 'A plant cell with a solute potential (Ψs) of -750 kPa and a pressure potential (Ψp) of +350 kPa is placed in a sucrose solution of water potential (Ψ) = -600 kPa. In which direction will net water movement occur, and what will happen to the cell?',
    options: [
      { id: 'A', text: 'Net water moves out of the cell because cell Ψ (-400 kPa) is higher (less negative) than external solution Ψ (-600 kPa).' },
      { id: 'B', text: 'Net water moves into the cell because cell Ψ (-400 kPa) is lower (more negative) than external solution Ψ (-600 kPa).' },
      { id: 'C', text: 'Net water moves into the cell because solute potential of the cell is more negative than the external solution.' },
      { id: 'D', text: 'There is no net movement of water because the cell is already at equilibrium with the solution.' }
    ],
    correctOptionId: 'A',
    explanation: 'First calculate cell water potential: Ψcell = Ψs + Ψp = (-750 kPa) + (+350 kPa) = -400 kPa. The external solution has Ψsol = -600 kPa. Water always moves down a water potential gradient from higher (less negative, -400 kPa) to lower (more negative, -600 kPa). Therefore, water leaves the cell by osmosis.',
    examinerComment: 'Always calculate Ψcell = Ψs + Ψp first! Remember that -400 kPa is a HIGHER (less negative) water potential than -600 kPa. Never judge movement by Ψs alone when a cell wall is present.'
  },
  {
    id: 'mcq-4',
    learningObjectiveId: '7.2.b',
    question: 'What is the exact biological function of the Casparian strip in the endodermis of a plant root?',
    options: [
      { id: 'A', text: 'It contains impermeable suberin in radial and transverse walls that blocks the apoplast pathway, forcing water and dissolved mineral ions through the selectively permeable cell surface membrane of endodermal cells.' },
      { id: 'B', text: 'It contains lignin that increases the rate of mass flow of water through the cell wall matrix into the xylem vessels.' },
      { id: 'C', text: 'It secretes active transport enzymes that pump water directly into the xylem vessels against a water potential gradient.' },
      { id: 'D', text: 'It provides mechanical flexibility to allow lateral root branch emergence without tearing cortex parenchyma.' }
    ],
    correctOptionId: 'A',
    explanation: 'The Casparian strip is a waterproof band of suberin in the radial and transverse walls of endodermal cells. It blocks the non-living apoplast pathway (through cell walls), forcing water and dissolved mineral ions into the living symplast (cytoplasm) through the selectively permeable cell surface membrane, enabling the plant to regulate ion entry into the stele.',
    examinerComment: 'Key Cambridge marking words: "suberin", "impermeable / waterproof", "blocks apoplast", "forces into symplast / cytoplasm", "selectively permeable membrane / regulation".'
  },
  {
    id: 'mcq-5',
    learningObjectiveId: '7.2.c',
    question: 'How do cohesion and adhesion contribute to the transpiration stream in the xylem according to the cohesion-tension theory?',
    options: [
      { id: 'A', text: 'Cohesion is hydrogen bonding between water molecules maintaining an unbroken water column; adhesion is hydrogen bonding between water molecules and hydrophilic xylem wall components.' },
      { id: 'B', text: 'Cohesion is attraction between water and xylem walls; adhesion is attraction between adjacent water molecules.' },
      { id: 'C', text: 'Cohesion pumps water actively into root hairs; adhesion allows water vapour to condense in stomatal cavities.' },
      { id: 'D', text: 'Cohesion prevents air bubbles from forming; adhesion generates positive hydrostatic pressure from roots.' }
    ],
    correctOptionId: 'A',
    explanation: 'Cohesion refers to intermolecular attraction between like molecules (hydrogen bonds between delta-positive hydrogen and delta-negative oxygen of neighboring water molecules), forming a continuous unbroken tensile column. Adhesion refers to attraction between water molecules and hydrophilic molecules (cellulose and lignin) in xylem cell walls, preventing the column from slipping down.',
    examinerComment: 'Do not mix up cohesion and adhesion! C = Co-workers stick together (water to water); Ad = Adding to wall (water to xylem wall).'
  },
  {
    id: 'mcq-6',
    learningObjectiveId: '7.2.d',
    question: 'A student uses a capillary potometer to investigate water uptake by a leafy shoot. Which precaution is essential to prevent airlocks in the xylem and ensure valid measurements?',
    options: [
      { id: 'A', text: 'Cut the stem under water and assemble the potometer completely submerged under water.' },
      { id: 'B', text: 'Coat all leaf surfaces with petroleum jelly before attaching the shoot.' },
      { id: 'C', text: 'Ensure the capillary tube diameter is at least 10 mm to avoid meniscus resistance.' },
      { id: 'D', text: 'Keep the leafy shoot in total darkness for 24 hours prior to the experiment.' }
    ],
    correctOptionId: 'A',
    explanation: 'Cutting the stem under water prevents air from being drawn into the severed xylem vessels by negative tension. Assembling the apparatus under water ensures there are no trapped air bubbles that could break the capillary water column or create airlocks. Petroleum jelly is used to seal apparatus joints, NOT the leaves!',
    examinerComment: 'Examiners often ask why cutting under water is essential: cutting in air allows air to be drawn into xylem vessels by tension, causing cavitation and preventing water uptake.'
  },
  {
    id: 'mcq-7',
    learningObjectiveId: '7.2.e',
    question: 'Marram grass (Ammophila arenaria) survives in sand dunes with extreme drought. Which combination of adaptations reduces its rate of transpiration?',
    options: [
      { id: 'A', text: 'Leaves roll up due to flaccid hinge cells, trapping humid air; stomata are sunken in pits with epidermal hairs (trichomes).' },
      { id: 'B', text: 'Broad thin leaves with high surface area to volume ratio and high stomatal density on upper epidermis.' },
      { id: 'C', text: 'Extensive thin cuticle allowing rapid cuticular transpiration to cool the leaf in bright sunlight.' },
      { id: 'D', text: 'Absence of sclerenchyma allowing leaves to wilt flat against the hot sand.' }
    ],
    correctOptionId: 'A',
    explanation: 'In dry windy conditions, hinge cells lose water and become flaccid, causing the leaf to roll with the lower/inner surface enclosed. This traps a microclimate of humid air around the sunken stomata. Trichomes (hairs) slow air currents, maintaining a shallow water vapour potential gradient between inside and outside.',
    examinerComment: 'Examiners expect candidates to state that trapped humid air decreases the water vapour potential gradient between the intercellular air spaces and the outside air!'
  },
  {
    id: 'mcq-8',
    learningObjectiveId: '7.2.g',
    question: 'During active phloem loading in a source leaf, how does sucrose enter the companion cell?',
    options: [
      { id: 'A', text: 'H+ ions are actively pumped out using ATP; H+ then diffuses back down its electrochemical gradient through a cotransporter protein, carrying sucrose against its concentration gradient.' },
      { id: 'B', text: 'Sucrose is actively pumped out of the companion cell by an ATP-driven sucrose pump.' },
      { id: 'C', text: 'Sucrose enters solely by simple diffusion down its concentration gradient through open stomatal pores.' },
      { id: 'D', text: 'Water moves into the companion cell by osmosis, washing sucrose through channel proteins by bulk flow.' }
    ],
    correctOptionId: 'A',
    explanation: 'Active phloem loading is a two-step secondary active transport mechanism: 1) H+-ATPase proton pumps actively transport H+ ions out of the companion cell into the cell wall using ATP, creating a high H+ concentration and electrochemical gradient. 2) H+ ions diffuse back into the companion cell down this gradient through a cotransporter carrier protein, simultaneously transporting sucrose molecules with them against sucrose\'s concentration gradient.',
    examinerComment: 'Remember: it is a co-transporter (symporter), not a simple sucrose pump! The direct ATP consumption is by the proton pump.'
  }
];

export const STRUCTURED_QUESTIONS: StructuredQuestion[] = [
  {
    id: 'struct-1',
    title: 'Transverse Section of Dicot Root & Water Pathways',
    totalMarks: 9,
    context: 'Fig. 1.1 represents a photomicrograph of a transverse section (TS) through the root of a dicotyledonous plant.',
    diagramType: 'root-ts',
    syllabusCode: '7.1(a), 7.1(b), 7.2(b)',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'State two features that distinguish the arrangement of vascular tissues in a dicotyledonous root from that in a dicotyledonous stem.',
        marks: 2,
        modelAnswer: '1. In the root, xylem is located in the central core as a star/cross shape, whereas in the stem, xylem is located on the inner side of discrete vascular bundles arranged in a peripheral ring.\n2. In the root, phloem is located in clusters between the radiating xylem arms, whereas in the stem, phloem is located on the outer side of each vascular bundle capped by sclerenchyma fibres.',
        markSchemePoints: [
          { point: 'Root xylem is central / star-shaped / cross-shaped; stem xylem is in a peripheral ring / in bundles', keyword: 'central star vs peripheral ring' },
          { point: 'Root phloem is in patches between xylem arms; stem phloem is in bundles outer to xylem / with cambium between', keyword: 'phloem between arms vs outer in bundles' }
        ],
        examinerReportSnippet: 'Candidates who described root vascular tissue as a "central cylinder or stele" and stem as "vascular bundles arranged in a ring" scored both marks. Credit was withheld if candidates stated stem bundles are scattered (a monocot feature).'
      },
      {
        partLabel: '(b)',
        questionText: 'Explain how water moves from the soil solution into a root hair cell down a water potential gradient.',
        marks: 3,
        modelAnswer: 'Root hair cells actively absorb mineral ions from the soil solution using ATP and carrier proteins. This accumulates solutes inside the cell cytoplasm and vacuole, lowering the water potential (making Ψ more negative) of the root hair cell compared to the soil solution (which has a higher / less negative Ψ). Water moves down the water potential gradient across the partially permeable cell surface membrane by osmosis.',
        markSchemePoints: [
          { point: 'Active transport / uptake of mineral ions into root hair cell using ATP / carrier proteins', keyword: 'active uptake of ions' },
          { point: 'Lowers water potential (Ψ) of root hair cell cytoplasm / makes Ψ more negative than soil solution', keyword: 'lowers Ψ / more negative Ψ' },
          { point: 'Water moves into root hair cell by osmosis across selectively / partially permeable membrane down water potential gradient', keyword: 'osmosis across partially permeable membrane' }
        ],
        examinerReportSnippet: 'Many candidates lost marks by writing "down a water concentration gradient". The syllabus strictly requires the terminology "down a water potential gradient".'
      },
      {
        partLabel: '(c)',
        questionText: 'Describe the apoplast pathway across the root cortex and explain the significance of the Casparian strip in regulating solute entry into xylem vessels.',
        marks: 4,
        modelAnswer: 'In the apoplast pathway, water and dissolved mineral ions move through the cellulose cell walls and intercellular spaces by mass flow / cohesion without crossing any cell membranes.\nWhen water reaches the endodermis, the apoplast pathway is completely blocked by the Casparian strip, which is an impermeable band of suberin in the radial and transverse cell walls.\nThis forces water and dissolved mineral ions into the living symplast (cytoplasm) across the selectively permeable cell surface membrane of endodermal cells.\nThis allows the plant to regulate / control which mineral ions enter the xylem and prevents toxic ions from entering or essential ions from leaking back out.',
        markSchemePoints: [
          { point: 'Apoplast: movement through cell walls / intercellular spaces / non-living matrix', keyword: 'cell walls and intercellular spaces' },
          { point: 'Casparian strip contains suberin which is waterproof / impermeable to water', keyword: 'suberin waterproof band' },
          { point: 'Blocks apoplast, forcing water and solutes into symplast / cytoplasm / across cell membrane', keyword: 'forces into symplast / protoplast' },
          { point: 'Membrane allows selective regulation / transport of ions / prevents backflow into cortex', keyword: 'selective regulation / prevents backflow' }
        ],
        examinerReportSnippet: 'Excellent answers explicitly identified "suberin" and stated that forcing water across the cell surface membrane allows carrier proteins to selectively control which ions enter the stele.'
      }
    ]
  },
  {
    id: 'struct-2',
    title: 'Transpiration Stream, Cohesion-Tension & Potometer Investigation',
    totalMarks: 10,
    context: 'A group of students used a bubble potometer to investigate the effect of air movement (wind speed) on the rate of water uptake in a leafy twig of Prunus laurocerasus.',
    diagramType: 'potometer-apparatus',
    syllabusCode: '7.2(c), 7.2(d)',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Outline the cohesion-tension theory to explain how water travels from the root xylem up to the leaves in tall trees.',
        marks: 4,
        modelAnswer: '1. Water evaporates from the wet cell walls of spongy mesophyll cells into intercellular air spaces and diffuses out through open stomata into the atmosphere down a water vapour potential gradient (transpiration).\n2. This loss of water lowers the hydrostatic pressure / creates tension at the top of xylem vessels in the leaf (transpiration pull).\n3. Water molecules form hydrogen bonds with each other (cohesion), creating a continuous, unbroken column of water extending from roots to leaves.\n4. Water molecules also form hydrogen bonds with hydrophilic cellulose and lignin in xylem walls (adhesion), supporting the column against gravity. The whole column is pulled upwards by negative hydrostatic pressure (tension).',
        markSchemePoints: [
          { point: 'Evaporation from mesophyll cell walls into air spaces creates transpiration pull / tension / negative hydrostatic pressure', keyword: 'transpiration pull / tension' },
          { point: 'Cohesion: hydrogen bonds between water molecules maintain continuous / unbroken water column', keyword: 'cohesion / hydrogen bonds between water molecules' },
          { point: 'Adhesion: hydrogen bonds between water molecules and hydrophilic xylem wall (cellulose / lignin)', keyword: 'adhesion to xylem wall' },
          { point: 'Mass flow of water pulled upward under tension / down hydrostatic pressure gradient', keyword: 'unbroken column pulled up under tension' }
        ],
        examinerReportSnippet: 'Marks were lost when candidates failed to state that cohesion is due to hydrogen bonding between water molecules, or confused cohesion with adhesion.'
      },
      {
        partLabel: '(b)',
        questionText: 'State two precautions the students should take when setting up the potometer to ensure valid measurements.',
        marks: 2,
        modelAnswer: '1. Cut the shoot underwater at an angle to prevent air being drawn into the xylem vessels by tension, ensuring an unbroken water column and maximizing surface area for uptake.\n2. Seal all apparatus joints with petroleum jelly (Vaseline) to ensure an airtight, watertight seal so no air leaks enter the system.',
        markSchemePoints: [
          { point: 'Cut shoot underwater / at an angle to prevent air entering xylem / breaking water column', keyword: 'cut underwater' },
          { point: 'Seal joints with petroleum jelly / Vaseline to prevent air leaks / airtight seal', keyword: 'airtight seal / petroleum jelly' },
          { point: 'Dry the leaves before taking measurements so evaporation is not hindered', keyword: 'dry leaves' },
          { point: 'Allow plant time to equilibrate / acclimatise before recording', keyword: 'equilibration time' }
        ],
        examinerReportSnippet: 'Giving the reason alongside the precaution was well rewarded. "Seal with Vaseline" without stating "to make airtight" received partial credit on some mark schemes.'
      },
      {
        partLabel: '(c)',
        questionText: 'Explain why the rate of water uptake measured by a potometer is NOT exactly equal to the rate of transpiration.',
        marks: 2,
        modelAnswer: 'Not all water taken up by the plant is transpired into the atmosphere. Approximately 1-2% of absorbed water is utilised in photosynthesis (as a raw material for photolysis) and water is retained inside cells to maintain turgidity and cell expansion.',
        markSchemePoints: [
          { point: 'Some water is used in photosynthesis / metabolic reactions / photolysis', keyword: 'used in photosynthesis / metabolic reactions' },
          { point: 'Some water is retained in cells for turgor / cell enlargement / growth', keyword: 'retained for turgor / cell expansion' }
        ],
        examinerReportSnippet: 'Candidates scored full marks if they named photosynthesis and cell turgidity/growth as uses of absorbed water.'
      },
      {
        partLabel: '(d)',
        questionText: 'Explain the effect of increased wind speed on the rate of water uptake by the leafy shoot.',
        marks: 2,
        modelAnswer: 'Increased wind speed blows away the layer of still, humid air (boundary layer) surrounding the leaf surface and stomata. This maintains a steep water vapour concentration / potential gradient between the intercellular air spaces inside the leaf and the external atmosphere, resulting in a higher rate of diffusion of water vapour through stomata, and thus a higher rate of water uptake.',
        markSchemePoints: [
          { point: 'Wind blows away boundary layer / humid air layer around leaf / stomata', keyword: 'removes boundary layer / humid air' },
          { point: 'Maintains steep water vapour potential / concentration gradient between inside leaf and atmosphere', keyword: 'steep water vapour potential gradient' }
        ],
        examinerReportSnippet: 'Examiners noted that referring to the "boundary layer" or "layer of moist air" showed high-level understanding.'
      }
    ]
  },
  {
    id: 'struct-3',
    title: 'Phloem Loading, Mass Flow & Source-to-Sink Transport',
    totalMarks: 8,
    context: 'Assimilates such as sucrose and amino acids are transported in phloem sieve tubes according to the mass flow hypothesis.',
    diagramType: 'phloem-loading',
    syllabusCode: '7.2(f), 7.2(g)',
    parts: [
      {
        partLabel: '(a)',
        questionText: 'Explain how sucrose is actively loaded into companion cells in a source leaf against its concentration gradient.',
        marks: 4,
        modelAnswer: '1. H+-ATPase proton pumps in the cell surface membrane of companion cells actively pump hydrogen ions (H+ / protons) out of the companion cell into the cell wall using energy from ATP hydrolysis.\n2. This creates a steep electrochemical / concentration gradient of H+ ions (higher outside in the cell wall than inside the cytoplasm).\n3. H+ ions diffuse back into the companion cell down their concentration gradient through a cotransporter (carrier protein).\n4. As H+ ions pass through, sucrose molecules are simultaneously transported into the companion cell with H+ against the concentration gradient of sucrose (secondary active transport).',
        markSchemePoints: [
          { point: 'Proton pump / H+-ATPase pumps H+ / protons out of companion cell into cell wall using ATP', keyword: 'H+ pumped out using ATP' },
          { point: 'Generates steep H+ concentration / electrochemical gradient outside cell', keyword: 'H+ electrochemical gradient' },
          { point: 'H+ diffuses back in down gradient through cotransporter protein', keyword: 'H+ diffuses back through cotransporter' },
          { point: 'Sucrose transported with H+ against sucrose concentration gradient', keyword: 'sucrose cotransported against gradient' }
        ],
        examinerReportSnippet: 'Clear step-by-step descriptions that distinguished the primary active pump (ATP-driven proton pump) from the secondary cotransporter gained all 4 marks.'
      },
      {
        partLabel: '(b)',
        questionText: 'Explain how mass flow of phloem sap occurs from the source to the sink along the sieve tube.',
        marks: 4,
        modelAnswer: '1. Sucrose moves from companion cells into sieve tube elements through plasmodesmata, lowering the water potential (making Ψ more negative) inside the sieve tube at the source.\n2. Water enters the sieve tube from adjacent xylem vessels by osmosis down a water potential gradient.\n3. The entry of water generates a high hydrostatic pressure inside the sieve tube at the source.\n4. At the sink, sucrose is unloaded and converted to starch or respired, increasing water potential so water leaves by osmosis, creating low hydrostatic pressure.\n5. Phloem sap moves by mass flow down the hydrostatic pressure gradient from source to sink.',
        markSchemePoints: [
          { point: 'Sucrose enters sieve tube via plasmodesmata, lowering water potential (Ψ)', keyword: 'sucrose lowers water potential' },
          { point: 'Water enters from xylem by osmosis, creating high hydrostatic pressure at source', keyword: 'water enters by osmosis, high hydrostatic pressure' },
          { point: 'At sink sucrose is removed, water exits, resulting in low hydrostatic pressure', keyword: 'unloading creates low hydrostatic pressure' },
          { point: 'Mass flow of solution down hydrostatic pressure gradient from source to sink', keyword: 'mass flow down hydrostatic pressure gradient' }
        ],
        examinerReportSnippet: 'Crucial distinction: water movement is driven by water potential gradient (osmosis), while bulk phloem sap movement is driven by HYDROSTATIC pressure gradient (mass flow).'
      }
    ]
  }
];

export const COMMON_EXAM_ERRORS = [
  {
    trap: 'Saying "water moves from high concentration to low concentration"',
    correction: 'Always say: "Water moves down a water potential gradient from a higher (less negative) water potential to a lower (more negative) water potential across a partially permeable membrane by osmosis".',
    whyExaminerPenalizes: 'Water is a solvent, not a solute. Concentration refers to solute particles per unit volume. The syllabus requires water potential (Ψ).'
  },
  {
    trap: 'Stating that "a potometer measures the rate of transpiration"',
    correction: 'A potometer measures the rate of WATER UPTAKE by the cut shoot. It is an indirect estimate because ~1-2% of water is used in photosynthesis or retained for cell turgidity.',
    whyExaminerPenalizes: 'Precision of scientific language in practical papers (Paper 3) and theory (Paper 1 & 2).'
  },
  {
    trap: 'Drawing individual cells in a low-power plan diagram',
    correction: 'In a plan diagram (low-power), draw ONLY tissue boundaries using single, unbroken pencil lines. Never draw single cells or shade tissue layers unless specified.',
    whyExaminerPenalizes: 'Rule of biological drawing: high power = cell details; low power = tissue distribution plans.'
  },
  {
    trap: 'Confusing cohesion with adhesion',
    correction: 'Cohesion = Attraction between water molecules via hydrogen bonds (maintains continuous water column). Adhesion = Attraction between water molecules and hydrophilic xylem wall (cellulose/lignin).',
    whyExaminerPenalizes: 'These are distinct physical phenomena with specific roles in the cohesion-tension theory.'
  },
  {
    trap: 'Claiming that phloem flow is driven by a water potential gradient',
    correction: 'Water enters phloem by osmosis down a water potential gradient, but mass flow of sap along the sieve tube is driven by a HYDROSTATIC PRESSURE GRADIENT (from high pressure at source to low pressure at sink).',
    whyExaminerPenalizes: 'Mass flow moves both water and solute molecules together at the same velocity due to hydrostatic pressure differences.'
  },
  {
    trap: 'Thinking xylem vessel elements are living cells with nuclei',
    correction: 'Xylem vessel elements are non-living (dead) at maturity with completely dissolved end walls and empty lumens to minimise resistance to flow. Sieve tube elements are LIVING but lack nuclei and ribosomes.',
    whyExaminerPenalizes: 'Fundamental ultrastructural concept in Cambridge 9700.'
  }
];
