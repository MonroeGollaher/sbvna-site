# SBVNA Site

Neighborhood website built with React + Vite and managed content via Decap CMS.

## Local development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`

## CMS setup (Netlify + email/password invites)

The CMS is available at `/admin` and configured in `/public/admin/config.yml` using Netlify Git Gateway.

In Netlify dashboard:

1. Enable `Identity`.
2. Under Identity settings, set registration to `Invite only`.
3. Enable `Git Gateway`.
4. Invite editors by email from Identity.

Editors can then sign in at `/admin` with email + password and update pages, board members, gallery photos, and documents.
