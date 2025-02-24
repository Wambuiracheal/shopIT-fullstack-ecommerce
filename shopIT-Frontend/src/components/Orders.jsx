import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("");
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

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
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
