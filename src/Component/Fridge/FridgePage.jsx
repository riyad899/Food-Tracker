import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { Refrigerator, Search, Filter, AlertTriangle, Clock, CheckCircle, Eye, Calendar } from 'lucide-react';

const FridgePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [expiredCount, setExpiredCount] = useState(0);
  const [nearlyExpiredCount, setNearlyExpiredCount] = useState(0);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        setError(null);

        let combinedData = [];

        // Try to fetch from API first
        try {
          const response = await axios.get('https://server-sepia-nine.vercel.app/addfood');
          const apiData = response.data.data;
          if (apiData && Array.isArray(apiData) && apiData.length > 0) {
            // If API has data, use it and add some dummy data to supplement
            const dummyData = [
              {
                _id: 'dummy1',
                name: 'Fresh Organic Apples',
                category: 'Fruits',
                imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=400&fit=crop&crop=center',
                quantity: '2 kg',
                expiryDate: '2025-08-15',
                description: 'Crisp and sweet organic apples from local orchards',
                addedDate: '2025-08-01'
              },
              {
                _id: 'dummy2',
                name: 'Greek Yogurt',
                category: 'Dairy',
                imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2021/10/fruit-berries-yogurt-732x549-thumbnail-732x549.jpg',
                quantity: '500g',
                expiryDate: '2025-08-12',
                description: 'Creamy protein-rich Greek yogurt perfect for breakfast',
                addedDate: '2025-08-05'
              },
              {
                _id: 'dummy3',
                name: 'Whole Grain Bread',
                category: 'Bakery',
                imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center',
                quantity: '1 loaf',
                expiryDate: '2025-08-11',
                description: 'Freshly baked whole grain bread with seeds',
                addedDate: '2025-08-07'
              }
            ];
            combinedData = [...apiData, ...dummyData];
          } else {
            throw new Error('No data from API');
          }
        } catch (apiError) {
          console.log('API not available or empty, using dummy data only');
          // Use full dummy data when API is not available
          const dummyData = [
            {
              _id: 'dummy1',
              name: 'Fresh Organic Apples',
              category: 'Fruits',
              imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=400&fit=crop&crop=center',
              quantity: '2 kg',
              expiryDate: '2025-08-15',
              description: 'Crisp and sweet organic apples from local orchards',
              addedDate: '2025-08-01'
            },
            {
              _id: 'dummy2',
              name: 'Greek Yogurt',
              category: 'Dairy',
              imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2021/10/fruit-berries-yogurt-732x549-thumbnail-732x549.jpg',
              quantity: '500g',
              expiryDate: '2025-08-12',
              description: 'Creamy protein-rich Greek yogurt perfect for breakfast',
              addedDate: '2025-08-05'
            },
            {
              _id: 'dummy3',
              name: 'Whole Grain Bread',
              category: 'Bakery',
              imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center',
              quantity: '1 loaf',
              expiryDate: '2025-08-11',
              description: 'Freshly baked whole grain bread with seeds',
              addedDate: '2025-08-07'
            },
            {
              _id: 'dummy4',
              name: 'Fresh Salmon Fillet',
              category: 'Seafood',
              imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
              quantity: '800g',
              expiryDate: '2025-08-10',
              description: 'Premium wild-caught salmon rich in omega-3',
              addedDate: '2025-08-08'
            },
            {
              _id: 'dummy5',
              name: 'Organic Baby Spinach',
              category: 'Vegetables',
              imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop&crop=center',
              quantity: '200g',
              expiryDate: '2025-08-13',
              description: 'Fresh organic baby spinach leaves',
              addedDate: '2025-08-06'
            },
            {
              _id: 'dummy6',
              name: 'Free Range Eggs',
              category: 'Dairy',
              imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop&crop=center',
              quantity: '12 pieces',
              expiryDate: '2025-08-20',
              description: 'Farm fresh free-range eggs from happy chickens',
              addedDate: '2025-08-04'
            },
            {
              _id: 'dummy7',
              name: 'Aged Cheddar Cheese',
              category: 'Dairy',
              imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop&crop=center',
              quantity: '300g',
              expiryDate: '2025-09-01',
              description: 'Sharp aged cheddar cheese with rich flavor',
              addedDate: '2025-08-03'
            },
            {
              _id: 'dummy8',
              name: 'Ripe Bananas',
              category: 'Fruits',
              imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop&crop=center',
              quantity: '6 pieces',
              expiryDate: '2025-08-09',
              description: 'Sweet ripe bananas perfect for smoothies',
              addedDate: '2025-08-07'
            }
          ];
          combinedData = dummyData;
        }

        setFoodItems(combinedData);
        setFilteredItems(combinedData);

        // Extract unique categories
        const uniqueCategories = [...new Set(combinedData.map(item => item.category))];
        setCategories(['All', ...uniqueCategories]);

        // Calculate expired and nearly expired counts
        const now = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);

        const expired = combinedData.filter(item =>
          item.expiryDate && new Date(item.expiryDate) < now
        ).length;

        const nearlyExpired = combinedData.filter(item =>
          item.expiryDate &&
          new Date(item.expiryDate) > now &&
          new Date(item.expiryDate) <= fiveDaysFromNow
        ).length;

        setExpiredCount(expired);
        setNearlyExpiredCount(nearlyExpired);

      } catch (err) {
        setError(err.message || 'Failed to fetch food items');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Filter items based on search term and category
  useEffect(() => {
    let filtered = [...foodItems];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, foodItems]);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysAgo = (dateAdded) => {
    const today = new Date();
    const added = new Date(dateAdded);
    const diffTime = today - added;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  if (loading) return (
    <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center">
        <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${isDark ? 'border-green-400' : 'border-[#124A2F]'} mx-auto mb-4`}></div>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading your fridge...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className={`${isDark ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} border px-6 py-4 rounded-lg relative max-w-md`} role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Refrigerator className={`w-10 h-10 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mr-3`} />
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Smart Fridge
            </h1>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Keep track of your food inventory, monitor expiry dates, and reduce food waste with our smart tracking system.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Refrigerator className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Total Items</h3>
            <CountUp
              end={foodItems.length}
              duration={1.5}
              className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
            />
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className={`w-12 h-12 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <AlertTriangle className={`w-6 h-6 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Expired Items</h3>
            <CountUp
              end={expiredCount}
              duration={1.5}
              className={`text-3xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}
            />
          </div>

          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className={`w-12 h-12 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Clock className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Nearly Expired</h3>
            <CountUp
              end={nearlyExpiredCount}
              duration={1.5}
              className={`text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}
            />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-8 shadow-lg`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search by name or category..."
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-400 focus:border-green-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-[#124A2F] focus:border-[#124A2F]'
                  }
                `}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-64 relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none appearance-none
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-400 focus:border-green-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-[#124A2F] focus:border-[#124A2F]'
                  }
                `}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {(searchTerm || selectedCategory !== 'All') && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{foodItems.length}</span> items
                {searchTerm && (
                  <span> matching "<span className="font-medium">{searchTerm}</span>"</span>
                )}
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-medium">{selectedCategory}</span> category</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
              const isExpired = daysUntilExpiry < 0;
              const isNearlyExpired = daysUntilExpiry >= 0 && daysUntilExpiry <= 5;

              return (
                <div
                  key={item._id}
                  className={`
                    ${isDark ? 'bg-gray-800 border-gray-700 hover:border-green-400' : 'bg-white border-gray-200 hover:border-blue-300'}
                    border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group
                  `}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl || '/default-food-image.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = '/default-food-image.jpg';
                      }}
                      loading="lazy"
                    />

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 space-y-2">
                      {isExpired && (
                        <span className="block bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Expired
                        </span>
                      )}
                      {!isExpired && isNearlyExpired && (
                        <span className="block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Expires Soon
                        </span>
                      )}
                      {!isExpired && !isNearlyExpired && (
                        <span className="block bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Fresh
                        </span>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {item.category || 'Uncategorized'}
                    </div>

                    {/* View Overlay */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    )}

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="font-medium mr-2">Quantity:</span>
                        <span>{item.quantity || 'N/A'}</span>
                      </div>

                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Expires: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>

                      {item.addedDate && (
                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="font-medium mr-2">Added:</span>
                          <span>{getDaysAgo(item.addedDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Expiry Status */}
                    <div className="mb-4">
                      {item.expiryDate && (
                        <div className={`flex items-center text-sm ${
                          isExpired ? 'text-red-500' :
                          isNearlyExpired ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">
                            {isExpired ? `Expired ${Math.abs(daysUntilExpiry)} days ago` :
                             isNearlyExpired ? `${daysUntilExpiry} days left` :
                             `Fresh for ${daysUntilExpiry} days`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/food/${item._id}`)}
                      className={`
                        w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isDark
                          ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white focus:ring-green-500'
                          : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white focus:ring-[#124A2F]'
                        }
                      `}
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <Refrigerator className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
              <p className={`text-xl mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No items found matching your criteria
              </p>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Try adjusting your search or filters to find what you're looking for
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105
                  ${isDark
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-[#124A2F] hover:bg-[#0D3521] text-white'
                  }
                `}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FridgePage;