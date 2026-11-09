import { Flashcard } from '../types/biology';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'anatomy',
    front: 'Where is xylem located relative to phloem in a dicot stem vs a dicot root?',
    back: 'Stem: Xylem is towards the inside (centripetal); phloem is towards the outside (centrifugal) in a peripheral ring.\nRoot: Xylem forms a central star/cross; phloem is in clusters between the arms of the xylem.',
    examinerAlert: 'Memorise: Stem = Xylem inside, Phloem outside. Root = Xylem central star.'
  },
  {
    id: 'fc-2',
    category: 'anatomy',
    front: 'What are the three structural adaptations of a xylem vessel element that facilitate mass flow of water?',
    back: '1. Dead cells with empty lumen (no cytoplasm/organelles) to minimise resistance to flow.\n2. End walls completely broken down to form a continuous open tube.\n3. Lignified cell walls providing mechanical strength to prevent collapse under tension.',
    examinerAlert: 'Lignin prevents collapse under tension (not bursting!).'
  },
  {
    id: 'fc-3',
    category: 'anatomy',
    front: 'Why are companion cells essential to sieve tube elements?',
    back: 'Sieve tube elements lack nuclei, ribosomes, and have reduced organelles. Companion cells supply metabolic support, synthesize proteins/ATP, and contain proton pumps & cotransporters for active phloem loading, connected via numerous plasmodesmata.',
    examinerAlert: 'Sieve tube elements are LIVING cells, not dead.'
  },
  {
    id: 'fc-4',
    category: 'water-potential',
    front: 'State the formula for water potential of a plant cell and define each component.',
    back: 'Ψ = Ψs + Ψp\nΨ = Water potential (kPa / MPa)\nΨs = Solute potential (always negative or zero in pure water)\nΨp = Pressure potential (hydrostatic/turgor pressure exerted by cell wall; positive or zero at plasmolysis)',
    examinerAlert: 'Pure water has Ψ = 0 kPa. Adding solutes makes Ψ negative.'
  },
  {
    id: 'fc-5',
    category: 'water-potential',
    front: 'What is "incipient plasmolysis"? What is the value of Ψp at this point?',
    back: 'Incipient plasmolysis is the point where the protoplast just ceases to exert pressure against the cell wall (cell is flaccid).\nAt incipient plasmolysis, Ψp = 0 kPa, so Ψcell = Ψs.',
    examinerAlert: '50% of cells are plasmolysed at incipient plasmolysis in tissue samples.'
  },
  {
    id: 'fc-6',
    category: 'transpiration',
    front: 'Distinguish between apoplast and symplast pathways in root cortex.',
    back: 'Apoplast: Water moves through cell walls and intercellular spaces by mass flow.\nSymplast: Water moves through living cytoplasm and vacuoles of cells via plasmodesmata.',
    examinerAlert: 'Apoplast is blocked by the Casparian strip at the endodermis.'
  },
  {
    id: 'fc-7',
    category: 'transpiration',
    front: 'What is the Casparian strip and why is it biologically important?',
    back: 'A band of impermeable suberin in the radial and transverse walls of endodermal cells. It blocks the apoplast pathway, forcing water and dissolved mineral ions through the selectively permeable cell surface membrane into the symplast so ion entry into the xylem can be regulated.',
    examinerAlert: 'Key words: Suberin, impermeable, blocks apoplast, selective regulation.'
  },
  {
    id: 'fc-8',
    category: 'transpiration',
    front: 'Explain the difference between cohesion and adhesion in the transpiration stream.',
    back: 'Cohesion: Hydrogen bonding between water molecules, maintaining an unbroken continuous water column under tension.\nAdhesion: Hydrogen bonding between water molecules and hydrophilic xylem walls (cellulose/lignin), supporting the column against gravity.',
    examinerAlert: 'Do not confuse them! Cohesion = water-water; Adhesion = water-wall.'
  },
  {
    id: 'fc-9',
    category: 'practical',
    front: 'How is the volume and rate of water uptake calculated using a capillary potometer?',
    back: 'Volume = π × r² × d\n(r = radius of capillary bore, d = distance bubble moved)\nRate of uptake = Volume / time taken (e.g. mm³ · min⁻¹)',
    examinerAlert: 'Always check if diameter or radius is given! Radius = diameter / 2.'
  },
  {
    id: 'fc-10',
    category: 'practical',
    front: 'Give 3 critical precautions when assembling a potometer.',
    back: '1. Cut leafy shoot underwater at a slanted angle (prevents air entry into xylem; increases surface area).\n2. Assemble apparatus completely underwater to prevent air bubbles.\n3. Seal all rubber joints with petroleum jelly to make the apparatus completely airtight.',
    examinerAlert: 'Also dry the leaves before taking readings so evaporation is unhindered.'
  },
  {
    id: 'fc-11',
    category: 'transpiration',
    front: 'Name 4 adaptations of xerophytic leaves that reduce transpiration rate.',
    back: '1. Sunken stomata in pits (traps humid air).\n2. Rolled/curled leaves with hinge cells (protects stomatal surface).\n3. Epidermal hairs/trichomes (traps moist boundary layer).\n4. Thick waxy cuticle (reduces cuticular evaporation).\n(Also: reduced surface area to volume ratio, e.g. needles/spines).',
    examinerAlert: 'Explain WHY: All trapped humid air layers reduce the water vapour potential gradient!'
  },
  {
    id: 'fc-12',
    category: 'translocation',
    front: 'Describe the mechanism of active loading of sucrose into companion cells.',
    back: '1. H+-ATPase proton pumps actively pump H+ ions out into the cell wall using ATP.\n2. Creates steep H+ electrochemical gradient outside companion cell.\n3. H+ ions diffuse back in down gradient via H+/sucrose cotransporter carrier protein.\n4. Cotransporter carries sucrose against its concentration gradient with H+ into companion cell.',
    examinerAlert: 'Secondary active transport driven by primary ATP-driven proton pump.'
  },
  {
    id: 'fc-13',
    category: 'translocation',
    front: 'How does high hydrostatic pressure develop in phloem sieve tubes at the source?',
    back: '1. Sucrose is loaded into sieve tube elements from companion cells via plasmodesmata.\n2. Solute concentration increases, lowering water potential (Ψ becomes more negative).\n3. Water enters sieve tube from adjacent xylem vessels by osmosis down water potential gradient.\n4. Inelastic cell walls resist volume expansion, creating high hydrostatic pressure.',
    examinerAlert: 'Water movement is by osmosis (Ψ gradient); sap mass flow is by hydrostatic pressure gradient!'
  },
  {
    id: 'fc-14',
    category: 'translocation',
    front: 'Define a "source" and a "sink" with two biological examples of each.',
    back: 'Source: Site where assimilates are produced or mobilised (e.g., mature photosynthesising green leaves; germinating seed storage cotyledons; sprouting potato tuber in spring).\nSink: Site where assimilates are used or stored (e.g., growing shoot/root tips; developing flowers/fruits; growing potato tubers in summer).',
    examinerAlert: 'Storage organs can act as sinks or sources depending on the season!'
  }
];
