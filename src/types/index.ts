export type NavigationRoute = 
  | 'home'
  | 'platform'
  | 'simulator'
  | 'validation'
  | 'industries'
  | 'case-studies'
  | 'learn'
  | 'calculators'
  | 'compare'
  | 'docs'
  | 'about'
  | 'pricing'
  | 'contact';

export type LanguageCode = 'en' | 'hi' | 'kn' | 'de' | 'ja';

export interface IndustryData {
  id: string;
  title: string;
  category: string;
  headline: string;
  reynoldsRange: string;
  machRange: string;
  keyPhysics: string[];
  description: string;
  metrics: { label: string; value: string }[];
  caseHighlight: string;
}

export interface BenchmarkStudy {
  id: string;
  title: string;
  referenceAuthor: string;
  referenceYear: number;
  geometryType: string;
  flowRegime: string;
  reynoldsNumber: number;
  keyMetric: string;
  measuredError: string;
  verificationGrade: 'AIAA G-077' | 'ASME V&V 20' | 'Canonical 1982';
  summary: string;
  referenceDataPoints: { x: number; y: number }[];
  solverDataPoints: { x: number; y: number }[];
}

export interface ComparisonPlatform {
  feature: string;
  aetherCfd: string;
  traditionalAnsys: string;
  cloudSimScale: string;
  luminaryNavier: string;
  category: 'Access & Speed' | 'Verification & Code' | 'Data & Export';
}

export interface CaseStudyItem {
  id: string;
  title: string;
  sector: string;
  clientAlias: string;
  problem: string;
  solution: string;
  quantitativeImpact: string;
  quote: string;
  authorTitle: string;
}

export interface CfdPresetConfig {
  id: string;
  name: string;
  description: string;
  reynoldsNumber: number;
  machNumber: number;
  gridResolution: string;
  boundaryConditions: string;
  inletVelocity: number;
  kinematicViscosity: number;
}
