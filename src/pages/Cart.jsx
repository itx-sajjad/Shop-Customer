import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Cart() {
  const { items, setQty, remove, total } = useCart();
  if (!items.length)
    return (
      <div className="wrap empty big">
        <h2>YOUR CART</h2>
        <p>Cart khali hai.</p>
        <Link to="/" className="btn dark">Shopping shuru karein</Link>
      </div>
    );
  return (
    <div className="wrap section">
      <h2>YOUR CART</h2>
      <div className="cart">
        <div className="cart-list">
          {items.map((i) => (
            <div className="cart-row" key={i._id}>
              <img src={i.image} alt={i.name} />
              <div className="grow">
                <h3>{i.name}</h3>
                <b>${i.price}</b>
              </div>
              <div className="qty">
                <button onClick={() => setQty(i._id, i.qty - 1)} aria-label="Kam karein">−</button>
                <span>{i.qty}</span>
                <button onClick={() => setQty(i._id, i.qty + 1)} aria-label="Barhayein">+</button>
              </div>
              <button className="link-btn" onClick={() => remove(i._id)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="line"><span>Subtotal</span><b>${total}</b></div>
          <div className="line"><span>Delivery</span><b>Free</b></div>
          <div className="line total"><span>Total</span><b>${total}</b></div>
          <Link to="/checkout" className="btn dark block">Go to Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
