import React from 'react';
import { Loader2, ChefHat, Package } from 'lucide-react';

const LoadingSpinner = ({
  size = 'medium',
  message = 'Loading...',
  type = 'default',
  fullscreen = false,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      spinner: 'w-4 h-4',
      container: 'py-2',
      text: 'text-sm'
    },
    medium: {
      spinner: 'w-8 h-8',
      container: 'py-4',
      text: 'text-base'
    },
    large: {
      spinner: 'w-12 h-12',
      container: 'py-8',
      text: 'text-lg'
    }
  };

  // Spinner icons based on type
  const getSpinnerIcon = () => {
    const config = sizeConfig[size];
    const iconClass = `${config.spinner} animate-spin text-green-800 dark:text-green-400`;

    switch (type) {
      case 'food':
        return <ChefHat className={iconClass} />;
      case 'products':
        return <Package className={iconClass} />;
      default:
        return <Loader2 className={iconClass} />;
    }
  };

  // Fullscreen overlay
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-strong p-8 flex flex-col items-center space-y-4 border border-gray-200 dark:border-gray-700">
          {getSpinnerIcon()}
          <p className="text-gray-700 dark:text-gray-300 font-medium text-center">
            {message}
          </p>
        </div>
      </div>
    );
  }

  // Regular spinner
  const config = sizeConfig[size];

  return (
    <div className={`flex flex-col items-center justify-center ${config.container} ${className}`}>
      <div className="flex items-center space-x-3">
        {getSpinnerIcon()}
        <span className={`text-gray-700 dark:text-gray-300 font-medium ${config.text}`}>
          {message}
        </span>
      </div>
    </div>
  );
};

// Specialized spinner components for different use cases
export const FoodLoadingSpinner = ({ message = 'Loading delicious content...', ...props }) => (
  <LoadingSpinner type="food" message={message} {...props} />
);

export const ProductsLoadingSpinner = ({ message = 'Loading products...', ...props }) => (
  <LoadingSpinner type="products" message={message} {...props} />
);

export const FullscreenLoader = ({ message = 'Please wait...', ...props }) => (
  <LoadingSpinner fullscreen message={message} {...props} />
);

// Inline loading component for small spaces
export const InlineLoader = ({ message = 'Loading...' }) => (
  <LoadingSpinner size="small" message={message} className="inline-flex" />
);

export default LoadingSpinner;
