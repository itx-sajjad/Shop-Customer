import { useEffect, useState } from 'react';
import { getProducts } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';

const CATS = ['All', 'T-shirts', 'Shirts', 'Jeans', 'Shorts'];
const BRANDS = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

function Section({ id, title, items, loading }) {
  return (
    <section className="wrap section" id={id}>
      <h2>{title}</h2>
      {loading ? <p className="empty">Load ho raha hai…</p> : items.length ? (
        <div className="grid">{items.map((p) => <ProductCard key={p._id} p={p} />)}</div>
      ) : <p className="empty">Abhi koi product nahi hai.</p>}
    </section>
  );
}

export default function Home() {
  const [news, setNews] = useState([]);
  const [top, setTop] = useState([]);
  const [all, setAll] = useState([]);
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getProducts({ tag: 'new' }), getProducts({ tag: 'top' })])
      .then(([n, t]) => { setNews(n); setTop(t); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getProducts({ category: cat }).then(setAll).catch((e) => setError(e.message));
  }, [cat]);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>Hamari range mein har mizaj aur mauqe ke liye behtareen kapray hain. Apna style chunein.</p>
            <a href="#all" className="btn dark">Shop Now</a>
            <div className="stats">
              <div><b>200+</b><span>International Brands</span></div>
              <div><b>2,000+</b><span>High-Quality Products</span></div>
              <div><b>30,000+</b><span>Happy Customers</span></div>
            </div>
          </div>
          <div className="hero-art">
            <img src="/images/hero-fashion-couple.png" alt="Models wearing casual streetwear" />
          </div>
        </div>
      </section>

      <div className="brands">
        <div className="wrap brands-in">{BRANDS.map((b) => <span key={b}>{b}</span>)}</div>
      </div>

      {error && <div className="wrap error">Server se connect nahi ho paya: {error}</div>}

      <Section id="new" title="NEW ARRIVALS" items={news} loading={loading} />
      <Section id="top" title="TOP SELLING" items={top} loading={loading} />

      <section className="wrap section" id="all">
        <h2>BROWSE ALL</h2>
        <div className="chips">
          {CATS.map((c) => (
            <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        {all.length ? (
          <div className="grid">{all.map((p) => <ProductCard key={p._id} p={p} />)}</div>
        ) : <p className="empty">Is category mein abhi koi product nahi.</p>}
      </section>
    </>
  );
}
