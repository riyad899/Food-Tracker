import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Eye } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const FeaturedProducts = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleNavigateToProducts = () => {
    // Save current scroll position before navigating
    const currentScrollPosition = window.scrollY;
    navigate('/products', {
      state: {
        returnUrl: '/#featured-products',
        scrollPosition: currentScrollPosition
      }
    });
  };

  // Mock featured food items with high-quality images
  useEffect(() => {
    const mockFeaturedItems = [
      {
        _id: '1',
        name: 'Organic Fresh Vegetables',
        category: 'Vegetables',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop&crop=center',
        description: 'Fresh organic vegetables packed with nutrients and flavor, perfect for healthy meals.',
        rating: 4.8,
        reviews: 124,
        expiryDate: '2025-08-15',
        price: '$12.99',
        discount: '20% OFF'
      },
      {
        _id: '2',
        name: 'Premium Dairy Products',
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=400&fit=crop&crop=center',
        description: 'High-quality dairy products from local farms, ensuring freshness and taste.',
        rating: 4.9,
        reviews: 89,
        expiryDate: '2025-08-12',
        price: '$8.49',
        discount: null
      },
      {
        _id: '3',
        name: 'Artisan Bread Selection',
        category: 'Bakery',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center',
        description: 'Freshly baked artisan breads made with premium ingredients and traditional methods.',
        rating: 4.7,
        reviews: 156,
        expiryDate: '2025-08-11',
        price: '$6.99',
        discount: '15% OFF'
      },
      {
        _id: '4',
        name: 'Fresh Seasonal Fruits',
        category: 'Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop&crop=center',
        description: 'Hand-picked seasonal fruits at peak ripeness, bursting with natural sweetness.',
        rating: 4.6,
        reviews: 203,
        expiryDate: '2025-08-13',
        price: '$15.99',
        discount: null
      },
      {
        _id: '5',
        name: 'Gourmet Meat Selection',
        category: 'Meat',
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop&crop=center',
        description: 'Premium cuts of meat from grass-fed animals, perfect for special occasions.',
        rating: 4.9,
        reviews: 78,
        expiryDate: '2025-08-14',
        price: '$24.99',
        discount: '10% OFF'
      },
      {
        _id: '6',
        name: 'Exotic Spice Collection',
        category: 'Spices',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&crop=center',
        description: 'Authentic spices from around the world to elevate your cooking experience.',
        rating: 4.8,
        reviews: 92,
        expiryDate: '2025-12-31',
        price: '$18.99',
        discount: null
      }
    ];
    setFeaturedItems(mockFeaturedItems);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className={`py-16 transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            Featured Products
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover our handpicked selection of premium food items, carefully chosen for their quality,
            freshness, and exceptional value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => {
            const daysLeft = getDaysUntilExpiry(item.expiryDate);

            return (
              <div
                key={item._id}
                className={`
                  rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group
                  ${isDark ? 'bg-gray-700' : 'bg-white'}
                `}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {item.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.discount}
                    </div>
                  )}

                  {/* View Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Price */}
                  <div className="flex justify-between items-start mb-2">
                    <span className={`
                      inline-block px-3 py-1 text-xs font-medium rounded-full
                      ${isDark
                        ? 'bg-green-800 text-green-200'
                        : 'bg-green-100 text-[#124A2F]'
                      }
                    `}>
                      {item.category}
                    </span>
                    <span className={`
                      text-2xl font-bold
                      ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                    `}>
                      {item.price}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl font-semibold mb-2 line-clamp-1
                    ${isDark ? 'text-gray-100' : 'text-gray-900'}
                  `}>
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className={`
                    text-sm mb-4 line-clamp-2
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {item.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(item.rating)}
                    </div>
                    <span className={`
                      ml-2 text-sm
                      ${isDark ? 'text-gray-400' : 'text-gray-600'}
                    `}>
                      {item.rating} ({item.reviews} reviews)
                    </span>
                  </div>

                  {/* Expiry Info */}
                  <div className="flex items-center mb-4">
                    <Clock className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${
                      daysLeft <= 3 ? 'text-red-500 font-medium' :
                      daysLeft <= 7 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/product/${item._id}`}
                    className={`
                      block w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200
                      ${isDark
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white'
                        : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
                      }
                    `}
                  >
                    See More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleNavigateToProducts}
            className="inline-flex items-center px-8 py-3 bg-white border-2 border-[#124A2F] text-[#124A2F] font-semibold rounded-lg hover:bg-[#124A2F] hover:text-white transition-all duration-200"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
