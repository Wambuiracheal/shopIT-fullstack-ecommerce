import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Search from "./components/Search";


const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop.", price: "$999", image: "https://gfx3.senetic.com/akeneo-catalog/f/a/c/3/fac3b370ffd4c9772a8f16b20c740098428091d7_1626663_5B2_00043_image5.jpg", category: "Electronics" },
  { id: 2, name: "Running Shoes", description: "Comfortable running shoes.", price: "$120", image: "https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?$dw_detail_gallery$", category: "Shoes" },
  { id: 3, name: "Lipstick Set", description: "Matte lipstick collection.", price: "$35", image: "https://m.media-amazon.com/images/I/71vSoefUU7L._SL1500_.jpg", category: "Beauty" },
  { id: 4, name: "Gaming Console", description: "Next-gen gaming console.", price: "$499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCATuQwbIztTbMWOb4vAWVx6IOdb0EodH4A&s", category: "Gaming" },
  { id: 5, name: "Designer T-Shirt", description: "Premium quality cotton T-shirt.", price: "$49", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2HDoIQRHyOBk8uJ6vqJL5O4gxDfj4L9fBtw&s", category: "Clothing" },
  { id: 6, name: "Camera", description: "Professional DSLR camera.", price: "$1,299", image: "https://i5.walmartimages.com/seo/Canon-EOS-90D-DSLR-Camera-with-18-135mm-Lens_7437e3a7-c228-4f7e-9a4a-913ed3c69cdd_1.d37dc514f4f3f657db267af16621a2ae.jpeg", category: "Photography" },
  { id: 7, name: "Water Bottle", description: "Durable and reusable water bottle.", price: "$89", image: "https://cdn.mafrservices.com/sys-master-root/hcd/hd5/61956896063518/177318_main.jpg?im=Resize=480", category: "Accessories" },
  { id: 8, name: "Dress", description: "Elegant and stylish dress.", price: "$299", image: "https://img01.ztat.net/article/spp-media-p1/c21b425595b845fa833f5cd501e52033/6e5e02ecb8684477b5984b43817f2230.jpg?imwidth=1800&filter=packshot", category: "Wearables" },
];

function App() {
  const navigate = useNavigate(); // React Router navigation

  const addToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      {/* NAVBAR */}
      <div id="navbar-home">
        <div id="logo-container">
          <img id="logo" src="https://via.placeholder.com/90" alt="Logo" />
        </div>

        {/* PROFILE & AUTH LINKS */}
        <div id="profile-container">
          <div id="profile-icon">
            <img src="https://cdn-icons-png.flaticon.com/512/456/456283.png" alt="User Profile" />
          </div>
          <div id="auth-links">
            <a href="#SignupPage" className="auth-link">Sign Up</a> / <a href="#LoginPage" className="auth-link">Log In</a>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div id="content">
        {/* SEARCH BAR */}
        <div id="search-container">
          <Search />
        </div>

        {/* PRODUCT GRID */}
        <div id="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price}</p>
              <p className="category">{product.category}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
