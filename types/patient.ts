// Core types for GenSec Health Dashboard

export type MetricStatus = 'red' | 'yellow' | 'green';

export interface TrendPoint {
  date: string;
  value: number;
}

export interface Citation {
  id: string;
  source: string;
  date: string;
  type: 'lab' | 'imaging' | 'genetic' | 'wearable';
  pdfUrl?: string;
  snippet?: string;
}

export interface Metric {
  name: string;
  value: string;
  unit?: string;
  status: MetricStatus;
  trend?: TrendPoint[];
  citationId: string;
  delta?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
    percentage?: number;
  };
  referenceRange?: string;
  notes?: string;
}

export interface MetricCategory {
  title: string;
  status: MetricStatus;
  metrics: Metric[];
  summary?: string;
}

export interface CardiovascularData {
  lipids: MetricCategory;
  imaging: MetricCategory;
  inflammation: MetricCategory;
  genetics: MetricCategory;
}

export interface NeurodegenerativeData {
  genetics: MetricCategory;
  cognitiveScores: MetricCategory;
}

export interface MetabolicData {
  glucose: MetricCategory;
  insulin: MetricCategory;
}

export interface LongevityData {
  fitness: MetricCategory;
  biologicalAge: MetricCategory;
}

export interface PharmacogenomicData {
  drugGeneInteractions: MetricCategory;
}

export interface PatientOverview {
  name: string;
  age: number;
  gender: string;
  mrn: string;
  referralReason: string;
  lastVisit: string;
  activeAlerts: number;
}

export interface PatientData {
  overview: PatientOverview;
  cardiovascular: CardiovascularData;
  neurodegenerative: NeurodegenerativeData;
  metabolic: MetabolicData;
  longevity: LongevityData;
  pharmacogenomic: PharmacogenomicData;
  citations: Record<string, Citation>;
}
