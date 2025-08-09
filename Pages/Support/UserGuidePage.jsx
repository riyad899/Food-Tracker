import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { BookOpen, Code, MessageCircle, Users } from 'lucide-react';

const UserGuidePage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <BookOpen className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            User <span className="text-green-600">Guide</span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprehensive documentation to help you master FoodTracker
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Coming Soon</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We're working on a comprehensive user guide to help you get the most out of FoodTracker.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;
