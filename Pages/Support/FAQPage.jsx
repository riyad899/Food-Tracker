import React, { useState } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create my first food inventory?",
          answer: "To create your first food inventory, sign up for an account and click on 'Add Food' from your dashboard. You can either scan barcodes using your phone's camera or manually add items by typing their details. Include purchase date, expiration date, and price for complete tracking."
        },
        {
          question: "Is FoodTracker free to use?",
          answer: "FoodTracker offers a free plan that allows you to track up to 50 food items with basic features. For unlimited items and advanced features like barcode scanning, analytics, and family sharing, you can upgrade to our Premium plan for $9.99/month."
        },
        {
          question: "Do I need to download an app?",
          answer: "FoodTracker works perfectly in your web browser on any device. While we don't currently have a dedicated mobile app, our web app is fully responsive and works great on phones, tablets, and computers."
        },
        {
          question: "How accurate is the barcode scanning?",
          answer: "Our barcode scanning technology has a 99% accuracy rate for product recognition. It instantly identifies products and pre-fills details like name, price estimates, and expiration information from our comprehensive product database."
        }
      ]
    },
    {
      title: "Account & Billing",
      faqs: [
        {
          question: "How do I upgrade my account?",
          answer: "To upgrade your account, go to Settings > Billing in your dashboard. Click 'Upgrade Plan' and choose between Premium or Enterprise options. You'll be redirected to our secure payment processor to complete the upgrade."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time from your account settings. Your access to premium features will continue until the end of your current billing period, and you won't be charged for the next cycle."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through our encrypted payment system."
        },
        {
          question: "Is there a refund policy?",
          answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with FoodTracker, contact our support team within 30 days of your purchase for a full refund."
        }
      ]
    },
    {
      title: "Features & Usage",
      faqs: [
        {
          question: "How do expiration notifications work?",
          answer: "FoodTracker automatically tracks expiration dates for all your food items. You'll receive notifications 3 days, 1 day, and on the day items expire. You can customize notification timing in your settings and choose to receive them via email or in-app alerts."
        },
        {
          question: "Can I share my inventory with family members?",
          answer: "Yes! Premium users can invite up to 5 family members to share their food inventory. Family members can add items, mark items as consumed, and receive notifications. This helps everyone stay informed about what food is available and what's expiring soon."
        },
        {
          question: "How does expense tracking work?",
          answer: "When you add food items, include the purchase price to automatically track your food expenses. FoodTracker generates detailed reports showing spending by category, monthly trends, and waste costs. You can set budget goals and receive alerts when you're approaching limits."
        },
        {
          question: "Can I export my data?",
          answer: "Premium users can export their food inventory and expense data in CSV or PDF format. This includes item lists, purchase dates, expiration dates, prices, and consumption history. Go to Settings > Data Export to download your information."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What browsers are supported?",
          answer: "FoodTracker works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Internet Explorer is not supported."
        },
        {
          question: "Why isn't barcode scanning working?",
          answer: "Barcode scanning requires camera access. Make sure you've granted camera permissions to your browser. Also ensure good lighting and hold the barcode steady within the scanning frame. If issues persist, try refreshing the page or using a different browser."
        },
        {
          question: "How do I recover my account?",
          answer: "If you can't access your account, use the 'Forgot Password' link on the login page. Enter your email address and we'll send reset instructions. If you don't receive the email, check your spam folder or contact support for assistance."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take security seriously. All data is encrypted in transit and at rest using industry-standard encryption. We don't sell your personal information, and you can delete your account and all associated data at any time from your settings."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

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
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <HelpCircle className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-green-600">Questions</span>
            </h1>
            <p className={`text-xl mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Find quick answers to common questions about FoodTracker
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
                placeholder="Search FAQs..."
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

      {/* FAQ Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No FAQs found matching your search. Try different keywords or{' '}
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-green-600 hover:text-green-700 underline"
                >
                  clear your search
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-6 text-green-600">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                      return (
                        <div
                          key={faqIndex}
                          className={`rounded-xl overflow-hidden ${
                            isDark ? 'bg-gray-800' : 'bg-white'
                          } shadow-lg`}
                        >
                          <button
                            onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                            className={`w-full px-6 py-4 text-left flex justify-between items-center hover:bg-opacity-80 transition-all duration-300 ${
                              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium pr-4">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp className="text-green-600 flex-shrink-0" size={20} />
                            ) : (
                              <ChevronDown className="text-green-600 flex-shrink-0" size={20} />
                            )}
                          </button>
                          {isOpen && (
                            <div className={`px-6 pb-4 ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <div className={`pt-2 border-t ${
                                isDark ? 'border-gray-700' : 'border-gray-200'
                              }`}>
                                {faq.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Contact Support
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
              isDark
                ? 'border-gray-600 text-white hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Visit Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
