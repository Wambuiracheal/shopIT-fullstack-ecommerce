import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import store from './store.js'
import Checkout from './components/Checkout'
import Orders from './components/Orders';



import {createBrowserRouter, RouterProvider} from 'react-router-dom' 

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router = {route}/>
    </Provider>
  </StrictMode>,
)
