import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Star, Clock, Eye, Filter, Search, Grid, List, ArrowLeft } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    const returnUrl = location.state?.returnUrl;
    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate('/');
    }
  };

  // Mock products data
  useEffect(() => {
    const mockProducts = [
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
      },
      {
        _id: '7',
        name: 'Farm Fresh Chicken',
        category: 'Poultry',
        imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop&crop=center',
        description: 'Free-range chicken from local farms, rich in protein and flavor.',
        rating: 4.7,
        reviews: 156,
        expiryDate: '2025-08-16',
        price: '$16.99',
        discount: null
      },
      {
        _id: '8',
        name: 'Organic Quinoa',
        category: 'Grains',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e30c?w=600&h=400&fit=crop&crop=center',
        description: 'Superfood quinoa packed with complete proteins and essential amino acids.',
        rating: 4.8,
        reviews: 134,
        expiryDate: '2025-12-15',
        price: '$9.99',
        discount: '5% OFF'
      },
      {
        _id: '9',
        name: 'Fresh Atlantic Salmon',
        category: 'Seafood',
        imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600&h=400&fit=crop&crop=center',
        description: 'Wild-caught Atlantic salmon, rich in omega-3 fatty acids and perfect for grilling.',
        rating: 4.9,
        reviews: 67,
        expiryDate: '2025-08-10',
        price: '$28.99',
        discount: null
      },
      {
        _id: '10',
        name: 'Aged Cheddar Cheese',
        category: 'Dairy',
        imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop&crop=center',
        description: 'Premium aged cheddar cheese with rich, complex flavors developed over months.',
        rating: 4.5,
        reviews: 98,
        expiryDate: '2025-09-20',
        price: '$14.99',
        discount: '25% OFF'
      },
      {
        _id: '11',
        name: 'Honey Wheat Bread',
        category: 'Bakery',
        imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&crop=center',
        description: 'Soft and sweet honey wheat bread, perfect for sandwiches and toast.',
        rating: 4.4,
        reviews: 234,
        expiryDate: '2025-08-12',
        price: '$4.99',
        discount: null
      },
      {
        _id: '12',
        name: 'Mixed Berry Medley',
        category: 'Fruits',
        imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=400&fit=crop&crop=center',
        description: 'A delicious mix of fresh strawberries, blueberries, and raspberries.',
        rating: 4.6,
        reviews: 145,
        expiryDate: '2025-08-14',
        price: '$11.99',
        discount: '10% OFF'
      }
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          comparison = priceA - priceB;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'expiry':
          const expiryA = new Date(a.expiryDate);
          const expiryB = new Date(b.expiryDate);
          comparison = expiryA - expiryB;
          break;
        default:
          return 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy, sortOrder]);

  const categories = ['all', 'Vegetables', 'Dairy', 'Bakery', 'Fruits', 'Meat', 'Seafood', 'Spices', 'Poultry', 'Grains'];

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-xl text-gray-600">
            Explore our complete collection of fresh, high-quality food products
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
                <option value="expiry">Sort by Expiry Date</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#124A2F] focus:border-transparent"
              >
                <option value="asc">
                  {sortBy === 'price' ? 'Low to High' :
                   sortBy === 'rating' ? 'Low to High' :
                   sortBy === 'expiry' ? 'Nearest First' : 'A to Z'}
                </option>
                <option value="desc">
                  {sortBy === 'price' ? 'High to Low' :
                   sortBy === 'rating' ? 'High to Low' :
                   sortBy === 'expiry' ? 'Farthest First' : 'Z to A'}
                </option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#124A2F] text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#124A2F] text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const daysLeft = getDaysUntilExpiry(product.expiryDate);
              return (
                <div
                  key={product._id}
                  className="product-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {product.discount}
                      </div>
                    )}
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block px-2 py-1 bg-green-100 text-[#124A2F] text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                      <span className="text-lg font-bold text-[#124A2F]">
                        {product.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center mb-4">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className={`text-sm ${
                        daysLeft <= 3 ? 'text-red-500 font-medium' :
                        daysLeft <= 7 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to={`/product/${product._id}`}
                        className="block w-full bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const daysLeft = getDaysUntilExpiry(product.expiryDate);
              return (
                <div key={product._id} className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-6 hover:shadow-md transition-shadow">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            {renderStars(product.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            Category: {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#124A2F] mb-2">{product.price}</div>
                        <Link
                          to={`/food/${product._id}`}
                          className="bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
