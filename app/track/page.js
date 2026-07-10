"use client";
import { useState } from "react";
 
const timeline = [
  "Received in Florida",
  "Photos Taken",
  "Invoice Required",
  "Quote Ready",
  "Payment Received",
  "Shipped to Guyana",
  "Arrived in Guyana",
  "Customs Processing",
  "Ready for Pickup",
  "Delivered"
];
 
export default function TrackPage() {
  const [tracking, setTracking] = useState(null);
 
  function handleTrack(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setTracking(form.get("tracking") || "PKG1001");
  }
 
  return (
    <main className="pageShell">
      <a className="backLink" href="/">← Back to Home</a>
      <section className="formCard">
        <p className="eyebrow">Package Tracking</p>
        <h1>Track your package journey.</h1>
        <form onSubmit={handleTrack} className="trackingForm">
          <input name="tracking" placeholder="Enter Package ID or Customer ID" />
          <button className="primary" type="submit">Track</button>
        </form>
 
        {tracking && (
          <div className="timeline">
            <h2>{tracking}</h2>
            {timeline.map((step, index) => (
              <div className={index < 5 ? "timelineItem done" : "timelineItem"} key={step}>
                <span>{index < 5 ? "✓" : "○"}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
