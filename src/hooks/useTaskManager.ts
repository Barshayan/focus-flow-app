
import { useState, useEffect } from 'react';
import { Task, DailyHistory } from '../types/Task';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<number | string | null>(null);
  const [editText, setEditText] = useState('');
  const [dailyGoal, setDailyGoal] = useState(5);
  const [completionAnimation, setCompletionAnimation] = useState('');
  const [streak, setStreak] = useState(0);
  const [streakAnimation, setStreakAnimation] = useState('');
  const [dailyHistory, setDailyHistory] = useState<DailyHistory>({});
  const [goalAchievedToday, setGoalAchievedToday] = useState(false);

  const congratsMessages = [
    "You're crushing it! 🔥",
    "Awesome work! 💪",
    "Keep it up! 🚀",
    "You're on fire! ⭐",
    "Fantastic! 🎉",
    "Well done! 🎯",
    "Outstanding! 💎"
  ];

  const streakMessages = [
    { min: 1, message: "🔥 Day 1 complete! Streak started!" },
    { min: 3, message: "🚀 3 days strong! Building momentum!" },
    { min: 7, message: "⭐ One week streak! You're a champion!" },
    { min: 14, message: "💎 Two weeks! You're unstoppable!" },
    { min: 30, message: "🏆 30-day streak! Legendary dedication!" }
  ];

  const today = new Date().toDateString();

  // Initialize with sample data for demo
  useEffect(() => {
    if (tasks.length === 0) {
      const sampleTasks: Task[] = [
        { id: 1, text: 'Review morning emails', completed: false, createdAt: today },
        { id: 2, text: 'Complete project proposal', completed: false, createdAt: today },
        { id: 3, text: 'Call client about meeting', completed: false, createdAt: today }
      ];
      setTasks(sampleTasks);
      setStreak(0);
      setDailyHistory({
        [today]: { completed: 0, total: sampleTasks.length, goal: 5 }
      });
      setGoalAchievedToday(false);
    }
  }, [today, tasks.length]);

  const updateDailyHistory = (taskList: Task[], dateStr: string = today) => {
    const dayTasks = taskList.filter(task => task.createdAt === dateStr);
    const completedCount = dayTasks.filter(task => task.completed).length;
    
    const newHistory = {
      ...dailyHistory,
      [dateStr]: {
        completed: completedCount,
        total: dayTasks.length,
        goal: dailyGoal
      }
    };
    
    setDailyHistory(newHistory);
    return { completedCount, totalCount: dayTasks.length };
  };

  const checkAndUpdateStreak = (completedCount: number) => {
    if (completedCount >= dailyGoal && !goalAchievedToday) {
      setGoalAchievedToday(true);
      
      // Calculate new streak
      const updatedHistory = {
        ...dailyHistory,
        [today]: {
          completed: completedCount,
          total: tasks.filter(task => task.createdAt === today).length,
          goal: dailyGoal
        }
      };
      
      const newStreak = getConsecutiveStreak(updatedHistory, today);
      setStreak(newStreak);
      
      // Show streak animation
      const streakMessage = streakMessages
        .reverse()
        .find(msg => newStreak >= msg.min);
      
      if (streakMessage) {
        setStreakAnimation(streakMessage.message);
        setTimeout(() => setStreakAnimation(''), 4000);
      }
    }
  };

  const addTask = (taskText: string) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => typeof t.id === 'number' ? t.id : 0)) : 0;
    const task: Task = {
      id: maxId + 1,
      text: taskText,
      completed: false,
      createdAt: today
    };
    // Add new task at the beginning of the array (top of list)
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    updateDailyHistory(newTasks);
  };

  const toggleTask = (id: number | string) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        
        // Show completion animation only when task is completed
        if (!task.completed && updatedTask.completed) {
          const randomMessage = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
          setCompletionAnimation(randomMessage);
          setTimeout(() => setCompletionAnimation(''), 3000);
        }
        
        return updatedTask;
      }
      return task;
    });
    
    setTasks(newTasks);
    const { completedCount } = updateDailyHistory(newTasks);
    checkAndUpdateStreak(completedCount);
  };

  const deleteTask = (id: number | string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    updateDailyHistory(newTasks);
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask ? { ...task, text: editText } : task
      ));
      setEditingTask(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const getConsecutiveStreak = (history: DailyHistory, currentDate: string): number => {
    const dates = Object.keys(history).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let streak = 0;
    
    for (const date of dates) {
      const data = history[date];
      if (data.completed >= data.goal) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTasksByDate = (date: Date): Task[] => {
    const dateString = date.toDateString();
    return tasks.filter(task => task.createdAt === dateString);
  };

  // Reset goal achieved flag when date changes
  useEffect(() => {
    setGoalAchievedToday(false);
    const todayData = dailyHistory[today];
    if (todayData && todayData.completed >= todayData.goal) {
      setGoalAchievedToday(true);
    }
  }, [today, dailyHistory]);

  return {
    tasks,
    dailyGoal,
    setDailyGoal,
    completionAnimation,
    streakAnimation,
    streak,
    dailyHistory,
    editingTask,
    editText,
    setEditText,
    addTask,
    toggleTask,
    deleteTask,
    startEditing,
    saveEdit,
    cancelEdit,
    getTasksByDate
  };
};

