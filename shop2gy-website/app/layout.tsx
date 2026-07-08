import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop2GY | Shop the World. Delivered to Guyana.',
  description: 'Package forwarding, e-commerce shopping, air and ocean freight, and last-mile delivery to Guyana.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
