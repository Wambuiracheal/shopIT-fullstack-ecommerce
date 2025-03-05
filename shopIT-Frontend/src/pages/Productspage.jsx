import React, { useState, useEffect } from "react";

const url = "http://127.0.0.1:5555/products"

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  // FETCH PRODUCTS ON LOAD
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
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
        setProducts([...products, newProd]);
        setNewProduct({ name: "", category: "", price: "", description: "" });
      })
      .catch((err) => console.error("Error adding product:", err));
  }

  // DELETE PRODUCT
  function handleDelete(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
      })
      .catch((err) => console.error("Error deleting product:", err));
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
        setProducts((prevProducts) =>
          prevProducts.map((prod) => (prod.id === id ? updatedProd : prod))
        );
      })
      .catch((err) => console.error("Error updating product:", err));
  }

  return (
    <div className="products-container">
      <h2>Manage Your Products</h2>

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

      {/* PRODUCT LIST */}
      <div className="product-list">
        <h3>Product List:</h3>
        <ul>
          {products.length > 0 ? (
            products.map((prod) => (
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
  );
}

export default ProductsPage;
