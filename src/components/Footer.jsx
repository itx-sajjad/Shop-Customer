import { Link } from 'react-router-dom';
import { useState } from 'react';
import { subscribeNewsletter } from '../api.js';

const columns = [
  { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
  { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
  { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
  { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
];

const socials = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482A13.98 13.98 0 0 1 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.903 4.903 0 0 1-2.228-.616v.06c0 2.386 1.697 4.374 3.95 4.827a4.936 4.936 0 0 1-2.224.084 4.93 4.93 0 0 0 4.604 3.42A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.054 0 14-7.5 14-14 0-.21 0-.42-.016-.63A9.936 9.936 0 0 0 24 4.59z" />,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    icon: <path d="M13.5 24v-9h3l.5-3.5h-3.5V9.25c0-1.02.34-1.75 1.8-1.75H17V4.36c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.52-4.22 4.32v2.95H7.4V15h2.85v9A12 12 0 1 1 13.5 24Z" />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="6" r="1" />
      </>
    ),
  },
  {
    name: 'Github',
    href: 'https://github.com/',
    icon: <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.61 1.23 3.25.94.1-.73.39-1.23.71-1.51-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.78 1.16 1.78 1.16 3 0 4.3-2.61 5.24-5.1 5.52.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />,
  },
];

function SocialLink({ name, href, icon }) {
  return (
    <a className={`social-link social-${name.toLowerCase()}`} href={href} aria-label={name} target="_blank" rel="noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setHasError(false);

    try {
      const result = await subscribeNewsletter(email);
      setMessage(result.message);
      setEmail('');
    } catch (error) {
      setHasError(true);
      setMessage(error instanceof Error ? error.message : 'Unable to subscribe right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="footer">
      <section className="newsletter wrap" aria-labelledby="newsletter-title">
        <h2 id="newsletter-title">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-input">
            <span aria-hidden="true">✉</span>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby={message ? 'newsletter-message' : undefined}
              required
            />
          </div>
          <button type="submit" disabled={submitting}>{submitting ? 'Subscribing...' : 'Subscribe to Newsletter'}</button>
          {message && <p id="newsletter-message" className={`newsletter-message${hasError ? ' is-error' : ' is-success'}`} role={hasError ? 'alert' : 'status'}>{message}</p>}
        </form>
      </section>

      <div className="footer-inner wrap">
        <div className="footer-brand">
          <Link className="logo" to="/">SHOP.CO</Link>
          <p>We have clothes that suit your style and which you’re proud to wear. From women to men.</p>
          <div className="social-links">
            {socials.map((social) => <SocialLink key={social.name} {...social} />)}
          </div>
        </div>

        {columns.map((column) => (
          <nav className="footer-column" key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom wrap">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="payment-methods" aria-label="Accepted payment methods">
          <span className="payment-badge visa" aria-label="Visa">VISA</span>
          <span className="payment-badge mastercard" aria-label="Mastercard"><i /><i /></span>
          <span className="payment-badge paypal" aria-label="PayPal"><b>Pay</b><strong>Pal</strong></span>
          <span className="payment-badge apple-pay" aria-label="Apple Pay">● Pay</span>
          <span className="payment-badge google-pay" aria-label="Google Pay"><b>G</b> Pay</span>
        </div>
      </div>
    </footer>
  );
}