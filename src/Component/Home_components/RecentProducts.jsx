import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const RecentProducts = () => {
  const { isDark } = useTheme();
  const [recentItems, setRecentItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const mockRecentItems = [
      {
        _id: '7',
        name: 'Farm Fresh Chicken',
        category: 'Poultry',
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop&crop=center',
        description: 'Free-range chicken from local farms, rich in protein and flavor.',
        addedDate: '2025-08-08',
        isNew: true,
        quantity: '2.5 kg',
        price: '$16.99'
      },
      {
        _id: '8',
        name: 'Organic Quinoa',
        category: 'Grains',
        imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2023/1/PI/QB/VQ/17280493/organic-quinoa-seeds.jpg',
        description: 'Superfood quinoa packed with complete proteins and essential amino acids.',
        addedDate: '2025-08-07',
        isNew: true,
        quantity: '500g',
        price: '$9.99'
      },
      {
        _id: '9',
        name: 'Wild Caught Salmon',
        category: 'Seafood',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
        description: 'Premium wild-caught salmon rich in omega-3 fatty acids.',
        addedDate: '2025-08-06',
        isNew: true,
        quantity: '1 kg',
        price: '$28.99'
      },
      {
        _id: '10',
        name: 'Organic Avocados',
        category: 'Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=400&fit=crop&crop=center',
        description: 'Creamy organic avocados perfect for healthy meals and snacks.',
        addedDate: '2025-08-05',
        isNew: false,
        quantity: '6 pieces',
        price: '$7.99'
      },
      {
        _id: '11',
        name: 'Artisan Cheese Selection',
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop&crop=center',
        description: 'Curated selection of artisan cheeses from European producers.',
        addedDate: '2025-08-04',
        isNew: false,
        quantity: '500g',
        price: '$22.99'
      },
      {
        _id: '12',
        name: 'Organic Honey',
        category: 'Pantry',
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=400&fit=crop&crop=center',
        description: 'Pure organic honey from local beekeepers, naturally sweet and healthy.',
        addedDate: '2025-08-03',
        isNew: false,
        quantity: '350ml',
        price: '$12.49'
      }
    ];
    setRecentItems(mockRecentItems);
  }, []);

  const getDaysAgo = (dateAdded) => {
    const today = new Date();
    const added = new Date(dateAdded);
    const diffTime = today - added;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-[#124A2F]'} mr-3`} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recently Added
            </h2>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Stay up-to-date with our latest additions to the food inventory.
            Fresh arrivals and new products added to help you track your food better.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showAll ? recentItems : recentItems.slice(0, 6)).map((item) => (
            <div
              key={item._id}
              className={`${isDark ? 'bg-gray-800 border-gray-600 hover:border-green-400' : 'bg-white border-gray-200 hover:border-blue-300'} border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* New Badge */}
                {item.isNew && (
                  <div className={`absolute top-3 right-3 ${isDark ? 'bg-gradient-to-r from-green-700 to-green-600' : 'bg-gradient-to-r from-[#124A2F] to-green-600'} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center`}>
                    <Zap className="w-3 h-3 mr-1" />
                    NEW
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} line-clamp-1 flex-1`}>
                    {item.name}
                  </h3>
                  <span className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-[#124A2F]'} ml-2`}>
                    {item.price}
                  </span>
                </div>

                {/* Description */}
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Added {getDaysAgo(item.addedDate)}
                  </div>
                  <div className={`flex justify-between items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span>Quantity: <span className="font-medium">{item.quantity}</span></span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/food/${item._id}`}
                  className={`
                    block w-full text-center py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105
                    ${isDark
                      ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white'
                      : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
                    }
                  `}
                >
                  See More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className={`
                inline-flex items-center px-8 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105
                ${isDark
                  ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white'
                  : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
                }
              `}
            >
              Load More Recent Items
            </button>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowAll(false)}
                className={`inline-flex items-center px-8 py-3 font-semibold rounded-lg transition-all duration-200 mr-4 ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
              >
                Show Less
              </button>
              <Link
                to="/products"
                className={`
                  inline-flex items-center px-8 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105
                  ${isDark
                    ? 'bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white'
                    : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
                  }
                `}
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
