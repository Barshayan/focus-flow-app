
import { Task, DailyHistory } from '../../types/Task';

export const calculateDailyHistory = (tasks: Task[], dailyGoal: number): DailyHistory => {
  const history: DailyHistory = {};
  
  tasks.forEach(task => {
   // ✅ Normalize the date to avoid duplication across same day
    const date = new Date(task.createdAt).toDateString();

    if (!history[date]) {
      history[date] = { completed: 0, total: 0, goal: dailyGoal };
    }
    history[date].total++;
    if (task.completed) {
      history[date].completed++;
    }
  });

  return history;
};

export const calculateStreak = (history: DailyHistory): number => {
  const dates = Object.keys(history).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  let currentStreak = 0;
  const today = new Date().toDateString();
  
  for (const date of dates) {
    const dayData = history[date];
    if (dayData.completed >= dayData.goal) {
      currentStreak++;
    } else if (date !== today) {
      break;
    }
  }
  
  return currentStreak;
};
