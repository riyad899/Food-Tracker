import React from 'react'
import FoodExpenseTrackerSlider from '../../src/Component/Home_components/FoodExpenseTrackerSlider'
import FeaturedProducts from '../../src/Component/Home_components/FeaturedProducts'
import RecentProducts from '../../src/Component/Home_components/RecentProducts'
import SalesPromotion from '../../src/Component/Home_components/SalesPromotion'
import CustomerReviews from '../../src/Component/Home_components/CustomerReviews'
import Newsletter from '../../src/Component/Home_components/Newsletter'
import WhyChooseUs from '../../src/Component/Home_components/WhyChooseUs'
import NearlyExpiryFood from '../../src/Component/Home_components/NearlyExpiryFood'
import FoodExpiryTracker from '../../src/Component/Home_components/FoodExpiryTracker'
import { useTheme } from '../../src/contexts/ThemeContext'

export const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className={`
      transition-all duration-300
      ${isDark ? 'bg-gray-900' : 'bg-white'}
    `}>
        <section id="hero">
          <FoodExpenseTrackerSlider />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
        `} id="featured-products">
          <FeaturedProducts />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `} id="why-choose-us">
          <WhyChooseUs />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
        `} id="food-inventory">
          <NearlyExpiryFood />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `} id="recent-products">
          <RecentProducts />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
        `} id="special-offers">
          <SalesPromotion />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `} id="expired-food">
          <FoodExpiryTracker />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}
        `} id="customer-reviews">
          <CustomerReviews />
        </section>
        <section className={`
          transition-all duration-300
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `} id="newsletter">
          <Newsletter />
        </section>
    </div>
  )
}
