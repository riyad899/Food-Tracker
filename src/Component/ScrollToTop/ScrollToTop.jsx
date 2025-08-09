import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    // If there's a scroll position in the state, restore it
    else if (state?.scrollPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: state.scrollPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
    // Otherwise, scroll to top when the route changes
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state]);

  return null;
};

export default ScrollToTop;
