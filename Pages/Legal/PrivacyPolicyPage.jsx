import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { Shield, Eye, Users, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, add food items, or contact us for support. This includes your name, email address, and any other information you choose to provide."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect information about your use of our service, including your food inventory data, expense tracking information, and how you interact with our features."
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the device you use to access FoodTracker, including IP address, browser type, operating system, and device identifiers."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our food tracking services, including storing your food inventory, tracking expenses, and sending expiration notifications."
        },
        {
          subtitle: "Communication",
          text: "We may use your information to communicate with you about your account, send important service updates, and respond to your support requests."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to improve our service, develop new features, and ensure our platform works effectively for all users."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        {
          subtitle: "Family Sharing",
          text: "If you use our family sharing features, your food inventory and related information will be shared with family members you invite to your account."
        },
        {
          subtitle: "Service Providers",
          text: "We may share your information with third-party service providers who help us operate our service, such as hosting providers and customer support tools."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law or in response to valid legal process, such as a court order or subpoena."
        }
      ]
    }
  ];

  const rights = [
    "Access your personal data and receive a copy",
    "Correct inaccurate or incomplete data",
    "Delete your personal data (right to be forgotten)",
    "Restrict processing of your data",
    "Data portability - receive your data in a structured format",
    "Object to processing of your data",
    "Withdraw consent at any time"
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Hero Section */}
      <div className={`py-20 ${
        isDark ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy <span className="text-green-600">Policy</span>
            </h1>
            <p className={`text-xl mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mb-12`}>
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              FoodTracker ("we", "our", or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our food tracking and expense management service.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className={`p-8 rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                    <section.icon className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold mb-3 text-green-600">
                        {item.subtitle}
                      </h3>
                      <p className={`leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Your Rights */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {right}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Security */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Data Security</h2>
            <p className={`mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className={`space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Encryption of data in transit and at rest</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Regular security assessments and monitoring</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Access controls and authentication measures</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Employee training on data protection</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gradient-to-r from-green-900 to-emerald-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
          } mt-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                <Mail className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className={`mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className={`space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p><strong>Email:</strong> privacy@foodtracker.com</p>
              <p><strong>Address:</strong> 123 Food Street, New York, NY 10001</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
