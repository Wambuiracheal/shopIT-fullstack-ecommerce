import React, { useState, useEffect } from "react";

const url = "http://127.0.0.1:5000/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle input changes for adding/updating users
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
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((newUserData) => {
        setUsers((prev) => [...prev, newUserData]);
        setNewUser({ name: "", email: "", role: "" });
      })
      .catch((err) => console.error("Error adding user:", err));
  }

  // Delete a user
  function handleDelete(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
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
        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
      })
      .catch((err) => console.error("Error updating user:", err));
  }

  return (
    <div className="container">
      <h2>Admin: Manage Users</h2>
      <p>Add, update, and delete users.</p>

      {/* Add New User Form */}
      {!editingUser && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={newUser.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={newUser.email} onChange={handleChange} placeholder="Email" required />
          <button type="submit" className="add-btn">Add User</button>
        </form>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={editingUser.name} onChange={handleChange} required />
          <input type="email" name="email" value={editingUser.email} onChange={handleChange} required />
          <input type="text" name="role" value={editingUser.role} onChange={handleChange} required />
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}

      {/* Users List */}
      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - <em>{user.role}</em>
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

export default Users;
