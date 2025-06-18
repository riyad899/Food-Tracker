import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NearlyExpiryFood = () => {
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
        const response = await axios.get('http://localhost:3000/food', {
          signal: controller.signal
        });
        if (isMounted) {
          setFoodItems(response.data);
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

  if (loading) return <div className="flex justify-center py-8">Loading...</div>;

  if (error) return <div className="flex justify-center py-8 text-red-600">{error}</div>;

  if (foodItems.length === 0) {
    return (
      <section className="bg-gray-50 p-8 my-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">Food Items</h2>
        <p className="text-gray-600 mt-2">No food items found.</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 p-8 my-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">Food Inventory</h2>
      <p className="text-gray-600 mt-2">Sorted by nearest expiry date</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {processedFoodItems.map(item => (
          <FoodItemCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

// Memoized component for optimal rendering
const FoodItemCard = React.memo(({ item }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={item.imageUrl || '/images/default-food.png'}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/default-food.png';
          }}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {item.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Quantity:</span> {item.quantity} {item.unit}
          </p>
          <p className={`text-sm ${item.statusClass}`}>
            <span className="font-medium">Status:</span> {item.status}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Expiry Date:</span> {item.formattedDate}
          </p>
        </div>
        <Link
          to={`/foods/${item._id}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          See Details
        </Link>
      </div>
    </div>
  );
});

export default NearlyExpiryFood;