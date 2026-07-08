'use client'
import { useMemo, useState } from 'react'
import { productRules } from '@/lib/data'

export default function QuoteCalculator() {
  const [method, setMethod] = useState('air')
  const [product, setProduct] = useState<keyof typeof productRules>('electronics')
  const [weight, setWeight] = useState(5)
  const [value, setValue] = useState(150)
  const [delivery, setDelivery] = useState('pickup')
  const [insurance, setInsurance] = useState(true)

  const result = useMemo(() => {
    const rule = productRules[product]
    const baseRate = method === 'air' ? 7.5 : 2.75
    const minCharge = method === 'air' ? 18 : 30
    const shipping = Math.max(weight * baseRate * rule.multiplier, minCharge)
    const handling = product === 'hazardous' || product === 'perfume' ? 12 : 5
    const insuranceFee = insurance ? value * 0.03 : 0
    const duty = value * rule.duty
    const fuel = shipping * 0.08
    const deliveryFee = delivery === 'home' ? 8 : 0
    const total = shipping + handling + insuranceFee + duty + fuel + deliveryFee
    return { shipping, handling, insuranceFee, duty, fuel, deliveryFee, total, rule }
  }, [method, product, weight, value, delivery, insurance])

  const money = (n: number) => `$${n.toFixed(2)}`

  return (
    <div id="quote" className="card p-6 lg:p-8">
      <div className="mb-6">
        <span className="badge bg-green-50 text-shopGreen">Editable admin rates in future build</span>
        <h2 className="mt-3 text-3xl font-black text-shopNavy">Instant Shipping Quote</h2>
        <p className="mt-2 text-slate-600">Estimate air, ocean, product handling, insurance, duty, and delivery charges.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="label">Shipment Method</label>
          <select className="input mt-2" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="air">Air Freight</option>
            <option value="ocean">Ocean Freight</option>
          </select>
        </div>
        <div>
          <label className="label">Product Type</label>
          <select className="input mt-2" value={product} onChange={(e) => setProduct(e.target.value as keyof typeof productRules)}>
            {Object.entries(productRules).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Weight (lbs)</label>
          <input className="input mt-2" type="number" min="1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
        </div>
        <div>
          <label className="label">Package Value (USD)</label>
          <input className="input mt-2" type="number" min="0" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
        <div>
          <label className="label">Delivery Option</label>
          <select className="input mt-2" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
            <option value="pickup">Pickup in Guyana</option>
            <option value="home">Home Delivery</option>
          </select>
        </div>
        <div>
          <label className="label">Insurance</label>
          <select className="input mt-2" value={insurance ? 'yes' : 'no'} onChange={(e) => setInsurance(e.target.value === 'yes')}>
            <option value="yes">Add Insurance</option>
            <option value="no">No Insurance</option>
          </select>
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-slate-50 p-5">
        <p className="font-bold text-amber-700">{result.rule.warning}</p>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <p>Shipping: <b>{money(result.shipping)}</b></p>
          <p>Handling: <b>{money(result.handling)}</b></p>
          <p>Insurance: <b>{money(result.insuranceFee)}</b></p>
          <p>Duty Estimate: <b>{money(result.duty)}</b></p>
          <p>Fuel Surcharge: <b>{money(result.fuel)}</b></p>
          <p>Delivery Fee: <b>{money(result.deliveryFee)}</b></p>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white p-4">
          <span className="text-lg font-bold text-slate-700">Estimated Total</span>
          <span className="text-3xl font-black text-shopGreen">{money(result.total)}</span>
        </div>
        <p className="mt-3 text-xs text-slate-500">This is an estimate. Final quote depends on actual weight, dimensions, invoices, customs rules, and restricted item review.</p>
      </div>
    </div>
  )
}
