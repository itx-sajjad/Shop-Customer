import { Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="logo">SHOP.CO</Link>
        <nav className="links">
          <a href="/#all">Shop</a>
          <a href="/#new">New Arrivals</a>
          <a href="/#top">Top Selling</a>
        </nav>
        <Link to="/cart" className="cart-link" aria-label="Cart">
          Cart <span className="badge">{count}</span>
        </Link>
      </div>
    </header>
  );
}
