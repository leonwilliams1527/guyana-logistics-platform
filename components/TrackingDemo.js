'use client';
import { useState } from 'react';
export default function TrackingDemo(){
 const [id,setId]=useState(''); const [searched,setSearched]=useState(false);
 return <div className="tracking-card"><div className="tracking-form"><input value={id} onChange={e=>setId(e.target.value)} placeholder="Try PKG000123 or GY000145"/><button className="button" onClick={()=>setSearched(true)}>Track</button></div>
 {searched && <div className="timeline"><div className="done"><b>Received in Florida</b><small>Package scanned and photographed</small></div><div className="done"><b>Processing</b><small>Weight and invoice review completed</small></div><div className="active"><b>Quote ready</b><small>Awaiting customer payment</small></div><div><b>Shipped to Guyana</b></div><div><b>Ready for pickup or delivery</b></div></div>}</div>
}
