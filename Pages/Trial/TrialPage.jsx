import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Shield, Clock, Users, Zap, Gift, Calendar, ArrowLeft } from 'lucide-react';

const TrialPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    plan: 'premium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(-1); // Go back to previous page
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      originalPrice: '$9.99',
      description: 'Perfect for individuals starting their food tracking journey',
      features: [
        'Track up to 50 food items',
        'Basic expiry notifications',
        'Simple analytics dashboard',
        'Mobile app access',
        'Email support'
      ],
      popular: false,
      trialDays: 14
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'Free Trial',
      originalPrice: '$19.99',
      description: 'Ideal for families and food enthusiasts',
      features: [
        'Unlimited food tracking',
        'Smart AI notifications',
        'Advanced analytics & insights',
        'Barcode scanning',
        'Recipe recommendations',
        'Priority support',
        'Export data reports'
      ],
      popular: true,
      trialDays: 30
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 'Free Trial',
      originalPrice: '$39.99',
      description: 'For restaurants and businesses',
      features: [
        'Everything in Premium',
        'Multi-location support',
        'Team collaboration tools',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options'
      ],
      popular: false,
      trialDays: 30
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Setup',
      description: 'Get started in less than 2 minutes with our simple onboarding process'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'No Credit Card Required',
      description: 'Start your free trial without any payment information or commitments'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Full Feature Access',
      description: 'Experience all premium features during your trial period'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Cancel Anytime',
      description: 'No long-term contracts or cancellation fees. Stop whenever you want'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'Home Chef',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      comment: 'The free trial convinced me immediately. I reduced my food waste by 60% in just one month!'
    },
    {
      name: 'David Thompson',
      role: 'Restaurant Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      comment: 'FoodTracker saved our restaurant thousands in the first quarter. The ROI is incredible.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to FoodTracker! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your free trial has been activated successfully. Check your email for login credentials and setup instructions.
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your email for setup instructions</li>
                  <li>• Download our mobile app for on-the-go tracking</li>
                  <li>• Join our onboarding webinar (optional)</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-[#124A2F] to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-[#0D3521] hover:to-[#124A2F] transition-colors duration-200">
                  Go to Dashboard
                </button>
                <button className="border-2 border-[#124A2F] text-[#124A2F] px-8 py-3 rounded-lg font-semibold hover:bg-[#124A2F] hover:text-white transition-colors duration-200">
                  Download App
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#124A2F] to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Your Free Trial Today
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Experience the full power of FoodTracker with our risk-free trial.
              No credit card required, cancel anytime.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>30-Day Free Trial</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>50K+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Start Your Free Trial?
            </h2>
            <p className="text-xl text-gray-600">
              Experience all the benefits of FoodTracker without any commitment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#124A2F] to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Trial Plan
            </h2>
            <p className="text-xl text-gray-600">
              All plans include full feature access during the trial period
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-[#124A2F] scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#124A2F] to-green-600 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[#124A2F]">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">{plan.originalPrice}/month</span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <p className="text-sm text-blue-600 font-semibold mb-6">
                    {plan.trialDays}-day free trial included
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setFormData({ ...formData, plan: plan.id })}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                      formData.plan === plan.id
                        ? 'bg-[#124A2F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formData.plan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your Free Trial
              </h2>
              <p className="text-lg text-gray-600">
                Enter your details below to get started with your free trial
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Selected Plan:</strong> {plans.find(p => p.id === formData.plan)?.name}
                  <br />
                  <strong>Trial Period:</strong> {plans.find(p => p.id === formData.plan)?.trialDays} days free
                  <br />
                  <strong>After Trial:</strong> {plans.find(p => p.id === formData.plan)?.originalPrice}/month (cancel anytime)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Starting Your Trial...
                  </div>
                ) : (
                  'Start Free Trial'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By starting your free trial, you agree to our Terms of Service and Privacy Policy.
                No credit card required. Cancel anytime during the trial period.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Thousands of Satisfied Users
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrialPage;
