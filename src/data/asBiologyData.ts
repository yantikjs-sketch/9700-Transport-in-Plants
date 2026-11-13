import topic1CellImg from '../assets/images/topic1_cell_structure_1794531831760.jpg';
import topic2BioMolImg from '../assets/images/topic2_biological_molecules_1794531832511.jpg';
import topic3EnzymesImg from '../assets/images/topic3_enzyme_action_1794531833427.jpg';
import topic4MembraneImg from '../assets/images/topic4_cell_membrane_1794531833263.jpg';
import topic5MitosisImg from '../assets/images/topic5_mitosis_division_1794531833839.jpg';
import topic6NucleicImg from '../assets/images/topic6_nucleic_acids_1794531835486.jpg';
import topic7PlantImg from '../assets/images/topic7_plant_transport_1794532267671.jpg';

export type ASTopicId =
  | 'cell-structure'
  | 'biological-molecules'
  | 'enzymes'
  | 'membranes-transport'
  | 'mitosis'
  | 'nucleic-acids'
  | 'plant-transport';

export interface ASFigureKeyItem {
  label: string;
  description: string;
}

export interface ASSectionBlock {
  heading: string;
  subRef: string;
  bullets: string[];
  keyRule?: string;
}

export interface ASComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface ASExaminerTip {
  trap: string;
  correction: string;
}

export interface ASRevisionMCQ {
  id: string;
  syllabusRef: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface ASRevisionStructured {
  id: string;
  syllabusRef: string;
  marks: number;
  question: string;
  markSchemePoints: string[];
  examinerNote: string;
}

export interface ASChapter {
  id: ASTopicId;
  topicNumber: number;
  code: string;
  title: string;
  syllabusScope: string;
  overview: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  imageCaption: string;
  figureKey: ASFigureKeyItem[];
  learningObjectives: { code: string; description: string }[];
  sections: ASSectionBlock[];
  comparisonTable: ASComparisonTable;
  examinerTips: ASExaminerTip[];
  mcqs: ASRevisionMCQ[];
  structuredQuestions: ASRevisionStructured[];
}

export const AS_BIOLOGY_CHAPTERS: ASChapter[] = [
  {
    id: 'cell-structure',
    topicNumber: 1,
    code: 'Topic 1',
    title: 'Cell Structure',
    syllabusScope: '1.1 The microscope in cell studies · 1.2 Cells as the basic units of living organisms',
    overview:
      'Covers microscopy (magnification vs resolution), measurement using an eyepiece graticule and stage micrometer, eukaryotic animal and plant cell ultrastructure, ATP, prokaryotic cells, and non-cellular viruses.',
    image: topic1CellImg,
    imageAlt: 'Eukaryotic plant cell and animal cell ultrastructure cross-section diagram',
    imageTitle: 'Eukaryotic Plant Cell (Left) & Animal Cell (Right) Ultrastructure',
    imageCaption:
      'High-resolution comparison of eukaryotic organelles visible under electron microscopy, highlighting plant-specific cellulose cell wall, chloroplasts, plasmodesmata, and large central vacuole.',
    figureKey: [
      { label: 'Nucleus & Nucleolus (Purple)', description: 'Double-membrane nuclear envelope with nuclear pores; nucleolus synthesises rRNA and ribosomal subunits.' },
      { label: 'Rough ER & 80S Ribosomes (Red)', description: 'Flattened membrane cisternae studded with 80S ribosomes for polypeptide synthesis and intracellular transport.' },
      { label: 'Golgi Body (Blue Stacks)', description: 'Modifies proteins and lipids (e.g. glycosylation) and packages them into secretory vesicles or lysosomes.' },
      { label: 'Mitochondria (Orange)', description: 'Double membrane with folded inner cristae; matrix contains 70S ribosomes and circular DNA; site of aerobic respiration and ATP synthesis.' },
      { label: 'Chloroplasts & Wall (Plant Only)', description: 'Chloroplasts with thylakoid grana stacks for photosynthesis; rigid cellulose cell wall with plasmodesmata channels.' },
      { label: 'Centrioles & Microvilli (Animal)', description: 'Paired centrioles (9 microtubule triplets) organise the mitotic spindle; microvilli increase surface area for absorption.' }
    ],
    learningObjectives: [
      { code: '1.1(a)', description: 'Make temporary preparations and use an eyepiece graticule and stage micrometer to measure cells and organelles.' },
      { code: '1.1(b)', description: 'Calculate actual sizes and magnifications using M = I / A and convert between mm, µm, and nm.' },
      { code: '1.1(c)', description: 'Explain the difference between resolution and magnification, with reference to light and electron microscopy.' },
      { code: '1.2(a)', description: 'Recognise organelles and other cell structures found in eukaryotic plant and animal cells and outline their functions.' },
      { code: '1.2(b)', description: 'Outline key structural features of prokaryotic cells (bacteria) and compare them with eukaryotic cells.' },
      { code: '1.2(c)', description: 'State that viruses are non-cellular structures consisting of nucleic acid (DNA or RNA) enclosed in a protein coat (capsid).' }
    ],
    sections: [
      {
        heading: '1.1 Microscopy, Magnification & Resolution',
        subRef: 'Syllabus 1.1',
        bullets: [
          'Magnification is how many times larger an image is compared to the real object: M = Image size (I) ÷ Actual size (A).',
          'Resolution is the ability to distinguish between two separate points very close together; it is limited by half the wavelength of the radiation used.',
          'Light microscope: wavelength 400–700 nm gives max resolution ≈ 200 nm (cannot resolve ribosomes, ER, or membranes); max useful magnification ≈ ×1500; views living specimens in colour.',
          'Electron microscope (TEM & SEM): electron beam has a much shorter wavelength, giving max resolution ≈ 0.5 nm (TEM) and magnifications > ×500,000; requires a vacuum (dead specimens only) and heavy-metal staining.',
          'Calibration rule: align the eyepiece graticule (arbitrary units) against a stage micrometer (known µm scale) for each objective lens before measuring a specimen.'
        ],
        keyRule: 'Unit Conversions: 1 mm = 1000 µm (10³ µm)  |  1 µm = 1000 nm (10³ nm)  |  Always convert I and A to the SAME unit before dividing.'
      },
      {
        heading: '1.2 Eukaryotic Organelles, Prokaryotes & Viruses',
        subRef: 'Syllabus 1.2',
        bullets: [
          'Cell surface membrane (~7 nm): selectively permeable phospholipid bilayer controlling exchange between cell and environment.',
          'Lysosomes: spherical sacs enclosed by a single membrane containing hydrolytic enzymes to digest worn-out organelles or phagocytosed pathogens.',
          'Ribosomes: 80S (~22 nm) in eukaryotic cytoplasm/RER; smaller 70S (~18 nm) inside prokaryotes, mitochondria, and chloroplasts.',
          'Plant-specific features: cellulose cell wall (mechanical support, prevents osmotic lysis), plasmodesmata (cytoplasmic bridges for symplast transport), large permanent vacuole bounded by a tonoplast, chloroplasts (thylakoid grana + stroma with 70S ribosomes and circular DNA).',
          'Prokaryotes (typically 1–5 µm): unicellular, peptidoglycan (murein) cell wall, circular naked DNA free in cytoplasm (no nuclear envelope, no histones), no membrane-bound organelles, 70S ribosomes; may have plasmids, capsule, flagellum, pili.',
          'Viruses (20–300 nm): non-cellular parasites with a DNA or RNA core inside a protein capsid (some also have an outer phospholipid envelope with glycoproteins).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Eukaryotic vs Prokaryotic Cells (9700 Core Comparison)',
      headers: ['Feature', 'Eukaryotic Cell (Plant / Animal)', 'Prokaryotic Cell (Bacterium)'],
      rows: [
        ['Typical diameter', '10 – 100 µm', '1 – 5 µm'],
        ['Nucleus', 'Present, surrounded by double nuclear envelope with pores', 'Absent; circular DNA lies naked in cytoplasm (nucleoid)'],
        ['DNA organisation', 'Linear chromosomes associated with histone proteins', 'Circular DNA without histones (+ optional small plasmids)'],
        ['Membrane-bound organelles', 'Present (mitochondria, ER, Golgi, lysosomes, chloroplasts)', 'Absent (no mitochondria, ER, or chloroplasts)'],
        ['Ribosomes', '80S in cytoplasm/RER (70S in mitochondria & chloroplasts)', '70S only'],
        ['Cell wall', 'Cellulose in plants (absent in animals)', 'Peptidoglycan (murein)']
      ]
    },
    examinerTips: [
      {
        trap: 'Writing "the electron microscope has higher magnification so we can see ribosomes".',
        correction: 'State that the electron microscope has HIGHER RESOLUTION (~0.5 nm) because electrons have a much shorter wavelength than light (~200 nm resolution).'
      },
      {
        trap: 'Saying "prokaryotes have no DNA" or "all plant cells have chloroplasts".',
        correction: 'Prokaryotes DO have circular DNA (just no nucleus). Root hair cells and xylem vessels are plant cells that lack chloroplasts.'
      }
    ],
    mcqs: [
      {
        id: 't1-q1',
        syllabusRef: '1.1(b)',
        question: 'A mitochondrion measures 3.0 cm in length on an electron micrograph taken at a magnification of ×20,000. What is its actual length in µm?',
        options: [
          { id: 'A', text: '0.15 µm' },
          { id: 'B', text: '1.5 µm' },
          { id: 'C', text: '6.0 µm' },
          { id: 'D', text: '15 µm' }
        ],
        correctOptionId: 'B',
        explanation: 'Convert 3.0 cm to µm: 3.0 cm = 30 mm = 30,000 µm. Actual size A = Image size I / Magnification M = 30,000 µm / 20,000 = 1.5 µm.'
      },
      {
        id: 't1-q2',
        syllabusRef: '1.1(c)',
        question: 'Why are ribosomes (~22 nm) visible with a transmission electron microscope (TEM) but not with a light microscope?',
        options: [
          { id: 'A', text: 'Light microscopes cannot magnify images beyond ×400.' },
          { id: 'B', text: 'Ribosomes are smaller than half the wavelength of visible light, so they cannot be resolved.' },
          { id: 'C', text: 'Ribosomes are transparent and do not absorb stains used in light microscopy.' },
          { id: 'D', text: 'Ribosomes are destroyed when specimens are mounted in water for light microscopy.' }
        ],
        correctOptionId: 'B',
        explanation: 'The maximum resolution of a light microscope is ~200 nm (limited by light wavelength 400–700 nm). Any object smaller than 200 nm, such as a 22 nm ribosome, cannot be resolved.'
      },
      {
        id: 't1-q3',
        syllabusRef: '1.2(a)',
        question: 'Which pair of structures both contain 70S ribosomes and circular DNA?',
        options: [
          { id: 'A', text: 'Nucleus and mitochondrion' },
          { id: 'B', text: 'Rough endoplasmic reticulum and Golgi body' },
          { id: 'C', text: 'Mitochondrion and chloroplast' },
          { id: 'D', text: 'Lysosome and chloroplast' }
        ],
        correctOptionId: 'C',
        explanation: 'Both mitochondria and chloroplasts possess their own small circular DNA and 70S ribosomes (like prokaryotes), allowing them to synthesise some of their own proteins.'
      },
      {
        id: 't1-q4',
        syllabusRef: '1.2(b,c)',
        question: 'Which feature is present in a typical prokaryotic bacterium, a eukaryotic plant cell, AND an enveloped virus?',
        options: [
          { id: 'A', text: '70S ribosomes' },
          { id: 'B', text: 'Peptidoglycan cell wall' },
          { id: 'C', text: 'Nucleic acid' },
          { id: 'D', text: 'Plasmodesmata' }
        ],
        correctOptionId: 'C',
        explanation: 'Viruses lack ribosomes, cell walls, and cytoplasm, but all cells and viruses contain nucleic acid (DNA or RNA).'
      }
    ],
    structuredQuestions: [
      {
        id: 't1-s1',
        syllabusRef: '1.2(a)',
        marks: 4,
        question: 'Describe the roles of the rough endoplasmic reticulum (RER), Golgi body, and vesicles in the synthesis and secretion of an extracellular enzyme (e.g. amylase) from a cell.',
        markSchemePoints: [
          '1. Polypeptide / protein is synthesised on 80S ribosomes attached to the RER.',
          '2. Protein enters RER lumen / cisternae where it folds into its tertiary structure and is transported in transport vesicles to the Golgi body.',
          '3. Golgi body modifies the protein (e.g. adds carbohydrate to form glycoprotein) and packages it into secretory vesicles.',
          '4. Secretory vesicles move to the cell surface membrane, fuse with it, and release the enzyme by exocytosis.'
        ],
        examinerNote: 'Examiners reward clear sequence flow: RER ribosomes → transport vesicle → Golgi modification → secretory vesicle → exocytosis.'
      },
      {
        id: 't1-s2',
        syllabusRef: '1.1(a,c)',
        marks: 3,
        question: 'Explain why a student must recalibrate an eyepiece graticule using a stage micrometer when switching from the ×10 objective lens to the ×40 objective lens.',
        markSchemePoints: [
          '1. An eyepiece graticule has arbitrary divisions (no fixed units) in the eyepiece.',
          '2. Changing to a higher-power objective lens (×40) increases magnification of the stage micrometer image, while the eyepiece graticule scale stays the same apparent size.',
          '3. Therefore, each eyepiece graticule unit (epu) represents a smaller actual distance in µm at higher magnification.'
        ],
        examinerNote: 'Do not state that the graticule itself changes size; specify that the actual distance represented by one graticule division decreases.'
      }
    ]
  },
  {
    id: 'biological-molecules',
    topicNumber: 2,
    code: 'Topic 2',
    title: 'Biological Molecules',
    syllabusScope: '2.1 Biochemical tests · 2.2 Carbohydrates and lipids · 2.3 Proteins · 2.4 Water',
    overview:
      'Explores qualitative and semi-quantitative biochemical tests, condensation and hydrolysis reactions of carbohydrates and lipids, the four levels of protein folding (haemoglobin and collagen), and hydrogen-bonded properties of water.',
    image: topic2BioMolImg,
    imageAlt: 'Biological molecules illustration showing alpha-glucose, protein alpha-helix and beta-pleated sheet, triglyceride, and hydrogen-bonded water molecules',
    imageTitle: 'Key Biomolecules: Carbohydrates, Proteins, Triglycerides & Water',
    imageCaption:
      'Structural overview of α-glucose ring geometry, polypeptide secondary motifs (α-helix & β-pleated sheet), a triglyceride with three ester linkages, and tetrahedral hydrogen bonding between water molecules.',
    figureKey: [
      { label: 'α-Glucose Hexose Ring', description: 'C1 –OH points down (below ring); forms α-1,4 and α-1,6 glycosidic bonds in starch and glycogen.' },
      { label: 'α-Helix & β-Pleated Sheet', description: 'Secondary protein structures stabilised by hydrogen bonds between backbone C=O and N–H groups.' },
      { label: 'Triglyceride (3 Ester Bonds)', description: '1 glycerol + 3 fatty acids (saturated straight chains or unsaturated C=C kinked chains); compact hydrophobic energy store.' },
      { label: 'Water & Hydrogen Bonds', description: 'Polar O(δ⁻)–H(δ⁺) molecules form up to 4 hydrogen bonds with neighbours, giving high specific heat capacity and latent heat.' }
    ],
    learningObjectives: [
      { code: '2.1(a)', description: 'Carry out tests for reducing sugars (Benedict’s), non-reducing sugars (acid hydrolysis + Benedict’s), starch (iodine), lipids (emulsion), and proteins (biuret).' },
      { code: '2.2(a)', description: 'Describe ring forms of α-glucose and β-glucose and distinguish condensation and hydrolysis reactions involving glycosidic bonds.' },
      { code: '2.2(b)', description: 'Relate the molecular structures of starch (amylose & amylopectin), glycogen, and cellulose to their biological roles.' },
      { code: '2.2(c)', description: 'Describe the formation of ester bonds in triglycerides and relate triglycerides and phospholipids to their functions.' },
      { code: '2.3(a)', description: 'Describe peptide bond formation and explain primary, secondary, tertiary, and quaternary protein structures, plus globular (haemoglobin) and fibrous (collagen) examples.' },
      { code: '2.4(a)', description: 'Explain how hydrogen bonding gives water its solvent action, high specific heat capacity, and high latent heat of vaporisation.' }
    ],
    sections: [
      {
        heading: '2.1 Biochemical Food Tests',
        subRef: 'Syllabus 2.1',
        bullets: [
          'Reducing sugars (all monosaccharides + maltose & lactose): Add equal volume of Benedict’s reagent and heat in a boiling water bath (≥80 °C) for 2–5 min. Positive: blue → green → yellow → orange → brick-red precipitate (semi-quantitative colour indicates concentration).',
          'Non-reducing sugars (e.g. sucrose): If Benedict’s remains blue, boil a fresh sample with dilute HCl (hydrolyses glycosidic bond into glucose + fructose), cool, neutralise with excess NaHCO₃ (until fizzing stops), then heat with Benedict’s → brick-red precipitate.',
          'Starch: Add iodine in potassium iodide solution → orange-brown turns blue-black.',
          'Lipids (emulsion test): Shake sample thoroughly with ethanol to dissolve lipid, then pour into cold water → cloudy/milky-white emulsion forms as tiny lipid droplets scatter light.',
          'Proteins (biuret test): Add NaOH followed by dilute CuSO₄ (or biuret reagent) at room temperature → pale blue turns lilac/purple.'
        ]
      },
      {
        heading: '2.2 Carbohydrates: α-Glucose vs β-Glucose Polymers',
        subRef: 'Syllabus 2.2',
        bullets: [
          'Condensation joins two monomers by removing H₂O to form a covalent bond (glycosidic, ester, or peptide); hydrolysis adds H₂O to break the bond.',
          'Starch (plant store) = Amylose (unbranched α-1,4 helical coil, compact) + Amylopectin (α-1,4 with α-1,6 branches every ~20–30 residues for rapid enzymatic hydrolysis). Both are insoluble so have no osmotic effect.',
          'Glycogen (animal/fungal store) = α-1,4 chains with much more frequent α-1,6 branches → many terminal ends for rapid glucose release during high respiration rates.',
          'Cellulose (plant cell walls) = β-glucose joined by β-1,4 glycosidic bonds. Every alternate β-glucose molecule is rotated 180°, producing straight unbranched chains cross-linked by hydrogen bonds into strong microfibrils with high tensile strength.'
        ]
      },
      {
        heading: '2.3 Lipids, Proteins (Haemoglobin & Collagen) & Water',
        subRef: 'Syllabus 2.3 & 2.4',
        bullets: [
          'Triglycerides: 1 glycerol + 3 fatty acids via 3 ester bonds. High C–H bond density yields >2× energy per gram vs carbohydrates; non-polar/insoluble (no osmotic effect), thermal insulation, and metabolic water source.',
          'Phospholipids: 1 glycerol + 2 hydrophobic fatty acid tails + 1 hydrophilic phosphate head (amphipathic), forming membrane bilayers.',
          'Protein structure: Primary (linear amino acid sequence joined by peptide bonds); Secondary (α-helix / β-pleated sheet held by backbone H-bonds); Tertiary (3D shape held by R-group H-bonds, ionic bonds, covalent disulfide S–S bridges, and hydrophobic interactions); Quaternary (≥2 polypeptides, e.g. haemoglobin).',
          'Haemoglobin (globular): 4 subunits (2α + 2β), soluble (hydrophilic R-groups on outside), each with a haem prosthetic group containing Fe²⁺ to bind O₂ reversibly.',
          'Collagen (fibrous): Triple helix of 3 polypeptides with glycine every 3rd amino acid (smallest R-group allows tight coiling); staggered covalent cross-links form insoluble fibrils of immense tensile strength.',
          'Water: H-bonds cause high specific heat capacity (buffers temperature fluctuations), high latent heat of vaporisation (efficient cooling via sweat/transpiration), and polar solvent action.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Polysaccharides & Protein Classes Summary',
      headers: ['Molecule', 'Monomer & Bond', '3D Architecture', 'Key Function & Property'],
      rows: [
        ['Amylose (Starch)', 'α-glucose; α-1,4 glycosidic', 'Unbranched coiled helix', 'Compact, insoluble plant glucose store'],
        ['Glycogen', 'α-glucose; α-1,4 & frequent α-1,6', 'Highly branched tree-like chains', 'Rapid hydrolysis for animal/muscle respiration'],
        ['Cellulose', 'β-glucose; β-1,4 (rotated 180°)', 'Straight chains + H-bonded microfibrils', 'High tensile strength in plant cell walls'],
        ['Haemoglobin', 'Amino acids (2α, 2β chains + Fe²⁺ haem)', 'Compact globular quaternary sphere', 'Soluble O₂ transport in red blood cells'],
        ['Collagen', 'Amino acids (high glycine content)', 'Insoluble triple helix + cross-linked fibrils', 'High tensile strength in tendons, skin, artery walls']
      ]
    },
    examinerTips: [
      {
        trap: 'Writing "cellulose is strong because of covalent cross-links between chains".',
        correction: 'Parallel cellulose chains are held together into microfibrils by HYDROGEN BONDS (many weak H-bonds together give enormous tensile strength).'
      },
      {
        trap: 'Forgetting to neutralise HCl after acid hydrolysis in the non-reducing sugar test.',
        correction: 'Benedict’s reagent does NOT work in acidic solution; you MUST neutralise with excess NaHCO₃ / NaOH before adding Benedict’s and heating.'
      }
    ],
    mcqs: [
      {
        id: 't2-q1',
        syllabusRef: '2.1(a)',
        question: 'A student tests a solution and obtains a blue colour with Benedict’s reagent after heating, and a brick-red precipitate only after boiling with dilute HCl, neutralising with NaHCO₃, and re-heating with Benedict’s. Which carbohydrate was present?',
        options: [
          { id: 'A', text: 'Maltose' },
          { id: 'B', text: 'Sucrose' },
          { id: 'C', text: 'Lactose' },
          { id: 'D', text: 'Amylose' }
        ],
        correctOptionId: 'B',
        explanation: 'Sucrose is a non-reducing disaccharide. It gives a negative (blue) result with Benedict’s directly, but acid hydrolysis splits it into reducing monosaccharides (glucose and fructose).'
      },
      {
        id: 't2-q2',
        syllabusRef: '2.2(b)',
        question: 'Which statement correctly explains why cellulose forms straight chains suitable for microfibrils rather than coiled helices like amylose?',
        options: [
          { id: 'A', text: 'Cellulose is composed of α-glucose with 1,6-glycosidic branches.' },
          { id: 'B', text: 'Adjacent β-glucose molecules are rotated 180° relative to one another, forming β-1,4-glycosidic bonds.' },
          { id: 'C', text: 'Cellulose contains ester linkages between glycerol and fatty acids.' },
          { id: 'D', text: 'Cellulose chains are linked together by strong covalent disulfide bridges.' }
        ],
        correctOptionId: 'B',
        explanation: 'In cellulose, alternate β-glucose monomers are inverted by 180°, resulting in straight unbranched chains that align parallel and form numerous hydrogen bonds between chains.'
      },
      {
        id: 't2-q3',
        syllabusRef: '2.3(a)',
        question: 'Which types of bond stabilise the tertiary structure of a globular protein, such as an enzyme, by forming exclusively between cysteine R-groups?',
        options: [
          { id: 'A', text: 'Peptide bonds' },
          { id: 'B', text: 'Hydrogen bonds' },
          { id: 'C', text: 'Disulfide bonds' },
          { id: 'D', text: 'Ionic bonds' }
        ],
        correctOptionId: 'C',
        explanation: 'Disulfide bonds (–S–S–) are strong covalent bonds formed between the sulfhydryl (–SH) R-groups of two cysteine amino acids.'
      },
      {
        id: 't2-q4',
        syllabusRef: '2.4(a)',
        question: 'Which property of water directly prevents rapid internal temperature rises inside metabolically active cells?',
        options: [
          { id: 'A', text: 'High latent heat of vaporisation' },
          { id: 'B', text: 'High specific heat capacity' },
          { id: 'C', text: 'Low viscosity as a solvent' },
          { id: 'D', text: 'Ability to form hydrophobic interactions' }
        ],
        correctOptionId: 'B',
        explanation: 'Water has a high specific heat capacity because much thermal energy is needed to break hydrogen bonds before kinetic energy (and temperature) increases significantly.'
      }
    ],
    structuredQuestions: [
      {
        id: 't2-s1',
        syllabusRef: '2.3(a)',
        marks: 4,
        question: 'Compare the molecular structures of haemoglobin and collagen in relation to their biological roles.',
        markSchemePoints: [
          '1. Haemoglobin is a globular protein (roughly spherical and soluble with hydrophilic R-groups on the outer surface), whereas collagen is a fibrous protein (insoluble long strands).',
          '2. Haemoglobin consists of 4 polypeptide chains (2 α-globin and 2 β-globin) each bound to a haem prosthetic group containing Fe²⁺ to bind oxygen reversibly.',
          '3. Collagen consists of 3 polypeptides coiled into a tight triple helix, rich in glycine (small R-group allows close packing).',
          '4. Adjacent collagen triple helices are held by staggered covalent cross-links forming strong fibrils that resist tension in tendons/artery walls.'
        ],
        examinerNote: 'Give direct structural contrasts (globular vs fibrous, soluble vs insoluble, prosthetic group present vs absent) rather than describing them separately.'
      },
      {
        id: 't2-s2',
        syllabusRef: '2.2(b)',
        marks: 3,
        question: 'Explain three ways in which the structure of glycogen makes it suited as an energy storage molecule in mammalian liver and muscle cells.',
        markSchemePoints: [
          '1. Insoluble in water, so it has no osmotic effect / does not lower water potential of the cell.',
          '2. Compact / tightly coiled α-1,4 chains, allowing large amounts of glucose to be stored in a small space.',
          '3. Highly branched via many α-1,6 glycosidic bonds, providing numerous terminal glucose ends for rapid hydrolysis by enzymes.'
        ],
        examinerNote: 'Always link each structural feature explicitly to its functional consequence (e.g. insoluble → no osmotic effect).'
      }
    ]
  },
  {
    id: 'enzymes',
    topicNumber: 3,
    code: 'Topic 3',
    title: 'Enzymes',
    syllabusScope: '3.1 Mode of action of enzymes · 3.2 Factors that affect enzyme action',
    overview:
      'Explains how globular enzymes lower activation energy via lock-and-key and induced-fit mechanisms, the kinetics of temperature, pH, concentration, competitive vs non-competitive inhibition, Vmax and Km, and immobilised enzymes.',
    image: topic3EnzymesImg,
    imageAlt: 'Four-stage diagram of enzyme active site catalysis, induced fit, product release, and competitive inhibitor',
    imageTitle: 'Enzyme Catalysis: Substrate Binding, Induced Fit & Competitive Inhibition',
    imageCaption:
      'Sequential stages (1–4) showing substrate specificity for the 3D active site cleft, induced-fit transition state destabilisation, product release, and a structurally similar competitive inhibitor competing for the active site.',
    figureKey: [
      { label: 'Step 1: Specificity & Competition', description: 'Substrate (yellow) and a structurally similar competitive inhibitor (red) approach the 3D active site cleft.' },
      { label: 'Step 2: Enzyme–Substrate Complex', description: 'Substrate binds via temporary H-bonds/ionic bonds, forming an ESC; the inhibitor is temporarily excluded.' },
      { label: 'Step 3: Induced Fit & Activation', description: 'Active site moulds slightly around the substrate, straining bonds and lowering activation energy (Ea).' },
      { label: 'Step 4: Product Release', description: 'Products (orange & green) no longer fit the active site and diffuse away; enzyme emerges unchanged and reusable.' }
    ],
    learningObjectives: [
      { code: '3.1(a)', description: 'State that enzymes are globular proteins that act as biological catalysts (intracellular or extracellular) by lowering activation energy.' },
      { code: '3.1(b)', description: 'Explain the mode of action of enzymes using the lock-and-key hypothesis and the induced-fit hypothesis.' },
      { code: '3.2(a)', description: 'Investigate and explain the effects of temperature, pH, enzyme concentration, and substrate concentration on enzyme-catalysed reactions.' },
      { code: '3.2(b)', description: 'Explain the effects of reversible competitive and non-competitive inhibitors on enzyme activity.' },
      { code: '3.2(c)', description: 'Explain the meaning of Vmax and the Michaelis–Menten constant (Km) and use Km to compare enzyme affinities.' },
      { code: '3.2(d)', description: 'Explain the advantages of using immobilised enzymes (e.g. in calcium alginate beads) over free enzymes in solution.' }
    ],
    sections: [
      {
        heading: '3.1 Mode of Action: Lowering Activation Energy',
        subRef: 'Syllabus 3.1',
        bullets: [
          'Enzymes are globular proteins whose tertiary structure forms a specific 3D cleft called the active site.',
          'By binding substrate(s) to form an enzyme–substrate complex (ESC), enzymes provide an alternative reaction pathway with a lower activation energy (Ea), speeding up both intracellular (e.g. catalase) and extracellular (e.g. amylase) reactions.',
          'Lock-and-key hypothesis: the substrate has a shape strictly complementary to the rigid active site.',
          'Induced-fit hypothesis: the active site is flexible and moulds slightly around the substrate as it binds, placing strain on substrate bonds and facilitating transition-state conversion into products.'
        ]
      },
      {
        heading: '3.2 Kinetics: Temperature, pH, Vmax, Km & Inhibitors',
        subRef: 'Syllabus 3.2',
        bullets: [
          'Temperature: Increasing temperature increases kinetic energy → faster molecular motion → more frequent successful collisions and ESC formation up to the optimum temperature. Above optimum, excessive vibration breaks hydrogen and ionic bonds holding tertiary structure → active site changes shape → denaturation.',
          'pH: Deviations from optimum pH alter H⁺/OH⁻ concentration, changing charges on R-groups and breaking ionic and hydrogen bonds → active site shape alters → denaturation.',
          'Substrate concentration: Initially rate rises proportionally (substrate is limiting). At high [S], all active sites are occupied simultaneously (saturated), so rate plateaus at Vmax (enzyme concentration becomes limiting).',
          'Vmax & Km: Vmax is the maximum initial rate at enzyme saturation. Km is the substrate concentration that gives ½ Vmax. A LOWER Km means the enzyme reaches ½ Vmax at lower substrate concentration, indicating a HIGHER AFFINITY for its substrate.',
          'Immobilised enzymes (e.g. trapped in alginate beads): Easily separated from product (no downstream purification needed), reusable continuously, and more stable across wider temperature and pH ranges.'
        ],
        keyRule: 'Key Kinetic Rule: Lower Km = Higher Affinity for Substrate  |  Initial rate (at t = 0) is always measured because [S] is known and products have not accumulated.'
      }
    ],
    comparisonTable: {
      title: 'Competitive vs Non-Competitive Reversible Inhibition',
      headers: ['Property', 'Competitive Inhibitor', 'Non-Competitive Inhibitor'],
      rows: [
        ['Binding site', 'Active site (shape similar to substrate)', 'Allosteric site (away from active site)'],
        ['Effect on active site', 'Physically blocks substrate entry without changing shape', 'Alters tertiary structure so active site changes shape and is no longer complementary'],
        ['Effect of increasing [Substrate]', 'Overcomes inhibition; substrate out-competes inhibitor', 'Cannot overcome inhibition; active sites remain non-functional'],
        ['Effect on Vmax', 'Vmax unchanged (reached at higher [S])', 'Vmax decreases'],
        ['Effect on apparent Km', 'Apparent Km increases (lower apparent affinity)', 'Km unchanged for remaining active enzyme molecules']
      ]
    },
    examinerTips: [
      {
        trap: 'Stating "at high temperatures the enzyme is killed" or "peptide bonds break during denaturation".',
        correction: 'Enzymes are molecules, not living cells, so they are DENATURED (never "killed"). Denaturation breaks hydrogen and ionic bonds in tertiary structure, NOT peptide bonds.'
      },
      {
        trap: 'Confusing high Km with high affinity.',
        correction: 'Km is inversely related to affinity: a LOWER Km value means less substrate is needed to reach ½ Vmax, so the enzyme has a HIGHER affinity.'
      }
    ],
    mcqs: [
      {
        id: 't3-q1',
        syllabusRef: '3.2(c)',
        question: 'Enzyme X has a Km of 0.4 mmol dm⁻³ and Enzyme Y has a Km of 2.8 mmol dm⁻³ for the same substrate. Which statement is correct?',
        options: [
          { id: 'A', text: 'Enzyme Y has a higher affinity for the substrate than Enzyme X.' },
          { id: 'B', text: 'Enzyme X has a higher affinity for the substrate than Enzyme Y.' },
          { id: 'C', text: 'Enzyme X must have a higher Vmax than Enzyme Y.' },
          { id: 'D', text: 'Enzyme Y reaches ½ Vmax at a lower substrate concentration than Enzyme X.' }
        ],
        correctOptionId: 'B',
        explanation: 'Km is the substrate concentration at which the rate is ½ Vmax. A lower Km (0.4 mmol dm⁻³) means Enzyme X reaches half-maximal velocity at a much lower substrate concentration, showing higher affinity.'
      },
      {
        id: 't3-q2',
        syllabusRef: '3.2(b)',
        question: 'When a reversible non-competitive inhibitor is added to an enzyme-catalysed reaction, what happens to Vmax and Km as substrate concentration increases?',
        options: [
          { id: 'A', text: 'Vmax stays the same; Km increases.' },
          { id: 'B', text: 'Vmax decreases; Km stays the same.' },
          { id: 'C', text: 'Vmax increases; Km decreases.' },
          { id: 'D', text: 'Both Vmax and Km increase.' }
        ],
        correctOptionId: 'B',
        explanation: 'A non-competitive inhibitor binds away from the active site, removing a proportion of functional enzyme molecules regardless of [S]. Thus Vmax decreases, while the unaffected active sites retain the same Km.'
      },
      {
        id: 't3-q3',
        syllabusRef: '3.1(b)',
        question: 'How does the induced-fit hypothesis differ from the lock-and-key hypothesis?',
        options: [
          { id: 'A', text: 'Only induced-fit involves the formation of an enzyme–substrate complex.' },
          { id: 'B', text: 'In induced-fit, the active site changes shape slightly as the substrate binds to achieve an optimal fit.' },
          { id: 'C', text: 'In induced-fit, the substrate permanently alters the primary structure of the enzyme.' },
          { id: 'D', text: 'Only lock-and-key enzymes lower the activation energy of reactions.' }
        ],
        correctOptionId: 'B',
        explanation: 'The induced-fit hypothesis proposes that binding of the substrate induces a subtle conformational shift in the active site R-groups, straining substrate bonds and lowering Ea.'
      },
      {
        id: 't3-q4',
        syllabusRef: '3.2(a)',
        question: 'Why do biochemists measure the INITIAL rate of reaction (at t = 0) when investigating the effect of enzyme concentration?',
        options: [
          { id: 'A', text: 'The enzyme has not yet been denatured by the substrate.' },
          { id: 'B', text: 'Substrate concentration is at its known maximum and is not yet limiting or depleted.' },
          { id: 'C', text: 'All inhibitors are inactive during the first few seconds.' },
          { id: 'D', text: 'The activation energy is lower at t = 0 than later in the reaction.' }
        ],
        correctOptionId: 'B',
        explanation: 'As a reaction proceeds, substrate is used up and [S] drops, slowing the rate. Measuring the initial gradient ensures [S] is known and in excess so enzyme concentration is the sole limiting factor.'
      }
    ],
    structuredQuestions: [
      {
        id: 't3-s1',
        syllabusRef: '3.2(a)',
        marks: 4,
        question: 'Explain why the rate of an enzyme-catalysed reaction decreases rapidly when the temperature is raised from 40 °C to 65 °C.',
        markSchemePoints: [
          '1. Above the optimum temperature, molecules gain excessive kinetic energy and vibrate violently.',
          '2. This breaks hydrogen bonds and ionic bonds maintaining the enzyme’s tertiary structure.',
          '3. The 3D shape of the active site changes / is lost (denaturation).',
          '4. The substrate is no longer complementary to the active site, so enzyme–substrate complexes cannot form.'
        ],
        examinerNote: 'Mention tertiary structure, breaking of H-bonds/ionic bonds, altered active site shape, and inability to form ESCs.'
      },
      {
        id: 't3-s2',
        syllabusRef: '3.2(d)',
        marks: 3,
        question: 'State three advantages of immobilising lactase in calcium alginate beads when producing lactose-free milk.',
        markSchemePoints: [
          '1. Enzyme can be recovered easily and reused continuously, lowering production costs.',
          '2. Milk (product) is not contaminated by the enzyme, avoiding costly purification steps.',
          '3. Immobilisation stabilises the tertiary structure, increasing tolerance to changes in temperature and pH.'
        ],
        examinerNote: 'Any three distinct industrial advantages earn full marks.'
      }
    ]
  },
  {
    id: 'membranes-transport',
    topicNumber: 4,
    code: 'Topic 4',
    title: 'Cell Membranes & Transport',
    syllabusScope: '4.1 Fluid mosaic membranes · 4.2 Movement into and out of cells',
    overview:
      'Covers the fluid mosaic structure (~7 nm), roles of phospholipids, cholesterol, glycoproteins, channel and carrier proteins, cell signalling, diffusion, facilitated diffusion, osmosis & water potential (Ψ), active transport, and endocytosis/exocytosis.',
    image: topic4MembraneImg,
    imageAlt: '3D Fluid Mosaic Model of a plasma cell membrane showing phospholipid bilayer, channel protein, carrier protein, cholesterol, and glycoproteins',
    imageTitle: 'The Fluid Mosaic Model of Cell Surface Membranes',
    imageCaption:
      'Three-dimensional cross-section showing the amphipathic phospholipid bilayer, embedded channel and carrier transport proteins, fluidity-regulating cholesterol, and extracellular carbohydrate antennae.',
    figureKey: [
      { label: 'Phospholipid Bilayer', description: 'Hydrophilic phosphate heads face aqueous cytoplasm & exterior; hydrophobic fatty acid tails form a non-polar barrier to ions.' },
      { label: 'Channel Protein (Purple)', description: 'Water-filled hydrophilic pore allowing specific ions/polar molecules to move down a concentration gradient (facilitated diffusion).' },
      { label: 'Carrier Protein (Green)', description: 'Changes 3D conformation upon solute binding for facilitated diffusion or ATP-driven active transport against a gradient.' },
      { label: 'Glycoproteins & Glycolipids', description: 'Branched carbohydrate chains on the outer leaflet acting as cell recognition antigens, hormone receptors, and H-bond stabilisers.' },
      { label: 'Cholesterol (Yellow)', description: 'Wedges between fatty acid tails to prevent crystallisation at low temperatures and limit excessive fluidity at high temperatures.' }
    ],
    learningObjectives: [
      { code: '4.1(a)', description: 'Describe the fluid mosaic model of membrane structure (~7 nm thick) and explain the roles of phospholipids, cholesterol, glycolipids, proteins, and glycoproteins.' },
      { code: '4.1(b)', description: 'Outline the basic mechanism of cell signalling involving membrane receptors, ligands, and intracellular cascades.' },
      { code: '4.2(a)', description: 'Describe and explain simple diffusion, facilitated diffusion, osmosis, active transport, endocytosis, and exocytosis.' },
      { code: '4.2(b)', description: 'Explain the movement of water between cells and solutions in terms of water potential (Ψ), including effects on plant and animal cells.' },
      { code: '4.2(c)', description: 'Investigate the effect of surface area to volume ratio (SA:V) on the rate of diffusion using agar cubes.' }
    ],
    sections: [
      {
        heading: '4.1 Fluid Mosaic Architecture & Cell Signalling',
        subRef: 'Syllabus 4.1',
        bullets: [
          'Why "fluid mosaic"? Phospholipids and proteins can move laterally within their monolayer (fluid), while scattered proteins form a patchwork pattern (mosaic).',
          'Cholesterol buffers membrane fluidity: at low temperatures it prevents tight packing of phospholipid tails (prevents freezing); at high temperatures it restricts movement (increases mechanical stability).',
          'Unsaturated fatty acid tails (with C=C kinks) increase membrane fluidity by preventing tight tail packing.',
          'Cell signalling: A signalling molecule (ligand, e.g. hormone) binds to a specific complementary glycoprotein receptor on the target cell surface → receptor changes shape → activates intracellular G-protein / second messenger (e.g. cAMP) → triggers an enzyme cascade amplifying the cell response.'
        ]
      },
      {
        heading: '4.2 Membrane Transport & Water Potential (Ψ)',
        subRef: 'Syllabus 4.2',
        bullets: [
          'Simple diffusion: Passive net movement of small non-polar molecules (O₂, CO₂) directly through the phospholipid bilayer down a concentration gradient.',
          'Facilitated diffusion: Passive movement of ions and polar molecules (glucose, amino acids) down a concentration gradient through specific channel or carrier proteins.',
          'Active transport: Movement against a concentration gradient via carrier proteins (pumps) coupled to ATP hydrolysis.',
          'Bulk transport (active, requires ATP and membrane fluidity): Endocytosis (phagocytosis for solids, pinocytosis for fluids) forms vesicles inward; Exocytosis fuses secretory vesicles with the plasma membrane to release contents.',
          'Osmosis: Net movement of water from a region of higher water potential (less negative Ψ) to a region of lower water potential (more negative Ψ) across a partially permeable membrane.',
          'Animal cells in pure water swell and lyse (burst); plant cells become turgid because the rigid cellulose cell wall builds positive pressure potential (Ψp), preventing lysis. In hypertonic solutions, plant cells lose turgor and plasmolyse (protoplast pulls away from cell wall).'
        ],
        keyRule: 'Pure water Ψ = 0 kPa  |  Adding solute lowers Ψ (makes it more negative)  |  At incipient plasmolysis: Ψp = 0 kPa, so Ψcell = Ψs'
      }
    ],
    comparisonTable: {
      title: 'Comparison of Membrane Transport Mechanisms',
      headers: ['Mechanism', 'Direction vs Gradient', 'ATP Required?', 'Membrane Proteins Used', 'Example Molecules'],
      rows: [
        ['Simple diffusion', 'Down concentration gradient', 'No (Passive)', 'None (passes through bilayer)', 'O₂, CO₂, non-polar lipids'],
        ['Facilitated diffusion', 'Down concentration gradient', 'No (Passive)', 'Channel or carrier proteins', 'Na⁺, K⁺, glucose, amino acids'],
        ['Osmosis', 'High Ψ to low (more negative) Ψ', 'No (Passive)', 'Phospholipid bilayer & aquaporins', 'Water molecules only'],
        ['Active transport', 'Against concentration gradient', 'Yes (ATP hydrolysis)', 'Carrier proteins (pumps)', 'Mineral ions (NO₃⁻), Na⁺/K⁺ pump'],
        ['Endo- / Exocytosis', 'Bulk vesicle transport', 'Yes (ATP for cytoskeleton)', 'Membrane fusion & receptors', 'Hormones, digestive enzymes, bacteria']
      ]
    },
    examinerTips: [
      {
        trap: 'Writing "water moves from high water concentration to low water concentration" in osmosis.',
        correction: 'Always use CAMBRIDGE TERMINOLOGY: "Water moves from a region of higher (less negative) WATER POTENTIAL to a region of lower (more negative) WATER POTENTIAL through a partially permeable membrane."'
      },
      {
        trap: 'Saying "plant cells burst in pure water" or "shrink like animal cells".',
        correction: 'Plant cells become TURGID (cellulose cell wall resists expansion and stops bursting). In concentrated solution, the protoplast shrinks away from the wall (PLASMOLYSIS).'
      }
    ],
    mcqs: [
      {
        id: 't4-q1',
        syllabusRef: '4.1(a)',
        question: 'Which membrane component stabilizes a cell surface membrane by preventing phospholipids from packing too tightly at low temperatures while restricting excessive movement at high temperatures?',
        options: [
          { id: 'A', text: 'Glycolipid' },
          { id: 'B', text: 'Channel protein' },
          { id: 'C', text: 'Cholesterol' },
          { id: 'D', text: 'Glycoprotein' }
        ],
        correctOptionId: 'C',
        explanation: 'Cholesterol fits between phospholipid fatty acid tails and acts as a bidirectional fluidity buffer across temperature changes.'
      },
      {
        id: 't4-q2',
        syllabusRef: '4.2(b)',
        question: 'A plant tissue cylinder is placed in a sucrose solution of water potential −450 kPa. After 1 hour, 50% of its cells show incipient plasmolysis. What is the average solute potential (Ψs) of the cells?',
        options: [
          { id: 'A', text: '0 kPa' },
          { id: 'B', text: '−450 kPa' },
          { id: 'C', text: '+450 kPa' },
          { id: 'D', text: '−900 kPa' }
        ],
        correctOptionId: 'B',
        explanation: 'At incipient plasmolysis, the protoplast exerts no pressure on the cell wall (Ψp = 0 kPa). Since the cell is in equilibrium with the external solution, Ψcell = Ψs + 0 = Ψexternal = −450 kPa.'
      },
      {
        id: 't4-q3',
        syllabusRef: '4.2(a)',
        question: 'A poison inhibits mitochondrial ATP synthase. Which two membrane transport processes will stop immediately or shortly afterwards?',
        options: [
          { id: 'A', text: 'Simple diffusion and osmosis' },
          { id: 'B', text: 'Facilitated diffusion and simple diffusion' },
          { id: 'C', text: 'Active transport and exocytosis' },
          { id: 'D', text: 'Osmosis and facilitated diffusion' }
        ],
        correctOptionId: 'C',
        explanation: 'Both active transport (carrier pumps) and bulk vesicle movement (exocytosis/endocytosis) directly require ATP hydrolysis.'
      },
      {
        id: 't4-q4',
        syllabusRef: '4.2(c)',
        question: 'As a spherical cell grows larger in radius, what happens to its surface area to volume (SA:V) ratio and relative diffusion efficiency?',
        options: [
          { id: 'A', text: 'SA:V increases and diffusion becomes faster throughout the cell.' },
          { id: 'B', text: 'SA:V decreases and diffusion distance increases, reducing relative exchange efficiency.' },
          { id: 'C', text: 'SA:V remains constant because surface area and volume scale identically.' },
          { id: 'D', text: 'SA:V decreases because volume grows proportionally to r² while surface area grows as r³.' }
        ],
        correctOptionId: 'B',
        explanation: 'Volume increases with the cube of radius (r³) while surface area increases with r², so SA:V decreases as size increases, making simple diffusion alone too slow for large organisms.'
      }
    ],
    structuredQuestions: [
      {
        id: 't4-s1',
        syllabusRef: '4.2(a)',
        marks: 4,
        question: 'Distinguish between facilitated diffusion and active transport across a cell surface membrane.',
        markSchemePoints: [
          '1. Facilitated diffusion is passive / requires no ATP, whereas active transport requires ATP hydrolysis.',
          '2. Facilitated diffusion moves substances down a concentration gradient (high to low), whereas active transport moves substances against a concentration gradient (low to high).',
          '3. Facilitated diffusion uses either channel proteins or carrier proteins; active transport uses only carrier proteins (pumps).',
          '4. Active transport can continue even when intracellular concentration exceeds extracellular concentration (both show saturation kinetics).'
        ],
        examinerNote: 'Give direct comparative statements using "whereas" to maximize clarity and marks.'
      },
      {
        id: 't4-s2',
        syllabusRef: '4.2(b)',
        marks: 3,
        question: 'Explain what happens to an animal red blood cell and a plant palisade cell when both are placed in pure distilled water (Ψ = 0 kPa).',
        markSchemePoints: [
          '1. Both cells have a lower (more negative) water potential than pure water, so water enters both cells by osmosis down a water potential gradient.',
          '2. The red blood cell lacks a cell wall, so its membrane stretches until it lyses (bursts / haemolysis).',
          '3. The plant cell has a strong cellulose cell wall that resists expansion, building positive pressure potential (Ψp) until Ψcell = 0 kPa, making the cell turgid without bursting.'
        ],
        examinerNote: 'Use exact terms: osmosis, water potential gradient, lysis/haemolysis, cellulose cell wall, pressure potential / turgid.'
      }
    ]
  },
  {
    id: 'mitosis',
    topicNumber: 5,
    code: 'Topic 5',
    title: 'The Mitotic Cell Cycle',
    syllabusScope: '5.1 Replication and division of nuclei and cells · 5.2 Chromosome behaviour in mitosis',
    overview:
      'Covers eukaryotic chromosome structure (chromatids, centromere, histones), the interphase-mitosis-cytokinesis cell cycle, telomeres, stem cells, cancer, the four mitotic stages (PMAT), and mitotic index calculations.',
    image: topic5MitosisImg,
    imageAlt: 'Sequential illustration of the four stages of mitosis in an animal cell: Prophase, Metaphase, Anaphase, and Telophase with cytokinesis',
    imageTitle: 'The Four Stages of Mitotic Nuclear Division (PMAT)',
    imageCaption:
      'Progressive behaviour of duplicated chromosomes, mitotic spindle microtubules, and nuclear envelopes from Prophase (left) through Metaphase and Anaphase to Telophase & Cytokinesis (right).',
    figureKey: [
      { label: '1. Prophase (Far Left)', description: 'Chromatin condenses into visible sister chromatids joined at centromeres; nuclear envelope breaks down; spindle fibres form.' },
      { label: '2. Metaphase (Centre-Left)', description: 'Chromosomes align single-file along the cell equator (metaphase plate) attached to spindle microtubules by centromeres.' },
      { label: '3. Anaphase (Centre-Right)', description: 'Centromeres divide; spindle fibres shorten, pulling identical sister chromatids (now daughter chromosomes) to opposite poles.' },
      { label: '4. Telophase & Cytokinesis (Right)', description: 'Nuclear envelopes reform around decondensing chromosomes at each pole; cleavage furrow pinches cytoplasm into 2 identical daughter cells.' }
    ],
    learningObjectives: [
      { code: '5.1(a)', description: 'Describe the structure of a chromosome (two identical sister chromatids, centromere, telomeres, DNA wound around histones).' },
      { code: '5.1(b)', description: 'Outline the cell cycle: Interphase (G1, S, G2), Mitosis (nuclear division), and Cytokinesis (cell division).' },
      { code: '5.1(c)', description: 'Explain the importance of mitosis in growth, tissue repair, and asexual reproduction to produce genetically identical daughter cells.' },
      { code: '5.1(d)', description: 'Outline the roles of telomeres (preventing gene loss) and stem cells, and explain how uncontrolled mitosis leads to tumours (cancer).' },
      { code: '5.2(a)', description: 'Describe and identify the behaviour of chromosomes, nuclear envelope, and spindle during Prophase, Metaphase, Anaphase, and Telophase.' },
      { code: '5.2(b)', description: 'Calculate the mitotic index from observed microscope fields of root tip squash preparations.' }
    ],
    sections: [
      {
        heading: '5.1 Chromosomes, The Cell Cycle, Telomeres & Stem Cells',
        subRef: 'Syllabus 5.1',
        bullets: [
          'During S phase of Interphase, each DNA molecule replicates semi-conservatively so every chromosome consists of two genetically identical sister chromatids joined at a centromere, tightly coiled around histone proteins.',
          'Interphase occupies ~90% of the cell cycle: G1 (cell growth, RNA & protein synthesis, organelle replication), S (DNA replication), G2 (further growth, tubulin synthesis for spindle, ATP/energy reserves).',
          'Biological significance of mitosis: maintains chromosome number (2n → 2n) and produces genetically identical cells for organism growth, cell replacement/repair of damaged tissues, and asexual reproduction.',
          'Telomeres: Protective caps of repeated non-coding DNA sequences at the ends of chromosomes. Because DNA polymerase cannot copy the very tip of a linear strand, telomeres shorten slightly each division instead of losing vital genes.',
          'Stem cells: Unspecialised cells capable of dividing indefinitely by mitosis and differentiating into specialised cells for growth and tissue regeneration.',
          'Cancer: Mutations in regulatory genes (proto-oncogenes or tumour-suppressor genes) disrupt cell cycle checkpoints, causing uncontrolled rapid mitosis that forms an abnormal mass of cells (tumour).'
        ],
        keyRule: 'Mitotic Index = (Number of cells in visible mitosis ÷ Total number of cells counted) × 100%'
      },
      {
        heading: '5.2 Chromosome Behaviour in Mitosis & Cytokinesis',
        subRef: 'Syllabus 5.2',
        bullets: [
          'Prophase: Chromosomes condense (supercoil) becoming shorter, thicker, and visible; centrioles (in animal cells; absent in flowering plants) migrate to opposite poles forming microtubule spindle fibres; nucleolus disappears and nuclear envelope disintegrates.',
          'Metaphase: Spindle fibres attach to centromeres; chromosomes align precisely along the equator (metaphase plate).',
          'Anaphase: Centromeres divide; spindle fibres shorten by depolymerisation, pulling separated sister chromatids to opposite poles with centromeres leading (characteristic V-shapes).',
          'Telophase: Daughter chromosomes reach opposite poles and uncoil back to diffuse chromatin; nuclear envelopes and nucleoli reform; spindle fibres break down.',
          'Cytokinesis: Cytoplasm divides. In animal cells a contractile ring forms a cleavage furrow; in plant cells Golgi vesicles fuse along the equator to form a cell plate and new cellulose cell wall.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Cell Cycle & Mitosis Phase Checkpoints',
      headers: ['Phase', 'DNA / Chromosome State', 'Nuclear Envelope & Spindle', 'Key Cellular Event'],
      rows: [
        ['Interphase (G1, S, G2)', 'Chromatin (uncoiled); replicates in S phase', 'Intact nuclear envelope & nucleolus; no spindle', 'Cell growth, organelle & DNA duplication'],
        ['Prophase', 'Condenses into pairs of sister chromatids', 'Nuclear envelope breaks down; spindle assembles', 'Chromosomes become stainable/visible'],
        ['Metaphase', '2 chromatids per chromosome at maximum condensation', 'No nuclear envelope; spindle attached to centromeres', 'Aligned along cell equator'],
        ['Anaphase', 'Sister chromatids split into single daughter chromosomes', 'Spindle fibres shorten', 'Pulled to opposite poles'],
        ['Telophase', 'Chromosomes decondense back to chromatin', 'Two new nuclear envelopes reform; spindle breaks down', 'Followed immediately by cytokinesis']
      ]
    },
    examinerTips: [
      {
        trap: 'Saying "homologous chromosomes pair up at the equator and separate in anaphase of mitosis".',
        correction: 'Homologous pairing (bivalents) happens in MEIOSIS (A2), NOT mitosis! In mitosis, individual chromosomes line up at the equator and SISTER CHROMATIDS separate in anaphase.'
      },
      {
        trap: 'Claiming "plant cells use centrioles to form the mitotic spindle".',
        correction: 'Flowering plants do NOT have centrioles; they organise spindle microtubules directly from microtubule organising centres (MTOCs) in the cytoplasm.'
      }
    ],
    mcqs: [
      {
        id: 't5-q1',
        syllabusRef: '5.1(b)',
        question: 'During which stage of the mitotic cell cycle does semi-conservative replication of DNA occur?',
        options: [
          { id: 'A', text: 'G1 phase of Interphase' },
          { id: 'B', text: 'S phase of Interphase' },
          { id: 'C', text: 'Prophase of Mitosis' },
          { id: 'D', text: 'G2 phase of Interphase' }
        ],
        correctOptionId: 'B',
        explanation: 'S (synthesis) phase of Interphase is when nuclear DNA replicates so each chromosome consists of two identical sister chromatids prior to mitosis.'
      },
      {
        id: 't5-q2',
        syllabusRef: '5.2(a)',
        question: 'A student observes V-shaped structures moving towards opposite ends of a stained onion root tip cell under a light microscope. Which stage is this cell in?',
        options: [
          { id: 'A', text: 'Prophase' },
          { id: 'B', text: 'Metaphase' },
          { id: 'C', text: 'Anaphase' },
          { id: 'D', text: 'Telophase' }
        ],
        correctOptionId: 'C',
        explanation: 'During anaphase, centromeres split and spindle fibres pull the sister chromatids to opposite poles centromere-first, trailing their arms in a V-shape.'
      },
      {
        id: 't5-q3',
        syllabusRef: '5.1(d)',
        question: 'What is the primary biological function of telomeres at the ends of eukaryotic chromosomes?',
        options: [
          { id: 'A', text: 'To attach sister chromatids to spindle microtubules during metaphase.' },
          { id: 'B', text: 'To protect coding DNA sequences from being lost during successive rounds of DNA replication.' },
          { id: 'C', text: 'To trigger uncontrolled mitosis in cancerous tumours.' },
          { id: 'D', text: 'To code for histone proteins needed during prophase condensation.' }
        ],
        correctOptionId: 'B',
        explanation: 'Telomeres are non-coding repetitive DNA caps that absorb the slight end-shortening caused by DNA replication so vital coding genes are not eroded.'
      },
      {
        id: 't5-q4',
        syllabusRef: '5.2(b)',
        question: 'In a root tip squash preparation, a student counts 180 cells in Interphase, 10 in Prophase, 5 in Metaphase, 3 in Anaphase, and 2 in Telophase. What is the mitotic index?',
        options: [
          { id: 'A', text: '10.0%' },
          { id: 'B', text: '11.1%' },
          { id: 'C', text: '20.0%' },
          { id: 'D', text: '90.0%' }
        ],
        correctOptionId: 'A',
        explanation: 'Total cells = 180 + 10 + 5 + 3 + 2 = 200. Cells in mitosis = 10 + 5 + 3 + 2 = 20. Mitotic index = (20 / 200) × 100% = 10.0%.'
      }
    ],
    structuredQuestions: [
      {
        id: 't5-s1',
        syllabusRef: '5.2(a)',
        marks: 4,
        question: 'Describe how cytokinesis differs between an animal cell and a flowering plant cell.',
        markSchemePoints: [
          '1. In animal cells, a ring of contractile microfilaments pulls the cell surface membrane inwards forming a cleavage furrow.',
          '2. The cleavage furrow deepens until the membrane fuses to separate two daughter cells.',
          '3. Plant cells have a rigid cellulose cell wall so cannot form a cleavage furrow.',
          '4. Instead, Golgi vesicles collect along the equator and fuse to form a cell plate, which develops into a new cell surface membrane and cellulose cell wall.'
        ],
        examinerNote: 'Remember to state WHY plant cells cannot pinch inward (presence of rigid cellulose cell wall).'
      },
      {
        id: 't5-s2',
        syllabusRef: '5.1(c,d)',
        marks: 3,
        question: 'Explain why it is essential that cells produced by mitosis are genetically identical to the parent cell.',
        markSchemePoints: [
          '1. Daughter cells must contain the full, unchanged genome / chromosome number (2n) so they can carry out the same metabolic functions.',
          '2. Ensures genetic stability across tissues during growth, cell replacement, and tissue repair.',
          '3. Prevents harmful mutations or loss of essential genes that could lead to cell death or cancer.'
        ],
        examinerNote: 'Focus on maintaining full genetic information (all genes/alleles) and chromosome number across cell generations.'
      }
    ]
  },
  {
    id: 'nucleic-acids',
    topicNumber: 6,
    code: 'Topic 6',
    title: 'Nucleic Acids & Protein Synthesis',
    syllabusScope: '6.1 Structure of nucleic acids & replication of DNA · 6.2 Protein synthesis',
    overview:
      'Covers nucleotide monomers, phosphodiester bonds, purines vs pyrimidines, antiparallel DNA double helix, semi-conservative DNA replication (helicase, DNA polymerase, Okazaki fragments, ligase), transcription, mRNA splicing, translation, and gene mutations.',
    image: topic6NucleicImg,
    imageAlt: 'Molecular diagram of antiparallel DNA strands, semi-conservative replication fork, RNA polymerase transcription, and ribosome translation with tRNA',
    imageTitle: 'DNA Structure, Semi-Conservative Replication & Protein Synthesis',
    imageCaption:
      'Integrated view of antiparallel hydrogen-bonded base pairs (left), DNA replication producing two hybrid double helices (centre), transcription into mRNA (top right), and ribosomal translation with tRNA (bottom right).',
    figureKey: [
      { label: 'Antiparallel DNA & H-Bonds (Left)', description: 'Sugar-phosphate backbones run 5’→3’ and 3’→5’; purines pair with pyrimidines via H-bonds (A=T has 2, C≡G has 3).' },
      { label: 'Semi-Conservative Fork (Centre)', description: 'DNA helicase unzips H-bonds; each parental strand (pink/blue) pairs with a newly synthesised strand (cyan).' },
      { label: 'Transcription (Top Right)', description: 'RNA polymerase moves along the 3’→5’ DNA template strand to build a complementary 5’→3’ mRNA transcript.' },
      { label: 'Translation at Ribosome (Bottom Right)', description: 'mRNA codons pair with complementary tRNA anticodons inside the ribosome, linking amino acids by peptide bonds.' }
    ],
    learningObjectives: [
      { code: '6.1(a)', description: 'Describe the structure of nucleotides (including ATP) and polynucleotides formed via phosphodiester bonds.' },
      { code: '6.1(b)', description: 'Describe the structure of DNA as two antiparallel strands with complementary purine–pyrimidine base pairing (A=T, C≡G).' },
      { code: '6.1(c)', description: 'Explain semi-conservative replication of DNA, including roles of helicase, DNA polymerase (5’→3’), leading/lagging strands, Okazaki fragments, and DNA ligase.' },
      { code: '6.2(a)', description: 'State the main features of the genetic code (triplet, universal, non-overlapping, degenerate) and distinguish coding/template strands.' },
      { code: '6.2(b)', description: 'Describe transcription (including splicing of introns/exons in eukaryotes) and translation at ribosomes involving mRNA codons and tRNA anticodons.' },
      { code: '6.2(c)', description: 'Explain how gene mutations (base substitution, insertion, deletion) can alter polypeptide primary structure and protein function.' }
    ],
    sections: [
      {
        heading: '6.1 Nucleotides, DNA Double Helix & Semi-Conservative Replication',
        subRef: 'Syllabus 6.1',
        bullets: [
          'Nucleotide = Pentose sugar (deoxyribose in DNA, ribose in RNA) + phosphate group + nitrogenous base. Adjacent nucleotides join by condensation forming covalent phosphodiester bonds along the sugar-phosphate backbone.',
          'Purines (double ring): Adenine (A) and Guanine (G). Pyrimidines (single ring): Cytosine (C), Thymine (T in DNA), Uracil (U in RNA). A purine always pairs with a pyrimidine, keeping the helix diameter uniform.',
          'Base pairing: A = T (2 hydrogen bonds) and C ≡ G (3 hydrogen bonds). Higher GC content increases DNA melting temperature.',
          'Semi-conservative replication: (1) DNA helicase unzips double helix by breaking H-bonds; (2) free activated DNA nucleotides pair complementarily with each exposed template strand; (3) DNA polymerase catalyses phosphodiester bonds ONLY in the 5’ → 3’ direction — continuously on the leading strand, and discontinuously as Okazaki fragments on the lagging strand; (4) DNA ligase seals nicks between Okazaki fragments. Each daughter DNA has 1 parental + 1 new strand.'
        ],
        keyRule: 'Chargaff’s Rule in dsDNA: %A = %T and %C = %G  |  Purines (A + G) = Pyrimidines (T + C) = 50%'
      },
      {
        heading: '6.2 The Genetic Code, Transcription, Translation & Mutations',
        subRef: 'Syllabus 6.2',
        bullets: [
          'Genetic code properties: Triplet (3 mRNA bases = 1 codon = 1 amino acid); Non-overlapping (each base read once); Degenerate (64 codons for 20 amino acids, so most amino acids have >1 codon); Universal (same codons specify same amino acids across almost all organisms).',
          'Transcription (nucleus): DNA unwinds; RNA polymerase binds and synthesises complementary 5’→3’ pre-mRNA along the 3’→5’ template DNA strand (U pairs with DNA A). In eukaryotes, splicing removes non-coding introns and joins coding exons to produce mature mRNA.',
          'Translation (ribosomes): mRNA exits nuclear pore and binds ribosome. tRNA molecules (cloverleaf shape, each carrying one specific amino acid) match their 3-base anticodon to the complementary mRNA codon. Peptide bonds form between adjacent amino acids (ATP required), creating a polypeptide chain until a stop codon is reached.',
          'Gene mutations: Base substitution replaces one base (can be silent due to degenerate code, missense altering 1 amino acid, or nonsense creating an early stop codon). Base insertion or deletion alters the reading frame (frameshift), scrambling every subsequent codon and usually producing a non-functional protein.'
        ]
      }
    ],
    comparisonTable: {
      title: 'DNA vs mRNA vs tRNA Structural & Functional Comparison',
      headers: ['Feature', 'DNA', 'mRNA (Messenger RNA)', 'tRNA (Transfer RNA)'],
      rows: [
        ['Pentose sugar', 'Deoxyribose', 'Ribose', 'Ribose'],
        ['Nitrogenous bases', 'A, T, C, G', 'A, U, C, G', 'A, U, C, G'],
        ['Strands & Shape', 'Double-stranded antiparallel helix', 'Single linear strand (codons)', 'Single strand folded into cloverleaf with H-bonded stems'],
        ['Relative stability & size', 'Very long, permanent/stable', 'Short-lived, gene-length', 'Small (~75–90 nucleotides), reusable'],
        ['Primary role', 'Stores hereditary genetic code', 'Carries copy of gene from nucleus to ribosome', 'Delivers specific amino acids to ribosome via anticodon–codon pairing']
      ]
    },
    examinerTips: [
      {
        trap: 'Saying "DNA polymerase breaks the hydrogen bonds and joins nucleotides by H-bonds".',
        correction: 'DNA HELICASE breaks hydrogen bonds. DNA POLYMERASE forms covalent PHOSPHODIESTER BONDS along the sugar-phosphate backbone (H-bonds form spontaneously between complementary bases).'
      },
      {
        trap: 'Forgetting mRNA splicing in eukaryotic transcription.',
        correction: 'In eukaryotic cells, transcription first forms pre-mRNA containing both introns and exons; introns are removed and exons joined by splicing before mRNA leaves the nucleus.'
      }
    ],
    mcqs: [
      {
        id: 't6-q1',
        syllabusRef: '6.1(b)',
        question: 'Analysis of a sample of double-stranded DNA shows that 22% of its nitrogenous bases are guanine (G). What percentage of the bases are thymine (T)?',
        options: [
          { id: 'A', text: '22%' },
          { id: 'B', text: '28%' },
          { id: 'C', text: '44%' },
          { id: 'D', text: '56%' }
        ],
        correctOptionId: 'B',
        explanation: 'In double-stranded DNA, %G = %C = 22%, so G + C = 44%. The remaining 56% is split equally between A and T: %T = 56% ÷ 2 = 28%.'
      },
      {
        id: 't6-q2',
        syllabusRef: '6.1(c)',
        question: 'Why must one new DNA strand (the lagging strand) be synthesised discontinuously as Okazaki fragments during DNA replication?',
        options: [
          { id: 'A', text: 'DNA helicase can only unwind one strand of the double helix at a time.' },
          { id: 'B', text: 'DNA polymerase can only add nucleotides in the 5’ → 3’ direction, and the two template strands are antiparallel.' },
          { id: 'C', text: 'Pyrimidines take longer to pair than purines on the lagging strand.' },
          { id: 'D', text: 'DNA ligase inhibits continuous synthesis on the 3’ → 5’ template.' }
        ],
        correctOptionId: 'B',
        explanation: 'Because the template strands are antiparallel and DNA polymerase only synthesises in the 5’→3’ direction, synthesis away from the replication fork proceeds in short Okazaki fragments joined by DNA ligase.'
      },
      {
        id: 't6-q3',
        syllabusRef: '6.2(b)',
        question: 'A DNA template strand has the base triplet 3’–T A C–5’. What is the corresponding mRNA codon and the tRNA anticodon?',
        options: [
          { id: 'A', text: 'mRNA codon: AUG  |  tRNA anticodon: UAC' },
          { id: 'B', text: 'mRNA codon: ATG  |  tRNA anticodon: UAC' },
          { id: 'C', text: 'mRNA codon: UAC  |  tRNA anticodon: AUG' },
          { id: 'D', text: 'mRNA codon: AUG  |  tRNA anticodon: TAC' }
        ],
        correctOptionId: 'A',
        explanation: 'DNA 3’–TAC–5’ transcribes to complementary mRNA 5’–AUG–3’ (U replaces T). The tRNA anticodon complementary to AUG is 3’–UAC–5’.'
      },
      {
        id: 't6-q4',
        syllabusRef: '6.2(c)',
        question: 'Why does a single base substitution often have no effect on the primary structure of the polypeptide, whereas a single base deletion almost always renders the protein non-functional?',
        options: [
          { id: 'A', text: 'Substitutions occur only in introns, while deletions occur only in exons.' },
          { id: 'B', text: 'The genetic code is degenerate so a substitution may still code for the same amino acid, whereas a deletion causes a frameshift altering every downstream codon.' },
          { id: 'C', text: 'DNA polymerase automatically repairs deletions during translation.' },
          { id: 'D', text: 'Deletions change ribose into deoxyribose during transcription.' }
        ],
        correctOptionId: 'B',
        explanation: 'Because the genetic code is degenerate, changing the third base of a codon frequently specifies the same amino acid (silent mutation). A deletion shifts the reading frame for all subsequent triplets.'
      }
    ],
    structuredQuestions: [
      {
        id: 't6-s1',
        syllabusRef: '6.1(c)',
        marks: 4,
        question: 'Outline the roles of DNA helicase, DNA polymerase, and DNA ligase in semi-conservative replication of DNA.',
        markSchemePoints: [
          '1. DNA helicase unwinds the DNA double helix and breaks hydrogen bonds between complementary base pairs to expose both template strands.',
          '2. Free activated DNA nucleotides align against each template strand by complementary base pairing (A–T, C–G).',
          '3. DNA polymerase joins adjacent nucleotides by forming phosphodiester bonds in the 5’ → 3’ direction.',
          '4. DNA ligase seals the gaps (phosphodiester bonds) between Okazaki fragments on the lagging strand.'
        ],
        examinerNote: 'Never omit the directionality (5’→3’) of DNA polymerase or the specific bond names (hydrogen bonds broken vs phosphodiester bonds formed).'
      },
      {
        id: 't6-s2',
        syllabusRef: '6.2(b)',
        marks: 4,
        question: 'Describe how a eukaryotic pre-mRNA molecule is processed and translated into a polypeptide at a ribosome.',
        markSchemePoints: [
          '1. Non-coding introns are removed from pre-mRNA and coding exons are spliced together to form mature mRNA, which leaves the nucleus through a nuclear pore.',
          '2. mRNA binds to a ribosome (small and large subunits) exposing two codons.',
          '3. tRNA molecules carrying specific amino acids bind via complementary base pairing between their anticodons and the mRNA codons.',
          '4. Peptide bonds form between adjacent amino acids (using ATP) as the ribosome moves along the mRNA until a stop codon is reached.'
        ],
        examinerNote: 'Include splicing (introns removed, exons joined), nuclear pore exit, anticodon–codon pairing, and peptide bond formation.'
      }
    ]
  }
];

export const TOPIC7_OVERVIEW_DATA = {
  id: 'plant-transport' as ASTopicId,
  topicNumber: 7,
  code: 'Topic 7',
  title: 'Transport in Plants',
  syllabusScope: '7.1 Structure of transport tissues · 7.2 Transport mechanisms',
  overview:
    'Covers transverse plan diagrams of dicotyledonous stems, roots, and leaves, ultrastructure of xylem vessels, sieve tube elements and companion cells, root apoplast/symplast routes and the Casparian strip, transpiration cohesion-tension, virtual potometer practical investigations, xerophytic adaptations, and active phloem loading & mass flow.',
  image: topic7PlantImg,
  imageAlt: 'Transport in a vascular plant showing root water uptake, xylem transpiration stream to leaf stomata, and phloem translocation from source to sink',
  imageTitle: 'Integrated Plant Transport: Xylem Transpiration Stream & Phloem Mass Flow',
  imageCaption:
    'Overview of water uptake across root hair and cortex into lignified xylem vessels (blue arrows) and bidirectional translocation of assimilates inside phloem sieve tubes assisted by companion cells (amber arrows).',
  figureKey: [
    {
      label: 'Root Hair & Cortex (Bottom Left)',
      description: 'Water enters root hairs by osmosis down a water potential gradient and crosses the cortex via apoplast (cell walls) and symplast (plasmodesmata) pathways.'
    },
    {
      label: 'Xylem Vessel Elements (Blue Column)',
      description: 'Dead hollow tubes with lignified walls and bordered pits; unbroken columns of water move upward by cohesion-tension driven by transpiration pull.'
    },
    {
      label: 'Leaf Mesophyll & Stomata (Top Right)',
      description: 'Water evaporates from moist spongy mesophyll cell walls into air spaces and diffuses out through open stomata down a water vapour potential gradient.'
    },
    {
      label: 'Phloem Sieve Tubes & Companion Cells (Amber)',
      description: 'Living sieve tube elements with perforated sieve plates connected via plasmodesmata to metabolically active companion cells for active H⁺/sucrose loading and mass flow.'
    }
  ]
};

