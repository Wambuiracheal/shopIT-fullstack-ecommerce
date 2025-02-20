import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './components/About'
import Contact from './components/Contact'

import {createBrowserResource, RouteProvider} from 'react-route-dom' 

const route = createBrowserResource([
  {
    path: '/',
    element: '<Layout />',
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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
