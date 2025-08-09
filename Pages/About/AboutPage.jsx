import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { ChefHat, Target, Users, Award, Clock, Shield } from 'lucide-react';

const AboutPage = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To help families reduce food waste and save money through smart food tracking and expense monitoring."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a community of conscious consumers who care about sustainable food practices."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Providing the best user experience with cutting-edge technology and intuitive design."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Meals Tracked" },
    { number: "$2M+", label: "Money Saved" },
    { number: "30%", label: "Waste Reduced" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl">
                <ChefHat className="text-white" size={48} />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-green-600">FoodTracker</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're on a mission to revolutionize how people manage their food consumption and expenses, creating a more sustainable future for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className={`text-sm md:text-base ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className={`space-y-4 text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>
                  FoodTracker was born from a simple observation: too much food goes to waste while families struggle with rising grocery costs. Our founders, passionate about sustainability and technology, saw an opportunity to make a difference.
                </p>
                <p>
                  Starting in 2023, we set out to create an intuitive platform that helps people track their food expenses, monitor expiration dates, and make informed decisions about their grocery shopping.
                </p>
                <p>
                  Today, we're proud to serve thousands of families worldwide, helping them save money and reduce food waste through smart technology and actionable insights.
                </p>
              </div>
            </div>
            <div className={`rounded-2xl p-8 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-xl`}>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Clock className="text-green-600 mx-auto mb-2" size={32} />
                  <div className="font-semibold">24/7 Support</div>
                </div>
                <div className="text-center">
                  <Shield className="text-green-600 mx-auto mb-2" size={32} />
                  <div className="font-semibold">Secure Data</div>
                </div>
                <div className="text-center">
                  <Target className="text-green-600 mx-auto mb-2" size={32} />
                  <div className="font-semibold">Goal Focused</div>
                </div>
                <div className="text-center">
                  <Users className="text-green-600 mx-auto mb-2" size={32} />
                  <div className="font-semibold">Community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-white'
              } shadow-lg`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <value.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
