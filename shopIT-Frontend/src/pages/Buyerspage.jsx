import React, { useState, useEffect } from "react";

const url = "http://127.0.0.1:5000/user";

function BuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [newBuyer, setNewBuyer] = useState({
    name: "",
    email: "",
  });
  const [orders, setOrders] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  // FETCH BUYERS ON LOAD
  useEffect(() => {
    fetch(`${url}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setBuyers(data));
  }, []);

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setNewBuyer({ ...newBuyer, [name]: value });
  }

  // ADD NEW BUYER
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBuyer),
    })
      .then((res) => res.json())
      .then((newB) => {
        setBuyers([...buyers, newB]);
        setNewBuyer({ name: "", email: "" });
      });
  }

  // DELETE BUYER
  function handleDelete(e, id) {
    e.preventDefault();
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then(() => {
        setBuyers(buyers.filter((buyer) => buyer.id !== id));
      });
  }

  // MANAGE ORDERS
  function handleViewOrders(buyerId) {
    fetch(`${url}/${buyerId}/orders`, { method: "GET" })
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
        setSelectedBuyer(buyerId);
      });
  }

  return (
    <div className="buyers-container">
      <h2>Manage Your Buyers</h2>
      <div className="buyer-form">
        <h3>Add New Buyer:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name: <input type="text" name="name" value={newBuyer.name} onChange={handleChange} required />
          </label>
          <label>
            Email: <input type="email" name="email" value={newBuyer.email} onChange={handleChange} required />
          </label>
          <button type="submit">Add Buyer</button>
        </form>
      </div>
      <div className="buyer-list">
        <h3>Buyer List:</h3>
        {buyers.length > 0 ? (
          buyers.map((buyer) => (
            <div key={buyer.id} className="buyer-card">
              <strong>Name: </strong>{buyer.name}<br />
              <strong>Email: </strong>{buyer.email}<br />
              <button onClick={(event) => handleDelete(event, buyer.id)}>Delete</button>
              <button onClick={() => handleViewOrders(buyer.id)}>View Orders</button>
            </div>
          ))
        ) : (
          <p>No buyers available.</p>
        )}
      </div>
      {selectedBuyer && (
        <div className="orders-section">
          <h3>Orders for Buyer ID {selectedBuyer}:</h3>
          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}><strong>Order ID:</strong> {order.id}, <strong>Total:</strong> ${order.total_amount}, <strong>Status:</strong> {order.status}</li>
              ))}
            </ul>
          ) : (
            <p>No orders found for this buyer.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BuyersPage;
