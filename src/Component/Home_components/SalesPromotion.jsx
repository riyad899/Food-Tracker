import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Percent, Timer, Tag, ShoppingCart, Gift } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const SalesPromotion = () => {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const promotions = [
    {
      id: 1,
      title: 'Flash Sale',
      subtitle: 'Limited Time Offer',
      discount: '50% OFF',
      description: 'Get 50% off on all organic vegetables and fruits',
      imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-15T23:59:59',
      bgColor: 'from-red-500 to-pink-600',
      category: 'Organic Produce'
    },
    {
      id: 2,
      title: 'Weekly Special',
      subtitle: 'Best Deals',
      discount: '30% OFF',
      description: 'Premium dairy products at unbeatable prices',
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-12T23:59:59',
      bgColor: 'from-[#124A2F] to-green-600',
      category: 'Dairy Products'
    },
    {
      id: 3,
      title: 'Bundle Deal',
      subtitle: 'Save More',
      discount: 'Buy 2 Get 1',
      description: 'Mix and match on selected pantry items',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e30c?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-20T23:59:59',
      bgColor: 'from-green-500 to-emerald-600',
      category: 'Pantry Essentials'
    }
  ];

  // Countdown timer for flash sale
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date('2025-08-15T23:59:59').getTime();
      const difference = endTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className={`${isDark ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'} backdrop-blur-sm rounded-lg p-3 text-center min-w-[60px] shadow-md`}>
      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.toString().padStart(2, '0')}</div>
      <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{label}</div>
    </div>
  );

  return (
    <section className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Percent className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mr-3`} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Special Offers
            </h2>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Don't miss out on our incredible deals and promotions.
            Save more on your favorite food items with limited-time offers.
          </p>
        </div>

        {/* Main Flash Sale Banner */}
        <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Gift className="w-8 h-8 text-yellow-300 mr-3 drop-shadow-md" />
                  <span className="bg-yellow-300 text-[#124A2F] px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    FLASH SALE
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  50% OFF
                </h3>
                <p className="text-xl text-white mb-6 drop-shadow-md">
                  All Organic Vegetables & Fruits
                </p>
                <Link
                  to="/products?category=organic"
                  className={`inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-[#124A2F] hover:bg-gray-100'}`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop Now
                </Link>
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Timer className="w-6 h-6 text-white mr-2 drop-shadow-md" />
                  <span className="text-white text-lg font-medium drop-shadow-md">Ends In:</span>
                </div>
                <div className="flex justify-center space-x-4">
                  <TimeBox value={timeLeft.days} label="Days" />
                  <TimeBox value={timeLeft.hours} label="Hours" />
                  <TimeBox value={timeLeft.minutes} label="Mins" />
                  <TimeBox value={timeLeft.seconds} label="Secs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="h-64 overflow-hidden">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${promo.bgColor} opacity-85`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <Tag className="w-5 h-5 mr-2 text-white" />
                    <span className="text-sm font-medium text-white drop-shadow-sm">{promo.subtitle}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-white drop-shadow-md">{promo.title}</h4>
                  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg px-3 py-1 inline-block mb-3">
                    <span className="text-lg font-bold text-gray-900">{promo.discount}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white font-medium drop-shadow-sm mb-1">{promo.category}</p>
                  <p className="text-sm text-white drop-shadow-sm mb-4">{promo.description}</p>
                  <Link
                    to="/deals"
                    className="block w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center shadow-md"
                  >
                    View Deals
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup for Deals */}
        <div className={`mt-16 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 text-center`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Never Miss a Deal!
          </h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'}`}
            />
            <Link
              to="/trial"
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white' : 'bg-gradient-to-r from-[#124A2F] to-green-600 text-white hover:from-[#0D3521] hover:to-[#124A2F]'}`}
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesPromotion;
