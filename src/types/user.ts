export interface UserDetails {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  email_opt_in: boolean;
}

export interface User {
  id: number;
  user: UserDetails;
  date_of_birth: string | null;
  time_of_birth: string | null;
  place_of_birth: string;
  preferred_language: string;
  area_of_interests: string[];
  long_term_reading_status: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  email_opt_in?: boolean;
}

export interface UserProfile {
  id: number;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  date_of_birth: string | null;
  time_of_birth: string | null;
  place_of_birth: string;
  preferred_language: string;
  area_of_interests: string[];
  long_term_reading_status: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
