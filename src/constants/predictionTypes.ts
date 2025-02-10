// Order of prediction types to display in the UI
export const PREDICTION_TYPE_ORDER = [
  'core_personality_and_life_path',
  'relationships_love_and_marriage',
  'career_success_and_wealth',
  'health_and_wellbeing',
  'major_life_periods',
  'challenges_and_remedies',
] as const;

export type PredictionType = typeof PREDICTION_TYPE_ORDER[number];

// Display names for prediction types
export const PREDICTION_TYPE_NAMES: Record<PredictionType, string> = {
  core_personality_and_life_path: 'Core Personality & Life Path',
  relationships_love_and_marriage: 'Relationships, Love & Marriage',
  career_success_and_wealth: 'Career Success & Wealth',
  health_and_wellbeing: 'Health & Wellbeing',
  major_life_periods: 'Major Life Periods',
  challenges_and_remedies: 'Challenges & Remedies',
};
