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
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="orders-container">
      <style>
        {`
          .orders-container {
            max-width: 1200px;
            margin: 50px auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            display: flex;
            gap: 30px;
          }

          h2 {
            font-size: 28px;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          .order-tabs {
            display: flex;
            flex-direction: column;
            gap: 15px;
            flex: 1;
          }

          .order-tab-card {
            padding: 15px;
            font-size: 18px;
            text-align: center;
            border-radius: 8px;
            background: #eee;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .order-tab-card:hover {
            transform: translateY(-3px);
            background: #ddd;
          }

          .active-tab {
            background: #ff6600;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(255, 102, 0, 0.3);
          }

          .orders-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 0;
            list-style: none;
            flex: 3;
          }

          .order-item {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards;
          }

          .order-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
          }

          .order-item h3 {
            margin-bottom: 10px;
            color: #ff6600;
          }

          .order-item p {
            margin: 5px 0;
            color: #555;
          }

          .order-item ul {
            margin-top: 10px;
            padding-left: 20px;
            text-align: left;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .orders-container {
              flex-direction: column;
              align-items: center;
            }
            .orders-list {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 480px) {
            .orders-list {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <h2>Your Orders</h2>

      {/* Navigation Tabs - Vertical Card Design */}
      <div className="order-tabs">
        {["unpaid", "toBeShipped", "delivered", "cancelled", "returned"].map((tab) => (
          <div
            key={tab}
            className={`order-tab-card ${activeTab === tab ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
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
