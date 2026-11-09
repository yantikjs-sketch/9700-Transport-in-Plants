export type SyllabusSectionId = '7.1' | '7.2';

export interface LearningObjective {
  id: string;
  section: SyllabusSectionId;
  code: string; // e.g. '7.1(a)'
  title: string;
  description: string;
  keyTerms: string[];
  mastered?: boolean;
}

export interface TissueLayer {
  id: string;
  name: string;
  location: string;
  appearanceInPlan: string;
  structure: string;
  function: string;
  cambridgeTip: string;
}

export type OrganType = 'stem' | 'root' | 'leaf';

export interface OrganAnatomy {
  id: OrganType;
  name: string;
  specimen: string;
  description: string;
  layers: TissueLayer[];
  planRules: string[];
}

export interface PotometerMeasurement {
  id: string;
  timeSec: number;
  distanceMm: number;
  volumeMm3: number;
  lightIntensity: string;
  temperature: number;
  humidity: number;
  windSpeed: string;
  calculatedRateMm3PerMin: number;
}

export interface MCQQuestion {
  id: string;
  question: string;
  context?: string;
  diagramSvg?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  examinerComment: string;
  learningObjectiveId: string;
}

export interface StructuredQuestionPart {
  partLabel: string;
  questionText: string;
  marks: number;
  modelAnswer: string;
  markSchemePoints: {
    point: string;
    keyword: string;
    notes?: string;
  }[];
  examinerReportSnippet: string;
}

export interface StructuredQuestion {
  id: string;
  title: string;
  totalMarks: number;
  context: string;
  diagramType?: string;
  parts: StructuredQuestionPart[];
  syllabusCode: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'anatomy' | 'water-potential' | 'transpiration' | 'translocation' | 'practical';
  examinerAlert?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  syllabusRef: string;
  formulaOrRule?: string;
}
