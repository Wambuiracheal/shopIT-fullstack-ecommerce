import React, { useState, useEffect } from "react";

function SellerManagement() {
  const [sellers, setSellers] = useState([]);
  const [newSeller, setNewSeller] = useState({ name: "", email: "", shopName: "" });
  const [editingSeller, setEditingSeller] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSellers();
  }, []);

  // Fetch all sellers
  function fetchSellers() {
    fetch("/api/sellers")
      .then((response) => response.json())
      .then((data) => setSellers(data))
      .catch(() => setError("Failed to load sellers."));
  }

  // Add a new seller
  function handleAddSeller(e) {
    e.preventDefault();
    if (!newSeller.name || !newSeller.email || !newSeller.shopName) {
      setError("All fields are required!");
      return;
    }

    fetch("/api/sellers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSeller),
    })
      .then((response) => response.json())
      .then((addedSeller) => {
        setSellers([...sellers, addedSeller]);
        setNewSeller({ name: "", email: "", shopName: "" });
        setError("");
      })
      .catch(() => setError("Error adding seller."));
  }

  // Edit a seller
  function handleEditSeller(seller) {
    setEditingSeller(seller);
    setNewSeller({ name: seller.name, email: seller.email, shopName: seller.shopName });
  }

  // Update a seller
  function handleUpdateSeller(e) {
    e.preventDefault();
    if (!editingSeller) return;

    fetch(`/api/sellers/${editingSeller.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSeller),
    })
      .then((response) => response.json())
      .then((updatedSeller) => {
        setSellers(sellers.map((s) => (s.id === updatedSeller.id ? updatedSeller : s)));
        setEditingSeller(null);
        setNewSeller({ name: "", email: "", shopName: "" });
        setError("");
      })
      .catch(() => setError("Error updating seller."));
  }

  // Delete a seller
  function handleDeleteSeller(id) {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;

    fetch(`/api/sellers/${id}`, { method: "DELETE" })
      .then(() => {
        setSellers(sellers.filter((s) => s.id !== id));
      })
      .catch(() => setError("Error deleting seller."));
  }

  return (
    <div className="seller-management">
      <h2>Seller Management</h2>
      {error && <p className="error">{error}</p>}

      {/* Add/Edit Seller Form */}
      <form onSubmit={editingSeller ? handleUpdateSeller : handleAddSeller}>
        <input
          type="text"
          placeholder="Seller Name"
          value={newSeller.name}
          onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Seller Email"
          value={newSeller.email}
          onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Shop Name"
          value={newSeller.shopName}
          onChange={(e) => setNewSeller({ ...newSeller, shopName: e.target.value })}
          required
        />
        <button type="submit">{editingSeller ? "Update Seller" : "Add Seller"}</button>
      </form>

      {/* Seller List */}
      <h3>Seller List</h3>
      <ul>
        {sellers.map((seller) => (
          <li key={seller.id}>
            {seller.name} - {seller.email} - {seller.shopName}
            <button onClick={() => handleEditSeller(seller)}>Edit</button>
            <button onClick={() => handleDeleteSeller(seller.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellerManagement;
