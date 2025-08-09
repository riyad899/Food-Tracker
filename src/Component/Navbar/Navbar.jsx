import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ChefHat, Home, Refrigerator, Plus, Package, LogOut, Menu, X, Archive, Grid3X3 } from 'lucide-react';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsMobileMenuOpen(false);
    setShowUserTooltip(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.photoURL]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to scroll to Food Inventory section
  const scrollToFoodInventory = () => {
    // If we're already on the home page, just scroll
    if (location.pathname === '/') {
      const inventorySection = document.getElementById('food-inventory');
      if (inventorySection) {
        inventorySection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      // Use setTimeout to ensure the page has loaded before scrolling
      setTimeout(() => {
        const inventorySection = document.getElementById('food-inventory');
        if (inventorySection) {
          inventorySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  // NavItem component for consistent styling
  const NavItem = ({ icon: Icon, text, onClick, to, className = "" }) => (
    <Link
      to={to || '#'}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#124A2F] hover:bg-green-50 transition-all duration-200 ${className}`}
    >
      <Icon size={20} />
      <span className="font-medium">{text}</span>
    </Link>
  );

  // Navigation items for logged out state (6 routes)
  const beforeLoginItems = [
    { icon: Home, text: "Home", to: "/" },
    { icon: Grid3X3, text: "All Products", to: "/products" },
    { icon: Refrigerator, text: "Fridge", to: "/fridge" },
    {
      icon: Archive,
      text: "Food Inventory",
      onClick: scrollToFoodInventory,
      isScroll: true
    },
    {
      icon: User,
      text: "Login",
      to: "/login",
      className: isDark
        ? "text-gray-300 border border-gray-400 hover:bg-gray-700 hover:text-green-400 hover:border-green-400"
        : "text-white border border-white hover:bg-white hover:text-[#124A2F]"
    },
    {
      icon: User,
      text: "Register",
      to: "/register",
     className: isDark
        ? "text-gray-300 border border-gray-400 hover:bg-gray-700 hover:text-green-400 hover:border-green-400"
        : "text-white border border-white hover:bg-white hover:text-[#124A2F]"
    }
  ];

  // Navigation items for logged in state (5 routes - Food Inventory removed)
  const afterLoginItems = [
    { icon: Home, text: "Home", to: "/" },
    { icon: Grid3X3, text: "All Products", to: "/products" },
    { icon: Refrigerator, text: "Fridge", to: "/fridge" },
    { icon: Plus, text: "Add Food", to: "/add-food" },
    { icon: Package, text: "My Items", to: "/my-items" }
  ];

  const currentItems = user ? afterLoginItems : beforeLoginItems;

  return (
    <nav className={`
      ${isDark
        ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border-b border-gray-700'
        : 'bg-gradient-to-r from-[#124A2F] to-[#0D3521] shadow-lg border-b border-gray-200'
      }
      sticky top-0 z-50 w-full transition-all duration-300
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className={`
                ${isDark ? 'bg-gray-700' : 'bg-white'}
                p-2 rounded-lg shadow-sm
              `}>
                <ChefHat className={`
                  ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                `} size={24} />
              </div>
              <span className={`
                text-xl font-bold
                ${isDark ? 'text-gray-100' : 'text-white'}
              `}>FoodTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {currentItems.map((item, index) => (
              item.isScroll ? (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    ${isDark
                      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700'
                      : 'text-white hover:text-gray-200 hover:bg-white/10'
                    }
                    transition-all duration-200 ${item.className || ''}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.text}</span>
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.to || '#'}
                  onClick={item.onClick}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    ${isDark
                      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700'
                      : 'text-white hover:text-gray-200 hover:bg-white/10'
                    }
                    transition-all duration-200 ${item.className || ''}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.text}</span>
                </Link>
              )
            ))}

            {/* Theme Toggle */}
            <ThemeToggle className="ml-2" />

            {/* User Avatar and Logout (After Login) */}
            {user && (
              <div className={`
                flex items-center space-x-3 ml-4 pl-4 border-l
                ${isDark ? 'border-gray-600' : 'border-gray-300'}
              `}>
                <div
                  className="relative"
                  onMouseEnter={() => setShowUserTooltip(true)}
                  onMouseLeave={() => setShowUserTooltip(false)}
                >
                  {user.photoURL && !imageError ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className={`
                        w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer object-cover
                        ${isDark
                          ? 'border-gray-400 hover:border-green-400'
                          : 'border-white hover:border-gray-200'
                        }
                      `}
                      onError={handleImageError}
                      onLoad={() => setImageError(false)}
                    />
                  ) : (
                    <div className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer
                      transition-all duration-200
                      ${isDark
                        ? 'bg-gray-700 border-gray-400 hover:border-green-400'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                      }
                    `}>
                      <User className={`
                        ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                      `} size={20} />
                    </div>
                  )}
                  {showUserTooltip && (
                    <div className={`
                      absolute top-12 right-0 px-3 py-1 rounded-lg text-sm whitespace-nowrap z-50
                      ${isDark
                        ? 'bg-gray-700 text-gray-200'
                        : 'bg-gray-800 text-white'
                      }
                    `}>
                      {user.email || user.displayName}
                      <div className={`
                        absolute -top-1 right-4 w-2 h-2 transform rotate-45
                        ${isDark ? 'bg-gray-700' : 'bg-gray-800'}
                      `}></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                    ${isDark
                      ? 'text-red-300 hover:text-white hover:bg-red-600'
                      : 'text-red-200 hover:text-white hover:bg-red-600'
                    }
                  `}
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <ThemeToggle />

            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`
            md:hidden border-t py-4
            ${isDark ? 'border-gray-600' : 'border-white/20'}
          `}>
            <div className="flex flex-col space-y-2">
              {currentItems.map((item, index) => (
                item.isScroll ? (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200
                      ${isDark
                        ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700'
                        : 'text-white hover:text-gray-200 hover:bg-white/10'
                      }
                      ${item.className || ''}
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.text}</span>
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.to || '#'}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200
                      ${isDark
                        ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700'
                        : 'text-white hover:text-gray-200 hover:bg-white/10'
                      }
                      ${item.className || ''}
                    `}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.text}</span>
                  </Link>
                )
              ))}

              {/* Mobile User Section (After Login) */}
              {user && (
                <div className={`
                  border-t pt-4 mt-4
                  ${isDark ? 'border-gray-600' : 'border-white/20'}
                `}>
                  <div className="flex items-center space-x-3 px-4 py-2">
                    {user.photoURL && !imageError ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className={`
                          w-8 h-8 rounded-full border-2 object-cover
                          ${isDark ? 'border-gray-400' : 'border-white'}
                        `}
                        onError={handleImageError}
                      />
                    ) : (
                      <div className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center
                        ${isDark
                          ? 'bg-gray-700 border-gray-400'
                          : 'bg-white border-gray-200'
                        }
                      `}>
                        <User className={`
                          ${isDark ? 'text-green-400' : 'text-[#124A2F]'}
                        `} size={16} />
                      </div>
                    )}
                    <span className={`
                      font-medium
                      ${isDark ? 'text-gray-200' : 'text-white'}
                    `}>{user.email || user.displayName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`
                      flex items-center space-x-2 px-4 py-2 w-full text-left rounded-lg
                      transition-all duration-200
                      ${isDark
                        ? 'text-red-300 hover:text-white hover:bg-red-600'
                        : 'text-red-200 hover:text-white hover:bg-red-600'
                      }
                    `}
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;