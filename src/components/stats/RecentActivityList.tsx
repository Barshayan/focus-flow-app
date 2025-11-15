import React from 'react';
import { DailyHistory } from '../../types/Task';

interface RecentActivityListProps {
  dailyHistory: DailyHistory;
  darkMode: boolean;
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({
  dailyHistory,
  darkMode
}) => {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg border ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
    }`}>
      <h4 className="text-lg font-semibold mb-4">Last 7 Days</h4>
      <div className="space-y-3">
        {Object.entries(dailyHistory).length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <p>No activity data yet. Complete some tasks to see your progress!</p>
          </div>
        ) : (
          Object.entries(dailyHistory)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .slice(0, 7)
            .map(([date, data]) => {
              const goalAchieved = data.completed >= data.goal;
              const allCompleted = data.completed === data.total && data.total > 0;

              return (
                <div key={date} className={`flex justify-between items-center p-3 rounded-xl ${
                  darkMode ? 'bg-slate-700/50 backdrop-blur-sm' : 'bg-indigo-50/80 backdrop-blur-sm'
                }`}>
                  <span className="font-medium">{formatDate(new Date(date))}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${goalAchieved ? 'text-emerald-500 font-semibold' : 'text-slate-500'}`}>
                      {data.completed}/{data.total} tasks
                    </span>
                    {allCompleted && <span>🎯</span>}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default RecentActivityList;
