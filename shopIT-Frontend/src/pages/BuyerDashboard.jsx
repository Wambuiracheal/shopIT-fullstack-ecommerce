import React, { useState, useEffect } from "react";
const products = [
  { id: 1, name: "Product 1", price: "$10" },
  { id: 2, name: "Product 2", price: "$20" },
  { id: 3, name: "Product 3", price: "$30" },
];

function BuyerDashboard() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, []);

  return (
    <div>
      <h2>Welcome, Buyer!</h2>
      <p>This is your buyer dashboard. You can browse products here.</p>

      <h3>Available Products</h3>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <p>Price: {product.price}</p>
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerDashboard;
