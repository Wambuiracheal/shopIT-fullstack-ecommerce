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
    <div>
      <h2>Your Orders</h2>
      <div style={{ display: "flex", justifyContent: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("unpaid")}>Unpaid</button>
        <button onClick={() => setActiveTab("toBeShipped")}>To Be Shipped</button>
        <button onClick={() => setActiveTab("delivered")}>Delivered</button>
        <button onClick={() => setActiveTab("cancelled")}>Cancelled</button>
        <button onClick={() => setActiveTab("returned")}>Returned</button>
      </div>

      {filterOrders(activeTab).length === 0 ? (
        <p>No orders in this category.</p>
      ) : (
        <ul>
          {filterOrders(activeTab).map((order, index) => (
            <li key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
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
