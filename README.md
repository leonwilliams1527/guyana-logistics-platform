# Shop2GY Version 1.0 — Static MVP

This release is intentionally built with plain HTML, CSS and JavaScript. It has no npm packages, no Node.js build and no framework dependencies. That removes the npm/Vercel build errors encountered previously.

## Files
- `index.html` — complete website
- `styles.css` — responsive Shop2GY styling
- `app.js` — quote calculator, tracking demo, customer ID demo, portal and admin rate editor
- `vercel.json` — optional Vercel configuration

## Deploy on Vercel
1. Upload all four files to the root of a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository.
3. Set **Framework Preset** to **Other**.
4. Leave **Root Directory** blank.
5. Leave **Build Command** blank.
6. Leave **Install Command** blank.
7. Leave **Output Directory** blank.
8. Click **Deploy**.

This is a static MVP. Account information and admin pricing changes are saved only in the current browser using localStorage. A production database, secure authentication, payments and live logistics integrations are future upgrades.

## Demo values
- Tracking number: `PKG-100245`
- Quote coupon: `WELCOME10`
