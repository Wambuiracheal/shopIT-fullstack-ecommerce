import React, { useState, useEffect } from "react";

const url = "http://127.0.0.1:5555/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [cart, setCart] = useState([]);

  // FETCH PRODUCTS ON LOAD
  useEffect(() => {
    fetch(url)
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
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((newProd) => {
        setProducts([...products, newProd]);
        setNewProduct({ name: "", category: "", price: "", description: "", image: "" });
      })
      .catch((err) => console.error("Error adding product:", err));
  }

  // DELETE PRODUCT
  function handleDelete(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((prod) => prod.id !== id));
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

  // ADD TO CART
  function handleAddToCart(product) {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  }

  return (
    <div className="products-container">
      <h2>Manage Your Products</h2>

      {/* ADD NEW PRODUCT FORM */}
      <div className="product-form">
        <h3>Add New Product:</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input type="text" name="category" value={newProduct.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={newProduct.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input type="text" name="image" value={newProduct.image} onChange={handleChange} required />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="product-list">
        <h3>Products</h3>
        {products.length > 0 ? (
          <div className="grid-container">
            {products.map((prod) => (
              <div className="product-card" key={prod.id}>
                <img src={prod.image} alt={prod.name} className="product-image" />
                <h4>{prod.name}</h4>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Price:</strong> ${prod.price}</p>
                <p>{prod.description}</p>
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
                <button onClick={() => handleAddToCart(prod)}>Add to Cart</button>

                {/* UPDATE FORM */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const updatedProduct = Object.fromEntries(formData.entries());
                    handleUpdate(prod.id, updatedProduct);
                  }}
                >
                  <div className="form-group">
                    <label>Name:</label>
                    <input name="name" type="text" defaultValue={prod.name} required />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <input name="category" type="text" defaultValue={prod.category} required />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input name="price" type="number" defaultValue={prod.price} required />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" defaultValue={prod.description} required />
                  </div>
                  <div className="form-group">
                    <label>Image URL:</label>
                    <input name="image" type="text" defaultValue={prod.image} required />
                  </div>
                  <button type="submit">Update</button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* CART SECTION */}
      <div className="cart-section">
        <h3>Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;