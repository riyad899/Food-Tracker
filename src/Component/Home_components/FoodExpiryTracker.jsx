import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ExpiredFoodSection = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foodexpiry', {
          signal: controller.signal
        });
        setFoodItems(response.data);
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
    <div className="flex justify-center py-8 bg-white">
      Loading expired items...
    </div>
  );

  if (error) return (
    <div className="flex justify-center py-8 text-red-600 bg-white">
      {error}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-black mb-6">Expired Food Items</h2>

        {expiredItems.length === 0 ? (
          <p className="text-gray-600 text-center">
            No expired food items found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expiredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={item.imageUrl || '/images/default-food.png'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/default-food.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">{item.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="truncate"><span className="font-medium">Category:</span> {item.category}</p>
                    <p><span className="font-medium">Quantity:</span> {item.quantity} {item.unit}</p>
                    <p className="text-red-600 font-bold">
                      <span className="font-medium">Status:</span> Expired {item.daysExpired} day{item.daysExpired !== 1 ? 's' : ''} ago
                    </p>
                    <p>
                      <span className="font-medium">Expired on:</span> {item.expiryDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/foods/${item._id}`}
                      className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpiredFoodSection;