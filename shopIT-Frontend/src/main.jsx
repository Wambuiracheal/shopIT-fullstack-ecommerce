import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { Provider } from 'react-redux'
import store from './store.js'
import Checkout from './components/Checkout'
import Orders from './components/Orders';
import App from './App'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import ProductListing from './components/ProductListing'
import {createBrowserRouter, RouterProvider} from 'react-router-dom' 
import Cart from './components/Cart'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import SellerProfile from './pages/SellerProfile'
import Buyerspage from './pages/Buyerspage.jsx'
import Productspage from './pages/Productspage'
import ForgotPassword from './pages/Forgotpassword'
import Mpesa from './components/Mpesa'

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',    
        element: <App />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/products',
        element: <ProductListing />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout', 
        element: <Checkout />
      },
      {
        path: '/orders', 
        element: <Orders />
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/seller-dashboard',
        element: <SellerDashboard />,
      },
      {
        path: 'buyer-dashboard',
        element: <BuyerDashboard />,
      },
      {
        path: '/buyers-page',
        element: <Buyerspage />,
      },
      {
        path: '/products-page',
        element: <Productspage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/mpesa',
        element: <Mpesa />
      },
      {
        path: '/seller-profile',
        element: <SellerProfile />
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>
)
