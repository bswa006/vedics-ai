export interface BirthDetails {
  date_of_birth: string;
  time: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface LagnaChart {
  ascendant: string;
  sun_sign: string;
  moon_sign: string;
  nakshatra: string;
  current_dasha: string;
}

export interface NavamsaChart {
  d9_lagna: string;
  marriage: {
    seventh_house: {
      influence: string;
      partner_traits: string;
    };
    marriage_timing: {
      probable_period: string;
      strong_period: string;
    };
  };
  career: {
    tenth_house_influence: string;
    preferred_career_paths: string[];
    career_peak: string;
  };
}

export interface PlanetaryAspects {
  benefic_planets: {
    jupiter: string;
    venus: string;
    mars: string;
  };
  challenging_planets: {
    saturn: {
      effect: string;
      remedy: string;
    };
    rahu_ketu: {
      effect: string;
      remedy: string;
    };
  };
}

export interface LifePredictions {
  [key: string]: string;
}

export interface Remedies {
  career: string[];
  emotional_stability: string[];
  marriage: string[];
}

export interface Summary {
  strengths: string[];
  challenges: string[];
  advice: string[];
}

export interface AstrologyData {
  birth_details: BirthDetails;
  lagna_chart: LagnaChart;
  navamsa_chart: NavamsaChart;
  planetary_aspects: PlanetaryAspects;
  life_predictions: LifePredictions;
  remedies: Remedies;
  summary: Summary;
}
