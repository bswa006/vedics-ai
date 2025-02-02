export interface ReadingResponse {
  id: number;
  type: string;
  content: Record<string, PersonalityContent | CareerContent | RelationsContent | HealthContent | StrengthsWeaknessesContent>;
  created_at: string;
}

export interface PersonalityContent {
  traits: string[];
  social_perception: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface CareerContent {
  career_transformation: string;
  financial_growth: string;
  ideal_professions: string[];
}

export interface RelationsContent {
  family_relations: string;
  romantic_relations: string;
  social_interactions: string;
}

export interface HealthContent {
  mental_emotional_wellbeing: string;
  physical_wellbeing: string;
  potential_health_concerns: string[];
}

export interface StrengthsWeaknessesContent {
  hidden_talents: string[];
  potential_challenges: string;
  strengths: string[];
  weaknesses: string[];
}
