
import { supabase } from '@/integrations/supabase/client';

export class UserSettingsService {
  static async loadDailyGoal(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('user_settings')
      .select('daily_goal')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return data?.daily_goal || 5;
  }

  static async updateDailyGoal(userId: string, dailyGoal: number): Promise<void> {
    // First check if a record exists
    const { data: existingData } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingData) {
      // Update existing record
      const { error } = await supabase
        .from('user_settings')
        .update({ daily_goal: dailyGoal })
        .eq('user_id', userId);

      if (error) throw error;
    } else {
      // Insert new record
      const { error } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          daily_goal: dailyGoal
        });

      if (error) throw error;
    }
  }
}
