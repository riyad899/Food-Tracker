import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        ${isDark
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
          : 'bg-white/10 hover:bg-white/20 text-white'
        }
        transition-all duration-300 ease-in-out
        ${isDark ? 'border border-gray-600' : 'border border-white/20'}
        focus:outline-none focus:ring-2
        ${isDark ? 'focus:ring-yellow-400' : 'focus:ring-white/50'}
        group
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon - Show in dark mode */}
        <Sun
          size={20}
          className={`
            absolute inset-0 transition-all duration-300 ease-in-out
            ${isDark
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-0 rotate-90'
            }
          `}
        />

        {/* Moon Icon - Show in light mode */}
        <Moon
          size={20}
          className={`
            absolute inset-0 transition-all duration-300 ease-in-out
            ${isDark
              ? 'opacity-0 scale-0 -rotate-90'
              : 'opacity-100 scale-100 rotate-0'
            }
          `}
        />
      </div>

      {/* Ripple effect on hover */}
      <div className={`
        absolute inset-0 rounded-lg transition-all duration-200
        ${isDark
          ? 'bg-yellow-400/0 group-hover:bg-yellow-400/10'
          : 'bg-white/0 group-hover:bg-white/5'
        }
      `}></div>
    </button>
  );
};

export default ThemeToggle;
