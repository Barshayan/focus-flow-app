
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from './AuthPage';
import Header from './Header';
import Navigation from './Navigation';
import TodayView from './TodayView';
import MotivationView from './MotivationView';
import StatsView from './StatsView';
import AnimationOverlay from './AnimationOverlay';
import { useSupabaseTaskManager } from '../hooks/useSupabaseTaskManager';

const ToDoApp = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const {
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
  } = useSupabaseTaskManager();

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthPage darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />;
  }

  // Create a wrapper function that converts tasks to the format expected by StatsView
  const getTasksByDateString = (dateString: string) => {
    const date = new Date(dateString);
    const tasksForDate = getTasksByDate(date);
    
    // Convert tasks to match the expected format for StatsView
    return tasksForDate.map(task => ({
      id: typeof task.id === 'string' ? parseInt(task.id) || 0 : task.id,
      text: task.text,
      completed: task.completed,
      createdAt: task.createdAt
    }));
  };

  // Convert tasks for MotivationView to ensure numeric IDs
  const convertTasksForMotivation = () => {
    return tasks.map(task => ({
      id: typeof task.id === 'string' ? parseInt(task.id) || 0 : task.id,
      text: task.text,
      completed: task.completed,
      createdAt: task.createdAt
    }));
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-md sm:max-w-2xl lg:max-w-4xl">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <Navigation currentView={currentView} onViewChange={setCurrentView} darkMode={darkMode} />

        <AnimationOverlay 
          completionAnimation={completionAnimation}
          streakAnimation={streakAnimation}
        />

        {currentView === 'today' && (
          <TodayView
            tasks={tasks}
            dailyGoal={dailyGoal}
            setDailyGoal={setDailyGoal}
            streak={streak}
            darkMode={darkMode}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editingTask={editingTask}
            editText={editText}
            setEditText={setEditText}
            startEditing={startEditing}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        )}

        {currentView === 'motivation' && (
          <MotivationView 
            darkMode={darkMode} 
            streak={streak} 
            tasks={convertTasksForMotivation()}
            dailyGoal={dailyGoal}
          />
        )}

        {currentView === 'stats' && (
          <StatsView
            dailyHistory={dailyHistory}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            darkMode={darkMode}
            getTasksByDate={getTasksByDateString}
          />
        )}
      </div>
    </div>
  );
};

export default ToDoApp;
