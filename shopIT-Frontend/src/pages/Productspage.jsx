import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const url = "http://127.0.0.1:5000/products"

function ProductsPage() {
  // console.log("Product ID:", id)
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    image: "",
    id:0
  });

  // FETCH PRODUCTS ON LOAD
  useEffect(() => {
    fetch(`${url}`, {
      method:"GET"
    })
      .then((res) =>{ 
        console.log(res)
        return res.json()}
    )
      .then(data => {
        setProducts(data)
      })

  }, []);

  // HANDLE INPUT CHANGE
  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value

    setNewProduct({
      ...newProduct,
      [name]:value
    })
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
        setNewProduct({ name: "", category: "", price: "", description: "", image:"" });
      })
      .catch((err) => console.error("Error adding product:", err));
  }

  // DELETE PRODUCT
  function handleDelete(e,id) {
    e.preventDefault()
    fetch(`${url}/${id}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then(() => {
        let remainingProduct = products.filter(prod => prod.id !== id)
        setProducts(remainingProduct)
      })
      .catch((err) => console.error("Error deleting product:", err));
  }

  // UPDATE PRODUCT
  function handleUpdate(e,id) {
    e.preventDefault()
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(newProduct => {
          const updatedProd = products.map(prod => {
            if (prod.id === id){
              prod.name = newProduct.name,
              prod.price = newProduct.price
            }
            return(newProduct)
          })
          setProducts(updatedProd)
          alert(`Updated ${name}`)
      })
      .catch((err) => console.error("Error updating product:", err));
  }

  // ADD PRODUCT TO CART
  function handleAddToCart(product) {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  }

  return (
    <div className="products-container">
      <h2>Manage Your Products</h2>

      {/* ADD NEW PRODUCT FORM */}
      <div className="product-form">
        <h3>Add New Product:</h3>
        <form onSubmit={handleSubmit}>
        <label> 
          Name: <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Enter product name.." required />
        </label>

        <label> 
          Price: <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Enter product price.." required />
        </label>

        <label> 
          Description: <textarea name="description" value={newProduct.description} onChange={handleChange} placeholder="Enter product description.." required />
        </label>

        <label> 
          Category: 
          <select name="category" value={newProduct.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="electronics">Electronics</option>
            <option value="utensils">Utensils</option>
            <option value="beauty">Beauty Products</option>
          </select>
        </label>

        <label> 
          Image URL: <input type="text" name="image" value={newProduct.image} onChange={handleChange} placeholder="Enter image URL..." required />
        </label>

          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* PRODUCT LIST IN A 4-COLUMN GRID */}
      <div className="product-list">
        <h3>Product List:</h3>
        <div className="grid-container">
          {products.length > 0 ? (
            products.map((prod, idx) => (
              <div key={idx} className="product-card">
                <strong>Name: </strong>{prod.name}<br />
                <strong>Category: </strong> {prod.category} <br />
                <strong>Price: </strong> ${prod.price} <br />
                <strong>Description: </strong> {prod.description} <br />
                {prod.image && <img src={prod.image} alt="product" />} <br />
                <button onClick={(event) => handleDelete(event, prod.id)}>Delete</button>
                
                {/* UPDATE FORM */}
                <form onSubmit={handleUpdate} id="update-form">
                  <label>Name: <input name="name" type="text" onChange={handleChange} placeholder="edit name..." required /></label>              
                  <label>Price: <input name="price" type="number" onChange={handleChange} placeholder="edit price..."required /></label>
                  <button onClick={(event) => handleUpdate(event, prod.id)}>Update</button>
                </form>
                
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
      
      {/* INLINE STYLES */}
      <style>{`
        .products-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2, h3 {
          color: #ff6600;
          text-align: center;
        }

        .product-form {
          background: #fff3e0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 20px auto;
        }

        .product-form input,
        .product-form textarea,
        .product-form select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ff9900;
          border-radius: 5px;
        }

        .product-form button {
          background-color: #ff6600;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .product-card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .product-card img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
        }

        .product-card button {
          background-color: #ff3300;
          color: white;
          padding: 8px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        .product-card form {
          margin-top: 10px;
        }

        .product-card input {
          width: 80%;
          padding: 5px;
          border: 1px solid #ff6600;
          border-radius: 5px;
          margin-top: 5px;
        }

        .product-card button {
          width: 80%;
          margin-top: 5px;
        }

        @media (max-width: 1024px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>

    // INLINE STYLES
    
  );
}

export default ProductsPage;