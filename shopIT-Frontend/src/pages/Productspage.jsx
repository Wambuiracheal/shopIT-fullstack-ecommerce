import React, { useState, useEffect } from "react";
import styled from "styled-components";

const url = "http://127.0.0.1:5000/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((newProd) => {
        setProducts((prev) => [...prev, newProd]);
        setNewProduct({ name: "", price: 0, description: "", category: "", image: "" });
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

  function handleUpdate(id, updatedProduct) {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((updatedProd) => {
        setProducts((prev) => prev.map((prod) => (prod.id === id ? updatedProd : prod)));
      })
      .catch((err) => console.error("Error updating product:", err));
  }

  function handleDelete(id) {
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then(() => setProducts((prev) => prev.filter((prod) => prod.id !== id)))
      .catch((err) => console.error("Error deleting product:", err));
  // ADD PRODUCT TO CART
  function handleAddToCart(product) {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  }

  return (
    <Container>
      <h2>Manage Your Products</h2>
      <NewProductForm onSubmit={handleSubmit}>
        <h1 className="title">ADD NEW PRODUCT</h1>
        <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Enter product name..." required />
        <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Enter price..." required />
        <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Enter description..." required />
        <input type="text" name="category" value={newProduct.category} onChange={handleChange} placeholder="Enter category..." required />
        <input type="text" name="image" value={newProduct.image} onChange={handleChange} placeholder="Enter image URL..." required />
        <button type="submit" className="submit-btn">Add New Product</button>
      </NewProductForm>
      <ProductList>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <UpdateForm
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedProduct = Object.fromEntries(formData.entries());
                handleUpdate(product.id, updatedProduct);
              }}
            >
              <input type="text" name="name" placeholder="Update name" defaultValue={product.name} required />
              <input type="number" name="price" placeholder="Update price" defaultValue={product.price} required />
              <button type="submit">Update</button>
            </UpdateForm>
            <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            <button className="cart-btn">Add to Cart</button>
          </ProductCard>
        ))}
      </ProductList>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 250px;
  padding: 20px;
  max-width: 1200px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  h2 { text-align: center; color: #ff6600; }
`;

const NewProductForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  input, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
  .submit-btn { background-color: #ff6600; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; &:hover { background-color: #e65c00; } }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  img { width: 100%; border-radius: 10px; }
  h3 { color: #ff6600; }
  .category, .price, .description { font-size: 14px; color: #777; }
  .delete-btn, .cart-btn { margin-top: 10px; padding: 8px; border: none; border-radius: 5px; cursor: pointer; }
  .delete-btn { background: red; color: white; }
  .cart-btn { background: green; color: white; }
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
  input { padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
  button { background: blue; color: white; padding: 5px; border: none; border-radius: 5px; cursor: pointer; }
`;}
export default ProductsPage;