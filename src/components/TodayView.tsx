
import React from 'react';
import StatsCards from './StatsCards';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../types/Task';

interface TodayViewProps {
  tasks: Task[];
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  streak: number;
  darkMode: boolean;
  addTask: (taskText: string) => void;
  toggleTask: (id: number | string) => void;
  deleteTask: (id: number | string) => void;
  editingTask: number | string | null;
  editText: string;
  setEditText: (text: string) => void;
  startEditing: (task: Task) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
}

const TodayView: React.FC<TodayViewProps> = ({
  tasks,
  dailyGoal,
  setDailyGoal,
  streak,
  darkMode,
  addTask,
  toggleTask,
  deleteTask,
  editingTask,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  cancelEdit
}) => {
  const today = new Date().toDateString();
  const todaysTasks = tasks.filter(task => task.createdAt === today);
  const completedToday = todaysTasks.filter(task => task.completed).length;

  return (
    <>
      <StatsCards
        todaysTasks={todaysTasks}
        completedToday={completedToday}
        dailyGoal={dailyGoal}
        setDailyGoal={setDailyGoal}
        streak={streak}
        darkMode={darkMode}
      />

      <TaskForm onAddTask={addTask} darkMode={darkMode} />

      <TaskList
        tasks={todaysTasks}
        darkMode={darkMode}
        editingTask={editingTask}
        editText={editText}
        setEditText={setEditText}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onStartEditing={startEditing}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
      />
    </>
  );
};

export default TodayView;

