
import React from 'react';
import { CheckCircle, Edit2, Trash2, Target } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  darkMode: boolean;
  editingTask: number | string | null;
  editText: string;
  setEditText: (text: string) => void;
  onToggleTask: (id: number | string) => void;
  onDeleteTask: (id: number | string) => void;
  onStartEditing: (task: Task) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  darkMode,
  editingTask,
  editText,
  setEditText,
  onToggleTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEdit
}) => {
  if (tasks.length === 0) {
    return (
      <div className={`text-center py-16 ${
        darkMode ? 'text-indigo-300' : 'text-indigo-600'
      }`}>
        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-xl">No tasks yet!</p>
        <p className="text-base">Add your first task to get started 🚀</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`p-4 rounded-2xl shadow-lg border transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
          } ${task.completed ? 'opacity-75' : 'hover:shadow-xl'}`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : darkMode
                  ? 'border-indigo-500 hover:border-emerald-400'
                  : 'border-indigo-300 hover:border-emerald-400'
              }`}
            >
              {task.completed && <CheckCircle className="w-4 h-4" />}
            </button>

            {editingTask === task.id ? (
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && onSaveEdit()}
                  className={`flex-1 p-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-slate-700/50 border-slate-600/50 text-white backdrop-blur-sm' 
                      : 'bg-indigo-50/80 border-indigo-200/50 backdrop-blur-sm'
                  }`}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={onSaveEdit}
                    className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="px-3 py-2 bg-slate-500 text-white rounded-lg text-sm hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through opacity-60' : ''
                  }`}
                >
                  {task.text}
                </span>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onStartEditing(task)}
                    className={`p-2 rounded-lg hover:bg-opacity-20 transition-colors ${
                      darkMode ? 'hover:bg-white' : 'hover:bg-indigo-500'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

