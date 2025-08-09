import React, { useState } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "support@foodtracker.com",
      action: "mailto:support@foodtracker.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm EST",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      contact: "123 Food Street, New York, NY 10001",
      action: "https://maps.google.com"
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our team",
      availability: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Help Center",
      description: "Browse our knowledge base",
      availability: "Self-service",
      action: "Browse Articles"
    },
    {
      icon: Clock,
      title: "Schedule Call",
      description: "Book a time that works for you",
      availability: "Business hours",
      action: "Schedule Now"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in <span className="text-green-600">Touch</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Have questions about FoodTracker? We're here to help! Reach out to our friendly team anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className={`text-center p-8 rounded-2xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full w-fit mx-auto mb-4">
                  <info.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {info.description}
                </p>
                <a
                  href={info.action}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {info.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form and Support Channels */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <p className={`mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDark
                          ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      isDark
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-20`}
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Support Channels */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Other Ways to Reach Us</h2>
              <p className={`mb-8 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Choose the support channel that works best for you.
              </p>

              <div className="space-y-6">
                {supportChannels.map((channel, index) => (
                  <div key={index} className={`p-6 rounded-xl ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-lg">
                        <channel.icon className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                        <p className={`text-sm mb-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {channel.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${
                            isDark ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {channel.availability}
                          </span>
                          <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200">
                            {channel.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className={`mt-8 p-6 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-green-50'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <h3 className="font-semibold">Quick Response Guarantee</h3>
                </div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  We typically respond to all inquiries within 2-4 hours during business hours, and within 24 hours on weekends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Before You Contact Us
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Check out our comprehensive help center for instant answers to common questions.
          </p>
          <button className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
            isDark
              ? 'border-gray-600 text-white hover:bg-gray-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
