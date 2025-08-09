import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';

const NearlyExpiryFood = () => {
  const { isDark } = useTheme();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the current date to prevent unnecessary recalculations
  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('https://server-sepia-nine.vercel.app/food', {
          signal: controller.signal
        });
        if (isMounted) {
          setFoodItems(response.data.data || []);
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          console.error('Error fetching food items:', err);
          setError('Failed to load food items');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFoodItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Memoize the processed food items with expiry status
  const processedFoodItems = useMemo(() => {
    return foodItems.map(item => {
      const expiryDate = new Date(item.expiryDate);
      const timeDiff = expiryDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      let status = '';
      let statusClass = '';

      if (daysLeft <= 0) {
        status = 'Expired';
        statusClass = 'text-red-600 font-bold';
      } else if (daysLeft === 1) {
        status = '1 day left';
        statusClass = 'text-orange-600 font-bold';
      } else if (daysLeft === 2) {
        status = '2 days left';
        statusClass = 'text-yellow-600 font-bold';
      } else if (daysLeft <= 7) {
        status = `${daysLeft} days left`;
        statusClass = 'text-yellow-500';
      } else {
        status = `${daysLeft} days left`;
        statusClass = 'text-green-600';
      }

      return {
        ...item,
        expiryDate,
        daysLeft,
        status,
        statusClass,
        formattedDate: expiryDate.toLocaleDateString()
      };
    }).sort((a, b) => a.daysLeft - b.daysLeft); // Sort by days left ascending
  }, [foodItems, today]);

  if (loading) return <div className={`flex justify-center py-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading...</div>;

  if (error) return <div className="flex justify-center py-8 text-red-600">{error}</div>;

  if (foodItems.length === 0) {
    return (
      <section id="food-inventory" className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Food Inventory</h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>No food items found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="food-inventory" className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Food Inventory</h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Monitor your food items and stay ahead of expiry dates. Items are sorted by nearest expiry date to help you prioritize consumption.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedFoodItems.map(item => (
            <FoodItemCard key={item._id} item={item} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Memoized component for optimal rendering
const FoodItemCard = React.memo(({ item, isDark }) => {
  return (
    <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}>
      <div className="h-64 overflow-hidden">
        <img
          src={item.imageUrl || '/images/default-food.png'}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = '/images/default-food.png';
          }}
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-1 flex-1`}>{item.name}</h3>
          <span className={`inline-block px-3 py-1 ${isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-[#124A2F]'} text-xs font-medium rounded-full ml-2`}>
            {item.category}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="font-medium">Quantity:</span> {item.quantity} {item.unit}
          </p>
          <p className={`text-sm ${item.statusClass}`}>
            <span className="font-medium">Status:</span> {item.status}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="font-medium">Expiry Date:</span> {item.formattedDate}
          </p>
        </div>

        <Link
          to={`/food/${item._id}`}
          className={`
            block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-200
            ${isDark
              ? 'bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
            }
          `}
        >
          See More
        </Link>
      </div>
    </div>
  );
});

export default NearlyExpiryFood;