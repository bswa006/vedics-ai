export interface TodayReading {
  general_insights: string;
  color_of_the_day: string;
  favorable_activities: string[];
  challenging_aspects: string[];
  remedies_for_the_day: string[];
}

export interface TodayReadingsResponse {
  reading: {
    today_reading: TodayReading;
  };
}
