import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { CreditCard, RefreshCw, DollarSign, CheckCircle } from 'lucide-react';

const RefundPolicyPage = () => {
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
            <RefreshCw className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Refund <span className="text-green-600">Policy</span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Our commitment to your satisfaction with clear refund terms
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">30-Day Money-Back Guarantee</h2>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We offer a full refund within 30 days of your initial purchase if you're not completely satisfied with FoodTracker Premium.
            </p>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <h2 className="text-2xl font-bold mb-6">Refund Process</h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contact our support team at refunds@foodtracker.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Provide your account email and reason for refund</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Refunds are processed within 5-7 business days</span>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">Important Notes</h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>• Refunds are only available for Premium plan subscriptions</p>
              <p>• Free accounts are not eligible for refunds</p>
              <p>• Refunds are processed to the original payment method</p>
              <p>• Enterprise customers should contact their account manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
