import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:5000/buyer";

function BuyersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "buyer" });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching buyers:", err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    if (editingUser) {
      setEditingUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  }

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
      .catch((err) => console.error("Error adding buyer:", err));
  }

  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting buyer:", err));
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

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
      .catch((err) => console.error("Error updating buyer:", err));
  }

  return (
    <div className="container">
      <style>
        {`
          .container {
            max-width: 700px;
            margin: auto;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h2, h3 {
            color: #343a40;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }
          .add-btn, .update-btn, .delete-btn, .cancel-btn {
            padding: 10px 15px;
            font-size: 14px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .add-btn { background-color: #28a745; color: white; }
          .update-btn { background-color: #007bff; color: white; }
          .delete-btn { background-color: #dc3545; color: white; }
          .cancel-btn { background-color: #6c757d; color: white; }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #ccc;
            background: white;
            border-radius: 5px;
            margin-bottom: 10px;
          }
        `}
      </style>
      <h2>Manage Buyers</h2>
      {!editingUser ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" required />
          <button type="submit" className="add-btn">Add Buyer</button>
        </form>
      ) : (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={editingUser.name} onChange={handleChange} required />
          <input type="email" name="email" value={editingUser.email} onChange={handleChange} required />
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}

      <h3>Buyers List</h3>
      <ul>
        {users.map((user, index) => (
          <li key={user.id || index}>
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

export default BuyersPage;
