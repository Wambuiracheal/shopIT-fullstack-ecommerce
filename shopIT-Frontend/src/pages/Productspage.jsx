import React, { useState, useEffect } from "react";

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
    fetch(`${url}`, {
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

      {/* PRODUCT LIST */}
      <div className="product-list">
        <h3>Product List:</h3>
        <ul>
          {products.length > 0 ? (
            products.map((prod, idx) => (
              <li key={idx}>
                <strong>Name: </strong>{prod.name}<br />
                <strong>Category: </strong> {prod.category} <br />
                <strong>Price: </strong> ${prod.price} <br />
                <strong>Description: </strong> {prod.description} <br />
                <strong>Image: </strong>{prod.image}<br />
                <button onClick={(event) => handleDelete(event, prod.id)}>Delete</button>
                {/* <img src={prod.image ? prod.image : ""} alt="product image" srcset="" /> */}
                
                {/* UPDATE FORM */}
                <form onSubmit={handleUpdate}>
                  <label>Name: <input name="name" type="text" onChange={handleChange} placeholder="edit name..." required /></label>              
                  <label>Price: <input name="price" type="number" onChange={handleChange} placeholder="edit price..."required /></label>
                  <button onClick={(event) => handleUpdate(event, prod.id)}>Update</button>
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
