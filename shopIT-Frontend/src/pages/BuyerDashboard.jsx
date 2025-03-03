import React, { useState, useEffect } from "react";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);

  const url = ""

  // GET PRODUCTS
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <h2>Welcome, Buyer!</h2>
      <p>This is your buyer dashboard. You can browse products here.</p>

      <h3>Available Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
           <img src={product.image} alt={product.name} loading="lazy" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <p className="category">{product.category}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerDashboard;
