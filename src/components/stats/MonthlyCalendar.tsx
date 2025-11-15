import React from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DailyHistory } from '../../types/Task';

interface MonthlyCalendarProps {
  dailyHistory: DailyHistory;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  darkMode: boolean;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  dailyHistory,
  selectedDate,
  setSelectedDate,
  darkMode
}) => {
  const getDayStatus = (date: Date) => {
    const dateStr = date.toDateString();
    const dayData = dailyHistory[dateStr];
    if (!dayData || dayData.total === 0) return null;

    if (dayData.completed >= dayData.goal) return 'achieved';
    if (dayData.completed > 0) return 'partial';
    return 'none'; // 🟥 No progress
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg border ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
    }`}>
      <h3 className="text-xl font-bold mb-6">Monthly Goal Tracker</h3>
      
      <div className="flex justify-center">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className={`rounded-md border ${
            darkMode ? 'border-slate-600/50 bg-slate-700/30 backdrop-blur-sm' : 'border-indigo-200/50 bg-white/50 backdrop-blur-sm'
          }`}
          modifiers={{
            achieved: (date) => getDayStatus(date) === 'achieved',
            partial: (date) => getDayStatus(date) === 'partial',
            none: (date) => getDayStatus(date) === 'none',
          }}
          modifiersStyles={{
            achieved: { backgroundColor: '#10b981', color: 'white', borderRadius: '8px' }, // Green
            partial: { backgroundColor: '#f59e0b', color: 'white', borderRadius: '8px' },  // Amber
            none: { backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' },     // Red
          }}
        />
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500"></div>
          <span>Goal Achieved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500"></div>
          <span>Partial Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span>No Progress</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
