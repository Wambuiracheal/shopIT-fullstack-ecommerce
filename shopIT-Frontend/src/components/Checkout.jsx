import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "creditCard",
  });

  const [showReview, setShowReview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      items: cartItems,
      totalAmount: totalPrice,
    };

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        navigate("/orders"); 
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <p key={item.id}>
            {item.title} - ${item.price} x {item.quantity}
          </p>
        ))}
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      </div>

      {!showReview ? (
        <form onSubmit={(e) => { e.preventDefault(); setShowReview(true); }}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required />

          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">M-Pesa</option>
          </select>

          <button type="submit">Review Order</button>
        </form>
      ) : (
        <div className="order-review">
          <h3>Review Your Order</h3>
          <p><strong>Name:</strong> {formData.fullName}</p>
          <p><strong>Shipping Address:</strong> {formData.address}, {formData.city}</p>
          <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          <button onClick={handleSubmit}>Confirm Order</button>
          <button onClick={() => setShowReview(false)}>Edit Details</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
