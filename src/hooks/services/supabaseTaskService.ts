
import { supabase } from '@/integrations/supabase/client';
import { Task } from '../../types/Task';

export class SupabaseTaskService {
  static async loadTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(task => ({
      id: task.id,
      text: task.text,
      completed: task.completed,
      createdAt: new Date(task.created_at).toDateString(),
      user_id: task.user_id
    }));
  }

  static async addTask(userId: string, taskText: string): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        text: taskText,
        user_id: userId,
        completed: false
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      text: data.text,
      completed: data.completed,
      createdAt: new Date(data.created_at).toDateString(),
      user_id: data.user_id
    };
  }

  static async toggleTask(taskId: string, completed: boolean): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', taskId);

    if (error) throw error;
  }

  static async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  }

  static async updateTask(taskId: string, text: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ text })
      .eq('id', taskId);

    if (error) throw error;
  }
}
