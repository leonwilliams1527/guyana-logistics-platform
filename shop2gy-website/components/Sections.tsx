import { ArrowRight, Barcode, Bell, BriefcaseBusiness, CheckCircle2, Clock, CreditCard, Globe2, PackageCheck, ScanLine, ShoppingBag, Truck, Warehouse } from 'lucide-react'
import { automationJourneys, packageStatuses } from '@/lib/data'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-shopNavy text-white"><ShoppingBag size={22}/></div>
          <div><p className="text-xl font-black text-shopNavy">Shop<span className="text-shopGold">2</span><span className="text-shopGreen">GY</span></p><p className="text-xs font-semibold text-slate-500">Delivered to Guyana</p></div>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
          <a href="#services">Services</a><a href="#quote">Quote</a><a href="#tracking">Track</a><a href="#portal">Portal</a><a href="#automation">Automations</a>
        </nav>
        <a href="#signup" className="btn-primary hidden sm:inline-flex">Get Customer ID</a>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section id="top" className="gradient-hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <span className="badge bg-green-50 text-shopGreen">Package forwarding • Shopping • Last-mile delivery</span>
          <h1 className="mt-5 text-5xl font-black leading-tight text-shopNavy lg:text-7xl">Shop the World. Delivered to Guyana.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Shop2GY combines U.S. package forwarding, e-commerce ordering, smart shipping quotes, warehouse scanning, automated notifications, and local Guyana delivery into one modern logistics platform.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#signup" className="btn-primary">Create Free Account <ArrowRight size={18}/></a><a href="#quote" className="btn-outline">Calculate Quote</a></div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Unique Customer ID','Package Photos & Tracking','Email + WhatsApp Alerts'].map((x)=><div key={x} className="rounded-2xl bg-white/80 p-4 font-bold text-shopNavy shadow-sm"><CheckCircle2 className="mb-2 text-shopGreen"/> {x}</div>)}
          </div>
        </div>
        <div className="card p-5">
          <div className="rounded-3xl bg-shopNavy p-6 text-white">
            <div className="flex items-center justify-between"><p className="font-black">Customer Dashboard</p><span className="rounded-full bg-shopGreen px-3 py-1 text-xs font-bold">GY000001</span></div>
            <h3 className="mt-6 text-2xl font-black">Hello, Leon 👋</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[['4','Packages in Florida'],['2','In Transit'],['1','Ready for Pickup'],['27','Delivered']].map(([n,l])=><div key={l} className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-shopGold">{n}</p><p className="text-sm text-blue-100">{l}</p></div>)}
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-slate-100 p-5">
            <p className="font-black text-shopNavy">Your U.S. Shipping Address</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">Leon Williams<br/>GY000001<br/>Shop2GY Warehouse<br/>Fort Myers, FL 33913<br/>United States</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const services = [
    ['Package Forwarding', 'Receive your free U.S. address and ship from Amazon, Walmart, Best Buy, Shein, Temu, and more.', Globe2],
    ['Air & Ocean Freight', 'Choose faster air service or affordable ocean freight for larger items and commercial cargo.', PackageCheck],
    ['Shop For Me', 'Paste a product link and our team can purchase it for you, then ship it to Guyana.', ShoppingBag],
    ['Last-Mile Delivery', 'Pickup or home delivery across Guyana with delivery status updates and proof of delivery.', Truck],
    ['Warehouse Scanning', 'Every package gets scanned, photographed, weighed, and assigned to a customer account.', ScanLine],
    ['Business Accounts', 'Commercial shipping, monthly invoicing, dedicated support, and import reporting.', BriefcaseBusiness]
  ] as const
  return <section id="services" className="mx-auto max-w-7xl px-5 py-16"><div className="mb-8"><span className="badge bg-blue-50 text-shopNavy">Services</span><h2 className="mt-3 text-4xl font-black text-shopNavy">One platform for shopping, shipping, and delivery.</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(([t,d,Icon])=><div className="card p-6" key={t}><Icon className="text-shopGreen" size={34}/><h3 className="mt-4 text-xl font-black text-shopNavy">{t}</h3><p className="mt-2 leading-7 text-slate-600">{d}</p></div>)}</div></section>
}

export function Tracking() {
  return <section id="tracking" className="mx-auto max-w-7xl px-5 py-16"><div className="grid gap-8 lg:grid-cols-2"><div className="card p-8"><span className="badge bg-green-50 text-shopGreen">Live Tracking</span><h2 className="mt-3 text-4xl font-black text-shopNavy">Track every package from Florida to your door.</h2><div className="mt-6 flex gap-3"><input className="input" placeholder="Enter tracking or package ID"/><button className="btn-primary">Track</button></div><p className="mt-3 text-sm text-slate-500">Demo package: PKG0001234</p></div><div className="card p-8"><h3 className="text-xl font-black text-shopNavy">Package Timeline</h3><div className="mt-6 space-y-3">{packageStatuses.map((s,i)=><div key={s} className="flex items-center gap-3"><div className={`grid h-7 w-7 place-items-center rounded-full ${i<5?'bg-shopGreen text-white':'bg-slate-100 text-slate-400'}`}>{i<5?<CheckCircle2 size={15}/>:i+1}</div><p className={i<5?'font-bold text-shopNavy':'text-slate-500'}>{s}</p></div>)}</div></div></div></section>
}

export function PortalPreview() {
  return <section id="portal" className="mx-auto max-w-7xl px-5 py-16"><div className="mb-8"><span className="badge bg-yellow-50 text-amber-700">Customer + Operations Portals</span><h2 className="mt-3 text-4xl font-black text-shopNavy">Built for customers, warehouse teams, drivers, and admins.</h2></div><div className="grid gap-5 lg:grid-cols-4">{[
    ['Customer Portal', 'Customer ID, U.S. address, packages, invoices, quotes, delivery requests.', ShoppingBag],
    ['Warehouse Portal', 'Scan packages, weigh, photograph, assign, label, consolidate, manifest.', Warehouse],
    ['Admin Portal', 'Edit rates, product rules, customers, staff, shipments, reports, automations.', CreditCard],
    ['Driver Portal', 'Routes, delivery status, customer calls, signatures, proof photos.', Truck]
  ].map(([t,d,Icon]: any)=><div key={t} className="card p-6"><Icon className="text-shopGreen"/><h3 className="mt-4 text-xl font-black text-shopNavy">{t}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{d}</p></div>)}</div></section>
}

export function Signup() {
  return <section id="signup" className="mx-auto max-w-7xl px-5 py-16"><div className="card overflow-hidden lg:grid lg:grid-cols-2"><div className="bg-shopNavy p-8 text-white lg:p-12"><span className="badge bg-white/10 text-white">Start shipping</span><h2 className="mt-4 text-4xl font-black">Create your free Shop2GY Customer ID.</h2><p className="mt-4 leading-8 text-blue-100">Version 1 form preview. Production build will connect this to Supabase Auth and auto-generate unique IDs like GY000001.</p><div className="mt-8 rounded-3xl bg-white/10 p-5"><Barcode className="text-shopGold"/><p className="mt-3 text-2xl font-black">GY000001</p><p className="text-blue-100">Unique customer ID generated automatically</p></div></div><form className="grid gap-4 p-8 lg:p-12"><div><label className="label">Full Name</label><input className="input mt-2" placeholder="Leon Williams"/></div><div><label className="label">Email</label><input className="input mt-2" placeholder="name@email.com"/></div><div><label className="label">WhatsApp Number</label><input className="input mt-2" placeholder="+1 or +592"/></div><div><label className="label">Guyana Delivery Address</label><textarea className="input mt-2 min-h-28" placeholder="Street, city, region"></textarea></div><button className="btn-primary" type="button">Generate Customer ID</button></form></div></section>
}

export function Automations() {
  return <section id="automation" className="mx-auto max-w-7xl px-5 py-16"><div className="card p-8"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><span className="badge bg-green-50 text-shopGreen">Marketing Automation Center</span><h2 className="mt-3 text-4xl font-black text-shopNavy">Lifecycle journeys built into the platform.</h2></div><Bell className="text-shopGold" size={42}/></div><div className="mt-8 grid gap-3 md:grid-cols-3">{automationJourneys.map(j=><div key={j} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-bold text-shopNavy"><Clock className="mb-2 text-shopGreen" size={18}/>{j}</div>)}</div></div></section>
}

export function Footer() {
  return <footer className="bg-shopNavy px-5 py-10 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row"><div><p className="text-2xl font-black">Shop<span className="text-shopGold">2</span><span className="text-shopGreen">GY</span></p><p className="mt-2 text-blue-100">Shop the World. Delivered to Guyana.</p></div><div className="text-sm text-blue-100">© 2026 Shop2GY. MVP website build.</div></div></footer>
}
