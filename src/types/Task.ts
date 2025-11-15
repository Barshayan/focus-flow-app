

export interface Task {
  id: number | string; // Support both number (local) and string (Supabase UUID)
  text: string;
  completed: boolean;
  createdAt: string;
  user_id?: string; // Added user_id for Supabase compatibility
}

export interface DailyHistory {
  [key: string]: DayData;
}

export interface DayData {
  completed: number;
  total: number;
  goal: number;
}

