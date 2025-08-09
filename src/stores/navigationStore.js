import { create } from 'zustand';

// Store for managing navigation state and scroll positions
export const useNavigationStore = create((set, get) => ({
  // Store scroll positions for each route
  scrollPositions: {},

  // Store navigation history
  navigationHistory: [],

  // Current section being viewed on home page
  currentHomeSection: 'hero',

  // Save scroll position for a route
  saveScrollPosition: (route, position) => {
    set(state => ({
      scrollPositions: {
        ...state.scrollPositions,
        [route]: position
      }
    }));
  },

  // Get saved scroll position for a route
  getScrollPosition: (route) => {
    const { scrollPositions } = get();
    return scrollPositions[route] || 0;
  },

  // Add to navigation history
  addToHistory: (route) => {
    set(state => ({
      navigationHistory: [...state.navigationHistory.slice(-9), route] // Keep last 10
    }));
  },

  // Get previous route
  getPreviousRoute: () => {
    const { navigationHistory } = get();
    return navigationHistory[navigationHistory.length - 2] || '/';
  },

  // Set current home section
  setCurrentHomeSection: (section) => {
    set({ currentHomeSection: section });
  },

  // Clear all stored data
  clear: () => {
    set({
      scrollPositions: {},
      navigationHistory: [],
      currentHomeSection: 'hero'
    });
  }
}));
