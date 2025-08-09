import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle, Gift, TrendingUp, Bell, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Newsletter = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);

      // Reset after showing success message
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1500);
  };

  const benefits = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Exclusive Offers',
      description: 'Get access to subscriber-only deals and early bird discounts'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Food Saving Tips',
      description: 'Weekly tips on reducing food waste and maximizing freshness'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Alerts',
      description: 'Personalized notifications about expiring items and meal planning'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Recipes',
      description: 'Access our community-driven recipe database and meal ideas'
    }
  ];

  return (
    <section className={`py-16 ${isDark ? 'bg-gradient-to-br from-green-900 to-green-800' : 'bg-gradient-to-br from-[#124A2F] to-green-600'} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 border-2 border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center mb-6">
              <Mail className={`w-10 h-10 mr-4 ${isDark ? 'text-green-300' : 'text-yellow-300'}`} />
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Stay in the Loop
              </h2>
            </div>

            <p className={`text-xl ${isDark ? 'text-green-100' : 'text-blue-100'} mb-8 leading-relaxed`}>
              Join thousands of food enthusiasts who receive our weekly newsletter packed with
              money-saving tips, expiry alerts, and exclusive offers. Never waste food again!
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`${isDark ? 'text-green-300' : 'text-yellow-300'} mt-1`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-green-100' : 'text-blue-100'}`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={`flex items-center space-x-8 ${isDark ? 'text-green-100' : 'text-blue-100'}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-yellow-300'}`}>25K+</div>
                <div className="text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-yellow-300'}`}>98%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-yellow-300'}`}>Weekly</div>
                <div className="text-sm">Updates</div>
              </div>
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 lg:p-10`}>
            {!isSubscribed ? (
              <>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${isDark ? 'bg-gradient-to-br from-green-700 to-green-600' : 'bg-gradient-to-br from-[#124A2F] to-green-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Subscribe to Our Newsletter
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Get the latest updates, tips, and exclusive offers delivered to your inbox
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-green-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-[#124A2F]'}`}
                      />
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white' : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </button>

                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                    By subscribing, you agree to our privacy policy and terms of service.
                    You can unsubscribe at any time.
                  </p>
                </form>

                {/* Social Proof */}
                <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className={`flex items-center justify-center space-x-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span>Unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span>Weekly updates</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Success State
              <div className="text-center py-8">
                <div className={`w-20 h-20 ${isDark ? 'bg-green-800' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                  Welcome Aboard! 🎉
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  Thank you for subscribing! You'll receive your first newsletter with
                  exclusive food-saving tips within the next 24 hours.
                </p>
                <div className={`${isDark ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
                  <p className={`text-sm ${isDark ? 'text-green-200' : 'text-green-700'}`}>
                    <strong>What's next?</strong> Check your email for a confirmation link
                    and get ready for amazing content!
                  </p>
                </div>

                {/* Additional CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    to="/trial"
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white' : 'bg-gradient-to-r from-[#124A2F] to-green-600 text-white hover:from-[#0D3521] hover:to-[#124A2F]'}`}
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    to="/demo"
                    className={`border-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center ${isDark ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900' : 'border-[#124A2F] text-[#124A2F] hover:bg-[#124A2F] hover:text-white'}`}
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
