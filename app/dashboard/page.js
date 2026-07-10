const packages = [
  { id: "PKG1001", retailer: "Amazon", status: "Received in Florida", weight: "3.2 lbs" },
  { id: "PKG1002", retailer: "Shein", status: "In Transit to Guyana", weight: "5.8 lbs" },
  { id: "PKG1003", retailer: "Best Buy", status: "Invoice Required", weight: "2.1 lbs" }
];
 
export default function DashboardPage() {
  return (
    <main className="dashboard">
      <aside className="sidebar">
        <a className="logo" href="/">Shop<span>2GY</span></a>
        <a href="/dashboard">Dashboard</a>
        <a href="/track">Track Package</a>
        <a href="/quote">Get Quote</a>
        <a href="/register">New Customer</a>
      </aside>
 
      <section className="dashboardContent">
        <div className="dashboardHeader">
          <div>
            <p className="eyebrow">Customer Portal Preview</p>
            <h1>Hello, Leon 👋</h1>
            <p>Customer ID: <strong>GY100001</strong></p>
          </div>
          <a className="primary" href="/quote">Get Quote</a>
        </div>
 
        <div className="statsGrid">
          <div className="stat"><strong>4</strong><span>Packages in Florida</span></div>
          <div className="stat"><strong>2</strong><span>In Transit</span></div>
          <div className="stat"><strong>1</strong><span>Ready for Pickup</span></div>
          <div className="stat"><strong>27</strong><span>Delivered</span></div>
        </div>
 
        <div className="panel">
          <h2>Your U.S. Shipping Address</h2>
          <p className="addressBox">Leon Williams<br />GY100001<br />Shop2GY Receiving Center<br />Fort Myers, FL 33913<br />United States</p>
        </div>
 
        <div className="panel">
          <h2>Recent Packages</h2>
          <div className="packageList">
            {packages.map((pkg) => (
              <div className="packageRow" key={pkg.id}>
                <div><strong>{pkg.id}</strong><p>{pkg.retailer}</p></div>
                <div>{pkg.weight}</div>
                <span className="badge">{pkg.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
