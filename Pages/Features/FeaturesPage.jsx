import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import {
  Smartphone,
  BarChart3,
  Bell,
  ShoppingCart,
  Calendar,
  DollarSign,
  Zap,
  Shield,
  Users,
  Award
} from 'lucide-react';

const FeaturesPage = () => {
  const { isDark } = useTheme();

  const mainFeatures = [
    {
      icon: Smartphone,
      title: "Smart Food Scanning",
      description: "Quickly add items to your inventory using our advanced barcode scanning technology. Instantly get product details, nutritional information, and expiration dates.",
      benefits: ["Instant product recognition", "Automatic price lookup", "Nutritional data", "Expiry date tracking"]
    },
    {
      icon: BarChart3,
      title: "Expense Analytics",
      description: "Get detailed insights into your food spending patterns with comprehensive analytics and visual reports that help you make informed decisions.",
      benefits: ["Monthly spending reports", "Category breakdowns", "Trend analysis", "Budget comparisons"]
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never let food expire again with our intelligent notification system that alerts you before items go bad.",
      benefits: ["Expiry reminders", "Shopping alerts", "Budget warnings", "Waste notifications"]
    },
    {
      icon: ShoppingCart,
      title: "Smart Shopping Lists",
      description: "Generate optimized shopping lists based on your consumption patterns, preferences, and budget constraints.",
      benefits: ["Auto-generated lists", "Price comparisons", "Store optimization", "Seasonal suggestions"]
    }
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: "Meal Planning",
      description: "Plan your meals in advance and track ingredient usage to minimize waste and optimize shopping."
    },
    {
      icon: DollarSign,
      title: "Budget Management",
      description: "Set and track food budgets with real-time spending updates and savings recommendations."
    },
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Perform common tasks quickly with our streamlined interface and smart shortcuts."
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: Users,
      title: "Family Sharing",
      description: "Share your food inventory and expenses with family members for collaborative management."
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Earn badges and track your progress as you reduce waste and save money."
    }
  ];

  const stats = [
    { number: "99%", label: "Accuracy Rate" },
    { number: "30%", label: "Average Savings" },
    { number: "50%", label: "Waste Reduction" },
    { number: "24/7", label: "Support Available" }
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful <span className="text-green-600">Features</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover all the tools and features that make FoodTracker the ultimate solution for managing your food expenses and reducing waste.
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

      {/* Main Features */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything you need to take control of your food management
            </p>
          </div>

          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                  </div>
                  <p className={`text-lg mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className={`rounded-2xl p-12 text-center ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-xl`}>
                    <feature.icon className="text-green-600 mx-auto mb-4" size={80} />
                    <div className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {feature.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Features</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Even more tools to enhance your food management experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl w-fit mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience All Features Today
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start your free trial and discover how FoodTracker can transform the way you manage food and expenses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
              isDark
                ? 'border-gray-600 text-white hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
