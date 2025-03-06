import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("unpaid");

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

  const filterOrders = (status) => {
    return orders.filter(order => order.status?.toLowerCase() === status.toLowerCase());
  };

  return (
    <div className="orders-container p-5">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {/* Navigation Tabs */ }
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

export default Orders;
