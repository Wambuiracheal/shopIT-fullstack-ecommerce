import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { Provider } from 'react-redux'
import store from './store.js'
import Checkout from './components/Checkout'
import Orders from './components/Orders';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import ProductListing from './components/ProductListing'
import Cart from './components/Cart'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SellerDashboard from './pages/SellerDashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import Productspage from './pages/Productspage'


// Components
import Productspage from "./pages/Productspage";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductListing from "./components/ProductListing";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Payment from "./components/Payment"; // Ensure Payment is imported
import Mpesa from "./components/Mpesa";
import App from "./App";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Productspage from "./pages/Productspage";



// Redux
import cartReducer from "./features/cartSlice";

// Redux Store Configuration
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// // App Component
// function App() {
//   return (
//     <Provider store={store}>
//       <Layout /> {/* Render Layout directly */}
//     </Provider>
//   );
// }

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> }, // Use Productspage as the index route
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products", element: <ProductListing /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/orders", element: <Orders /> },
      { path: "/payment", element: <Payment /> },
      { path: "/mpesa", element: <Mpesa /> },

      // Authentication
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },

      // Dashboards
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/seller-dashboard", element: <SellerDashboard /> },
      { path: "/buyer-dashboard", element: <BuyerDashboard /> },

    ],
  },
]);

// Render the Application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Use RouterProvider here */}
  </StrictMode>
);

export default App;