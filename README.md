# SBVNA Site

The official website for the South Boise Village Neighborhood Association. I built this with React and Vite, with content managed through Decap CMS so board members can update the site without touching code.

## Tech Stack

- **React 19** + **Vite 7** — Fast dev server and build tooling with hot module replacement
- **React Router DOM 7** — Client-side routing for the SPA
- **Decap CMS** — Headless CMS that commits content directly to the GitHub repo as JSON files
- **Netlify** — Hosting, CI/CD, Identity (for CMS auth), and Git Gateway

### Content

All site content is JSON-driven, stored in `src/content/` directories. Gallery and Documents pages use `import.meta.glob()` for dynamic imports, so adding a new JSON file to the folder automatically picks it up — no code changes needed.

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## CMS Setup (Netlify + Email/Password Invites)

The CMS is available at `/admin` and configured in `public/admin/config.yml` using Netlify Git Gateway. Admins don't need GitHub accounts — they authenticate through Netlify Identity.

To set up in the Netlify dashboard:

1. Enable **Identity**
2. Under Identity settings, set registration to **Invite only**
3. Enable **Git Gateway**
4. Invite editors by email from Identity

Editors can then sign in at `/admin` with email + password and update pages, board members, gallery photos, and documents. All changes are committed as JSON files to the `main` branch, which triggers an automatic rebuild and deploy.
