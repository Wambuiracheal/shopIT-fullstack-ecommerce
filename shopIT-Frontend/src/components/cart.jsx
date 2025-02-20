import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../features/cartSlice";

function Cart() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity >= 1) {
            dispatch(updateQuantity({ id, quantity}));
        }
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
                            <img src={item.image} alt={item.title} width="50"/>
                            <p>{item.title}</p>
                            <p>Price: ${item.price}</p>
                            <input
                              type="number"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && <button>Proceed to Checkout</button>}
        </div>
    )
}

export default Cart;