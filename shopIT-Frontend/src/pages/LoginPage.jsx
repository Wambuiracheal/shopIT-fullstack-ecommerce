import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from 'jwt-decode';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  

    try {
      const success = await loginUser(email, password);

      if (success) {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwt_decode(token);

          if (decoded.role === "seller") {
            navigate("/seller-dashboard");  
          } else {
            navigate("/buyer-dashboard");  
          }
        } else {
          setError("No token found. Please try again.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="spinner"></span>  
          ) : (
            "Login"
          )}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>} 

      <p>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "blue", textDecoration: "underline" }}>
          Sign up here
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
