
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Moon, Sun, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

interface AuthPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ darkMode, onToggleDarkMode }) => {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created! Please check your email to verify.');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back!');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ✨ Focus Flow
            </h1>
            <p className={`text-sm mt-2 ${darkMode ? 'text-indigo-200' : 'text-indigo-600'}`}>
              Your daily productivity companion
            </p>
          </div>
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
        </div>

        <div className={`p-8 rounded-2xl shadow-xl border ${
          darkMode 
            ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' 
            : 'bg-white/80 border-indigo-100/50 backdrop-blur-sm'
        }`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {isSignUp ? 'Start your productivity journey' : 'Continue your productivity journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                    darkMode 
                      ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' 
                      : 'bg-indigo-50/80 border-indigo-200/50 placeholder-slate-500'
                  }`}
                />
              </div>
            )}

            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                  darkMode 
                    ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' 
                    : 'bg-indigo-50/80 border-indigo-200/50 placeholder-slate-500'
                }`}
                required
              />
            </div>

            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
                  darkMode 
                    ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' 
                    : 'bg-indigo-50/80 border-indigo-200/50 placeholder-slate-500'
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`text-sm ${
                darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
              } transition-colors`}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
