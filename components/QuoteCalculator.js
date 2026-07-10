'use client';
import { useMemo, useState } from 'react';
const categories = {
  clothing: { label: 'Clothing', rate: 625, fee: 0 },
  shoes: { label: 'Shoes', rate: 650, fee: 0 },
  electronics: { label: 'Electronics', rate: 675, fee: 700 },
  phone: { label: 'Mobile phone', rate: 700, fee: 1000 },
  laptop: { label: 'Laptop', rate: 700, fee: 1200 },
  tv: { label: 'Television', rate: 725, fee: 6500 },
  perfume: { label: 'Perfume / fragrance', rate: 675, fee: 2000 },
  autoparts: { label: 'Auto parts', rate: 675, fee: 500 },
  other: { label: 'Other', rate: 675, fee: 500 }
};
export default function QuoteCalculator() {
  const [category, setCategory] = useState('clothing');
  const [weight, setWeight] = useState(5);
  const [value, setValue] = useState(100);
  const [delivery, setDelivery] = useState('pickup');
  const [insurance, setInsurance] = useState(true);
  const calc = useMemo(() => {
    const item = categories[category];
    const freight = Math.max(Number(weight) || 0, 1) * item.rate;
    const handling = 500 + item.fee;
    const insuranceFee = insurance ? Math.round((Number(value) || 0) * 209 * 0.02) : 0;
    const deliveryFee = delivery === 'home' ? 1500 : 0;
    return { freight, handling, insuranceFee, deliveryFee, total: freight + handling + insuranceFee + deliveryFee };
  }, [category, weight, value, delivery, insurance]);
  const money = n => `GYD ${Math.round(n).toLocaleString()}`;
  return <div className="calculator-card">
    <div className="form-grid">
      <label>Product type<select value={category} onChange={e=>setCategory(e.target.value)}>{Object.entries(categories).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label>
      <label>Weight (lb)<input type="number" min="1" value={weight} onChange={e=>setWeight(e.target.value)} /></label>
      <label>Declared value (USD)<input type="number" min="0" value={value} onChange={e=>setValue(e.target.value)} /></label>
      <label>Delivery<select value={delivery} onChange={e=>setDelivery(e.target.value)}><option value="pickup">Pickup</option><option value="home">Georgetown home delivery</option></select></label>
    </div>
    <label className="check"><input type="checkbox" checked={insurance} onChange={e=>setInsurance(e.target.checked)} /> Add estimated insurance</label>
    {(category==='perfume'||category==='tv'||category==='phone'||category==='laptop') && <div className="notice">Special handling applies to this category. Final acceptance and price are subject to inspection.</div>}
    <div className="quote-lines"><span>Air freight</span><strong>{money(calc.freight)}</strong><span>Handling/category fees</span><strong>{money(calc.handling)}</strong><span>Insurance estimate</span><strong>{money(calc.insuranceFee)}</strong><span>Delivery</span><strong>{money(calc.deliveryFee)}</strong><span className="quote-total">Estimated total</span><strong className="quote-total">{money(calc.total)}</strong></div>
    <p className="fine-print">Planning estimate only. Customs duties and taxes are not included and may be assessed separately.</p>
  </div>;
}
