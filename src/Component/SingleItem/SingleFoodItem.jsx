import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Calendar, Package, User, Edit, Trash2, Heart, Share2, ShoppingCart, ChevronLeft, Tag, Info, CheckCircle } from 'lucide-react';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';

const SingleFoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Mock data generators for enhanced product information
  const generateNutritionalInfo = (foodName, category) => {
    const nutritionData = {
      'Vegetables': { calories: 25, protein: 3, carbs: 5, fat: 0.3, fiber: 3, sugar: 4 },
      'Fruits': { calories: 52, protein: 1, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10 },
      'Dairy': { calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 0, sugar: 12 },
      'Meat': { calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sugar: 0 },
      'Bakery': { calories: 265, protein: 9, carbs: 49, fat: 4, fiber: 2, sugar: 5 },
      'Seafood': { calories: 206, protein: 22, carbs: 0, fat: 12, fiber: 0, sugar: 0 },
      'Grains': { calories: 120, protein: 4, carbs: 22, fat: 1, fiber: 2, sugar: 1 },
      'Spices': { calories: 5, protein: 0.2, carbs: 1, fat: 0.1, fiber: 0.6, sugar: 0.1 }
    };
    return nutritionData[category] || nutritionData['Vegetables'];
  };

  const generateProductDetails = (foodName, category) => {
    const origins = ['Local Farm', 'Organic Valley', 'Sunshine Gardens', 'Fresh Fields Co.', 'Green Harvest'];
    const certifications = ['Organic', 'Non-GMO', 'Fair Trade', 'Locally Sourced', 'Pesticide Free'];
    const storageInstructions = {
      'Vegetables': 'Store in refrigerator crisper drawer. Keep in original packaging or breathable bag.',
      'Fruits': 'Store at room temperature until ripe, then refrigerate. Wash before eating.',
      'Dairy': 'Keep refrigerated at 40°F or below. Use within expiration date.',
      'Meat': 'Keep frozen until ready to use. Thaw in refrigerator before cooking.',
      'Bakery': 'Store in cool, dry place. Freeze for longer storage.',
      'Seafood': 'Keep frozen until ready to cook. Thaw in refrigerator.',
      'Grains': 'Store in airtight container in cool, dry place.',
      'Spices': 'Store in airtight container away from light and heat.'
    };

    return {
      origin: origins[Math.floor(Math.random() * origins.length)],
      certifications: [certifications[Math.floor(Math.random() * certifications.length)]],
      storageInstructions: storageInstructions[category] || storageInstructions['Vegetables'],
      shelfLife: Math.floor(Math.random() * 14) + 1 + ' days',
      weight: (Math.random() * 2 + 0.5).toFixed(1) + ' lbs',
      brand: 'Fresh Choice',
      sku: 'FC' + Math.random().toString(36).substr(2, 6).toUpperCase()
    };
  };

  const generateRelatedProducts = () => {
    const relatedItems = [
      {
        _id: '1',
        name: 'Fresh Spinach',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
        price: '$3.99',
        rating: 4.5
      },
      {
        _id: '2',
        name: 'Organic Carrots',
        imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=200&fit=crop',
        price: '$2.99',
        rating: 4.7
      },
      {
        _id: '3',
        name: 'Fresh Broccoli',
        imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=200&fit=crop',
        price: '$4.49',
        rating: 4.6
      },
      {
        _id: '4',
        name: 'Bell Peppers',
        imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop',
        price: '$5.99',
        rating: 4.4
      }
    ];
    // Filter out the current product from related items
    return relatedItems.filter(item => item._id !== id);
  };

  const generateRandomDescription = (foodName, category) => {
    const descriptions = [
      `Fresh ${foodName.toLowerCase()} sourced from local organic farms. Rich in essential vitamins and minerals, perfect for maintaining a healthy diet. This premium quality ${category?.toLowerCase() || 'food'} has been carefully selected for its exceptional taste and nutritional value. Store in a cool, dry place for optimal freshness. Great for cooking, snacking, or meal preparation. Packed with natural flavors and beneficial nutrients that support overall wellness.`,
      `High-quality ${foodName.toLowerCase()} with excellent texture and flavor profile. This ${category?.toLowerCase() || 'item'} is known for its superior taste and nutritional benefits. Carefully harvested and processed to maintain maximum freshness and quality. Perfect for various culinary applications including cooking, baking, or direct consumption. Contains essential nutrients that contribute to a balanced diet and healthy lifestyle.`,
      `Premium ${foodName.toLowerCase()} featuring exceptional quality and taste. This ${category?.toLowerCase() || 'product'} has been selected for its outstanding characteristics and nutritional profile. Rich in vitamins, minerals, and other beneficial compounds. Ideal for health-conscious consumers seeking natural, wholesome food options. Best enjoyed fresh and can be incorporated into various recipes and meal plans.`,
      `Delicious ${foodName.toLowerCase()} with vibrant color and excellent nutritional content. This top-grade ${category?.toLowerCase() || 'food item'} offers a perfect balance of taste and health benefits. Sourced from trusted suppliers who maintain strict quality standards. Perfect for everyday consumption and special occasions alike. Contains natural antioxidants and essential nutrients for optimal health.`,
      `Fresh, crisp ${foodName.toLowerCase()} packed with natural goodness and flavor. This premium ${category?.toLowerCase() || 'ingredient'} is perfect for creating nutritious and delicious meals. Carefully stored to preserve its natural taste and nutritional value. Great source of vitamins and minerals essential for maintaining good health. Versatile ingredient suitable for various cooking methods and dietary preferences.`
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const generateRandomUser = () => {
    const users = [
      'sarah.johnson@gmail.com',
      'mike.wilson@outlook.com',
      'emma.davis@yahoo.com',
      'john.smith@gmail.com',
      'lisa.brown@hotmail.com',
      'david.miller@gmail.com',
      'jennifer.garcia@outlook.com',
      'robert.martinez@yahoo.com',
      'amanda.taylor@gmail.com',
      'chris.anderson@hotmail.com'
    ];
    return users[Math.floor(Math.random() * users.length)];
  };

  const generateRandomDate = () => {
    const start = new Date(2024, 0, 1); // January 1, 2024
    const end = new Date(); // Today
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString();
  };

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        // Define all mock products (including the ones from ProductsPage and FridgePage)
        const allMockProducts = {
          // Products from ProductsPage
          '1': {
            _id: '1',
            name: 'Organic Fresh Vegetables',
            category: 'Vegetables',
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop&crop=center',
            description: 'Fresh organic vegetables packed with nutrients and flavor, perfect for healthy meals. Sourced directly from local organic farms that practice sustainable agriculture. These vegetables are harvested at peak freshness to ensure maximum nutritional value and exceptional taste. Perfect for salads, cooking, or meal preparation.',
            rating: 4.8,
            reviews: 124,
            expiryDate: '2025-08-15',
            price: '$12.99',
            discount: '20% OFF',
            userEmail: 'freshfarms@organic.com',
            quantity: '2 lbs',
            unit: 'bundle'
          },
          '2': {
            _id: '2',
            name: 'Premium Dairy Products',
            category: 'Dairy',
            imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=400&fit=crop&crop=center',
            description: 'High-quality dairy products from local farms, ensuring freshness and taste. Our dairy products come from grass-fed cows that graze on natural pastures. Rich in calcium, protein, and essential vitamins for a healthy lifestyle. Perfect for breakfast, cooking, or as a nutritious snack.',
            rating: 4.9,
            reviews: 89,
            expiryDate: '2025-08-12',
            price: '$8.49',
            discount: null,
            userEmail: 'dairyvalley@farms.com',
            quantity: '1 gallon',
            unit: 'container'
          },
          '3': {
            _id: '3',
            name: 'Artisan Bread Selection',
            category: 'Bakery',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center',
            description: 'Freshly baked artisan breads made with premium ingredients and traditional methods. Our master bakers use time-honored techniques and the finest flours to create these exceptional breads. Each loaf is hand-crafted with attention to detail, resulting in perfect texture and rich, complex flavors.',
            rating: 4.7,
            reviews: 156,
            expiryDate: '2025-08-11',
            price: '$6.99',
            discount: '15% OFF',
            userEmail: 'artisanbread@bakery.com',
            quantity: '1 loaf',
            unit: 'piece'
          },
          '4': {
            _id: '4',
            name: 'Fresh Seasonal Fruits',
            category: 'Fruits',
            imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop&crop=center',
            description: 'Hand-picked seasonal fruits at peak ripeness, bursting with natural sweetness. Our fruits are carefully selected from the best orchards and farms, ensuring optimal flavor and nutritional content. Rich in vitamins, antioxidants, and natural fiber for a healthy diet.',
            rating: 4.6,
            reviews: 203,
            expiryDate: '2025-08-13',
            price: '$15.99',
            discount: null,
            userEmail: 'seasonalfruits@orchard.com',
            quantity: '3 lbs',
            unit: 'mix'
          },
          '5': {
            _id: '5',
            name: 'Gourmet Meat Selection',
            category: 'Meat',
            imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop&crop=center',
            description: 'Premium cuts of meat from grass-fed animals, perfect for special occasions. Our meat comes from animals raised in humane conditions with natural diets. Each cut is carefully selected and aged to perfection, ensuring tender texture and rich, savory flavors.',
            rating: 4.9,
            reviews: 78,
            expiryDate: '2025-08-14',
            price: '$24.99',
            discount: '10% OFF',
            userEmail: 'gourmetmeat@ranch.com',
            quantity: '2 lbs',
            unit: 'cut'
          },
          '6': {
            _id: '6',
            name: 'Exotic Spice Collection',
            category: 'Spices',
            imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&crop=center',
            description: 'Authentic spices from around the world to elevate your cooking experience. Our spice collection features rare and premium spices sourced directly from their countries of origin. Each spice is carefully dried and processed to preserve maximum flavor and aroma.',
            rating: 4.8,
            reviews: 92,
            expiryDate: '2025-12-31',
            price: '$18.99',
            discount: null,
            userEmail: 'exoticspices@global.com',
            quantity: '8 oz',
            unit: 'collection'
          },
          '7': {
            _id: '7',
            name: 'Farm Fresh Chicken',
            category: 'Poultry',
            imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop&crop=center',
            description: 'Free-range chicken from local farms, rich in protein and flavor.',
            rating: 4.7,
            reviews: 156,
            expiryDate: '2025-08-16',
            price: '$16.99',
            discount: null,
            userEmail: 'farmfresh@poultry.com',
            quantity: '2 lbs',
            unit: 'piece'
          },
          '8': {
            _id: '8',
            name: 'Organic Quinoa',
            category: 'Grains',
            imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e30c?w=600&h=400&fit=crop&crop=center',
            description: 'Superfood quinoa packed with complete proteins and essential amino acids.',
            rating: 4.8,
            reviews: 134,
            expiryDate: '2025-12-15',
            price: '$9.99',
            discount: '5% OFF',
            userEmail: 'organic@grains.com',
            quantity: '1 lb',
            unit: 'bag'
          },
          '9': {
            _id: '9',
            name: 'Fresh Atlantic Salmon',
            category: 'Seafood',
            imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600&h=400&fit=crop&crop=center',
            description: 'Wild-caught Atlantic salmon, rich in omega-3 fatty acids and perfect for grilling.',
            rating: 4.9,
            reviews: 67,
            expiryDate: '2025-08-10',
            price: '$28.99',
            discount: null,
            userEmail: 'oceanic@seafood.com',
            quantity: '1.5 lbs',
            unit: 'fillet'
          },
          '10': {
            _id: '10',
            name: 'Aged Cheddar Cheese',
            category: 'Dairy',
            imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop&crop=center',
            description: 'Premium aged cheddar cheese with rich, complex flavors developed over months.',
            rating: 4.5,
            reviews: 98,
            expiryDate: '2025-09-20',
            price: '$14.99',
            discount: '25% OFF',
            userEmail: 'artisan@cheese.com',
            quantity: '8 oz',
            unit: 'block'
          },
          '11': {
            _id: '11',
            name: 'Honey Wheat Bread',
            category: 'Bakery',
            imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop&crop=center',
            description: 'Soft and sweet honey wheat bread, perfect for sandwiches and toast.',
            rating: 4.4,
            reviews: 234,
            expiryDate: '2025-08-12',
            price: '$4.99',
            discount: null,
            userEmail: 'honey@bakery.com',
            quantity: '1 loaf',
            unit: 'piece'
          },
          '12': {
            _id: '12',
            name: 'Mixed Berry Medley',
            category: 'Fruits',
            imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=400&fit=crop&crop=center',
            description: 'A delicious mix of fresh strawberries, blueberries, and raspberries.',
            rating: 4.6,
            reviews: 145,
            expiryDate: '2025-08-14',
            price: '$11.99',
            discount: '10% OFF',
            userEmail: 'mixed@berries.com',
            quantity: '1 lb',
            unit: 'container'
          },
          // Items from FridgePage
          'dummy1': {
            _id: 'dummy1',
            name: 'Fresh Organic Apples',
            category: 'Fruits',
            imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=400&fit=crop&crop=center',
            description: 'Crisp and sweet organic apples from local orchards. These premium apples are handpicked at peak ripeness to ensure the best flavor and texture. Rich in fiber, vitamin C, and antioxidants, they make a perfect healthy snack or ingredient for your favorite recipes.',
            rating: 4.6,
            reviews: 89,
            expiryDate: '2025-08-15',
            price: '$4.99',
            discount: null,
            userEmail: 'orchard@apples.com',
            quantity: '2 kg',
            unit: 'bag',
            addedDate: '2025-08-01'
          },
          'dummy2': {
            _id: 'dummy2',
            name: 'Greek Yogurt',
            category: 'Dairy',
            imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2021/10/fruit-berries-yogurt-732x549-thumbnail-732x549.jpg',
            description: 'Creamy protein-rich Greek yogurt perfect for breakfast. Made from the finest milk and using traditional Greek methods, this yogurt is thick, creamy, and packed with probiotics for digestive health. Great on its own or with fruits and granola.',
            rating: 4.8,
            reviews: 156,
            expiryDate: '2025-08-12',
            price: '$5.99',
            discount: '15% OFF',
            userEmail: 'greek@dairy.com',
            quantity: '500g',
            unit: 'container',
            addedDate: '2025-08-05'
          },
          'dummy3': {
            _id: 'dummy3',
            name: 'Whole Grain Bread',
            category: 'Bakery',
            imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&crop=center',
            description: 'Freshly baked whole grain bread with seeds. Made with a blend of whole wheat flour, oats, and various seeds for a nutritious and delicious bread. Perfect for sandwiches, toast, or enjoying with your favorite spreads.',
            rating: 4.5,
            reviews: 203,
            expiryDate: '2025-08-11',
            price: '$3.99',
            discount: null,
            userEmail: 'wholegrain@bakery.com',
            quantity: '1 loaf',
            unit: 'piece',
            addedDate: '2025-08-07'
          },
          'dummy4': {
            _id: 'dummy4',
            name: 'Fresh Salmon Fillet',
            category: 'Seafood',
            imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=center',
            description: 'Premium wild-caught salmon rich in omega-3 fatty acids. This fresh Atlantic salmon is perfect for grilling, baking, or pan-searing. Rich in protein and healthy fats, it makes for a nutritious and delicious meal.',
            rating: 4.9,
            reviews: 78,
            expiryDate: '2025-08-10',
            price: '$18.99',
            discount: '10% OFF',
            userEmail: 'fresh@seafood.com',
            quantity: '800g',
            unit: 'fillet',
            addedDate: '2025-08-08'
          },
          'dummy5': {
            _id: 'dummy5',
            name: 'Organic Baby Spinach',
            category: 'Vegetables',
            imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop&crop=center',
            description: 'Fresh organic baby spinach leaves perfect for salads and cooking. These tender young spinach leaves are packed with iron, vitamins, and minerals. Great for smoothies, salads, or sautéing as a side dish.',
            rating: 4.4,
            reviews: 134,
            expiryDate: '2025-08-13',
            price: '$2.99',
            discount: null,
            userEmail: 'organic@greens.com',
            quantity: '200g',
            unit: 'bag',
            addedDate: '2025-08-06'
          },
          'dummy6': {
            _id: 'dummy6',
            name: 'Free Range Eggs',
            category: 'Dairy',
            imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=400&fit=crop&crop=center',
            description: 'Farm fresh free-range eggs from happy chickens. These eggs come from chickens that roam freely on pasture, resulting in richer flavor and better nutrition. Perfect for breakfast, baking, or any recipe calling for eggs.',
            rating: 4.7,
            reviews: 112,
            expiryDate: '2025-08-20',
            price: '$6.99',
            discount: null,
            userEmail: 'freerange@farm.com',
            quantity: '12 pieces',
            unit: 'dozen',
            addedDate: '2025-08-04'
          },
          'dummy7': {
            _id: 'dummy7',
            name: 'Aged Cheddar Cheese',
            category: 'Dairy',
            imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=400&fit=crop&crop=center',
            description: 'Sharp aged cheddar cheese with rich flavor. This premium cheddar has been aged to perfection, developing a complex, sharp flavor that cheese lovers crave. Perfect for snacking, cooking, or adding to your favorite dishes.',
            rating: 4.8,
            reviews: 167,
            expiryDate: '2025-09-01',
            price: '$12.99',
            discount: '20% OFF',
            userEmail: 'aged@cheese.com',
            quantity: '300g',
            unit: 'block',
            addedDate: '2025-08-03'
          },
          'dummy8': {
            _id: 'dummy8',
            name: 'Ripe Bananas',
            category: 'Fruits',
            imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=400&fit=crop&crop=center',
            description: 'Sweet ripe bananas perfect for smoothies and baking. These naturally sweet bananas are at the perfect ripeness for eating fresh or using in your favorite recipes. Rich in potassium and natural energy.',
            rating: 4.3,
            reviews: 245,
            expiryDate: '2025-08-09',
            price: '$2.49',
            discount: null,
            userEmail: 'tropical@fruits.com',
            quantity: '6 pieces',
            unit: 'bunch',
            addedDate: '2025-08-07'
          }
        };

        const foundItem = allMockProducts[id];
        if (!foundItem) {
          throw new Error('Product not found');
        }

        // Enhance the item with additional data
        const enhancedItem = {
          ...foundItem,
          nutrition: generateNutritionalInfo(foundItem.name, foundItem.category),
          productDetails: generateProductDetails(foundItem.name, foundItem.category),
          createdAt: generateRandomDate()
        };

        setFoodItem(enhancedItem);
        setNotesList(enhancedItem.notes || []);
        setRelatedProducts(generateRelatedProducts());
        setLoading(false);
      } catch (err) {
        // Fallback: try to fetch from API
        try {
          const response = await fetch(`https://server-sepia-nine.vercel.app/food`);
          if (!response.ok) {
            throw new Error('Failed to fetch food items from API');
          }
          const data = await response.json();
          const foodItems = data.data || data;
          const foundItem = foodItems.find(item => item._id === id);

          if (!foundItem) {
            throw new Error('Food item not found');
          }

          // Enhance the food item with random data for missing fields
          const enhancedItem = {
            ...foundItem,
            description: foundItem.description || generateRandomDescription(foundItem.name, foundItem.category),
            userEmail: foundItem.userEmail || generateRandomUser(),
            createdAt: foundItem.createdAt || generateRandomDate(),
            nutrition: generateNutritionalInfo(foundItem.name, foundItem.category),
            productDetails: generateProductDetails(foundItem.name, foundItem.category),
            rating: foundItem.rating || (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: foundItem.reviews || Math.floor(Math.random() * 200) + 10,
            price: foundItem.price || `$${(Math.random() * 20 + 5).toFixed(2)}`,
            discount: foundItem.discount || (Math.random() > 0.7 ? `${Math.floor(Math.random() * 30) + 5}% OFF` : null)
          };

          setFoodItem(enhancedItem);
          setNotesList(enhancedItem.notes || []);
          setRelatedProducts(generateRelatedProducts());
          setLoading(false);
        } catch (apiErr) {
          setError(apiErr.message);
          setLoading(false);
        }
      }
    };

    fetchFoodItem();
  }, [id]);

  const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) return { expired: false };

    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry - now;

    if (difference <= 0) {
      return { expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    return {
      days,
      hours,
      minutes,
      expired: false
    };
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    setIsInCart(!isInCart);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: foodItem.name,
        text: foodItem.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;

    try {
      const newNote = {
        text: note,
        postedBy: user?.email || user?.uid || 'Anonymous',
        postedDate: new Date().toISOString()
      };

      // For now, we'll update the local state since the API structure might be different
      // You might need to adjust this based on your backend API for notes
      const response = await fetch(`https://server-sepia-nine.vercel.app/food/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const updatedFood = await response.json();
        setNotesList(updatedFood.notes);
      } else {
        // If the notes API doesn't exist, just update local state
        setNotesList(prev => [...prev, newNote]);
      }
      setNote('');
    } catch (err) {
      // Fallback: just update local state if API call fails
      const newNote = {
        text: note,
        postedBy: user?.email || user?.uid || 'Anonymous',
        postedDate: new Date().toISOString()
      };
      setNotesList(prev => [...prev, newNote]);
      setNote('');
    }
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

  if (!foodItem) return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Warning: </strong>
      <span className="block sm:inline">Food item not found</span>
    </div>
  );

  const timeLeft = calculateTimeLeft(foodItem.expiryDate);
  const isOwner = foodItem.userId && user && foodItem.userId === user.uid;
  const currentUserId = user?.uid;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-gray-400" />
            <Link to="/fridge" className="text-blue-600 hover:text-blue-800 transition-colors">My Fridge</Link>
            <ChevronLeft className="w-4 h-4 rotate-180 text-gray-400" />
            <span className="text-gray-600 truncate max-w-xs">{foodItem.name}</span>
          </div>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-2 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Fridge</span>
          </button>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="lg:flex">
            {/* Product Image */}
            <div className="lg:w-1/2 relative">
              <img
                src={foodItem.imageUrl || '/default-food-image.jpg'}
                alt={foodItem.name}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-food-image.jpg';
                }}
              />
              {foodItem.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-semibold">
                  {foodItem.discount}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {foodItem.category || 'General'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{foodItem.name}</h1>

              {/* Rating and Reviews */}
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(foodItem.rating)}
                </div>
                <span className="ml-2 text-lg text-gray-600">
                  {foodItem.rating} ({foodItem.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">{foodItem.price}</span>
              </div>

              {/* Expiry Status */}
              <div className="mb-6">
                {timeLeft.expired ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="bg-red-100 text-red-800 text-lg px-4 py-2 rounded-full font-medium">
                        Expired
                      </span>
                    </div>
                    <p className="text-red-700 text-sm">
                      This item has expired. Please dispose of it safely to avoid health risks.
                    </p>
                  </div>
                ) : (
                  <div className={`border rounded-lg p-4 ${
                    timeLeft.days <= 2 ? 'bg-yellow-50 border-yellow-200' :
                    timeLeft.days <= 5 ? 'bg-orange-50 border-orange-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className={`w-5 h-5 ${
                        timeLeft.days <= 2 ? 'text-yellow-500' :
                        timeLeft.days <= 5 ? 'text-orange-500' :
                        'text-green-500'
                      }`} />
                      <div className={`text-lg px-4 py-2 rounded-full font-medium ${
                        timeLeft.days <= 2 ? 'bg-yellow-100 text-yellow-800' :
                        timeLeft.days <= 5 ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {foodItem.expiryDate ? `Expires in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m` : 'No expiry date set'}
                      </div>
                    </div>
                    {timeLeft.days <= 5 && (
                      <p className={`text-sm ${
                        timeLeft.days <= 2 ? 'text-yellow-700' : 'text-orange-700'
                      }`}>
                        {timeLeft.days <= 2 ?
                          'Use this item soon! Consider consuming it today or tomorrow.' :
                          'This item will expire soon. Plan to use it within the next few days.'
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Qty: {foodItem.quantity || '1'} {foodItem.unit || 'piece'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{foodItem.productDetails?.origin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{new Date(foodItem.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">{foodItem.userEmail}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => alert('Mark as consumed feature coming soon!')}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Consumed</span>
                  </button>
                  <button
                    onClick={() => alert('Move to shopping list feature coming soon!')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Shopping List</span>
                  </button>
                  <button
                    onClick={() => alert('Set reminder feature coming soon!')}
                    className="flex items-center space-x-1 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>

              {/* Quantity Selector and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{selectedQuantity}</span>
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isInCart
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
                </button>
              </div>

              {/* Action Buttons for Owner */}
              {isOwner && (
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium">
                    <Edit className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium">
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button className="py-4 border-b-2 border-blue-500 text-blue-600 font-medium">
                Description
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Nutrition Facts
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Product Details
              </button>
              <button className="py-4 text-gray-500 hover:text-gray-700">
                Storage & Care
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{foodItem.description}</p>
            </div>

            {/* Nutrition Facts */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Nutrition Facts (per 100g)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{foodItem.nutrition?.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{foodItem.nutrition?.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{foodItem.nutrition?.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{foodItem.nutrition?.fat}g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{foodItem.nutrition?.fiber}g</div>
                  <div className="text-sm text-gray-600">Fiber</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-pink-600">{foodItem.nutrition?.sugar}g</div>
                  <div className="text-sm text-gray-600">Sugar</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Brand:</span>
                    <span className="text-gray-900">{foodItem.productDetails?.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">SKU:</span>
                    <span className="text-gray-900">{foodItem.productDetails?.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Weight:</span>
                    <span className="text-gray-900">{foodItem.productDetails?.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Shelf Life:</span>
                    <span className="text-gray-900">{foodItem.productDetails?.shelfLife}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600">Origin:</span>
                    <span className="ml-2 text-gray-900">{foodItem.productDetails?.origin}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Certifications:</span>
                    <div className="mt-1">
                      {foodItem.productDetails?.certifications?.map((cert, index) => (
                        <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Instructions */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Storage & Care Instructions</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">{foodItem.productDetails?.storageInstructions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Suggestions */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Tag className="w-6 h-6 mr-2 text-orange-500" />
              Recipe Suggestions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: `${foodItem.name} Salad`,
                  time: '15 mins',
                  difficulty: 'Easy',
                  description: `Fresh and healthy salad featuring ${foodItem.name.toLowerCase()}`
                },
                {
                  name: `Grilled ${foodItem.name}`,
                  time: '25 mins',
                  difficulty: 'Medium',
                  description: `Perfectly grilled ${foodItem.name.toLowerCase()} with herbs and spices`
                },
                {
                  name: `${foodItem.name} Smoothie`,
                  time: '5 mins',
                  difficulty: 'Easy',
                  description: `Nutritious smoothie with ${foodItem.name.toLowerCase()} and other ingredients`
                }
              ].map((recipe, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      {recipe.time}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <Info className="w-6 h-6 mr-2 text-blue-500" />
              Item Notes & Observations
            </h2>
            {notesList.length > 0 ? (
              <div className="space-y-6">
                {notesList.map((noteItem, index) => (
                  <div key={index} className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                    <p className="text-gray-700 mb-2 text-lg leading-relaxed">{noteItem.text}</p>
                    <p className="text-sm text-gray-500">
                      Posted by {noteItem.postedBy === (user?.email || user?.uid) ? 'You' : (noteItem.postedBy || 'Anonymous')} on {new Date(noteItem.postedDate).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No notes yet</p>
                <p className="text-gray-400 text-sm">Add notes about freshness, taste, or storage tips!</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Note Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Your Note</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your thoughts about this item's freshness, taste, or storage tips
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg resize-none"
                rows="4"
                placeholder="e.g., 'Still fresh and crispy', 'Best stored in refrigerator door', 'Great for smoothies when slightly overripe'..."
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {note.length}/500 characters
              </span>
              <button
                onClick={handleAddNote}
                disabled={!note.trim() || note.length > 500}
                className={`py-3 px-8 rounded-lg transition-colors duration-300 text-lg font-medium ${
                  note.trim() && note.length <= 500
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFoodItem;