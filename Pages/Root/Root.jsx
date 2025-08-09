import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../src/Component/Navbar/Navbar';
import Footer from '../../src/Component/Footer/Footer';
import ScrollToTop from '../../src/Component/ScrollToTop/ScrollToTop';
import { NavigationProvider } from '../../src/contexts/NavigationContext';
import { useTheme } from '../../src/contexts/ThemeContext';

export const Root = () => {
  const { isDark } = useTheme();

  return (
    <NavigationProvider>
      <div className={`
        flex flex-col min-h-screen transition-all duration-300
        ${isDark
          ? 'bg-gray-900 text-gray-100'
          : 'bg-white text-gray-900'
        }
      `}>
        <ScrollToTop />
        <Navbar></Navbar>

        <main className="flex-1 w-full overflow-visible relative">
          <Outlet></Outlet>
        </main>

        <Footer></Footer>
      </div>
    </NavigationProvider>
  );
}