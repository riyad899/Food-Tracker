import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CustomerReviews = () => {
  const { isDark } = useTheme();
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ae?w=100&h=100&fit=crop&crop=face',
      role: 'Home Chef',
      rating: 5,
      date: '2025-08-05',
      text: 'FoodTracker has completely revolutionized how I manage my kitchen inventory. The expiry tracking feature has saved me hundreds of dollars by preventing food waste. Highly recommend!',
      category: 'Food Management'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: 'Restaurant Owner',
      rating: 5,
      date: '2025-08-03',
      text: 'As a restaurant owner, keeping track of food inventory is crucial. This platform helps me monitor expiry dates and reduce waste significantly. The analytics dashboard is incredibly helpful.',
      category: 'Business'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'Nutritionist',
      rating: 5,
      date: '2025-08-01',
      text: 'I love how easy it is to track my clients\' food intake and suggest meal plans. The categorization feature makes it simple to ensure balanced nutrition while minimizing waste.',
      category: 'Health & Nutrition'
    },
    {
      id: 4,
      name: 'David Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'Family Dad',
      rating: 4,
      date: '2025-07-30',
      text: 'Great tool for managing our family\'s food expenses. The notification system alerts us before items expire, which has helped us plan meals better and save money.',
      category: 'Family Planning'
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      role: 'Food Blogger',
      rating: 5,
      date: '2025-07-28',
      text: 'As someone who experiments with different ingredients, FoodTracker helps me keep organized. The image upload feature and detailed categorization make it perfect for food enthusiasts.',
      category: 'Food Blogging'
    },
    {
      id: 6,
      name: 'Robert Wilson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
      role: 'College Student',
      rating: 4,
      date: '2025-07-25',
      text: 'Perfect for students on a budget! Helps me track what I have in my dorm fridge and plan meals accordingly. The expense tracking feature is a game-changer for managing food costs.',
      category: 'Student Life'
    }
  ];

  // Auto-advance reviews
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Quote className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mr-3`} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What Our Users Say
            </h2>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Discover how FoodTracker is helping thousands of users save money,
            reduce waste, and manage their food inventory more effectively.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Main Review Display */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto`}>
            <div className="text-center mb-8">
              <Quote className={`w-16 h-16 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mx-auto mb-6 opacity-50`} />
              <p className={`text-xl md:text-2xl ${isDark ? 'text-gray-200' : 'text-gray-700'} leading-relaxed mb-8 italic`}>
                "{reviews[currentReview].text}"
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(reviews[currentReview].rating)}
              </div>

              {/* User Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={reviews[currentReview].avatar}
                  alt={reviews[currentReview].name}
                  className={`w-16 h-16 rounded-full border-4 ${isDark ? 'border-green-700' : 'border-green-100'}`}
                  loading="lazy"
                />
                <div className="text-left">
                  <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {reviews[currentReview].name}
                  </h4>
                  <p className={`${isDark ? 'text-green-400' : 'text-[#124A2F]'} font-medium`}>
                    {reviews[currentReview].role}
                  </p>
                  <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(reviews[currentReview].date)}
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-[#124A2F]'}`}>
                  {reviews[currentReview].category}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} p-3 rounded-full shadow-lg transition-all duration-200 group`}
            aria-label="Previous review"
          >
            <ChevronLeft className={`w-6 h-6 ${isDark ? 'text-gray-300 group-hover:text-green-400' : 'text-gray-600 group-hover:text-[#124A2F]'}`} />
          </button>

          <button
            onClick={nextReview}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} p-3 rounded-full shadow-lg transition-all duration-200 group`}
            aria-label="Next review"
          >
            <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-300 group-hover:text-green-400' : 'text-gray-600 group-hover:text-[#124A2F]'}`} />
          </button>
        </div>

        {/* Review Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentReview
                  ? `${isDark ? 'bg-green-400' : 'bg-[#124A2F]'} w-8`
                  : `${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mb-2`}>10K+</div>
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">$500K+</div>
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Money Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">1M+</div>
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Items Tracked</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
