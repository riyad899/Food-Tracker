import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Shield, Lock, Database, Eye } from 'lucide-react';

const DataSecurityPage = () => {
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
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Data <span className="text-green-600">Security</span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            How we protect your data with enterprise-grade security measures
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                <Lock className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Encryption</h2>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive information is never stored in plain text.
            </p>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                <Database className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Secure Infrastructure</h2>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our infrastructure is hosted on AWS with multiple layers of security, including firewalls, intrusion detection, and regular security audits.
            </p>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                <Eye className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Privacy by Design</h2>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We follow privacy by design principles, ensuring that data protection is built into every aspect of our system from the ground up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSecurityPage;
