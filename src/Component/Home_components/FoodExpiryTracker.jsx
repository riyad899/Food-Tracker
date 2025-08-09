import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ExpiredFoodSection = () => {
  const { isDark } = useTheme();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('https://server-sepia-nine.vercel.app/foodexpiry', {
          signal: controller.signal
        });
        setFoodItems(response.data.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Failed to load expired food items');
          console.error('Error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();

    return () => controller.abort();
  }, []);

  const expiredItems = useMemo(() => {
    const today = new Date();
    return foodItems
      .filter(item => {
        const expiryDate = new Date(item.expiryDate);
        return expiryDate <= today;
      })
      .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
      .map(item => ({
        ...item,
        expiryDate: new Date(item.expiryDate),
        daysExpired: Math.floor((today - new Date(item.expiryDate)) / (1000 * 60 * 60 * 24))
      }));
  }, [foodItems]);

  if (loading) return (
    <div className={`flex justify-center py-8 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      Loading expired items...
    </div>
  );

  if (error) return (
    <div className={`flex justify-center py-8 text-red-600 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {error}
    </div>
  );

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Expired Food Items</h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Keep track of expired items to better understand consumption patterns and reduce future waste.
          </p>
        </div>

        {expiredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-24 h-24 ${isDark ? 'bg-green-800' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <span className="text-4xl">🎉</span>
            </div>
            <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Great Job!</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
              No expired food items found. Keep up the excellent food management!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {expiredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${isDark ? 'bg-gray-800 border-red-800' : 'bg-white border-red-100'} rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.imageUrl || '/images/default-food.png'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/default-food.png';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    EXPIRED
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-1 flex-1`}>{item.name}</h3>
                    <span className={`inline-block px-3 py-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} text-xs font-medium rounded-full ml-2`}>
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-medium">Quantity:</span> {item.quantity} {item.unit}
                    </p>
                    <p className="text-red-500 font-semibold text-sm">
                      <span className="font-medium">Status:</span> Expired {item.daysExpired} day{item.daysExpired !== 1 ? 's' : ''} ago
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="font-medium">Expired on:</span> {item.expiryDate.toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/food/${item._id}`}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-200"
                  >
                    See More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpiredFoodSection;