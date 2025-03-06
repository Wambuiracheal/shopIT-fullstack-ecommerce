import React from "react";
import { useNavigate } from "react-router-dom";

function SellersDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome, Seller!</h2>
      <p>Manage your profile and products easily.</p>

      {/* SELLER DASHBOARD CARDS */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/seller-profile")}> 
          <h3>Seller Profile</h3>
          <p>Manage your account details.</p>
        </div>
        <div className="card" onClick={() => navigate("/products-management")}> 
          <h3>Products</h3>
          <p>View and manage your products.</p>
        </div>
      </div>
    </div>
  );
}

export default SellersDashboard;
