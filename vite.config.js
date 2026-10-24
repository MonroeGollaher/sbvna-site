import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The dev server falls back to the React app for folder URLs like /zoning-maps/,
// so point them at the static page in public/ (Netlify already does this in production).
const staticPages = {
  name: 'static-pages',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (/^\/watch-list(?:\/|\?|$)/.test(req.url)) {
        res.writeHead(301, { Location: req.url.replace(/^\/watch-list/, '/zoning-maps') })
        res.end()
        return
      }
      if (/^\/zoning-maps\/?(\?.*)?$/.test(req.url)) {
        req.url = req.url.replace(/^\/zoning-maps\/?/, '/zoning-maps/index.html')
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [staticPages, react()],
})
