import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { Root } from '../Pages/Root/Root';
import { ErrorPage } from '../Pages/EorrorPage/ErrorPage';

import { Registration } from '../src/Component/LoginAndRegister/RegistrationForm';
import { Login } from '../src/Component/LoginAndRegister/Login';
import { AddFood } from '../src/Component/AddFood/AddFood';
import FridgePage from '../src/Component/Fridge/FridgePage';
import SingleFoodItem from '../src/Component/SingleItem/SingleFoodItem';
import { MyItem } from '../src/Component/MyItem/MyItem';
import ProtectedRoute from './ProtectedRoute';

// Import new page components
import ProductsPage from '../Pages/Products/ProductsPage';
import DemoPage from '../Pages/Demo/DemoPage';
import TrialPage from '../Pages/Trial/TrialPage';
import DealsPage from '../Pages/Deals/DealsPage';

// Import footer link pages
import AboutPage from '../Pages/About/AboutPage';
import HowItWorksPage from '../Pages/HowItWorks/HowItWorksPage';
import FeaturesPage from '../Pages/Features/FeaturesPage';
import PricingPage from '../Pages/Pricing/PricingPage';
import ContactPage from '../Pages/Contact/ContactPage';
import HelpCenterPage from '../Pages/Support/HelpCenterPage';
import FAQPage from '../Pages/Support/FAQPage';
import UserGuidePage from '../Pages/Support/UserGuidePage';
import APIDocumentationPage from '../Pages/Support/APIDocumentationPage';
import CommunityForumPage from '../Pages/Support/CommunityForumPage';
import ReportBugPage from '../Pages/Support/ReportBugPage';
import PrivacyPolicyPage from '../Pages/Legal/PrivacyPolicyPage';
import TermsOfServicePage from '../Pages/Legal/TermsOfServicePage';
import CookiePolicyPage from '../Pages/Legal/CookiePolicyPage';
import DataSecurityPage from '../Pages/Legal/DataSecurityPage';
import RefundPolicyPage from '../Pages/Legal/RefundPolicyPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Registration />
      },
      {
        path: "add-food",
        element: <AddFood />
      },
      {
        path: "fridge",
        element: <FridgePage />
      },
      {
        path: "food/:id",
        element: (
          <ProtectedRoute>
            <SingleFoodItem />
          </ProtectedRoute>
        )
      },
      {
        path: "product/:id",
        element: (
          <ProtectedRoute>
            <SingleFoodItem />
          </ProtectedRoute>
        )
      },
      {
        path: "my-items",
        element: <MyItem />
      },
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "deals",
        element: (
          <ProtectedRoute>
            <DealsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "demo",
        element: <DemoPage />
      },
      {
        path: "trial",
        element: <TrialPage />
      },
      // Footer link routes
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />
      },
      {
        path: "features",
        element: <FeaturesPage />
      },
      {
        path: "pricing",
        element: <PricingPage />
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "help-center",
        element: <HelpCenterPage />
      },
      {
        path: "faq",
        element: <FAQPage />
      },
      {
        path: "user-guide",
        element: <UserGuidePage />
      },
      {
        path: "api-documentation",
        element: <APIDocumentationPage />
      },
      {
        path: "community-forum",
        element: <CommunityForumPage />
      },
      {
        path: "report-bug",
        element: <ReportBugPage />
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "terms-of-service",
        element: <TermsOfServicePage />
      },
      {
        path: "cookie-policy",
        element: <CookiePolicyPage />
      },
      {
        path: "data-security",
        element: <DataSecurityPage />
      },
      {
        path: "refund-policy",
        element: <RefundPolicyPage />
      }
    ]
  }
]);