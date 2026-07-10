# Shop2GY Version 1.0

A deployable Next.js MVP for the Shop2GY logistics platform.

## Included
- Public marketing website
- Services, pricing, tracking, Shop For Me, business, FAQ and contact pages
- Working client-side quote calculator
- Demonstration package tracking timeline
- Demonstration registration/login and unique customer ID generation
- Customer dashboard demo
- Admin pricing screen demo
- Responsive design

## Important production limitation
This release uses browser localStorage for the demonstration account flow. It does not yet use a secure backend database, production authentication, payment processing, live tracking data, or email/WhatsApp integrations. Do not store real customer or payment data until those services are connected.

## Deploy to Vercel
1. Upload every file and folder in this project to the root of a GitHub repository.
2. In Vercel, choose **Add New > Project** and import that repository.
3. Framework preset: **Next.js**.
4. Root directory: leave blank.
5. Build and install settings: leave on Vercel defaults.
6. Click **Deploy**.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build verification
```bash
npm run build
```
