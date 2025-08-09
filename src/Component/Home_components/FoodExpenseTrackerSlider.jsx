import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, TrendingUp, PieChart, Smartphone, DollarSign, BarChart3, Calendar } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function FoodExpenseTrackerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDark } = useTheme();

  const slides = [
    {
      id: 1,
      title: "Track Every Bite, Save Every Dollar",
      subtitle: "Smart Food Expense Management",
      description: "Take control of your food spending with intelligent tracking, detailed analytics, and personalized insights that help you make better financial decisions.",
      icon: <TrendingUp className={`w-16 h-16 ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`} />,
      accentColor: isDark ? "text-green-400" : "text-[#124A2F]",
      bgImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Visualize Your Spending Patterns",
      subtitle: "Powerful Analytics Dashboard",
      description: "Discover where your money goes with beautiful charts, spending trends, and category breakdowns that reveal your food expense habits.",
      icon: <PieChart className={`w-16 h-16 ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`} />,
      accentColor: isDark ? "text-green-400" : "text-[#124A2F]",
      bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Budget Smarter, Eat Better",
      subtitle: "AI-Powered Recommendations",
      description: "Get personalized budget suggestions, meal planning tips, and smart alerts that help you maintain healthy spending without sacrificing quality.",
      icon: <BarChart3 className={`w-16 h-16 ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`} />,
      accentColor: isDark ? "text-green-400" : "text-[#124A2F]",
      bgImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1920&h=1080&fit=crop&crop=center"
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
    <div className={`
      min-h-screen transition-all duration-300
      ${isDark ? 'bg-gray-900' : 'bg-white'}
    `}>
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
            <div className="relative h-full flex items-center justify-center px-6">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.bgImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className={`
                  absolute inset-0
                  ${isDark ? 'bg-black opacity-70' : 'bg-black opacity-40'}
                `}></div>
                <div className={`
                  absolute inset-0 bg-gradient-to-r
                  ${isDark
                    ? 'from-gray-900 via-gray-900/90 to-transparent'
                    : 'from-white via-white/80 to-transparent'
                  }
                `}></div>
              </div>

              <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-center md:text-left space-y-8 backdrop-blur-sm rounded-2xl p-8 md:p-10">
                  <div className="space-y-4">
                    <div className={`
                      inline-block p-4 rounded-2xl border
                      ${isDark
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-gray-100 border-gray-200'
                      }
                    `}>
                      {slide.icon}
                    </div>
                    <div className="space-y-2">
                      <p className={`${slide.accentColor} font-semibold tracking-wide uppercase text-sm`}>
                        {slide.subtitle}
                      </p>
                      <h1 className={`
                        text-4xl md:text-6xl font-bold leading-tight
                        ${isDark ? 'text-gray-100' : 'text-gray-900'}
                      `}>
                        {slide.title}
                      </h1>
                    </div>
                  </div>
                  <p className={`
                    text-xl leading-relaxed max-w-2xl
                    ${isDark ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      to="/trial"
                      className={`
                        px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-lg text-center
                        ${isDark
                          ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 text-white'
                          : 'bg-gradient-to-r from-[#124A2F] to-[#0D3521] hover:from-[#0D3521] hover:to-[#124A2F] text-white'
                        }
                      `}
                    >
                      Start Tracking Now
                    </Link>
                    <Link
                      to="/demo"
                      className={`
                        px-8 py-4 rounded-full font-semibold transition-all border text-center
                        ${isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                        }
                      `}
                    >
                      Watch Demo
                    </Link>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="hidden md:flex justify-center">
                  <div className="relative">
                    <div className="w-80 h-80 bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Calendar className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm">This Month</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#124A2F] to-green-600 dark:from-green-500 dark:to-green-400 rounded-full w-3/4"></div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">$847 of $1,200 budget</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 dark:text-gray-300">Groceries</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">$425</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 dark:text-gray-300">Restaurants</span>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">$312</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700 dark:text-gray-300">Delivery</span>
                            <span className="text-purple-600 dark:text-purple-400 font-semibold">$110</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#124A2F] to-green-600 dark:from-green-600 dark:to-green-500 rounded-2xl flex items-center justify-center shadow-md">
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
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-3 rounded-full transition-all border border-gray-200 dark:border-gray-700 shadow-sm group"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-3 rounded-full transition-all border border-gray-200 dark:border-gray-700 shadow-sm group"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-[#124A2F] dark:bg-green-400 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}