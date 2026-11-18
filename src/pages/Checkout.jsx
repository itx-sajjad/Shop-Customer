import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { placeOrder } from '../api.js';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const order = await placeOrder({
        customer: form,
        items: items.map((i) => ({ product: i._id, qty: i.qty })),
      });
      setDone(order);
      clear();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="wrap empty big">
        <h2>ORDER PLACE HO GAYA</h2>
        <p>Shukriya, {done.customer.name}! Aap ka order number <b>#{done._id.slice(-6).toUpperCase()}</b> hai. Total: ${done.total}</p>
        <Link to="/" className="btn dark">Aur shopping karein</Link>
      </div>
    );

  if (!items.length)
    return (
      <div className="wrap empty big">
        <p>Checkout ke liye pehle cart mein kuch add karein.</p>
        <Link to="/" className="btn dark">Shop par jayein</Link>
      </div>
    );

  return (
    <div className="wrap section">
      <h2>CHECKOUT</h2>
      <div className="cart">
        <form className="form" onSubmit={submit}>
          <label>Poora naam<input required value={form.name} onChange={set('name')} /></label>
          <label>Email<input type="email" value={form.email} onChange={set('email')} /></label>
          <label>Phone<input value={form.phone} onChange={set('phone')} /></label>
          <label>Address<input required value={form.address} onChange={set('address')} /></label>
          <label>Shehar<input value={form.city} onChange={set('city')} /></label>
          {error && <p className="error">{error}</p>}
          <button className="btn dark" disabled={busy}>{busy ? 'Order ja raha hai…' : 'Place Order'}</button>
        </form>
        <aside className="summary">
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div className="line" key={i._id}><span>{i.name} × {i.qty}</span><b>${i.price * i.qty}</b></div>
          ))}
          <div className="line total"><span>Total</span><b>${total}</b></div>
        </aside>
      </div>
    </div>
  );
}
