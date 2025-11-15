import React from 'react';
import { Calendar, CheckCircle, Circle } from 'lucide-react';
import { DailyHistory, Task } from '../../types/Task';

interface SelectedDateTasksProps {
  selectedDate: Date | undefined;
  dailyHistory: DailyHistory;
  getTasksByDate: (date: string) => Task[];
  darkMode: boolean;
}

const SelectedDateTasks: React.FC<SelectedDateTasksProps> = ({
  selectedDate,
  dailyHistory,
  getTasksByDate,
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

  const selectedDateStr = selectedDate?.toDateString();
  const selectedTasks = selectedDateStr ? getTasksByDate(selectedDateStr) : [];
  const selectedDateData = selectedDateStr ? dailyHistory[selectedDateStr] : null;

  const showNoDataMessage =
    selectedDate && !selectedDateData && selectedTasks.length === 0;

  return (
    <div className={`p-6 rounded-2xl shadow-lg border ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5" />
        <h3 className="text-xl font-bold">
          {selectedDate ? formatDate(selectedDate) : 'Select a date'}
        </h3>
      </div>

      {selectedDate && selectedDateData ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <span className="font-medium">Progress:</span>
            <span className={`font-bold ${selectedDateData.completed >= selectedDateData.goal ? 'text-emerald-500' : 'text-orange-500'}`}>
              {selectedDateData.completed}/{selectedDateData.total} (Goal: {selectedDateData.goal})
            </span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm uppercase tracking-wide opacity-70">Tasks for this day:</h4>
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task, index) => (
                <div key={`${task.id ?? 'task'}-${index}`} className={`flex items-center gap-3 p-3 rounded-lg ${
                  darkMode ? 'bg-slate-700/50' : 'bg-indigo-50/80'
                }`}>
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                  <span className={`${task.completed ? 'line-through opacity-60' : ''}`}>
                    {task.text}
                  </span>
                </div>
              ))
            ) : (
              <p className={`text-center py-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                No tasks found for this date
              </p>
            )}
          </div>
        </div>
      ) : showNoDataMessage ? (
        <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No tasks or progress recorded on this date.</p>
        </div>
      ) : (
        <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Click on a date in the calendar to view tasks for that day</p>
        </div>
      )}
    </div>
  );
};

export default SelectedDateTasks;
