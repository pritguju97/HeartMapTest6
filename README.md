# HeartMap

HeartMap is a premium-feeling static web app prototype for relationship reflection, check-ins, and emotional pattern mapping.

## What's included

- `index.html` — landing page, paywall, and full app UI
- `assets/styles.css` — the visual system and responsive styling
- `assets/app.js` — app interactions, demo logic, dashboard rendering, and tab behavior
- `vercel.json` — static deployment config for Vercel
- `netlify.toml` — static deployment config for Netlify
- `.nojekyll` — helps GitHub Pages serve files cleanly

## How to run locally

Option 1:
- Open `index.html` directly in your browser.

Option 2:
- Use a simple local server for best results:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new GitHub repo.
2. Upload all project files.
3. Commit to the `main` branch.
4. In GitHub, go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/root` folder.
7. Save, then wait for GitHub Pages to publish.

## Important note about payments and premium access

This build includes a polished **front-end paywall and unlock flow**, but it is still a prototype.

Right now:
- payment completion is simulated on the front end
- unlock codes are validated in the browser
- user access is not tied to a secure backend or real authentication

To launch this as a real paid product, the next build step should add:
- Stripe or another payment provider
- secure authentication and user accounts
- premium access stored on a backend
- database persistence for reflections, maps, and history
- protected API routes for premium-only data

## Good next-step stack for a real product

- Front end: Next.js
- Auth: Clerk, Auth0, or Firebase Auth
- Payments: Stripe
- Database: Supabase or PostgreSQL
- Hosting: Vercel or Netlify
- Analytics: PostHog or Plausible

## Notes

- This package is mobile responsive.
- The current app contains demo data and prototype logic so you can preview the full concept quickly.
- The emotional safety note is included in the UI, but this is not a substitute for therapy or crisis support.
