import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, CheckCircle, Star, TrendingUp, Clock, Users, ArrowLeft } from 'lucide-react';

const DemoPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(-1); // Go back to previous page
  };

  const demoVideos = [
    {
      id: 1,
      title: "Getting Started with FoodTracker",
      description: "Learn how to set up your account and add your first food items",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      features: ["Account Setup", "Adding Food Items", "Basic Navigation"]
    },
    {
      id: 2,
      title: "Smart Expiry Tracking",
      description: "Discover how our AI-powered system helps you track expiry dates",
      duration: "4:20",
      thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
      features: ["Expiry Notifications", "Smart Alerts", "Priority Lists"]
    },
    {
      id: 3,
      title: "Analytics & Insights",
      description: "Explore detailed analytics to understand your food consumption patterns",
      duration: "5:10",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      features: ["Spending Analysis", "Waste Tracking", "Trend Reports"]
    },
    {
      id: 4,
      title: "Mobile App Features",
      description: "See how to use FoodTracker on your mobile device",
      duration: "3:30",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      features: ["Mobile App", "Barcode Scanning", "Quick Entry"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "FoodTracker has completely transformed how I manage my kitchen. I've reduced food waste by 70%!"
    },
    {
      name: "Mike Chen",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "The analytics features help me understand our inventory better. We've saved thousands of dollars."
    },
    {
      name: "Emma Davis",
      role: "Nutritionist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "I recommend FoodTracker to all my clients. It's an essential tool for mindful eating."
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50K+", label: "Active Users" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "2M+", label: "Food Items Tracked" },
    { icon: <Clock className="w-8 h-8" />, number: "95%", label: "Waste Reduction" },
    { icon: <Star className="w-8 h-8" />, number: "4.9", label: "Average Rating" }
  ];

  const handleVideoSelect = (index) => {
    setCurrentVideo(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#124A2F] to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              See FoodTracker in Action
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Watch our interactive demo to discover how FoodTracker can revolutionize
              your food management and reduce waste by up to 70%.
            </p>
          </div>          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-yellow-300 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={demoVideos[currentVideo].thumbnail}
                    alt={demoVideos[currentVideo].title}
                    className="w-full h-full object-cover"
                  />

                  {/* Play Controls */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlay}
                      className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all transform hover:scale-110"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-[#124A2F]" />
                      ) : (
                        <Play className="w-8 h-8 text-[#124A2F] ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {demoVideos[currentVideo].title}
                      </h3>
                      <p className="text-gray-300 mb-3">
                        {demoVideos[currentVideo].description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">
                          Duration: {demoVideos[currentVideo].duration}
                        </span>
                        <button className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-colors">
                          Full Screen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features Covered */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {demoVideos[currentVideo].features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-green-100 text-[#124A2F] text-sm font-medium rounded-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Playlist */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Demo Videos</h3>
              {demoVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={`cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border-2 ${
                    currentVideo === index ? 'border-[#124A2F]' : 'border-transparent'
                  }`}
                >
                  <div className="flex space-x-4">
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        {video.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {video.description}
                      </p>
                      <span className="text-xs text-gray-500">{video.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who have transformed their food management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#124A2F] to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            See the demo convinced you? Start your free trial today and experience the benefits firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#124A2F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Start Free Trial
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#124A2F] transition-all duration-200 flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Watch Again
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
