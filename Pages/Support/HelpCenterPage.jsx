import React, { useState } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Search, HelpCircle, Book, MessageCircle, Phone, Mail } from 'lucide-react';

const HelpCenterPage = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using FoodTracker",
      articles: [
        "How to create your first food inventory",
        "Setting up your profile and preferences",
        "Understanding the dashboard",
        "Adding food items manually"
      ]
    },
    {
      icon: HelpCircle,
      title: "Account & Billing",
      description: "Manage your account and subscription",
      articles: [
        "How to upgrade your plan",
        "Billing and payment issues",
        "Changing account information",
        "Canceling your subscription"
      ]
    },
    {
      icon: MessageCircle,
      title: "Features & Tips",
      description: "Make the most of FoodTracker features",
      articles: [
        "Using barcode scanning effectively",
        "Setting up smart notifications",
        "Understanding expense analytics",
        "Sharing with family members"
      ]
    }
  ];

  const popularArticles = [
    {
      title: "How to scan barcodes for quick item entry",
      category: "Features",
      readTime: "3 min read"
    },
    {
      title: "Setting up expiration date notifications",
      category: "Getting Started",
      readTime: "2 min read"
    },
    {
      title: "Understanding your food expense reports",
      category: "Features",
      readTime: "5 min read"
    },
    {
      title: "Troubleshooting login issues",
      category: "Account",
      readTime: "2 min read"
    },
    {
      title: "How to share your inventory with family",
      category: "Features",
      readTime: "4 min read"
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help",
      action: "Start Chat",
      availability: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      availability: "Response within 24hrs"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      action: "Call Now",
      availability: "Mon-Fri 9AM-6PM EST"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Help <span className="text-green-600">Center</span>
            </h1>
            <p className={`text-xl mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Find answers to your questions and get the most out of FoodTracker
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for help articles..."
                className={`w-full pl-12 pr-4 py-4 rounded-full border-2 text-lg transition-all duration-300 ${
                  isDark
                    ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Find help articles organized by topic
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl w-fit mb-4">
                  <category.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a href="#" className={`text-sm hover:text-green-600 transition-colors duration-200 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200">
                  View All Articles →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Articles</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Most viewed help articles this week
            </p>
          </div>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 hover:text-green-600 transition-colors duration-200">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-3 py-1 rounded-full ${
                        isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {article.category}
                      </span>
                      <span className={`${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-green-600">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Can't find what you're looking for? Our support team is here to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full w-fit mx-auto mb-4">
                  <option.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {option.description}
                </p>
                <p className={`text-xs mb-4 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {option.availability}
                </p>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
