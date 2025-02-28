import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard({ url }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  // GET PRODUCTS
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [url]);

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }

  // DELETE PRODUCT
  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setProduct((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
  }

  // ADD NEW PRODUCT
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((newProd) => {
        setProduct([...product, newProd]);
        setNewProduct({ name: "", category: "", price: "", image: "", description: "" });
      })
      .catch((err) => console.error("Error adding product:", err));
  }

  // UPDATE PRODUCT
  function handleUpdate(id, updatedProduct) {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((updatedProd) => {
        setProduct((prevProducts) =>
          prevProducts.map((prod) => (prod.id === id ? updatedProd : prod))
        );
      })
      .catch((err) => console.error("Error updating product:", err));
  }

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
        <div className="card" onClick={() => navigate("/buyers")}>
          <h3>Buyers</h3>
          <p>View and manage buyers.</p>
        </div>
        <div className="card" onClick={() => setShowProducts(true)}>
          <h3>Products</h3>
          <p>View and manage your products.</p>
        </div>
      </div>

      {/* PRODUCT MANAGEMENT SECTION */}
      {showProducts && (
        <div className="products-section">
          {/* ADD NEW PRODUCT FORM */}
          <div className="product-form">
            <h3>Add New Product:</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Product Name" required />
              <input type="text" name="category" value={newProduct.category} onChange={handleChange} placeholder="Category" required />
              <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Price" required />
              <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Description" required />
              <button type="submit">Add Product</button>
            </form>
          </div>

          {/* DISPLAY PRODUCT LIST */}
          <div className="product-list">
            <h3>Product List:</h3>
            <ul>
              {product.length > 0 ? (
                product.map((prod) => (
                  <li key={prod.id}>
                    <strong>Name:</strong> {prod.name} <br />
                    <strong>Category:</strong> {prod.category} <br />
                    <strong>Price:</strong> ${prod.price} <br />
                    <strong>Description:</strong> {prod.description} <br />
                    <button onClick={() => handleDelete(prod.id)}>Delete</button>

                    {/* UPDATE FORM */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const updatedProduct = Object.fromEntries(formData.entries());
                        handleUpdate(prod.id, updatedProduct);
                      }}
                    >
                      <input name="name" type="text" defaultValue={prod.name} required />
                      <input name="category" type="text" defaultValue={prod.category} required />
                      <input name="price" type="number" defaultValue={prod.price} required />
                      <textarea name="description" defaultValue={prod.description} required />
                      <button type="submit">Update</button>
                    </form>
                  </li>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;
