import React from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { FileText, AlertCircle, Shield, Users } from 'lucide-react';

const TermsOfServicePage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: "By accessing and using FoodTracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, you are not authorized to use or access this service."
    },
    {
      title: "Description of Service",
      icon: Users,
      content: "FoodTracker is a web-based application that helps users track food inventory, monitor expiration dates, and manage food-related expenses. Our service includes features such as barcode scanning, expense analytics, family sharing, and notification systems."
    },
    {
      title: "User Accounts",
      icon: Shield,
      content: "To use certain features of our service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    }
  ];

  const userObligations = [
    "Provide accurate and complete information when creating your account",
    "Maintain the security of your login credentials",
    "Use the service only for lawful purposes",
    "Not interfere with or disrupt the service or servers",
    "Not attempt to gain unauthorized access to other user accounts",
    "Not upload or share inappropriate, offensive, or illegal content",
    "Comply with all applicable laws and regulations",
    "Respect the intellectual property rights of others"
  ];

  const prohibitedUses = [
    "Violating any applicable laws or regulations",
    "Transmitting spam, malware, or other harmful code",
    "Attempting to reverse engineer our software",
    "Using automated systems to access the service without permission",
    "Impersonating other users or entities",
    "Collecting user information without consent",
    "Using the service for commercial purposes without authorization",
    "Interfering with the proper working of the service"
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
              <FileText className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of <span className="text-green-600">Service</span>
            </h1>
            <p className={`text-xl mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Please read these terms carefully before using FoodTracker.
            </p>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mb-8`}>
            <h2 className="text-2xl font-bold mb-4">Agreement Overview</h2>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              These Terms of Service ("Terms") govern your use of the FoodTracker service operated by FoodTracker Inc. ("us", "we", or "our"). Please read these Terms carefully before using our service.
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
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* User Obligations */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">User Obligations</h2>
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              By using FoodTracker, you agree to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {userObligations.map((obligation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {obligation}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited Uses */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-xl">
                <AlertCircle className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Prohibited Uses</h2>
            </div>
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              You may not use FoodTracker for any of the following purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {prohibitedUses.map((use, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {use}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription and Billing */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Subscription and Billing</h2>
            <div className={`space-y-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                <strong>Free Plan:</strong> Our basic service is provided free of charge with certain limitations on features and usage.
              </p>
              <p>
                <strong>Premium Plans:</strong> Paid subscriptions provide access to additional features and unlimited usage. Subscription fees are billed in advance on a monthly or annual basis.
              </p>
              <p>
                <strong>Automatic Renewal:</strong> Subscriptions automatically renew unless cancelled before the renewal date. You can cancel your subscription at any time from your account settings.
              </p>
              <p>
                <strong>Refunds:</strong> We offer a 30-day money-back guarantee for new subscriptions. Refunds for subsequent billing periods are at our discretion.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Intellectual Property</h2>
            <div className={`space-y-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                The FoodTracker service, including its original content, features, and functionality, is and will remain the exclusive property of FoodTracker Inc. and its licensors. The service is protected by copyright, trademark, and other laws.
              </p>
              <p>
                You retain ownership of any data you submit to our service. By using FoodTracker, you grant us a limited license to use your data solely for the purpose of providing and improving our service.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Limitation of Liability</h2>
            <div className={`space-y-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                FoodTracker is provided "as is" without warranties of any kind. We do not guarantee that the service will be error-free or uninterrupted. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages.
              </p>
              <p>
                Our total liability to you for any claims arising out of your use of FoodTracker shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Termination</h2>
            <div className={`space-y-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p>
                You may terminate your account at any time by contacting us or using the account deletion feature in your settings. Upon termination, your right to use the service will cease immediately.
              </p>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gradient-to-r from-green-900 to-emerald-900' : 'bg-gradient-to-r from-green-50 to-emerald-50'
          } mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Changes to Terms</h2>
            <p className={`${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. By continuing to use our service after the effective date of any changes, you agree to be bound by the modified terms.
            </p>
          </div>

          {/* Contact Information */}
          <div className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-lg mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className={`mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className={`space-y-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <p><strong>Email:</strong> legal@foodtracker.com</p>
              <p><strong>Address:</strong> 123 Food Street, New York, NY 10001</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
