import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import home from './Home'
import about from './About'
import contact from './Contact'
import signup from './Signup'
import login from './Login'

import {createBrowserResource, RouteProvider} from 'react-route-dom' 

const route = createBrowserResource([
  {
    path: '/',
    element: '<Layout />',
    children: [
      {
        path: '/home',
        element: '<Home />'
      },
      {
        path: '/about',
        element: '<About />'
      },
      {
        path: '/contact',
        element: '<Contact />'
      },
      {
        path: '/signup',
        element: '<Signup />'
      },
      {
        path: '/login',
        element: '<Login />'
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
