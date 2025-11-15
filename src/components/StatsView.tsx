
import React from 'react';
import { DailyHistory, Task } from '../types/Task';
import StatsSummaryCard from './stats/StatsSummaryCard';
import MonthlyCalendar from './stats/MonthlyCalendar';
import SelectedDateTasks from './stats/SelectedDateTasks';
import RecentActivityList from './stats/RecentActivityList';

interface StatsViewProps {
  dailyHistory: DailyHistory;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  darkMode: boolean;
  getTasksByDate: (date: string) => Task[];
}

const StatsView: React.FC<StatsViewProps> = ({
  dailyHistory,
  selectedDate,
  setSelectedDate,
  darkMode,
  getTasksByDate
}) => {
  return (
    <div className="space-y-8">
      {/* 30-Day Summary with Circular Progress */}
      <StatsSummaryCard 
        dailyHistory={dailyHistory}
        darkMode={darkMode}
      />

      {/* Monthly Calendar and Selected Date Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MonthlyCalendar
          dailyHistory={dailyHistory}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          darkMode={darkMode}
        />

        <SelectedDateTasks
          selectedDate={selectedDate}
          dailyHistory={dailyHistory}
          getTasksByDate={getTasksByDate}
          darkMode={darkMode}
        />
      </div>

      {/* Recent Activity List */}
      <RecentActivityList
        dailyHistory={dailyHistory}
        darkMode={darkMode}
      />
    </div>
  );
};

export default StatsView;
