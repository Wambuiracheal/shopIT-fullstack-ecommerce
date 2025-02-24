import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; 

function DashboardPage() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwt_decode(token);
      setRole(decoded.role);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (role === "seller") {
      navigate("/seller-dashboard");
    } else if (role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (role !== null) {
      navigate("/error"); 
    }
  }, [role, navigate]);

  if (role === null) {
    return (
      <div className="loading">
        <p>Loading...</p> 
      </div>
    );
  }

  return null; 
}

export default DashboardPage;
