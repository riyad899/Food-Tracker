import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Percent, Timer, Tag, ShoppingCart, Gift, Star, TrendingUp, Clock, Users } from 'lucide-react';
import { useTheme } from '../../src/contexts/ThemeContext';

const DealsPage = () => {
  const { isDark } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const deals = [
    {
      id: 1,
      title: 'Organic Vegetables Bundle',
      originalPrice: 45.99,
      discountedPrice: 22.99,
      discount: 50,
      category: 'organic',
      imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-15T23:59:59',
      rating: 4.8,
      totalSold: 234,
      isFlashSale: true,
      description: 'Fresh organic vegetables including tomatoes, carrots, spinach, and bell peppers.',
      tags: ['Organic', 'Fresh', 'Bundle']
    },
    {
      id: 2,
      title: 'Premium Dairy Pack',
      originalPrice: 28.99,
      discountedPrice: 20.29,
      discount: 30,
      category: 'dairy',
      imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-12T23:59:59',
      rating: 4.6,
      totalSold: 156,
      isFlashSale: false,
      description: 'Premium milk, cheese, butter, and yogurt from local farms.',
      tags: ['Premium', 'Local', 'Dairy']
    },
    {
      id: 3,
      title: 'Pantry Essentials Mix',
      originalPrice: 35.99,
      discountedPrice: 23.99,
      discount: 33,
      category: 'pantry',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e30c?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-20T23:59:59',
      rating: 4.7,
      totalSold: 189,
      isFlashSale: false,
      description: 'Rice, pasta, canned goods, and cooking oils for your pantry.',
      tags: ['Essentials', 'Bulk', 'Staples']
    },
    {
      id: 4,
      title: 'Seasonal Fruits Box',
      originalPrice: 32.99,
      discountedPrice: 19.79,
      discount: 40,
      category: 'fruits',
      imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-18T23:59:59',
      rating: 4.9,
      totalSold: 298,
      isFlashSale: true,
      description: 'Seasonal fresh fruits including apples, oranges, bananas, and berries.',
      tags: ['Seasonal', 'Fresh', 'Premium']
    },
    {
      id: 5,
      title: 'Gourmet Snacks Collection',
      originalPrice: 24.99,
      discountedPrice: 17.49,
      discount: 30,
      category: 'snacks',
      imageUrl: 'https://images.unsplash.com/photo-1606312619777-7cfaa0eecf16?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-16T23:59:59',
      rating: 4.5,
      totalSold: 167,
      isFlashSale: false,
      description: 'Artisanal nuts, crackers, and gourmet snacks for any occasion.',
      tags: ['Gourmet', 'Artisanal', 'Premium']
    },
    {
      id: 6,
      title: 'Breakfast Combo',
      originalPrice: 18.99,
      discountedPrice: 13.29,
      discount: 30,
      category: 'breakfast',
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=500&fit=crop&crop=center',
      endDate: '2025-08-14T23:59:59',
      rating: 4.4,
      totalSold: 123,
      isFlashSale: false,
      description: 'Cereal, bread, jam, and orange juice for perfect breakfast.',
      tags: ['Breakfast', 'Combo', 'Morning']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Deals', count: deals.length },
    { id: 'organic', name: 'Organic', count: deals.filter(d => d.category === 'organic').length },
    { id: 'dairy', name: 'Dairy', count: deals.filter(d => d.category === 'dairy').length },
    { id: 'fruits', name: 'Fruits', count: deals.filter(d => d.category === 'fruits').length },
    { id: 'pantry', name: 'Pantry', count: deals.filter(d => d.category === 'pantry').length },
    { id: 'snacks', name: 'Snacks', count: deals.filter(d => d.category === 'snacks').length },
    { id: 'breakfast', name: 'Breakfast', count: deals.filter(d => d.category === 'breakfast').length }
  ];

  const filteredDeals = activeFilter === 'all'
    ? deals
    : deals.filter(deal => deal.category === activeFilter);

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
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`py-16 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Percent className={`w-10 h-10 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mr-3`} />
              <h1 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Special Deals
              </h1>
            </div>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Discover amazing discounts on fresh, quality food items. Limited-time offers that you don't want to miss!
            </p>
          </div>

          {/* Flash Sale Banner */}
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
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    UP TO 50% OFF
                  </h2>
                  <p className="text-xl text-white mb-6 drop-shadow-md">
                    Selected items with incredible discounts
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-white">
                      <TrendingUp className="w-5 h-5 mr-1" />
                      <span className="text-sm">Trending</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Users className="w-5 h-5 mr-1" />
                      <span className="text-sm">1,234+ bought</span>
                    </div>
                  </div>
                </div>

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
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeFilter === category.id
                    ? isDark
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-[#124A2F] text-white shadow-lg'
                    : isDark
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              >
                {/* Flash Sale Badge */}
                {deal.isFlashSale && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      FLASH SALE
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{deal.discount}%
                  </span>
                </div>

                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {deal.title}
                  </h3>

                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                    {deal.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {deal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {deal.rating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className={`w-4 h-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {deal.totalSold} sold
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`}>
                        ${deal.discountedPrice}
                      </span>
                      <span className={`text-lg line-through ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className={`w-4 h-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Ends {new Date(deal.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/product/${deal.id}`}
                    className={`block w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-105 ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white' : 'bg-gradient-to-r from-[#124A2F] to-green-600 text-white hover:from-[#0D3521] hover:to-[#124A2F]'}`}
                  >
                    <ShoppingCart className="w-5 h-5 inline mr-2" />
                    View Deal
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}>
              Load More Deals
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Never Miss a Deal Again!
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Get exclusive access to flash sales, special discounts, and early bird offers.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'}`}
            />
            <button className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white' : 'bg-gradient-to-r from-[#124A2F] to-green-600 text-white hover:from-[#0D3521] hover:to-[#124A2F]'}`}>
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealsPage;
