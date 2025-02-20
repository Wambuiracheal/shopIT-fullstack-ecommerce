import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import ProductListing from './components/ProductListing'

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
        path: '/products',
        element: <ProductListing />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {route}/>
  </StrictMode>,
)
