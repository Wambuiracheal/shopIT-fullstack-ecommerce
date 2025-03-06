import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome, Admin!</h2>
      <p>Manage users, sellers, products, and platform settings.</p>

      {/* ADMIN DASHBOARD CARDS */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/users-management")}> 
          <h3>Users</h3>
          <p>View and manage all users (buyers & sellers).</p>
        </div>
        <div className="card" onClick={() => navigate("/products-management")}> 
          <h3>Products</h3>
          <p>View and manage all products.</p>
        </div>
        <div className="card" onClick={() => navigate("/site-settings")}> 
          <h3>Settings</h3>
          <p>Manage platform settings and configurations.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
