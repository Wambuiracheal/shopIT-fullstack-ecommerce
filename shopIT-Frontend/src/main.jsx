import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { Provider } from 'react-redux'
import store from './store.js'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import App from './App'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import Buyerspage from './pages/Buyerspage.jsx'
import Productspage from './pages/Productspage'
import ForgotPassword from './pages/Forgotpassword'

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
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
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
