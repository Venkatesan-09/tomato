import React, { useState, useEffect, createContext, useContext } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Loginpopup from './components/loginpopup/Loginpopup'
import LoadingSpinner from './components/loadingspinner/LoadingSpinner'

// Pages
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/Placeorder'
import Verify from './pages/verify/Verify'
import Myorders from './pages/myorders/Myorders'
import Profile from './pages/profile/Profile'
import NotFound from './pages/notfound/NotFound'

// Context
import { StoreContext } from './context/Storecontext'

// Create App Context
export const AppContext = createContext()

const App = () => {
  const [showlogin, setshowlogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)
  const location = useLocation()
  const navigate = useNavigate()
  const { token } = useContext(StoreContext)

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus()
    setupOnlineStatusListener()
    setupGlobalErrorHandler()
  }, [])

  // Monitor token changes for authentication
  useEffect(() => {
    if (token) {
      fetchUserProfile()
    } else {
      setUser(null)
    }
  }, [token])

  // Check authentication status
  const checkAuthStatus = async () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setLoading(true)
      try {
        // Verify token with backend
        // await verifyToken(savedToken)
        setUser({ name: 'User', email: 'user@example.com' }) // Placeholder
      } catch (error) {
        localStorage.removeItem('token')
        toast.error('Session expired. Please login again.')
      } finally {
        setLoading(false)
      }
    }
  }

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!token) return
    
    setLoading(true)
    try {
      // Fetch user data from API
      // const userData = await getUserProfile(token)
      // setUser(userData)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      toast.error('Failed to load user profile')
    } finally {
      setLoading(false)
    }
  }

  // Setup online/offline status listener
  const setupOnlineStatusListener = () => {
    const handleOnline = () => {
      setOnlineStatus(true)
      toast.success('You are back online!')
    }

    const handleOffline = () => {
      setOnlineStatus(false)
      toast.warn('You are offline. Some features may not work.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }

  // Global error handler
  const setupGlobalErrorHandler = () => {
    const handleError = (error) => {
      console.error('Global error:', error)
      toast.error('Something went wrong. Please try again.')
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleError)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleError)
    }
  }

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.info('Logged out successfully')
    navigate('/')
  }

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // App context value
  const appContextValue = {
    user,
    setUser,
    onlineStatus,
    handleLogout,
    showlogin,
    setshowlogin,
    loading,
    setLoading
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      toast.error('Please login to access this page')
      setshowlogin(true)
      return <LoadingSpinner />
    }
    return children
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="app">
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Offline Indicator */}
        {!onlineStatus && (
          <div className="offline-indicator">
            ⚠️ You are currently offline. Some features may be limited.
          </div>
        )}

        {/* Login Popup */}
        {showlogin && <Loginpopup setshowlogin={setshowlogin} />}

        {/* Loading Overlay */}
        {loading && <LoadingSpinner />}

        {/* Main App Structure */}
        <div className="app-content">
          <Navbar setshowlogin={setshowlogin} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Protected Routes */}
              <Route 
                path="/order" 
                element={
                  <ProtectedRoute>
                    <Placeorder />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/verify" 
                element={
                  <ProtectedRoute>
                    <Verify />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/myorders" 
                element={
                  <ProtectedRoute>
                    <Myorders />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App