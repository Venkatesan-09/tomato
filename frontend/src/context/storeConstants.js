export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  ENDPOINTS: {
    FOOD_LIST: '/api/food/list',
    CART_ADD: '/api/cart/add',
    CART_REMOVE: '/api/cart/remove',
    CART_GET: '/api/cart/get',
    CART_CLEAR: '/api/cart/clear'
  },
  STORAGE_KEYS: {
    TOKEN: 'token',
    CART: 'cart_data'
  }
};

export const CART_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR'
};