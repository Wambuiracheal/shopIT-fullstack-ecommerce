import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { Provider } from 'react-redux'
import store from './store.js'
import Checkout from './components/Checkout'
import Orders from './components/Orders';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import App from './App'
import About from './components/About'
import Contact from './components/
import Layout from './components/Layout'
import ProductListing from './components/ProductListing'
import {createBrowserRouter, RouterProvider} from 'react-router-dom' 
import Cart from './components/Cart'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'

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
        path: '/dashboard/seller',
        element: <SellerDashboard />,
      },
      {
        path: '/dashboard/buyer',
        element: <BuyerDashboard />,
      },
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
