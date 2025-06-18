import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, PieChart, Smartphone, DollarSign, BarChart3, Calendar } from 'lucide-react';
import NearlyExpiryFood from './NearlyExpiryFood';
import FoodExpiryTracker from './FoodExpiryTracker';

export default function FoodExpenseTrackerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Track Every Bite, Save Every Dollar",
      subtitle: "Smart Food Expense Management",
      description: "Take control of your food spending with intelligent tracking, detailed analytics, and personalized insights that help you make better financial decisions.",
      icon: <TrendingUp className="w-16 h-16 text-emerald-600" />,
      accentColor: "text-emerald-600"
    },
    {
      id: 2,
      title: "Visualize Your Spending Patterns",
      subtitle: "Powerful Analytics Dashboard",
      description: "Discover where your money goes with beautiful charts, spending trends, and category breakdowns that reveal your food expense habits.",
      icon: <PieChart className="w-16 h-16 text-blue-600" />,
      accentColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Budget Smarter, Eat Better",
      subtitle: "AI-Powered Recommendations",
      description: "Get personalized budget suggestions, meal planning tips, and smart alerts that help you maintain healthy spending without sacrificing quality.",
      icon: <BarChart3 className="w-16 h-16 text-purple-600" />,
      accentColor: "text-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Navigation content */}
        </div>
      </nav>

      {/* Banner Carousel */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="relative h-full flex items-center justify-center px-6 bg-white">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-center md:text-left space-y-8">
                  <div className="space-y-4">
                    <div className="inline-block p-4 bg-gray-100 rounded-2xl">
                      {slide.icon}
                    </div>
                    <div className="space-y-2">
                      <p className={`${slide.accentColor} font-semibold tracking-wide uppercase text-sm`}>
                        {slide.subtitle}
                      </p>
                      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        {slide.title}
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-lg">
                      Start Tracking Now
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold transition-all border border-gray-200">
                      Watch Demo
                    </button>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    <div className="w-80 h-80 bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
                      <div className="h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Calendar className="w-6 h-6 text-gray-500" />
                            <span className="text-gray-500 text-sm">This Month</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full w-3/4"></div>
                            </div>
                            <p className="text-gray-600 text-sm">$847 of $1,200 budget</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700">Groceries</span>
                            <span className="text-emerald-600 font-semibold">$425</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700">Restaurants</span>
                            <span className="text-blue-600 font-semibold">$312</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700">Delivery</span>
                            <span className="text-purple-600 font-semibold">$110</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full transition-all border border-gray-200 shadow-sm group"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full transition-all border border-gray-200 shadow-sm group"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-emerald-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <NearlyExpiryFood />
      <FoodExpiryTracker />
    </div>
  );
}