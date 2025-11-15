
import React from 'react';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <div className="flex justify-between items-start sm:items-center mb-8">
      <div className="flex-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✨ Focus Flow
        </h1>
        <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-600'}`}>
          Your daily productivity companion
        </p>
        {user?.email && (
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Welcome, {user.email}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onToggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 ${
            darkMode 
              ? 'bg-indigo-800/50 hover:bg-indigo-700/50 border border-indigo-600/50 backdrop-blur-sm' 
              : 'bg-white/80 hover:bg-indigo-50/80 border border-indigo-200/50 backdrop-blur-sm'
          } shadow-lg hover:shadow-xl`}
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>
        {user && (
          <button
            onClick={handleSignOut}
            className={`p-3 rounded-full transition-all duration-300 ${
              darkMode 
                ? 'bg-red-800/50 hover:bg-red-700/50 border border-red-600/50 backdrop-blur-sm' 
                : 'bg-white/80 hover:bg-red-50/80 border border-red-200/50 backdrop-blur-sm'
            } shadow-lg hover:shadow-xl`}
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
