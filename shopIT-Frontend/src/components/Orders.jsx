import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Orders Component
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("unpaid");

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5555/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        console.log("Fetched Orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on status
  const filterOrders = (status) => {
    return orders.filter((order) => order.status?.toLowerCase() === status.toLowerCase());
  };

  return (
    <div className="orders-container p-5">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {/* Navigation Tabs */}
      <div className="order-tabs flex space-x-4 mb-4">
        {["unpaid", "toBeShipped", "delivered", "cancelled", "returned"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${activeTab === status ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => {
              console.log(`Switching to tab: ${status}`);
              setActiveTab(status);
            }}
          >
            {status.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {/* Debugging Info */}
      <p className="mb-2">
        Active Tab: <b>{activeTab}</b>
      </p>
      <p className="mb-4">Orders in this category: {filterOrders(activeTab).length}</p>

      {/* Orders List */}
      {filterOrders(activeTab).length === 0 ? (
        <p className="text-gray-500">No orders in this category.</p>
      ) : (
        <ul className="orders-list">
          {filterOrders(activeTab).map((order, index) => (
            <li key={order.id || index} className="order-item border p-3 mb-2 rounded shadow-md">
              <h3 className="text-lg font-semibold">Order #{index + 1}</h3>
              <p><strong>Name:</strong> {order.full_name}</p>
              <p><strong>Address:</strong> {order.address}, {order.city}</p>
              <p><strong>Payment:</strong> {order.payment_method}</p>
              <p><strong>Total:</strong> ${order.total_amount.toFixed(2)}</p>
              <ul className="mt-2">
                {order.order_items?.length > 0 ? (
                  order.order_items.map((item) => (
                    <li key={item.id} className="ml-4">
                      {item.product_name} - ${item.price.toFixed(2)} x {item.quantity}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No items in this order.</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Payment Component
function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("254");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle phone number input with validation
  const handlePhoneChange = (e) => {
    let input = e.target.value;

    // Ensure "254" is always there and restrict to 9 more digits
    if (!input.startsWith("254")) {
      input = "254";
    } else if (input.length > 12) {
      input = input.slice(0, 12); // Max length 12 (254 + 9 digits)
    }

    setPhone(input);
  };

  // Handle payment submission
  const handlePay = (e) => {
    e.preventDefault();

    // Validate phone number and amount
    if (!phone || phone.length !== 12 || !amount) {
      alert("Please enter a valid phone number and amount.");
      return;
    }

    setLoading(true);

    // Send payment request to the server
    axios
      .post(
        "http://127.0.0.1:5000/mpesa/pay",
        { phone_number: phone, amount: amount },
        { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
      )
      .then((response) => {
        console.log("Payment Response:", response.data);
        alert("Payment successful! Check your phone for confirmation.");
        dispatch(clearCart()); // Clear cart after payment
        navigate("/orders"); // Redirect to orders page
      })
      .catch((error) => {
        console.error("Payment Error:", error);
        if (error.response) {
          alert(`Error: ${error.response.data.error || "Payment failed!"}`);
        } else {
          alert("Payment failed! Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2 className="title">shopIT</h2>
      <p className="subtitle">
        Pay with <span className="mpesa-text">M<span className="hyphen">-</span>pesa</span>
      </p>

      <form className="payment-form" onSubmit={handlePay}>
        {/* Phone Number Input (Auto-fills "254") */}
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="input-field"
          placeholder="2547XXXXXXXX"
          required
        />

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
          placeholder="Enter amount"
          required
        />

        {/* Pay Button */}
        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

// Export the components
export default Orders;