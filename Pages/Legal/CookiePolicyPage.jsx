import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Cookie, Settings, Eye, Shield } from 'lucide-react';

const CookiePolicyPage = () => {
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
            <Cookie className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cookie <span className="text-green-600">Policy</span>
          </h1>
          <p className={`text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            How we use cookies and similar technologies on FoodTracker
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <h2 className="text-2xl font-bold mb-4">What are Cookies?</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain features.
            </p>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">Essential Cookies</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">Performance Cookies</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">Functionality Cookies</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  These cookies enable the website to provide enhanced functionality and personalization, such as remembering your theme preference.
                </p>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <h2 className="text-2xl font-bold mb-6">Managing Cookies</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You can control and manage cookies in various ways:
            </p>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Browser settings: Most browsers allow you to block or delete cookies</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Cookie preferences: Use our cookie consent banner to manage preferences</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Account settings: Adjust preferences in your FoodTracker account</span>
              </li>
            </ul>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gradient-to-r from-green-900 to-emerald-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'}`}>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              If you have questions about our use of cookies, please contact us at: <strong>privacy@foodtracker.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
