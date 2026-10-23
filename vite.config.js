import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server falls back to the React app for folder URLs like /watch-list/,
// so point them at the static page in public/ (Netlify already does this in production).
const staticPages = {
  name: 'static-pages',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/watch-list\/?(\?.*)?$/.test(req.url)) {
        req.url = req.url.replace(/^\/watch-list\/?/, '/watch-list/index.html')
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [staticPages, react()],
})
