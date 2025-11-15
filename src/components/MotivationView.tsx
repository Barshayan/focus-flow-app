
import React from 'react';
import { Sparkles, Heart, CheckCircle } from 'lucide-react';

interface MotivationViewProps {
  darkMode: boolean;
  streak: number;
  tasks: Array<{ id: number; text: string; completed: boolean; createdAt: string }>;
  dailyGoal: number;
}

const MotivationView: React.FC<MotivationViewProps> = ({ darkMode, streak, tasks, dailyGoal }) => {
  const motivationalQuotes = [
    "Every task completed is a step towards your dreams! ✨",
    "You're building momentum, one task at a time! 🚀",
    "Small progress is still progress! 🌟",
    "You're unstoppable when you stay focused! 💪",
    "Consistency is the key to success! 🔑",
    "You're creating positive habits! 🌱",
    "Every checkmark is a victory! 🏆",
    "Progress, not perfection! 💫",
    "Today's efforts shape tomorrow's success! 🌅",
    "You have the power to make it happen! ⚡",
    "One task at a time, one day at a time! 🎯",
    "Your future self will thank you! 💝"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const today = new Date().toDateString();

  // Get today's tasks from the actual tasks data
  const todayTasks = tasks.filter(task => task.createdAt === today);
  const completedToday = todayTasks.filter(task => task.completed).length;
  const totalToday = todayTasks.length;

  return (
    <div className="space-y-8">
      {/* Daily Quote */}
      <div className={`p-8 rounded-2xl shadow-lg border text-center ${
        darkMode 
          ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700/50 backdrop-blur-sm' 
          : 'bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/50 backdrop-blur-sm'
      }`}>
        <Sparkles className={`w-16 h-16 mx-auto mb-6 ${darkMode ? 'text-purple-300' : 'text-purple-500'}`} />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Daily Motivation
        </h2>
        <p className={`text-lg sm:text-xl leading-relaxed ${
          darkMode ? 'text-purple-100' : 'text-purple-800'
        }`}>
          "{randomQuote}"
        </p>
      </div>

      {/* Progress Celebration */}
      <div className={`p-6 rounded-2xl shadow-lg border ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
          : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
      }`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Your Progress Today
        </h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-slate-700/50 backdrop-blur-sm' : 'bg-indigo-50/80 backdrop-blur-sm'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Current Streak</span>
              <span className="text-lg font-bold text-orange-500">{streak} days</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>
              {streak === 0 ? "Start your streak today! Every journey begins with a single step! 💫" :
               streak === 1 ? "Day one done! Consistency builds champions! 💪" :
               streak <= 7 ? "Building a great habit! You're on fire! 🔥" :
               "Amazing streak! You're a productivity champion! 🏆"}
            </p>
          </div>

          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-slate-700/50 backdrop-blur-sm' : 'bg-green-50/80 backdrop-blur-sm'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Tasks Completed
              </span>
              <span className="text-lg font-bold text-green-500">
                {completedToday}/{totalToday}
              </span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
              {completedToday === 0 && totalToday === 0 ? "Ready to start your day! Add some tasks to get going! 🚀" :
               completedToday === 0 ? "Time to tackle those tasks! You've got this! 💪" :
               completedToday === totalToday && totalToday >= dailyGoal ? "All tasks completed and daily goal achieved! You're absolutely crushing it today! 🎉" :
               completedToday === totalToday ? "All tasks completed! You're doing great! 🌟" :
               completedToday >= dailyGoal ? "Daily goal achieved! Keep the momentum going! 🔥" :
               completedToday / totalToday >= 0.7 ? "Almost there! You're doing fantastic! ⭐" :
               "Great progress! Keep the momentum going! 🔥"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationView;
