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
