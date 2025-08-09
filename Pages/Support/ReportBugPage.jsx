import React, { useState } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Bug, Send, AlertTriangle, Info } from 'lucide-react';

const ReportBugPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    browser: '',
    steps: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bug report submitted:', formData);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Bug className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Report a <span className="text-green-600">Bug</span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Help us improve FoodTracker by reporting issues you encounter
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Bug Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
              >
                <option value="low">Low - Minor issue</option>
                <option value="medium">Medium - Affects functionality</option>
                <option value="high">High - Blocks important features</option>
                <option value="critical">Critical - App unusable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                placeholder="Please describe what happened, what you expected to happen, and any error messages you saw..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <Send size={20} />
              <span>Submit Bug Report</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportBugPage;
