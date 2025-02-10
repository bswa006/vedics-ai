import { PredictionType } from '../types/predictions';

// Display names for prediction types
export const PREDICTION_TYPE_NAMES: Partial<Record<PredictionType, string>> = {
  health_and_wellbeing: 'Health & Wellbeing',
  relationships_love_and_marriage: 'Relationships, Love & Marriage',
  major_life_periods: 'Major Life Periods',
  career_success_and_wealth: 'Career Success & Wealth',
  core_personality_and_life_path: 'Core Personality & Life Path',
  challenges_and_remedies: 'Challenges & Remedies',
  ask_anything: 'Ask Anything',
  today_readings: 'Today\'s Readings',
  today_reading: 'Today\'s Reading'
};
