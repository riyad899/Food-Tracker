import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, TrendingUp, Users, Award, Zap, Heart, Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const WhyChooseUs = () => {
  const { isDark } = useTheme();
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Data Security',
      description: 'Your food data is protected with bank-level encryption and secure cloud storage.',
      color: 'from-blue-500 to-cyan-500',
      stats: '99.9% Uptime'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Real-time Tracking',
      description: 'Monitor your food inventory in real-time with instant expiry notifications.',
      color: 'from-emerald-500 to-green-500',
      stats: 'Live Updates'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns and waste reduction progress.',
      color: 'from-purple-500 to-pink-500',
      stats: '50% Waste Reduction'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Join a community of food-conscious users sharing tips and recipes.',
      color: 'from-orange-500 to-red-500',
      stats: '25K+ Members'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Award-Winning App',
      description: 'Recognized as the best food management app by multiple industry awards.',
      color: 'from-yellow-500 to-orange-500',
      stats: '5 Awards Won'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick loading and smooth user experience.',
      color: 'from-indigo-500 to-blue-500',
      stats: '<1s Load Time'
    }
  ];

  const achievements = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      number: '1M+',
      label: 'Meals Saved',
      description: 'Food items prevented from going to waste'
    },
    {
      icon: <Target className="w-12 h-12 text-green-500" />,
      number: '$2M+',
      label: 'Money Saved',
      description: 'Total savings by our user community'
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      number: '50K+',
      label: 'Active Users',
      description: 'Growing community of food savers'
    },
    {
      icon: <Award className="w-12 h-12 text-purple-500" />,
      number: '4.9★',
      label: 'User Rating',
      description: 'Average rating across all platforms'
    }
  ];

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Why Choose FoodTracker?
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed`}>
            We're not just another food app. We're your partner in creating a sustainable,
            cost-effective, and organized approach to food management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Icon with Gradient Background */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 leading-relaxed`}>
                {feature.description}
              </p>

              {/* Stats Badge */}
              <div className={`inline-flex items-center px-3 py-1 ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} rounded-full text-sm font-medium`}>
                {feature.stats}
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-gray-50 to-blue-50'} rounded-3xl p-8 md:p-12`}>
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Our Impact in Numbers
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              See how we're making a difference in the fight against food waste
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {achievement.number}
                </div>
                <div className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-1`}>
                  {achievement.label}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`${isDark ? 'bg-gradient-to-r from-green-800 to-green-700' : 'bg-gradient-to-r from-[#124A2F] to-green-600'} rounded-2xl p-8 md:p-12 text-white`}>
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Food Management?
            </h3>
            <p className={`text-xl ${isDark ? 'text-green-100' : 'text-blue-100'} mb-8 max-w-2xl mx-auto`}>
              Join thousands of users who have already reduced food waste and saved money with FoodTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/trial"
                className={`${isDark ? 'bg-white text-green-800 hover:bg-gray-100' : 'bg-white text-[#124A2F] hover:bg-gray-100'} px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105 text-center`}
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo"
                className={`border-2 border-white text-white px-8 py-3 rounded-lg font-semibold ${isDark ? 'hover:bg-white hover:text-green-800' : 'hover:bg-white hover:text-[#124A2F]'} transition-all duration-200 text-center`}
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
