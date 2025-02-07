import { TodayReading } from './readings';

export type PredictionType =
  | 'core_personality_and_life_path'
  | 'career_success_and_wealth'
  | 'relationships_love_and_marriage'
  | 'health_and_wellbeing'
  | 'challenges_and_remedies'
  | 'major_life_periods'
  | 'ask_anything'
  | 'today_readings'
  | 'today_reading';

export interface PersonalityContent {
  type: 'core_personality_and_life_path';
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  social_perception: string;
  past_life_influence: string;
}

export interface CareerContent {
  type: 'career_success_and_wealth';
  ideal_professions: string[];
  financial_growth: {
    trend: string;
    wealth_accumulation: string;
  };
  career_transformation: {
    expected_age_range: string;
    prediction: string;
  };
  foreign_opportunities: string;
  business_vs_job: string;
}

export interface RelationshipsContent {
  type: 'relationships_love_and_marriage';
  traits_in_relationships: string[];
  marriage: {
    prediction: string;
    partner_traits: string[];
    challenges: string;
  };
  romantic_influences: string;
}

export interface HealthContent {
  type: 'health_and_wellbeing';
  concerns: string[];
  recommendations: string[];
  long_term_health: string;
}

export interface ChallengesContent {
  type: 'challenges_and_remedies';
  challenges: string[];
  remedies: {
    mantras: string[];
    spiritual_practices: string[];
    astrological_recommendations: string[];
  };
}

export interface MajorLifePeriodsContent {
  type: 'major_life_periods';
  early_life: string;
  mid_life: string;
  later_years: string;
}

export interface AskAnythingContent {
  type: 'ask_anything';
  question: string;
  answer: string;
}

export type PredictionContent =
  | PersonalityContent
  | CareerContent
  | RelationshipsContent
  | HealthContent
  | ChallengesContent
  | MajorLifePeriodsContent
  | AskAnythingContent;

export interface PredictionApiResponse {
  prediction_type: PredictionType;
  content: Record<string, any>;
  id: number;
  created_at: string;
  updated_at: string;
}

export type BasePrediction =
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'core_personality_and_life_path';
      content: PersonalityContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'career_success_and_wealth';
      content: CareerContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'relationships_love_and_marriage';
      content: RelationshipsContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'health_and_wellbeing';
      content: HealthContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'challenges_and_remedies';
      content: ChallengesContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'major_life_periods';
      content: MajorLifePeriodsContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'ask_anything';
      content: AskAnythingContent;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'today_readings';
      content: Record<string, never>;
    }
  | {
      id: number;
      created_at: string;
      updated_at: string;
      prediction_type: 'today_reading';
      content: TodayReading;
    };

export type PredictionResponse = BasePrediction[];
