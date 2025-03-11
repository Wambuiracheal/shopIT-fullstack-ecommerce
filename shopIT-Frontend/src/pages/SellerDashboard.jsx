import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaBoxOpen } from "react-icons/fa";

function SellerDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          /* General Page Styling */
          .dashboard-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #fff5e6; /* Light Orange Background */
            font-family: "Arial", sans-serif;
            padding: 20px;
          }

          /* Dashboard Content */
          .dashboard-content {
            background: white;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            max-width: 900px;
            width: 100%;
            border: 3px solid #ff6600; /* Orange border */
          }

          /* Header Styles */
          .dashboard-content h2 {
            font-size: 36px;
            font-weight: bold;
            color: #ff6600;
            margin-bottom: 10px;
          }

          .dashboard-content p {
            font-size: 18px;
            color: #555;
            margin-bottom: 20px;
          }

          /* Cards Container */
          .cards-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 20px;
          }

          /* Individual Card */
          .card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border: 2px solid #ff6600; /* Orange Border */
            position: relative;
            overflow: hidden;
          }

          /* Card Hover Effect */
          .card:hover {
            transform: scale(1.07);
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
            background-color: #ff6600;
            color: white;
          }

          .card:hover p, .card:hover h3 {
            color: white;
          }

          /* Icons */
          .card-icon {
            font-size: 50px;
            color: #ff6600;
            margin-bottom: 10px;
            transition: transform 0.3s ease-in-out;
          }

          .card:hover .card-icon {
            transform: rotate(360deg);
            color: white;
          }

          /* Card Headings */
          .card h3 {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
            transition: color 0.3s ease-in-out;
          }

          /* Card Text */
          .card p {
            font-size: 16px;
            color: #777;
            transition: color 0.3s ease-in-out;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .cards-container {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 480px) {
            .cards-container {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2>Welcome, Seller!</h2>
          <p>Manage your profile, buyers, and products easily.</p>

          {/* Dashboard Cards */}
          <div className="cards-container">
            {/* Seller Profile Card */}
            <div className="card" onClick={() => navigate("/seller-profile")}>
              <FaUser className="card-icon" />
              <h3>Seller Profile</h3>
              <p>Manage your account details.</p>
            </div>

            {/* Buyers Card */}
            <div className="card" onClick={() => navigate("/buyers-page")}>
              <FaUsers className="card-icon" />
              <h3>Buyers</h3>
              <p>View and manage buyers.</p>
            </div>

            {/* Products Card */}
            <div className="card" onClick={() => navigate("/products-page")}>
              <FaBoxOpen className="card-icon" />
              <h3>Products</h3>
              <p>View and manage your products.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerDashboard;
