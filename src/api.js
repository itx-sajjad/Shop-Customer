const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Kuch ghalat ho gaya');
  return data;
}

export const getProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request('/products' + (qs ? '?' + qs : ''));
};
export const placeOrder = (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) });
export const subscribeNewsletter = (email) =>
  request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
