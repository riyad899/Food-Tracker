import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, ChefHat, Home, Refrigerator, Plus, Package, LogOut, Menu, X } from 'lucide-react';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsMobileMenuOpen(false);
    setShowUserTooltip(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // NavItem component for consistent styling
  const NavItem = ({ icon: Icon, text, onClick, to, className = "" }) => (
    <Link
      to={to || '#'}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 ${className}`}
    >
      <Icon size={20} />
      <span className="font-medium">{text}</span>
    </Link>
  );

  // Navigation items for logged out state
  const beforeLoginItems = [
    { icon: Home, text: "Home", to: "/" },
    { icon: Refrigerator, text: "Fridge", to: "/fridge" },
    {
      icon: User,
      text: "Login",
      to: "/login",
      className: "text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
    },
    {
      icon: User,
      text: "Register",
      to: "/register",
      className: "bg-green-600 text-white hover:bg-green-700"
    }
  ];

  // Navigation items for logged in state
  const afterLoginItems = [
    { icon: Home, text: "Home", to: "/" },
    { icon: Refrigerator, text: "Fridge", to: "/fridge" },
    { icon: Plus, text: "Add Food", to: "/add-food" },
    { icon: Package, text: "My Items", to: "/my-items" }
  ];

  const currentItems = user ? afterLoginItems : beforeLoginItems;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                <ChefHat className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-gray-800">FoodTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {currentItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                text={item.text}
                to={item.to}
                onClick={item.onClick}
                className={item.className}
              />
            ))}

            {/* User Avatar and Logout (After Login) */}
            {user && (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <div
                  className="relative"
                  onMouseEnter={() => setShowUserTooltip(true)}
                  onMouseLeave={() => setShowUserTooltip(false)}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full border-2 border-green-200 hover:border-green-400 transition-all duration-200 cursor-pointer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center">
                      <User className="text-green-600" size={20} />
                    </div>
                  )}
                  {showUserTooltip && (
                    <div className="absolute top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-50">
                      {user.email || user.displayName}
                      <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {currentItems.map((item, index) => (
                <NavItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  to={item.to}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={item.className}
                />
              ))}

              {/* Mobile User Section (After Login) */}
              {user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full border-2 border-green-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center">
                        <User className="text-green-600" size={16} />
                      </div>
                    )}
                    <span className="text-gray-700 font-medium">{user.email || user.displayName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-left rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
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