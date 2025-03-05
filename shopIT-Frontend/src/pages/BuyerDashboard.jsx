import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const url = "http://127.0.0.1:5555/products";

function Buyers() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Simulate fetching logged-in buyer
  useEffect(() => {
    const mockBuyer = { id: 1, name: "John Doe", email: "john@example.com" };
    setBuyer(mockBuyer);
  }, []);

  // Add product to cart
  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  // Handle order placement
  function placeOrder() {
    alert("Order placed successfully! Proceed to payment.");
    setCart([]); // Clear cart after order
  }

  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile-section">
        <FaUserCircle className="profile-icon" onClick={() => setProfileOpen(!profileOpen)} />
        <span className="profile-name">{buyer?.name}</span>
        {profileOpen && (
          <div className="profile-dropdown">
            <p><strong>Name:</strong> {buyer?.name}</p>
            <p><strong>Email:</strong> {buyer?.email}</p>
          </div>
        )}
      </div>

      {/* Product Listing */}
      <h2>Available Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
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
