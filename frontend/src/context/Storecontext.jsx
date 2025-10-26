import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";

// Create Context
export const StoreContext = createContext(null);

// Constants
const API_CONFIG = {
  BASE_URL: 'http://localhost:4000',
  ENDPOINTS: {
    FOOD_LIST: '/api/food/list',
    CART_ADD: '/api/cart/add',
    CART_REMOVE: '/api/cart/remove',
    CART_GET: '/api/cart/get'
  },
  STORAGE_KEYS: {
    TOKEN: 'token'
  }
};

// Custom hook for API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (config, showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);

    try {
      const response = await axios({
        baseURL: API_CONFIG.BASE_URL,
        ...config
      });
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  return { loading, error, makeRequest, setError };
};

const StoreContextProvider = (props) => {
  // State Management
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [foodList, setFoodList] = useState([]);
  
  // API Hook
  const { loading, error, makeRequest, setError } = useApi();

  // Cart Operations
  const addToCart = async (itemId) => {
    try {
      // Update local state optimistically
      setCartItems(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));

      // Sync with server if authenticated
      if (token) {
        await makeRequest({
          method: 'POST',
          url: API_CONFIG.ENDPOINTS.CART_ADD,
          data: { itemId },
          headers: { token }
        }, false); // Don't show loading for cart operations
      }
    } catch (err) {
      // Revert optimistic update on error
      setCartItems(prev => ({
        ...prev,
        [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
      }));
      console.error('Failed to add item to cart:', err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      // Update local state optimistically
      setCartItems(prev => ({
        ...prev,
        [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
      }));

      // Sync with server if authenticated
      if (token) {
        await makeRequest({
          method: 'POST',
          url: API_CONFIG.ENDPOINTS.CART_REMOVE,
          data: { itemId },
          headers: { token }
        }, false); // Don't show loading for cart operations
      }
    } catch (err) {
      // Revert optimistic update on error
      setCartItems(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));
      console.error('Failed to remove item from cart:', err.message);
    }
  };

  const clearCart = () => {
    setCartItems({});
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    if (quantity < 0) return;

    try {
      setCartItems(prev => ({
        ...prev,
        [itemId]: quantity
      }));

      // TODO: Add API call to update quantity if needed
    } catch (err) {
      console.error('Failed to update cart item quantity:', err.message);
    }
  };

  // Cart Calculations
  const getTotalCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = foodList.find(product => product._id === itemId);
        if (itemInfo) {
          return total + (itemInfo.price * quantity);
        }
      }
      return total;
    }, 0);
  }, [cartItems, foodList]);

  const getCartItemsCount = useCallback(() => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  }, [cartItems]);

  const getCartItemsDetails = useCallback(() => {
    return Object.entries(cartItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const itemInfo = foodList.find(product => product._id === itemId);
        return itemInfo ? { ...itemInfo, quantity } : null;
      })
      .filter(Boolean);
  }, [cartItems, foodList]);

  // API Operations
  const fetchFoodList = async () => {
    try {
      const data = await makeRequest({
        method: 'GET',
        url: API_CONFIG.ENDPOINTS.FOOD_LIST
      });
      setFoodList(data.data || []);
    } catch (err) {
      setFoodList([]); // Set empty array on error
    }
  };

  const loadCartData = async (userToken) => {
    try {
      const data = await makeRequest({
        method: 'POST',
        url: API_CONFIG.ENDPOINTS.CART_GET,
        headers: { token: userToken }
      });
      setCartItems(data.cartData || {});
    } catch (err) {
      setCartItems({}); // Set empty cart on error
    }
  };

  // Token Management
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem(API_CONFIG.STORAGE_KEYS.TOKEN, newToken);
    } else {
      localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
      setCartItems({}); // Clear cart on logout
    }
  };

  // Initialize App Data
  const initializeAppData = async () => {
    try {
      await fetchFoodList();
      
      const savedToken = localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    } catch (err) {
      console.error('Failed to initialize app data:', err.message);
    }
  };

  // Effects
  useEffect(() => {
    initializeAppData();
  }, []);

  // Clear error after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Context Value
  const contextValue = {
    // State
    foodList,
    cartItems,
    token,
    loading,
    error,
    
    // Setters
    setCartItems,
    setToken: updateToken,
    
    // Cart Operations
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity,
    
    // Cart Calculations
    getTotalCartAmount,
    getCartItemsCount,
    getCartItemsDetails,
    
    // API
    url: API_CONFIG.BASE_URL,
    
    // Utilities
    isItemInCart: (itemId) => !!(cartItems[itemId] > 0),
    getItemQuantity: (itemId) => cartItems[itemId] || 0
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;