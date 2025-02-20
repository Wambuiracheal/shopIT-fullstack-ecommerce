import React, { useState, useEffect } from "react";

const ProductListing = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from API or local data
        fetch("https://fakestoreapi.com/products") // Replace with actual API
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h2>Product Listing</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {products.map((product) => (
                    <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                        <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
                        <h4>{product.title}</h4>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
