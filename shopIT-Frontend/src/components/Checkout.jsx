import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

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
      const response = await fetch("http://127.0.0.1:5000/mpesa/pay", {
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

  const handleProceedToPayment = () => {
    const orderData = {
      ...formData,
      items: cartItems,
      totalAmount: totalPrice,
    };
    navigate("/mpesa", { state: { orderData } });
  };

  return (
    <div className="checkout-container">
      <style>
        {`
          .checkout-container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }

          h2, h3 {
            text-align: center;
            color: #ff6600;
          }

          .order-summary {
            padding: 15px;
            background: #fff5e6;
            border-radius: 8px;
            margin-bottom: 20px;
          }

          .order-summary p {
            font-size: 16px;
            margin: 5px 0;
          }

          form input, form select {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 5px;
          }

          button {
            background: #ff6600;
            color: white;
            border: none;
            padding: 12px;
            width: 100%;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 10px;
            transition: background 0.3s ease-in-out;
          }

          button:hover {
            background: #cc5500;
          }

          .order-review {
            background: #fff5e6;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
          }

          .order-review p {
            font-size: 16px;
            margin: 5px 0;
          }
        `}
      </style>

      <h2>Checkout</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <p key={item.id}>
            {item.name} - ${item.price} x {item.quantity || 1}
          </p>
        ))}
        <p>
          <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
        </p>
      </div>

      {!showReview ? (
        <form onSubmit={(e) => { e.preventDefault(); setShowReview(true); }}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
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
          <p>
            <strong>Shipping Address:</strong> {formData.address}, {formData.city}
          </p>
          <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
          {formData.paymentMethod === "mpesa" ? (
            <button onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          ) : (
            <button onClick={handleSubmit}>Confirm Order</button>
          )}
          <button onClick={() => setShowReview(false)}>Edit Details</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
