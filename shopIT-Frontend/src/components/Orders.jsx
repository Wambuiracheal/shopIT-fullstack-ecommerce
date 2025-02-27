import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("unpaid");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = (status) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      {/* Navigation Tabs */}
      <div className="order-tabs">
        <button 
          className={activeTab === "unpaid" ? "active-tab" : ""} 
          onClick={() => setActiveTab("unpaid")}
        >
          Unpaid
        </button>
        <button 
          className={activeTab === "toBeShipped" ? "active-tab" : ""} 
          onClick={() => setActiveTab("toBeShipped")}
        >
          To Be Shipped
        </button>
        <button 
          className={activeTab === "delivered" ? "active-tab" : ""} 
          onClick={() => setActiveTab("delivered")}
        >
          Delivered
        </button>
        <button 
          className={activeTab === "cancelled" ? "active-tab" : ""} 
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
        <button 
          className={activeTab === "returned" ? "active-tab" : ""} 
          onClick={() => setActiveTab("returned")}
        >
          Returned
        </button>
      </div>

      {/* Orders List */}
      {filterOrders(activeTab).length === 0 ? (
        <p>No orders in this category.</p>
      ) : (
        <ul className="orders-list">
          {filterOrders(activeTab).map((order, index) => (
            <li className="order-item" key={index}>
              <h3>Order #{index + 1}</h3>
              <p><strong>Name:</strong> {order.fullName}</p>
              <p><strong>Address:</strong> {order.address}, {order.city}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} - ${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
