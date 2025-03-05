import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items); // Get cart items from Redux store

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Handle "Add to Cart"
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 })); // Default quantity is 1
    };

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                {products.map((product) => (
                    <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", paddingBottom: "15px" }}>
                        <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
                        <h4>{product.title}</h4>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p style={{ fontSize: "14px", color: "#555" }}>{product.description}</p>

                        {/* Add to Cart Button (without quantity input) */}
                        <button 
                            onClick={() => handleAddToCart(product)} 
                            style={{ 
                                backgroundColor: "#28a745", 
                                color: "white", 
                                border: "none", 
                                padding: "8px 12px", 
                                borderRadius: "5px", 
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}
                        >
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
