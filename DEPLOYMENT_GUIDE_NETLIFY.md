# Shopify App Deployment Guide for Netlify (Beginner Friendly)

This guide explains exactly how this Shopify React Router application was configured to run on Netlify Serverless Functions, and what you need to remember if you ever want to do this again for a brand new Shopify CLI app.

---

## 🛑 Why can't we just deploy it normally?

By default, when you run `npm run dev` or create a new Shopify app, it does two things that **do not work on Netlify**:
1. **It uses a local SQLite database (`dev.sqlite`)**. Netlify uses "Serverless Functions." This means every time someone clicks a link in your app, Netlify spins up a temporary mini-server, does the work, and deletes the server. Any local files (like a SQLite database file) are deleted. If you use SQLite, all your merchants will constantly be logged out.
2. **It uses a long-running Node.js server (`@react-router/serve`)**. Netlify doesn't host continuously running servers; it requires the backend to be compiled into standalone serverless functions.

To fix this, we have to change the database to a cloud database (like Supabase) and install a Netlify plugin that translates the app into serverless functions.

---

## 🛠️ Step-by-Step Guide for New Projects

If you create a **new** Shopify app using `npm run shopify app init` tomorrow and want to put it on Netlify, here are the exact commands and file changes you must perform.

### Step 1: Switch the Database to PostgreSQL (Supabase)

You need to host your database somewhere on the internet. [Supabase](https://supabase.com) gives you a free PostgreSQL database.

1. Create a Supabase project and get your "Connection string" (it looks like a URL starting with `postgresql://`). Get both the *Transaction Pooler* URL and the *Direct* URL.
2. Inside your app, open `prisma/schema.prisma`.
3. Change the `datasource db` block from this:
   ```prisma
   // OLD (Delete this)
   datasource db {
     provider = "sqlite"
     url      = "file:dev.sqlite"
   }
   ```
   To this:
   ```prisma
   // NEW
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```
4. Put those Supabase URLs inside your `.env` file for local development:
   ```env
   DATABASE_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@aws....pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.xxx:[YOUR-PASSWORD]@aws....pooler.supabase.com:5432/postgres"
   ```

### Step 2: Install the Netlify Adapter

You must install a special plugin that tells Vite (the app builder) to package your app for Netlify instead of a standard Node server.

Run this command in your terminal:
```bash
npm install @netlify/vite-plugin-react-router
```

### Step 3: Update `vite.config.ts`

Open `vite.config.ts` and add the Netlify plugin you just installed to the `plugins` array.

1. Add the import at the top:
   ```typescript
   import netlifyPlugin from "@netlify/vite-plugin-react-router"; 
   ```
2. Add it to the plugins list at the bottom:
   ```typescript
   plugins: [
     reactRouter(),
     netlifyPlugin(), // <--- YOU ADD THIS
     tsconfigPaths(), 
     tailwindcss(),
   ],
   ```

### Step 4: Create a `netlify.toml` file

Netlify needs a special instruction manual to know how to build your app and how to handle security permissions for Shopify. 

Create a new file named `netlify.toml` in the very root folder of your project, and paste exactly this inside:

```toml
[build]
  # This makes sure your database connects and updates before building the app
  command = "npx prisma generate && npx prisma db push && npm run build"
  publish = "build/client"

[[headers]]
  for = "/*"
  [headers.values]
    # THIS IS CRITICAL. Without it, Shopify will refuse to load your app inside the Shopify Admin page.
    Content-Security-Policy = "frame-ancestors https://*.myshopify.com https://admin.shopify.com;"
```

---

## 🚀 How to actually Deploy to Netlify

Once you have made the 4 changes above, push your code to your GitHub/GitLab repository. 

1. Go to [Netlify.com](https://app.netlify.com) and log in.
2. Click **Add New Site** -> **Import an existing project**.
3. Select your GitHub repository.
4. **CRITICAL STEP**: Before clicking deploy, you MUST scroll down to the **Environment Variables** section and add all your keys! Netlify cannot see your local `.env` file, so you must copy-paste them into the Netlify website:
   - `SHOPIFY_API_KEY`: Your app's Client ID
   - `SHOPIFY_API_SECRET`: Your app's Client Secret
   - `SCOPES`: `write_products,read_customers` (Whatever your app uses)
   - `SHOPIFY_APP_URL`: The URL Netlify gives you (e.g., `https://my-cool-app.netlify.app`)
   - `DATABASE_URL`: Your Supabase pooler URL
   - `DIRECT_URL`: Your Supabase direct URL
5. Click **Deploy**.

### Final Step: Update Shopify Partners
Once Netlify gives you your live URL (e.g., `https://frabjous-crisp-9d1e70.netlify.app/`), you need to tell Shopify about it!
1. Go to your Shopify Partner Dashboard.
2. Click on your App -> Configuration -> URLs.
3. Update the "App URL" to your Netlify URL.
4. Update the "Allowed Redirection URL(s)" to: `https://your-netlify-url.app/auth/callback`
5. Click Save.

---
### Summary Checklist for Next Time:
- [ ] Move Prisma to PostgreSQL (Supabase)
- [ ] Install `@netlify/vite-plugin-react-router`
- [ ] Add `netlifyPlugin()` to `vite.config.ts`
- [ ] Create `netlify.toml` with `npx prisma db push` and `frame-ancestors` Content-Security-Policy.
- [ ] Add all Environment Variables physically into the Netlify Dashboard before deploying.
