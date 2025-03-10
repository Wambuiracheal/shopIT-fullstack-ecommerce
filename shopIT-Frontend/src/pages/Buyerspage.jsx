import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:5000/buyers-page"
function Buyers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "buyer" });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  
  // Fetch users from API
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [url]);

  // Handle input change for adding/updating users
  function handleChange(e) {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  }

  // Add a new user
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((newUserData) => {
        setUsers((prev) => [...prev, newUserData]);
        setNewUser({ name: "", email: "", role: "buyer" });
      })
      .catch((err) => console.error("Error adding user:", err));
  }

  // Delete a user
  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err));
  }

  // Set user to edit mode
  function handleEdit(user) {
    setEditingUser(user);
  }

  // Update an existing user
  function handleUpdate(e) {
    e.preventDefault();
    fetch(`${url}/${editingUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      })
      .catch((err) => console.error("Error updating user:", err));
  }

  return (
    <div className="container">
      <h2>Admin: Manage Buyers</h2>
      <p>As an admin, you can add, update, and delete buyers.</p>

      {/* Add New User Form */}
      {!editingUser && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <button type="submit" className="add-btn">Add Buyer</button>
        </form>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={editingUser.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}

      {/* Users List */}
      <h3>Buyers List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <div>
              <button className="update-btn" onClick={() => handleEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buyers;
