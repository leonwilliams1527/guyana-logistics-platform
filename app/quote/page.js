"use client";
import { useState } from "react";
 
const rules = {
  clothing: { rate: 6, duty: 0.10, note: "Standard air or ocean shipping." },
  electronics: { rate: 8, duty: 0.18, note: "Insurance recommended. Battery rules may apply." },
  laptop: { rate: 8.5, duty: 0.18, note: "Lithium battery notice. Insurance recommended." },
  perfume: { rate: 10, duty: 0.20, note: "Perfume may require hazardous handling and manual approval." },
  hazardous: { rate: 12, duty: 0.25, note: "Restricted item. Manual review required before shipping." },
  autoparts: { rate: 7, duty: 0.15, note: "Large or heavy parts may require ocean freight." },
  appliance: { rate: 5, duty: 0.12, note: "Ocean freight recommended for large appliances." },
  documents: { rate: 15, duty: 0, note: "Express document service available." }
};
 
export default function QuotePage() {
  const [quote, setQuote] = useState(null);
 
  function calculate(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const product = form.get("product");
    const weight = Number(form.get("weight"));
    const value = Number(form.get("value"));
    const delivery = form.get("delivery") === "home" ? 8 : 0;
    const insurance = form.get("insurance") === "yes" ? value * 0.03 : 0;
    const rule = rules[product];
    const shipping = weight * rule.rate;
    const duty = value * rule.duty;
    const handling = product === "perfume" || product === "hazardous" ? 15 : 5;
    const total = shipping + duty + insurance + handling + delivery;
    setQuote({ shipping, duty, insurance, handling, delivery, total, note: rule.note });
  }
 
  return (
    <main className="pageShell">
      <a className="backLink" href="/">← Back to Home</a>
      <section className="formCard">
        <p className="eyebrow">Smart Quote Calculator</p>
        <h1>Estimate your shipping cost.</h1>
        <form onSubmit={calculate} className="form">
          <label>Product Type
            <select name="product">
              <option value="clothing">Clothing / Shoes</option>
              <option value="electronics">Electronics</option>
              <option value="laptop">Laptop / Computer</option>
              <option value="perfume">Perfume / Fragrance</option>
              <option value="hazardous">Hazardous / Restricted</option>
              <option value="autoparts">Auto Parts</option>
              <option value="appliance">Appliance</option>
              <option value="documents">Documents</option>
            </select>
          </label>
          <label>Weight in pounds<input name="weight" type="number" min="1" defaultValue="5" /></label>
          <label>Package Value USD<input name="value" type="number" min="1" defaultValue="100" /></label>
          <label>Insurance
            <select name="insurance"><option value="no">No</option><option value="yes">Yes</option></select>
          </label>
          <label>Delivery Option
            <select name="delivery"><option value="pickup">Pickup</option><option value="home">Home Delivery</option></select>
          </label>
          <button className="primary full" type="submit">Calculate Quote</button>
        </form>
 
        {quote && (
          <div className="quoteResult">
            <h2>Estimated Quote</h2>
            <p>Shipping: ${quote.shipping.toFixed(2)}</p>
            <p>Estimated Duty: ${quote.duty.toFixed(2)}</p>
            <p>Insurance: ${quote.insurance.toFixed(2)}</p>
            <p>Handling: ${quote.handling.toFixed(2)}</p>
            <p>Delivery: ${quote.delivery.toFixed(2)}</p>
            <h3>Total Estimate: ${quote.total.toFixed(2)}</h3>
            <p className="warning">{quote.note}</p>
          </div>
        )}
      </section>
    </main>
  );
}
