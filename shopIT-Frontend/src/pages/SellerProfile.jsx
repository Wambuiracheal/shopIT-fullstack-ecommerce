import React, { useState } from "react";

const SellerProfile = () => {
  // Dummy user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "seller",
    avatar: "https://via.placeholder.com/100",
  };

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Seller Info:", formData);
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src={user.avatar}
          alt="Seller Avatar"
          style={styles.avatar}
        />
        {editing ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Save</button>
            <button type="button" style={styles.cancelButton} onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h2 style={styles.name}>{user.name}</h2>
            <p style={styles.email}>{user.email}</p>
            <button style={styles.button} onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  profileCard: {
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
    border: "3px solid #ff6600",
  },
  name: {
    margin: "10px 0",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    color: "#666",
    fontSize: "1.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#ff6600",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
  },
};

export default SellerProfile;
