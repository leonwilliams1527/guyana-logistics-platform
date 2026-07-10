'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/">Shop<span>2GY</span></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button>
        <nav className={open ? 'nav open' : 'nav'}>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/tracking">Track</Link>
          <Link href="/shop-for-me">Shop For Me</Link>
          <Link href="/business">Business</Link>
          <Link href="/faq">FAQ</Link>
          <Link className="nav-login" href="/login">Log in</Link>
          <Link className="button button-small" href="/register">Create account</Link>
        </nav>
      </div>
    </header>
  );
}
