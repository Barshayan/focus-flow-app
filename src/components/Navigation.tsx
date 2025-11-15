
import React from 'react';
import { Target, TrendingUp, Heart } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  darkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, darkMode }) => {
  const navItems = [
    { key: 'today', label: 'Today', icon: Target },
    { key: 'motivation', label: 'Motivation', icon: Heart },
    { key: 'stats', label: 'Stats', icon: TrendingUp }
  ];

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
      {navItems.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onViewChange(key)}
          className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
            currentView === key
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
              : darkMode 
              ? 'bg-slate-800/50 text-indigo-200 hover:bg-slate-700/50 border border-slate-700/50 backdrop-blur-sm' 
              : 'bg-white/80 text-indigo-700 hover:bg-indigo-50/80 border border-indigo-200/50 shadow-sm backdrop-blur-sm'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
