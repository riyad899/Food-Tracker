import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollPosition = () => {
  const location = useLocation();
  const scrollPositions = useRef({});

  // Save scroll position when leaving a page
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositions.current[location.pathname] = window.scrollY;
    };

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    // Save scroll position on route change
    return () => {
      saveScrollPosition();
    };
  }, [location.pathname]);

  // Restore scroll position when returning to a page
  const restoreScrollPosition = (pathname = location.pathname) => {
    const savedPosition = scrollPositions.current[pathname];
    if (savedPosition !== undefined) {
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition,
          behavior: 'smooth'
        });
      }, 100);
      return true;
    }
    return false;
  };

  // Get saved scroll position
  const getSavedScrollPosition = (pathname = location.pathname) => {
    return scrollPositions.current[pathname] || 0;
  };

  // Clear saved scroll position
  const clearScrollPosition = (pathname = location.pathname) => {
    delete scrollPositions.current[pathname];
  };

  return {
    restoreScrollPosition,
    getSavedScrollPosition,
    clearScrollPosition,
    scrollPositions: scrollPositions.current
  };
};

// Hook to scroll to specific section
export const useScrollToSection = () => {
  const scrollToSection = (sectionId, offset = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return { scrollToSection };
};
