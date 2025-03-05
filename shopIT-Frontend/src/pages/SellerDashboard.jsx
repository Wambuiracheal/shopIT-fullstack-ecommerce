import React,  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();

  const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, Alex: "User 1", email: "Alex@gmail.com" },
          { id: 2, Victor: "User 2", email: "Victor2@gmail.com" },
          { id: 3, Natalie: "User 3", email: "Natalie@gmail.com" },
        ]);
      }, 1000); 
    });
  };

function SellerDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: "$10", description: "A great product" },
    { id: 2, name: "Product 2", price: "$20", description: "Another awesome product" },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, newProductWithId]);
    setNewProduct({ name: "", price: "", description: "" });

  return (
    <div className="dashboard-container">
      <h2>Welcome, Seller!</h2>
      <p>Manage your profile, buyers, and products easily.</p>

      {/* SELLER DASHBOARD CARDS */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/seller-profile")}> 
          <h3>Seller Profile</h3>
          <p>Manage your account details.</p>
        </div>
        <div className="card" onClick={() => navigate("/buyers-page")}> 
          <h3>Buyers</h3>
          <p>View and manage buyers.</p>
        </div>
        <div className="card" onClick={() => navigate("/products-page")}> 
          <h3>Products</h3>
          <p>View and manage your products.</p>
        </div>
      </div>

      <div>
        <h3>Users Who Are Browsing Your Products:</h3>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.length === 0 ? (
              <p>No users available</p>
            ) : (
              users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;
