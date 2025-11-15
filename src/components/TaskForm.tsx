
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (taskText: string) => void;
  darkMode: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, darkMode }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={`p-5 rounded-2xl shadow-lg border mb-8 ${
      darkMode 
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
        : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
    }`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What would you like to accomplish today?"
          className={`flex-1 p-4 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
            darkMode 
              ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 backdrop-blur-sm' 
              : 'bg-indigo-50/80 border-indigo-200/50 placeholder-indigo-500 backdrop-blur-sm'
          }`}
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
