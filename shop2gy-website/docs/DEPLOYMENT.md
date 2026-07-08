# Deploy Shop2GY to Vercel

## 1. Upload to GitHub
Create or open your GitHub repo:
https://github.com/leonwilliams1527/guyana-logistics-platform

Copy these files into the repository root and commit them.

## 2. Connect Vercel
1. Go to Vercel.
2. Add New Project.
3. Import the GitHub repository.
4. Framework preset: Next.js.
5. Click Deploy.

## 3. Local Development
Install Node.js, then run:

```bash
npm install
npm run dev
```

Open:
http://localhost:3000

## 4. Supabase Setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Paste and run database/schema.sql.
4. Add these environment variables to Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 5. Next Build Items
- Connect registration form to Supabase Auth.
- Generate Customer IDs from database sequence.
- Connect package tracking to package records.
- Build protected customer/admin/warehouse dashboards.
- Connect email/WhatsApp provider.
