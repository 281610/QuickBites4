import { useState } from "react";
import "./Cart.css";

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 10, cart: false, quantity: 1 },
    { id: 2, name: "Product 2", price: 20, cart: false, quantity: 1 },
    { id: 3, name: "Product 3", price: 30, cart: false, quantity: 1 },
  ]);

  function addToCart(item) {
    setCart([...cart, { ...item, cart: true }]);
    setProducts(products.map((p) => (p.id === item.id ? { ...p, cart: true } : p)));
  }

  function removeFromCart(item) {
    setCart(cart.filter((i) => i.id !== item.id));
    setProducts(products.map((p) => (p.id === item.id ? { ...p, cart: false } : p)));
  }

  function increase(item) {
    setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
  }

  function decrease(item) {
    setCart(cart.map((i) => (i.id === item.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i)));
  }

  function total() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  return (
    <div className="Cont"> 
    <div className="container mt-4">
      <h1 className="text-center text-primary">Shopping Cart</h1>

      {/* Product List */}
      <div className="row justify-content-center">
        {products.map((item) => (
          <div className="col-3 mb-4" key={item.id}>
            <div className="card shadow-sm text-center p-3">
              <h5 className="card-title">{item.name} - ₹{item.price}</h5>
              {!item.cart ? (
                <button className="btn btn-primary addcart" onClick={() => addToCart(item)}>Add to Cart</button>
              ) : (
                <button className="btn btn-added" disabled>Added</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center text-dark pro">Your Cart</h2>
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            
            <tbody className="pro">
              {cart.map((i, index) => (
                <tr key={i.id}>
                  <td>{index + 1}.</td>
                  <td>{i.name}</td>
                  <td>₹{i.price}</td>
                  <td>
                  <td>
  <button onClick={() => decrease(i)} className="btn btn-secondary btn-quantity">-</button>
  <span className="mx-2">{i.quantity}</span>
  <button onClick={() => increase(i)} className="btn btn-primary btn-quantity">+</button>
</td>

                  </td>
                  <td>
                  <td>
      <button onClick={() => removeFromCart(i)} className="btn-remove">❌</button>
</td>

                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
          
          <h4 className="total-container total">Total: ₹{total()}</h4>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
