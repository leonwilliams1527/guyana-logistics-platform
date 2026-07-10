import Link from 'next/link';
export default function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><div className="brand footer-brand">Shop<span>2GY</span></div><p>Shop the World. Delivered to Guyana.</p></div>
    <div><h4>Services</h4><Link href="/services">Package forwarding</Link><Link href="/shop-for-me">Shop For Me</Link><Link href="/business">Business shipping</Link></div>
    <div><h4>Help</h4><Link href="/tracking">Track package</Link><Link href="/faq">FAQ</Link><Link href="/contact">Contact</Link></div>
    <div><h4>Account</h4><Link href="/login">Log in</Link><Link href="/register">Register</Link><Link href="/dashboard">Dashboard demo</Link></div>
  </div><div className="container footer-bottom">© 2026 Shop2GY. Planning-stage website.</div></footer>
}
