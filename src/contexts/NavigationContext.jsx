import React, { createContext, useContext, useRef, useCallback } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const scrollPositions = useRef({});
  const navigationHistory = useRef([]);

  const saveScrollPosition = useCallback((route, position) => {
    scrollPositions.current[route] = position;
  }, []);

  const getScrollPosition = useCallback((route) => {
    return scrollPositions.current[route] || 0;
  }, []);

  const addToHistory = useCallback((route) => {
    navigationHistory.current = [...navigationHistory.current.slice(-9), route];
  }, []);

  const getPreviousRoute = useCallback(() => {
    const history = navigationHistory.current;
    return history[history.length - 2] || '/';
  }, []);

  const value = {
    saveScrollPosition,
    getScrollPosition,
    addToHistory,
    getPreviousRoute,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
