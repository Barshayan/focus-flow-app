
import React, { useState } from 'react';
import { Target, Sparkles, Edit2, Check, X } from 'lucide-react';
import { Task } from '../types/Task';

interface StatsCardsProps {
  todaysTasks: Task[];
  completedToday: number;
  dailyGoal: number;
  setDailyGoal: (goal: number) => void;
  streak: number;
  darkMode: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  todaysTasks,
  completedToday,
  dailyGoal,
  setDailyGoal,
  streak,
  darkMode
}) => {
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(dailyGoal.toString());

  const progressPercentage = todaysTasks.length > 0 ? (completedToday / todaysTasks.length) * 100 : 0;
  const goalProgress = dailyGoal > 0 ? (completedToday / dailyGoal) * 100 : 0;

  const handleGoalEdit = () => {
    setIsEditingGoal(true);
    setTempGoal(dailyGoal.toString());
  };

  const handleGoalSave = () => {
    const newGoal = parseInt(tempGoal);
    if (newGoal > 0 && newGoal <= 50) {
      setDailyGoal(newGoal);
    }
    setIsEditingGoal(false);
  };

  const handleGoalCancel = () => {
    setIsEditingGoal(false);
    setTempGoal(dailyGoal.toString());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoalSave();
    } else if (e.key === 'Escape') {
      handleGoalCancel();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className={`p-5 rounded-2xl shadow-lg border transition-all hover:shadow-xl ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
          : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Today's Progress</p>
            <p className="text-2xl font-bold text-indigo-500">{completedToday}/{todaysTasks.length}</p>
          </div>
          <Target className="w-8 h-8 text-indigo-500" />
        </div>
        <div className={`mt-3 h-2 rounded-full ${darkMode ? 'bg-slate-700/50' : 'bg-indigo-200/50'}`}>
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={`p-5 rounded-2xl shadow-lg border transition-all hover:shadow-xl ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
          : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Daily Goal</p>
            <p className="text-2xl font-bold text-emerald-500">{Math.min(completedToday, dailyGoal)}/{dailyGoal}</p>
          </div>
          <div className="flex items-center gap-2">
            {isEditingGoal ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={tempGoal}
                  onChange={(e) => setTempGoal(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-16 p-2 text-sm rounded-lg text-center border ${
                    darkMode 
                      ? 'bg-slate-700/50 text-white border-slate-600/50 backdrop-blur-sm' 
                      : 'bg-indigo-50/80 border-indigo-200/50 backdrop-blur-sm'
                  }`}
                  autoFocus
                />
                <button
                  onClick={handleGoalSave}
                  className="p-1 text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleGoalCancel}
                  className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoalEdit}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white' 
                    : 'hover:bg-indigo-100/50 text-indigo-400 hover:text-indigo-600'
                }`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <div className={`mt-3 h-2 rounded-full ${darkMode ? 'bg-slate-700/50' : 'bg-indigo-200/50'}`}>
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(goalProgress, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className={`p-5 rounded-2xl shadow-lg border transition-all hover:shadow-xl sm:col-span-2 lg:col-span-1 ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
          : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Streak</p>
            <p className={`text-2xl font-bold transition-all duration-500 ${
              streak > 0 ? 'text-orange-500' : darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {streak} {streak > 0 ? 'days 🔥' : 'days'}
            </p>
          </div>
          <Sparkles className={`w-8 h-8 transition-all duration-500 ${
            streak > 0 ? 'text-orange-500' : darkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
