export type PredictionType = 
  | 'core_personality_and_life_path'
  | 'career_success_and_wealth'
  | 'relationships_love_and_marriage'
  | 'health_and_wellbeing'
  | 'challenges_and_remedies'
  | 'major_life_periods';

export interface BasePrediction {
  id: number;
  created_at: string;
  type: PredictionType;
  content: Record<string, any>;
}

export interface CorePersonalityContent {
  past_life_influence: string;
  social_perception: string;
  traits: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export interface CareerSuccessContent {
  business_vs_job: string;
  career_transformation: {
    expected_age_range: string;
    prediction: string;
  };
  financial_growth: {
    trend: string;
    wealth_accumulation: string;
  };
  foreign_opportunities: string;
  ideal_professions: string[];
}

export interface RelationshipsContent {
  marriage: {
    challenges: string;
    partner_traits: string[];
    prediction: string;
  };
  romantic_influences: string;
  traits_in_relationships: string[];
}

export interface HealthContent {
  concerns: string[];
  long_term_health: string;
  recommendations: string[];
}

export interface ChallengesContent {
  challenges: string[];
  remedies: {
    astrological_recommendations: string[];
    mantras: string[];
    spiritual_practices: string[];
  };
}

export interface MajorLifePeriodsContent {
  early_life: string;
  mid_life: string;
  later_years: string;
}

export type PredictionContent =
  | CorePersonalityContent
  | CareerSuccessContent
  | RelationshipsContent
  | HealthContent
  | ChallengesContent
  | MajorLifePeriodsContent;

export interface Prediction {
  type: PredictionType;
  content: PredictionContent;
}

export type PredictionResponse = Prediction[];

// Type guard functions
export function isCorePersonalityPrediction(prediction: Prediction): prediction is CorePersonalityPrediction {
  return prediction.type === 'core_personality_and_life_path';
}

export function isCareerSuccessPrediction(prediction: Prediction): prediction is CareerSuccessPrediction {
  return prediction.type === 'career_success_and_wealth';
}

export function isRelationshipsPrediction(prediction: Prediction): prediction is RelationshipsPrediction {
  return prediction.type === 'relationships_love_and_marriage';
}

export function isHealthPrediction(prediction: Prediction): prediction is HealthPrediction {
  return prediction.type === 'health_and_wellbeing';
}

export function isChallengesPrediction(prediction: Prediction): prediction is ChallengesPrediction {
  return prediction.type === 'challenges_and_remedies';
}

export function isMajorLifePeriodsPrediction(prediction: Prediction): prediction is MajorLifePeriodsPrediction {
  return prediction.type === 'major_life_periods';
}

export interface CorePersonalityPrediction extends BasePrediction {
  type: 'core_personality_and_life_path';
  content: CorePersonalityContent;
}

export interface CareerSuccessPrediction extends BasePrediction {
  type: 'career_success_and_wealth';
  content: CareerSuccessContent;
}

export interface RelationshipsPrediction extends BasePrediction {
  type: 'relationships_love_and_marriage';
  content: RelationshipsContent;
}

export interface HealthPrediction extends BasePrediction {
  type: 'health_and_wellbeing';
  content: HealthContent;
}

export interface ChallengesPrediction extends BasePrediction {
  type: 'challenges_and_remedies';
  content: ChallengesContent;
}

export interface MajorLifePeriodsPrediction extends BasePrediction {
  type: 'major_life_periods';
  content: MajorLifePeriodsContent;
}
