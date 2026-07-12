'use strict';
const $ = (id) => document.getElementById(id);
const money = (n) => `GYD ${Math.round(n).toLocaleString('en-US')}`;
const defaultRates = {clothing:625,shoes:650,electronics:675,phones:700,laptops:700,tvs:800,perfume:700,auto:675,furniture:500,documents:475,other:650,handling:500,perfumeSurcharge:2000,insurancePct:2};
let rates = {...defaultRates, ...(JSON.parse(localStorage.getItem('shop2gyRates') || '{}'))};

function populateAdmin(){
  $('rateClothing').value=rates.clothing;$('rateElectronics').value=rates.electronics;$('ratePremium').value=rates.phones;$('ratePerfume').value=rates.perfumeSurcharge;$('rateHandling').value=rates.handling;$('rateInsurance').value=rates.insurancePct;
}
function calculateQuote(e){
  e.preventDefault();
  const method=$('shippingMethod').value,type=$('productType').value,weight=Number($('weight').value),declared=Number($('value').value),delivery=$('delivery').value,insured=$('insurance').value==='yes';
  let perLb=rates[type] || rates.other;
  if(method==='ocean') perLb=Math.max(225,Math.round(perLb*.5));
  const shipping=weight*perLb;
  const handling=rates.handling;
  const insurance=insured ? declared*208.5*(rates.insurancePct/100):0;
  let special=0,warning='';
  if(type==='perfume'){special=rates.perfumeSurcharge;warning='Perfume may require hazardous-goods review and may not qualify for every air service.';}
  if(type==='tvs'){special=Math.max(3500,weight*125);warning='TV pricing may be adjusted after dimensions and packaging are verified.';}
  if(type==='furniture' && method==='air'){warning='Furniture is normally more economical by ocean freight.';}
  const deliveryFees={pickup:0,georgetown:1500,eastbank:2000,eastcoast:2500,linden:4500,berbice:5000};
  const deliveryFee=deliveryFees[delivery]||0;
  let discount=0;
  if($('coupon').value.trim().toUpperCase()==='WELCOME10') discount=shipping*.10;
  const total=Math.max(0,shipping+handling+insurance+special+deliveryFee-discount);
  const rows=[['Shipping',shipping],['Handling',handling],['Insurance',insurance],['Special handling',special],['Delivery',deliveryFee]];
  if(discount) rows.push(['Coupon discount',-discount]);
  $('quoteTotal').textContent=money(total);
  $('quoteBreakdown').innerHTML=rows.map(([label,val])=>`<div><span>${label}</span><strong>${money(val)}</strong></div>`).join('');
  $('quoteWarning').textContent=warning;$('quoteWarning').classList.toggle('hidden',!warning);
}
function trackPackage(e){
  e.preventDefault(); const value=$('trackingInput').value.trim().toUpperCase();
  if(value==='PKG-100245'){$('trackingResult').innerHTML='<h3>PKG-100245</h3><p><strong>Current status:</strong> Processed at Florida warehouse</p><ol><li>Received in Florida — complete</li><li>Weighed and photographed — complete</li><li>Ready for shipment — pending</li><li>Arrived in Guyana — pending</li><li>Delivered — pending</li></ol>';}else{$('trackingResult').innerHTML='<h3>No demo package found</h3><p>Use <strong>PKG-100245</strong> to test the tracking experience.</p>';}
  $('trackingResult').classList.remove('hidden');
}
function createAccount(e){
  e.preventDefault();
  const customer={first:$('firstName').value.trim(),last:$('lastName').value.trim(),email:$('email').value.trim(),phone:$('phone').value.trim(),address:$('address').value.trim(),id:`GY${Date.now().toString().slice(-6)}`};
  localStorage.setItem('shop2gyCustomer',JSON.stringify(customer)); renderCustomer(); location.hash='#portal';
}
function renderCustomer(){
  const customer=JSON.parse(localStorage.getItem('shop2gyCustomer')||'null');
  if(!customer){$('portalName').textContent='Shop2GY Customer';$('portalId').textContent='Customer ID: —';$('portalAddress').textContent='Register to generate your demo address.';$('accountResult').querySelector('.customer-id').textContent='Not created';return;}
  const usAddress=`${customer.first} ${customer.last}\nCustomer ID: ${customer.id}\nShop2GY Warehouse\nFort Myers, FL 33913\nUnited States`;
  $('portalName').textContent=`${customer.first} ${customer.last}`;$('portalId').textContent=`Customer ID: ${customer.id}`;$('portalAddress').textContent=usAddress;$('accountResult').querySelector('.customer-id').textContent=customer.id;$('accountResult').querySelector('p:last-child').textContent=usAddress;
}
function submitShop(e){e.preventDefault();$('shopMessage').textContent='Your demo Shop For Me request has been saved in this browser.';$('shopMessage').classList.remove('hidden');localStorage.setItem('shop2gyShopRequest',JSON.stringify({url:$('productUrl').value,quantity:$('quantity').value,notes:$('shopNotes').value}));}
function saveRates(e){e.preventDefault();rates={...rates,clothing:Number($('rateClothing').value),electronics:Number($('rateElectronics').value),phones:Number($('ratePremium').value),laptops:Number($('ratePremium').value),perfumeSurcharge:Number($('ratePerfume').value),handling:Number($('rateHandling').value),insurancePct:Number($('rateInsurance').value)};localStorage.setItem('shop2gyRates',JSON.stringify(rates));$('adminMessage').textContent='Rates saved.';setTimeout(()=>$('adminMessage').textContent='',2500);}
$('quoteForm').addEventListener('submit',calculateQuote);$('trackingForm').addEventListener('submit',trackPackage);$('registerForm').addEventListener('submit',createAccount);$('shopForm').addEventListener('submit',submitShop);$('adminForm').addEventListener('submit',saveRates);
$('resetDemo').addEventListener('click',()=>{localStorage.removeItem('shop2gyCustomer');renderCustomer();});
$('menuButton').addEventListener('click',()=>{const nav=$('siteNav');nav.classList.toggle('open');$('menuButton').setAttribute('aria-expanded',nav.classList.contains('open'));});
document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>$('siteNav').classList.remove('open')));
$('year').textContent=new Date().getFullYear();populateAdmin();renderCustomer();


const demoPackages = [
  {id:'PKG-100245',store:'Amazon',description:'Clothing order',status:'florida',statusLabel:'In Florida',weight:'5.2 lb',action:'Upload invoice'},
  {id:'PKG-100318',store:'Best Buy',description:'Laptop accessory',status:'transit',statusLabel:'In transit',weight:'3.8 lb',action:'Track'},
  {id:'PKG-100401',store:'Shein',description:'Fashion order',status:'ready',statusLabel:'Ready',weight:'7.1 lb',action:'Request delivery'},
  {id:'PKG-099842',store:'Walmart',description:'Home goods',status:'delivered',statusLabel:'Delivered',weight:'9.4 lb',action:'View details'}
];

function renderPackages(){
  const search=($('packageSearch')?.value||'').toLowerCase();
  const filter=$('packageFilter')?.value||'all';
  const list=demoPackages.filter(p=>(filter==='all'||p.status===filter)&&(`${p.id} ${p.store} ${p.description} ${p.statusLabel}`.toLowerCase().includes(search)));
  $('packageList').innerHTML=list.length?list.map(p=>`<article class="package-item"><div><p class="small-label">${p.id}</p><h3>${p.store}</h3><p>${p.description}</p></div><div><p class="small-label">WEIGHT</p><strong>${p.weight}</strong></div><div><span class="status-badge status-${p.status}">${p.statusLabel}</span></div><button class="package-action" data-package="${p.id}" data-action="${p.action}">${p.action}</button></article>`).join(''):'<div class="panel"><p>No packages match your search.</p></div>';
  document.querySelectorAll('.package-action').forEach(btn=>btn.addEventListener('click',()=>handlePackageAction(btn.dataset.package,btn.dataset.action)));
}
function handlePackageAction(id,action){
  if(action==='Upload invoice'){ $('invoicePackage').value=id; location.hash='#invoice-center'; }
  else if(action==='Request delivery'){ $('deliveryPackage').value=id; location.hash='#delivery-request'; }
  else if(action==='Track'){ $('trackingInput').value=id; location.hash='#tracking'; }
  else alert(`${id}: ${action} demo opened.`);
}
function populatePackageSelects(){
  const options=demoPackages.map(p=>`<option value="${p.id}">${p.id} — ${p.store} (${p.statusLabel})</option>`).join('');
  $('deliveryPackage').innerHTML=options;$('invoicePackage').innerHTML=options;
}
function submitDelivery(e){
  e.preventDefault();
  const req={packageId:$('deliveryPackage').value,method:$('deliveryMethod').value,date:$('deliveryDate').value,address:$('deliveryAddress').value,notes:$('deliveryNotes').value};
  localStorage.setItem('shop2gyDeliveryRequest',JSON.stringify(req));
  $('deliveryMessage').textContent=`Delivery request saved for ${req.packageId}.`;$('deliveryMessage').classList.remove('hidden');
}
function submitInvoice(e){
  e.preventDefault();
  const file=$('invoiceFile').files[0];
  const invoices=JSON.parse(localStorage.getItem('shop2gyInvoices')||'[]');
  invoices.unshift({packageId:$('invoicePackage').value,retailer:$('invoiceRetailer').value,value:$('invoiceValue').value,filename:file?file.name:'',saved:new Date().toLocaleString()});
  localStorage.setItem('shop2gyInvoices',JSON.stringify(invoices));
  $('invoiceMessage').textContent='Invoice details saved.';$('invoiceMessage').classList.remove('hidden');renderInvoices();e.target.reset();populatePackageSelects();
}
function renderInvoices(){
  const invoices=JSON.parse(localStorage.getItem('shop2gyInvoices')||'[]');
  $('invoiceList').innerHTML=invoices.length?invoices.map(i=>`<div class="mini-item"><strong>${i.packageId} — ${i.retailer}</strong><span>USD $${Number(i.value).toFixed(2)} · ${i.filename} · ${i.saved}</span></div>`).join(''):'<p class="fine-print">No invoices saved yet.</p>';
}
function renderNotifications(){
  const notes=[
    ['📦','Package received','PKG-100245 was received and weighed at the Florida warehouse.','Today'],
    ['✈️','Shipment departed','PKG-100318 is now in transit to Guyana.','Yesterday'],
    ['✅','Ready for delivery','PKG-100401 is ready for pickup or home delivery.','2 days ago'],
    ['💡','First shipment tip','Add your Shop2GY Customer ID to every retailer shipping address.','4 days ago']
  ];
  $('notificationList').innerHTML=notes.map(n=>`<div class="notification-item"><div class="notification-icon">${n[0]}</div><div><h4>${n[1]}</h4><p>${n[2]}</p></div><span class="notification-time">${n[3]}</span></div>`).join('');
}
if($('packageSearch'))$('packageSearch').addEventListener('input',renderPackages);
if($('packageFilter'))$('packageFilter').addEventListener('change',renderPackages);
if($('deliveryForm'))$('deliveryForm').addEventListener('submit',submitDelivery);
if($('invoiceForm'))$('invoiceForm').addEventListener('submit',submitInvoice);
populatePackageSelects();renderPackages();renderInvoices();renderNotifications();

// Version 1.2 — Warehouse Operations
const warehouseSeed = [
  {id:'PKG-100512',customer:'GY284910',tracking:'1Z999AA10123456784',carrier:'UPS',product:'Electronics',weight:'4.6',status:'Received'},
  {id:'PKG-100513',customer:'GY104882',tracking:'TBA302948572',carrier:'Amazon',product:'Clothing',weight:'7.3',status:'Invoice required'},
  {id:'PKG-100514',customer:'GY993201',tracking:'9400111899560000000000',carrier:'USPS',product:'Perfume / Hazardous',weight:'2.1',status:'Restricted review'}
];
function getWarehousePackages(){return JSON.parse(localStorage.getItem('shop2gyWarehousePackages')||JSON.stringify(warehouseSeed));}
function saveWarehousePackages(items){localStorage.setItem('shop2gyWarehousePackages',JSON.stringify(items));}
function createPackageId(){return `PKG-${String(Date.now()).slice(-6)}`;}
function renderWarehouseQueue(){
  const items=getWarehousePackages();
  const body=$('warehouseQueueBody'); if(!body)return;
  body.innerHTML=items.length?items.map(p=>`<tr><td><strong>${p.id}</strong><br><small>${p.tracking}</small></td><td>${p.customer}</td><td>${p.carrier}</td><td>${p.product}</td><td>${p.weight} lb</td><td><span class="status-badge status-${p.status.toLowerCase().replace(/\s+/g,'-')}">${p.status}</span></td><td><button class="queue-action" data-id="${p.id}">${p.status==='Ready for shipment'?'Completed':'Advance status'}</button></td></tr>`).join(''):'<tr><td colspan="7">No warehouse packages saved.</td></tr>';
  document.querySelectorAll('.queue-action').forEach(b=>b.addEventListener('click',()=>advanceWarehouseStatus(b.dataset.id)));
  populateManifestPackages();
}
function advanceWarehouseStatus(id){
  const order=['Received','Invoice required','Restricted review','Processed','Ready for shipment'];
  const items=getWarehousePackages(); const item=items.find(p=>p.id===id); if(!item)return;
  const current=order.indexOf(item.status); item.status=order[Math.min(order.length-1,current+1)]; saveWarehousePackages(items); renderWarehouseQueue();
}
function receiveWarehousePackage(e){
  e.preventDefault();
  const id=createPackageId();
  let status='Received'; if($('warehouseRestricted').checked)status='Restricted review'; else if($('warehouseInvoiceRequired').checked)status='Invoice required';
  const item={id,customer:$('warehouseCustomer').value.trim().toUpperCase(),tracking:$('warehouseTracking').value.trim().toUpperCase(),carrier:$('warehouseCarrier').value,product:$('warehouseProduct').value,weight:Number($('warehouseWeight').value).toFixed(1),condition:$('warehouseCondition').value,photo:$('warehousePhoto').files[0]?.name||'',notes:$('warehouseNotes').value.trim(),status,created:new Date().toLocaleString()};
  const items=getWarehousePackages(); items.unshift(item); saveWarehousePackages(items);
  $('warehouseMessage').textContent=`${id} received. Customer notification queued.`; $('warehouseMessage').classList.remove('hidden');
  $('labelPreview').innerHTML=`<span class="small-label">SHOP2GY PACKAGE LABEL</span><strong>${id}</strong><p>Customer: ${item.customer}<br>Carrier: ${item.carrier}<br>Tracking: ${item.tracking}<br>Weight: ${item.weight} lb</p>`;
  e.target.reset(); renderWarehouseQueue();
}
function simulateWarehouseScan(){
  const scans=[['1Z8456E90377241012','UPS'],['TBA319287645000','Amazon'],['9405508205497312345678','USPS'],['612999987654','FedEx']];
  const scan=scans[Math.floor(Math.random()*scans.length)]; $('warehouseTracking').value=scan[0]; $('warehouseCarrier').value=scan[1]; $('warehouseCustomer').value=`GY${Math.floor(100000+Math.random()*899999)}`;
}
function populateManifestPackages(){
  const select=$('manifestPackages'); if(!select)return; const items=getWarehousePackages();
  select.innerHTML=items.filter(p=>p.status==='Processed'||p.status==='Ready for shipment').map(p=>`<option value="${p.id}">${p.id} — ${p.customer} — ${p.weight} lb</option>`).join('')||'<option disabled>No processed packages available</option>';
}
function createManifest(e){
  e.preventDefault(); const selected=[...$('manifestPackages').selectedOptions].map(o=>o.value); if(!selected.length){$('manifestMessage').textContent='Select at least one processed package.';$('manifestMessage').classList.remove('hidden');return;}
  const items=getWarehousePackages().filter(p=>selected.includes(p.id)); const total=items.reduce((s,p)=>s+Number(p.weight),0);
  const manifest={method:$('manifestMethod').value,date:$('manifestDate').value,carrier:$('manifestCarrier').value,reference:$('manifestReference').value,packages:selected,totalWeight:total.toFixed(1)};
  localStorage.setItem('shop2gyManifest',JSON.stringify(manifest));
  $('manifestPreview').innerHTML=`<div class="manifest-card"><h3>${manifest.reference}</h3><p>${manifest.method} · ${manifest.carrier}<br>Departure: ${manifest.date}<br>Total weight: ${manifest.totalWeight} lb</p><ul class="manifest-package-list">${items.map(p=>`<li>${p.id} — ${p.customer}</li>`).join('')}</ul></div>`;
  $('manifestMessage').textContent='Demo manifest created.';$('manifestMessage').classList.remove('hidden');
}
function setupWarehouseTabs(){document.querySelectorAll('.warehouse-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.warehouse-tab').forEach(t=>t.classList.remove('active'));document.querySelectorAll('.warehouse-panel').forEach(p=>p.classList.remove('active'));tab.classList.add('active');const map={receive:'warehouseReceive',queue:'warehouseQueue',manifest:'warehouseManifest'};$(map[tab.dataset.warehouseTab]).classList.add('active');}));}
if($('receivePackageForm'))$('receivePackageForm').addEventListener('submit',receiveWarehousePackage);
if($('simulateScan'))$('simulateScan').addEventListener('click',simulateWarehouseScan);
if($('manifestForm'))$('manifestForm').addEventListener('submit',createManifest);
if($('clearWarehouseQueue'))$('clearWarehouseQueue').addEventListener('click',()=>{localStorage.setItem('shop2gyWarehousePackages','[]');renderWarehouseQueue();});
setupWarehouseTabs();renderWarehouseQueue();
