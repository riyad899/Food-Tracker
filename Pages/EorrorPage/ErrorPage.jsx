import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ChefHat, AlertTriangle } from 'lucide-react';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-8 text-center border border-gray-200 dark:border-gray-700">

        {/* Animated Chef Hat */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ChefHat className="h-24 w-24 text-primary-600 dark:text-primary-400 animate-bounce-gentle" />
            <AlertTriangle className="h-6 w-6 text-red-500 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        {/* 404 Title */}
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          4<span className="text-primary-600 dark:text-primary-400">0</span>4
        </h1>

        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Recipe Not Found!
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Looks like this page went missing from our kitchen! 🍳
          Don't worry, our chef is cooking up something delicious for you on our main menu.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center justify-center space-x-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn-primary flex items-center justify-center space-x-2 group"
          >
            <Home size={18} className="group-hover:scale-110 transition-transform" />
            <span>Back to Kitchen</span>
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            🛍️ Products
          </button>
          <button
            onClick={() => navigate("/fridge")}
            className="p-3 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            🧊 Fridge
          </button>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Lost? Our{' '}
            <button
              onClick={() => navigate("/")}
              className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              home page
            </button>
            {' '}has everything you need!
          </p>
        </div>
      </div>

      {/* Floating Chef Hat Animation */}
      <div className="absolute top-10 left-10 opacity-20 dark:opacity-10">
        <ChefHat className="h-16 w-16 text-primary-500 animate-pulse-soft" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 dark:opacity-10">
        <ChefHat className="h-12 w-12 text-primary-600 animate-bounce-gentle" />
      </div>
    </div>
  )
}
