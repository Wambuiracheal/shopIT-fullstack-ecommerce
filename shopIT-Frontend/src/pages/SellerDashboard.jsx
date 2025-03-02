import React, { useState, useEffect } from "react";

const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, Alex: "User 1", email: "Alex@gmail.com" },
        { id: 2, Victor: "User 2", email: "Victor2@gmail.com" },
        { id: 3, Natalie: "User 3", email: "Natalie@gmail.com" },
      ]);
    }, 1000); 
  });
};

function SellerDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: "$10", description: "A great product" },
    { id: 2, name: "Product 2", price: "$20", description: "Another awesome product" },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
        setLoadingUsers(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, newProductWithId]);
    setNewProduct({ name: "", price: "", description: "" });
  };

  return (
    <div>
      <h2>Welcome, Seller!</h2>
      <p>This is your seller dashboard. You can manage your products here.</p>

      <div>
        <h3>Add New Product:</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div>
        <h3>Product List:</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.price}
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Users Who Are Browsing Your Products:</h3>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users.length === 0 ? (
              <p>No users available</p>
            ) : (
              users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;
