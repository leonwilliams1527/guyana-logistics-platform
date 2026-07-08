export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav>
          <div className="logo">Shop<span>2GY</span></div>
          <div className="navLinks">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#tracking">Tracking</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
 
        <div className="heroContent">
          <p className="eyebrow">USA to Guyana Logistics Platform</p>
          <h1>Shop the World. Delivered to Guyana.</h1>
          <p>
            Shop from Amazon, Walmart, Shein, Best Buy, Apple and more.
            We receive, consolidate, ship, track and deliver your packages
            from the U.S. to Guyana.
          </p>
          <div className="buttons">
            <a className="primary" href="#pricing">Get a Quote</a>
            <a className="secondary" href="#tracking">Track Package</a>
          </div>
        </div>
      </section>
 
      <section id="services" className="section">
        <h2>Services Built for Modern Shopping</h2>
        <div className="grid">
          <div className="card"><h3>Package Forwarding</h3><p>Get your U.S. shipping address and ship packages to Guyana.</p></div>
          <div className="card"><h3>Air Freight</h3><p>Fast weekly air shipping for clothing, electronics and small packages.</p></div>
          <div className="card"><h3>Ocean Freight</h3><p>Affordable sea freight for furniture, appliances and large cargo.</p></div>
          <div className="card"><h3>Shop For Me</h3><p>Paste a product link and our team can purchase it for you.</p></div>
          <div className="card"><h3>Home Delivery</h3><p>Request delivery to your home or business in Guyana.</p></div>
          <div className="card"><h3>Business Shipping</h3><p>Commercial importing, consolidated shipments and account support.</p></div>
        </div>
      </section>
 
      <section id="pricing" className="section light">
        <h2>Smart Quote Calculator</h2>
        <p className="center">
          Phase 2 will include an editable quote calculator for electronics,
          clothing, perfume, hazardous items, appliances, auto parts and more.
        </p>
      </section>
 
      <section id="tracking" className="section">
        <h2>Package Tracking</h2>
        <div className="trackingBox">
          <input placeholder="Enter tracking number or Customer ID" />
          <button>Track</button>
        </div>
      </section>
 
      <section id="contact" className="section dark">
        <h2>Ready to Launch Shop2GY?</h2>
        <p>From any store to your door — powered by smarter logistics.</p>
      </section>
    </main>
  );
}
