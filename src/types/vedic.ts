import { PredictionType } from './predictions';

export interface BirthDetails {
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
}

export interface CorePersonality {
  traits: string[];
  social_perception: string;
  past_life_influence: string;
}

export interface CareerTransformation {
  expected_age_range: string;
  prediction: string;
}

export interface CareerSuccess {
  ideal_professions: string[];
  financial_growth: {
    trend: string;
    wealth_accumulation: string;
  };
  foreign_opportunities: string;
  career_transformation: CareerTransformation;
  business_vs_job: string;
}

export interface Marriage {
  prediction: string;
  partner_traits: string[];
  challenges: string;
}

export interface Relationships {
  traits_in_relationships: string[];
  marriage: Marriage;
  romantic_influences: string;
  relationship_advice?: string;
}

export interface HealthWellbeing {
  concerns: string[];
  recommendations: string[];
  'long_term_health': string;
}

export interface Remedies {
  mantras: string[];
  spiritual_practices: string[];
  astrological_recommendations: string[];
}

export interface YearlyPrediction {
  overview: string;
  career: string;
  relationships: string;
  health: string;
}

export interface MonthlyOverview {
  overview: string;
  focus_areas: string[];
}

export interface TemporalPredictions {
  yearly: {
    [year: string]: YearlyPrediction;
  };
  monthly: {
    [month: string]: MonthlyOverview;
  };
}

export interface MajorLifePeriods {
  early_life: string;
  mid_life: string;
  later_years: string;
}

export interface ChallengesAndRemedies {
  challenges: string[];
  remedies: Remedies;
}

export interface Prediction {
  core_personality_and_life_path: CorePersonality;
  career_success_and_wealth: CareerSuccess;
  relationships_love_and_marriage: Relationships;
  health_and_wellbeing: HealthWellbeing;
  challenges_and_remedies: ChallengesAndRemedies;
  major_life_periods: MajorLifePeriods;
  temporal_predictions?: TemporalPredictions;
  general_predictions?: string;
}

export interface VedicReading {
  birth_details: BirthDetails;
  prediction: Prediction;
  content: Array<{
    id: number;
    created_at: string;
    type: PredictionType;
    content: CorePersonality | CareerSuccess | Relationships | HealthWellbeing | ChallengesAndRemedies | MajorLifePeriods;
  }>;
}
