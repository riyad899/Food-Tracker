import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Play, CheckCircle, Users, Clock, Smartphone, BarChart3 } from 'lucide-react';

const HowItWorksPage = () => {
  const { isDark } = useTheme();

  const steps = [
    {
      number: "01",
      title: "Sign Up & Setup",
      description: "Create your account and set up your profile with your dietary preferences and budget goals.",
      icon: Users
    },
    {
      number: "02",
      title: "Add Your Food Items",
      description: "Scan barcodes or manually add food items to your virtual fridge with purchase dates and prices.",
      icon: Smartphone
    },
    {
      number: "03",
      title: "Track Expiration Dates",
      description: "Our system automatically tracks expiration dates and sends you notifications before food expires.",
      icon: Clock
    },
    {
      number: "04",
      title: "Monitor Your Spending",
      description: "Get detailed analytics on your food expenses, waste patterns, and savings opportunities.",
      icon: BarChart3
    }
  ];

  const features = [
    "Barcode scanning for quick item entry",
    "Smart expiration date tracking",
    "Expense analytics and reporting",
    "Waste reduction tips",
    "Budget goal setting",
    "Shopping list generation",
    "Notification system",
    "Multi-device synchronization"
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
              How <span className="text-green-600">FoodTracker</span> Works
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              From setup to savings - learn how our platform helps you take control of your food expenses in just 4 simple steps.
            </p>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:shadow-lg transition-all duration-300">
              <Play size={20} />
              <span>Watch Demo Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Steps to Success</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get started with FoodTracker in minutes, not hours
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}>
                <div className="lg:w-1/2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <div className={`rounded-2xl p-12 text-center ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-xl`}>
                    <step.icon className="text-green-600 mx-auto mb-4" size={80} />
                    <div className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Step {step.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Powerful features designed to make food tracking effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-white'
              } shadow-lg flex items-center space-x-3`}>
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of users who are already saving money and reducing food waste with FoodTracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Get Started Free
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
              isDark
                ? 'border-gray-600 text-white hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
