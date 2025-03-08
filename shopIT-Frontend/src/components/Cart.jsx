import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  // Initialize quantities based on cart items
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Handle updating the quantity of an item in the cart
  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      setQuantities((prev) => ({ ...prev, [id]: quantity }));
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * (quantities[item.id] || 1), 0)
      .toFixed(2);
  };

  // Navigate to the checkout page with cart and total price as state
  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, totalPrice: calculateTotalPrice() } });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} width="50" />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={quantities[item.id] || 1}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              />
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div>
          <h3>Total: ${calculateTotalPrice()}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;