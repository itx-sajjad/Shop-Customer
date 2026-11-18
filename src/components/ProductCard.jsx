import { useCart } from '../CartContext.jsx';

const fallback =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85';

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)} <small>{value}/5</small>
    </span>
  );
}

export default function ProductCard({ p }) {
  const { add } = useCart();
  const off = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return (
    <article className="card">
      <div className="card-img">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallback;
          }}
        />
      </div>
      <h3>{p.name}</h3>
      <Stars value={p.rating} />
      <div className="price">
        <b>${p.price}</b>
        {p.oldPrice > 0 && <s>${p.oldPrice}</s>}
        {off > 0 && <span className="off">-{off}%</span>}
      </div>
      <button className="btn dark small" onClick={() => add(p)}>Add to cart</button>
    </article>
  );
}
