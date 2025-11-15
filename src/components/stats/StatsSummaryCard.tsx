
import React from 'react';
import { DailyHistory } from '../../types/Task';

interface StatsSummaryCardProps {
  dailyHistory: DailyHistory;
  darkMode: boolean;
}

const StatsSummaryCard: React.FC<StatsSummaryCardProps> = ({
  dailyHistory,
  darkMode
}) => {
  const getLast30DaysStats = () => {
    const last30Days = Object.entries(dailyHistory)
      .slice(-30)
      .reduce((acc, [, data]) => {
        acc.totalCompleted += data.completed;
        acc.totalTasks += data.total;
        if (data.completed >= data.goal) acc.goalsAchieved++;
        return acc;
      }, { totalCompleted: 0, totalTasks: 0, goalsAchieved: 0 });
    
    return last30Days;
  };

  const stats = getLast30DaysStats();
  const completionRate = stats.totalTasks > 0 ? Math.round((stats.totalCompleted / stats.totalTasks) * 100) : 0;

  return (
    <div className={`p-8 rounded-2xl shadow-lg border ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
    }`}>
      <h2 className="text-3xl font-bold mb-8 text-center">30-Day Summary 🏆</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-500">{stats.totalCompleted}</p>
          <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Tasks Completed</p>
        </div>
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg
              width={120}
              height={120}
              className="transform -rotate-90"
            >
              <circle
                cx={60}
                cy={60}
                r={50}
                stroke={darkMode ? '#374151' : '#e5e7eb'}
                strokeWidth={8}
                fill="transparent"
              />
              <circle
                cx={60}
                cy={60}
                r={50}
                stroke="#10b981"
                strokeWidth={8}
                fill="transparent"
                strokeDasharray={314}
                strokeDashoffset={314 - (completionRate / 100) * 314}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-500">
                {completionRate}%
              </span>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Completion Rate</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-500">{stats.goalsAchieved}</p>
          <p className={`text-sm ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Goals Achieved</p>
        </div>
      </div>
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-center">
        <p className="text-xl font-bold">
          {completionRate >= 80 ? "You're absolutely crushing it! 🔥" :
           completionRate >= 60 ? "Great job! Keep up the momentum! 💪" :
           completionRate >= 40 ? "You're making progress! 🌟" :
           "Every step forward counts! 🚀"}
        </p>
      </div>
    </div>
  );
};

export default StatsSummaryCard;
