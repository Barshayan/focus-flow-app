
export interface TaskManagerState {
  tasks: any[];
  dailyGoal: number;
  completionAnimation: string;
  streakAnimation: string;
  streak: number;
  dailyHistory: any;
  editingTask: number | string | null;
  editText: string;
}

export interface TaskManagerActions {
  addTask: (taskText: string) => Promise<void>;
  toggleTask: (id: number | string) => Promise<void>;
  deleteTask: (id: number | string) => Promise<void>;
  startEditing: (task: any) => void;
  saveEdit: () => Promise<void>;
  cancelEdit: () => void;
  setDailyGoal: (goal: number) => Promise<void>;
  getTasksByDate: (date: Date) => any[];
}
