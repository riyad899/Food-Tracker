import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FridgePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/addfood');
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Fridge</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={item.imageUrl || '/default-food-image.jpg'}
                alt={item.name || item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-food-image.jpg';
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name || item.title}</h3>
              <p className="text-sm text-gray-600 mb-1">Category: {item.category}</p>
              <p className="text-sm text-gray-600 mb-2">Qty: {item.quantity}</p>

              {item.expiryDate && isExpired(item.expiryDate) && (
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mb-2">
                  Expired
                </span>
              )}

              <button
                onClick={() => navigate(`/food/${item._id || item.id}`)}
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FridgePage;