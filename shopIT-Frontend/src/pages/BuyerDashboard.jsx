import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const url = "http://127.0.0.1:5000/products";
const userUrl = "http://127.0.0.1:5000/buyer"; // API endpoint to fetch logged-in buyer

function Buyers() {
  const navigate = useNavigate([])
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");

  // Fetch products from API
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch logged-in buyer details
  useEffect(() => {
    fetch(userUrl)
      .then((res) => res.json())
      .then((data) => setBuyer(data))
      .catch((err) => console.error("Error fetching buyer:", err));
  }, []);

  // Add product to cart
  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  // Handle order placement
  function placeOrder() {
    alert("Order placed successfully! Proceed to payment.");
    navigate("/checkout", { state: { cart } });
    // setCart([]); // Clear cart after order
  }

  // Handle logout
  function handleLogout() {
    setBuyer(null);
    setProfileOpen(false);
    alert("You have been logged out.");
  }

  // Filter products by category
  const filteredProducts = products.filter(product =>
    product.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        <FaUserCircle className="profile-icon" onClick={() => setProfileOpen(!profileOpen)} />
        <span className="profile-name">{buyer?.name}</span>
        {profileOpen && buyer && (
          <div className="profile-dropdown">
            <p><strong>Name:</strong> {buyer.name}</p>
            <p><strong>Email:</strong> {buyer.email}</p>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      {/* Product Listing */}
      <h2>Available Products</h2>
      <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <strong>Name: </strong>{product.name}<br />
            <strong>Category: </strong> {product.category} <br />
            {product.image && <img src={product.image} alt="product" />} <br />
            <strong>Price: </strong> ${product.price} <br />
            <strong>Description: </strong> {product.description} <br />
            <button onClick={() => addToCart(product)} className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h3>Shopping Cart <FaShoppingCart /></h3>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      {cart.length > 0 && <button onClick={placeOrder} className="order-btn">Place Order</button>}
    </div>
  );
}

export default Buyers;
