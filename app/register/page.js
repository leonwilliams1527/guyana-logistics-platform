"use client";
import { useState } from "react";
 
function createCustomerId() {
  const number = Math.floor(100000 + Math.random() * 900000);
  return `GY${number}`;
}
 
export default function RegisterPage() {
  const [customer, setCustomer] = useState(null);
 
  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = createCustomerId();
    setCustomer({
      id,
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone")
    });
  }
 
  return (
    <main className="pageShell">
      <a className="backLink" href="/">← Back to Home</a>
      <section className="formCard">
        <p className="eyebrow">Create Your Shop2GY Account</p>
        <h1>Register and receive your Customer ID.</h1>
        <p>Use your Customer ID when shipping packages to the Shop2GY U.S. receiving address.</p>
 
        {!customer && (
          <form onSubmit={handleSubmit} className="form">
            <label>Full Name<input name="name" required placeholder="Leon Williams" /></label>
            <label>Email<input name="email" type="email" required placeholder="you@email.com" /></label>
            <label>WhatsApp / Phone<input name="phone" required placeholder="592-000-0000" /></label>
            <label>Guyana Delivery Address<textarea name="address" placeholder="Street, city, region" /></label>
            <button className="primary full" type="submit">Create Account</button>
          </form>
        )}
 
        {customer && (
          <div className="successBox">
            <h2>Welcome, {customer.name}!</h2>
            <p>Your Shop2GY Customer ID is:</p>
            <div className="customerId">{customer.id}</div>
            <p className="smallText">Your U.S. shipping address format:</p>
            <div className="addressBox">
              {customer.name}<br />
              {customer.id}<br />
              Shop2GY Receiving Center<br />
              Fort Myers, FL 33913<br />
              United States
            </div>
            <a className="primary full linkButton" href="/dashboard">Go to Dashboard Preview</a>
          </div>
        )}
      </section>
    </main>
  );
}
