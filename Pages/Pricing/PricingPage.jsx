import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Check, Star, Zap, Shield, Users, Crown } from 'lucide-react';

const PricingPage = () => {
  const { isDark } = useTheme();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for individuals starting their food tracking journey",
      icon: Users,
      features: [
        "Track up to 50 food items",
        "Basic expiration reminders",
        "Simple expense tracking",
        "Mobile app access",
        "Email support"
      ],
      notIncluded: [
        "Advanced analytics",
        "Barcode scanning",
        "Family sharing",
        "Priority support"
      ],
      popular: false,
      buttonText: "Get Started",
      buttonStyle: "border"
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "Ideal for families and serious food trackers",
      icon: Star,
      features: [
        "Unlimited food items",
        "Smart notifications",
        "Advanced analytics",
        "Barcode scanning",
        "Shopping list generation",
        "Family sharing (up to 5 members)",
        "Priority email support",
        "Data export"
      ],
      notIncluded: [
        "Phone support",
        "Custom integrations"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonStyle: "gradient"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large families, organizations, and businesses",
      icon: Crown,
      features: [
        "Everything in Premium",
        "Unlimited family members",
        "24/7 phone support",
        "Custom integrations",
        "API access",
        "Advanced reporting",
        "Dedicated account manager",
        "Custom training"
      ],
      notIncluded: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonStyle: "border"
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial for the Premium plan. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! You can cancel your subscription at any time. Your access will continue until the end of your billing period."
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get started in minutes with our quick onboarding process"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Family Friendly",
      description: "Share access with family members and track together"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent <span className="text-green-600">Pricing</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose the perfect plan for your food tracking needs. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? `ring-2 ring-green-500 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl scale-105`
                  : `${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                    <plan.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== "Contact us" && (
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="text-green-600 flex-shrink-0" size={16} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 opacity-50">
                      <div className="w-4 h-4 border rounded-full flex-shrink-0"></div>
                      <span className="text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.buttonStyle === 'gradient'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'
                    : `border-2 ${
                        isDark
                          ? 'border-gray-600 text-white hover:bg-gray-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FoodTracker?</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get the best value with features that save you time and money
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`text-center p-6 rounded-xl ${
                isDark ? 'bg-gray-700' : 'bg-white'
              } shadow-lg`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <benefit.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className={`p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-20 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of users who are already reducing food waste and saving money with FoodTracker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
              isDark
                ? 'border-gray-600 text-white hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
