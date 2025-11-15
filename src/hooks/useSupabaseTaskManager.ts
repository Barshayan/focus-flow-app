import { useState, useEffect, useCallback } from 'react';
import { Task, DailyHistory } from '../types/Task';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { SupabaseTaskService } from './services/supabaseTaskService';
import { UserSettingsService } from './services/userSettingsService';
import { calculateDailyHistory, calculateStreak } from './utils/taskCalculations';
import { getCompletionAnimation, getStreakAnimation } from './utils/animationUtils';

export const useSupabaseTaskManager = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyGoal, setDailyGoalState] = useState(5);
  const [completionAnimation, setCompletionAnimation] = useState('');
  const [streakAnimation, setStreakAnimation] = useState('');
  const [streak, setStreak] = useState(0);
  const [dailyHistory, setDailyHistory] = useState<DailyHistory>({});
  const [editingTask, setEditingTask] = useState<number | string | null>(null);
  const [editText, setEditText] = useState('');

  const loadTasks = useCallback(async () => {
    if (!user) return;

    try {
      const loadedTasks = await SupabaseTaskService.loadTasks(user.id);
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast.error('Failed to load tasks');
    }
  }, [user]);

  const loadUserSettings = useCallback(async () => {
    if (!user) return;

    try {
      const goal = await UserSettingsService.loadDailyGoal(user.id);
      setDailyGoalState(goal);
    } catch (error) {
      console.error('Error loading user settings:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadTasks();
      loadUserSettings();
    } else {
      setTasks([]);
      setDailyGoalState(5);
    }
  }, [user, loadTasks, loadUserSettings]);

  useEffect(() => {
    if (tasks.length > 0) {
      const history = calculateDailyHistory(tasks, dailyGoal);
      setDailyHistory(history);

      const currentStreak = calculateStreak(history);
      const previousStreak = streak;
      setStreak(currentStreak);

      if (currentStreak > previousStreak && currentStreak > 0) {
        const animation = getStreakAnimation(currentStreak);
        setStreakAnimation(animation);
        setTimeout(() => setStreakAnimation(''), 3000);
      }
    }
  }, [tasks, dailyGoal, streak]);

  const setDailyGoal = async (newGoal: number) => {
    if (!user) return;

    try {
      await UserSettingsService.updateDailyGoal(user.id, newGoal);
      setDailyGoalState(newGoal);
    } catch (error) {
      console.error('Error updating daily goal:', error);
      toast.error('Failed to update daily goal');
    }
  };

  const addTask = async (taskText: string) => {
    if (!user) return;

    try {
      const newTask = await SupabaseTaskService.addTask(user.id, taskText);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };

  const toggleTask = async (id: number | string) => {
    if (!user) return;

    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const taskId = typeof id === 'number' ? id.toString() : id;
      await SupabaseTaskService.toggleTask(taskId, !task.completed);

      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );

      if (!task.completed) {
        const animation = getCompletionAnimation();
        setCompletionAnimation(animation);
        setTimeout(() => setCompletionAnimation(''), 2000);

        const todayISO = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(
          t => new Date(t.createdAt).toISOString().split('T')[0] === todayISO
        );
        const completedToday = todayTasks.filter(t => t.completed).length + 1;

        if (completedToday >= dailyGoal) {
          setTimeout(() => {
            const history = calculateDailyHistory(
              tasks.map(t =>
                t.id === id ? { ...t, completed: true } : t
              ),
              dailyGoal
            );
            const newStreak = calculateStreak(history);

            if (newStreak > streak) {
              const streakAnim = getStreakAnimation(newStreak);
              setStreakAnimation(streakAnim);
              setTimeout(() => setStreakAnimation(''), 3000);
            }
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error toggling task:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id: number | string) => {
    if (!user) return;

    try {
      const taskId = typeof id === 'number' ? id.toString() : id;
      await SupabaseTaskService.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = async () => {
    if (!user || !editingTask) return;

    try {
      const taskId =
        typeof editingTask === 'number'
          ? editingTask.toString()
          : editingTask;
      await SupabaseTaskService.updateTask(taskId, editText);

      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask ? { ...t, text: editText } : t
        )
      );

      setEditingTask(null);
      setEditText('');
      toast.success('Task updated');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const getTasksByDate = (date: Date) => {
    const dateISO = date.toISOString().split('T')[0];
    return tasks.filter(
      task => new Date(task.createdAt).toISOString().split('T')[0] === dateISO
    );
  };

  return {
    tasks,
    dailyGoal,
    setDailyGoal,
    completionAnimation,
    streakAnimation,
    streak,
    dailyHistory,
    addTask,
    toggleTask,
    deleteTask,
    startEditing,
    saveEdit,
    cancelEdit,
    editingTask,
    editText,
    setEditText,
    getTasksByDate
  };
};
