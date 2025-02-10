// Order of prediction types to display in the UI
export const PREDICTION_TYPE_ORDER = [
  'career_success_and_wealth',
  'relationships_love_and_marriage',
  'health_and_wellbeing',
  'major_life_periods',
  'core_personality_and_life_path',
  'challenges_and_remedies'
] as const;

export type PredictionType = typeof PREDICTION_TYPE_ORDER[number];

// Display names for prediction types
export const PREDICTION_TYPE_NAMES: Record<PredictionType, string> = {
  career_success_and_wealth: 'Career Success & Wealth',
  relationships_love_and_marriage: 'Relationships, Love & Marriage',
  health_and_wellbeing: 'Health & Wellbeing',
  major_life_periods: 'Major Life Periods',
  core_personality_and_life_path: 'Core Personality & Life Path',
  challenges_and_remedies: 'Challenges & Remedies'
};
