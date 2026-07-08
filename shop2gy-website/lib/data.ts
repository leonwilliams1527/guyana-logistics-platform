export const productRules = {
  clothing: { label: 'Clothing / Shoes', multiplier: 1, duty: 0.12, warning: 'Standard item. Air and ocean eligible.' },
  electronics: { label: 'Electronics', multiplier: 1.2, duty: 0.18, warning: 'Invoice required. Insurance recommended.' },
  phones: { label: 'Phones / Tablets', multiplier: 1.25, duty: 0.2, warning: 'Lithium battery notice. Insurance recommended.' },
  laptop: { label: 'Laptop / Computer', multiplier: 1.25, duty: 0.2, warning: 'Lithium battery notice. Insurance recommended.' },
  perfume: { label: 'Perfume / Fragrance', multiplier: 1.6, duty: 0.16, warning: 'May be hazardous/restricted. Manual review may be required.' },
  hazardous: { label: 'Hazardous / Restricted', multiplier: 2.0, duty: 0.22, warning: 'Manual approval required before shipping.' },
  auto: { label: 'Auto Parts', multiplier: 1.15, duty: 0.18, warning: 'Oversized/heavy parts may require ocean freight.' },
  appliances: { label: 'Appliances', multiplier: 1.3, duty: 0.18, warning: 'Ocean freight recommended for large appliances.' },
  documents: { label: 'Documents', multiplier: 0.75, duty: 0, warning: 'Express air eligible. Duty usually not estimated.' },
  furniture: { label: 'Furniture', multiplier: 1.45, duty: 0.18, warning: 'Ocean freight recommended.' },
  jewelry: { label: 'Jewelry / Watches', multiplier: 1.5, duty: 0.25, warning: 'Insurance and signature required.' },
  food: { label: 'Food Items', multiplier: 1.2, duty: 0.12, warning: 'Restrictions may apply. Manual review recommended.' },
  other: { label: 'Other', multiplier: 1.1, duty: 0.15, warning: 'Standard review.' }
}

export const packageStatuses = [
  'Received in Florida', 'Processing', 'Waiting Invoice', 'Quote Ready', 'Paid', 'Shipped', 'Arrived Guyana', 'Customs Clearance', 'Ready for Pickup', 'Out for Delivery', 'Delivered'
]

export const automationJourneys = [
  'New customer onboarding', 'Customer ID confirmation', 'U.S. address instructions', 'First shipment activation', 'Package received notification', 'Invoice required alert', 'Quote ready', 'Payment reminder', 'Shipment updates', 'Delivery confirmation', 'Review request', 'Quote abandonment', 'Cart abandonment', 'Referral and loyalty', '90-day reactivation'
]
