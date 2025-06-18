import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
// import { useAuth } from './AuthContext'; // Assuming you have an AuthContext
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';

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
  const { user } = useContext(AuthContext); // Get current user from auth context

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`http://localhost:3000/addfood?userId=${user.uid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFoodItems(data);
        setFilteredItems(data);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(['All', ...uniqueCategories]);

        // Calculate expired and nearly expired counts
        const now = new Date();
        const fiveDaysFromNow = new Date();
        fiveDaysFromNow.setDate(now.getDate() + 5);

        const expired = data.filter(item =>
          item.expiryDate && new Date(item.expiryDate) < now
        ).length;

        const nearlyExpired = data.filter(item =>
          item.expiryDate &&
          new Date(item.expiryDate) > now &&
          new Date(item.expiryDate) <= fiveDaysFromNow
        ).length;

        setExpiredCount(expired);
        setNearlyExpiredCount(nearlyExpired);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.message.includes('Session expired')) {
          navigate('/login');
        }
      }
    };

    fetchFoodItems();
  }, [user, navigate]);

  // ... rest of the component remains the same ...
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const isNearlyExpired = (expiryDate) => {
    const now = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(now.getDate() + 5);
    return new Date(expiryDate) > now && new Date(expiryDate) <= fiveDaysFromNow;
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

  if (!user) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your fridge</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Fridge</h1>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[200px]">
          <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
          <CountUp
            end={foodItems.length}
            duration={1.5}
            className="text-2xl font-bold text-blue-600"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[200px]">
          <h3 className="text-lg font-semibold text-gray-700">Expired Items</h3>
          <CountUp
            end={expiredCount}
            duration={1.5}
            className="text-2xl font-bold text-red-600"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[200px]">
          <h3 className="text-lg font-semibold text-gray-700">Nearly Expired</h3>
          <CountUp
            end={nearlyExpiredCount}
            duration={1.5}
            className="text-2xl font-bold text-yellow-600"
          />
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or category..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      {searchTerm || selectedCategory !== 'All' ? (
        <p className="text-gray-600 mb-4">
          Showing {filteredItems.length} of {foodItems.length} items
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
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

                {item.expiryDate && !isExpired(item.expiryDate) && isNearlyExpired(item.expiryDate) && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                    Expires Soon
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
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FridgePage;