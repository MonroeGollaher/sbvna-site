import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serve standalone pages and preserve old watch-list bookmarks.
const staticPages = {
  name: 'static-pages',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (/^\/watch-list(?:\/|\?|$)/.test(req.url)) {
        res.writeHead(301, { Location: req.url.replace(/^\/watch-list/, '/zoning-maps') })
        res.end()
        return
      }
      if (/^\/(zoning-maps|ongoing-development)\/?(\?.*)?$/.test(req.url)) {
        req.url = req.url.replace(/^\/(zoning-maps|ongoing-development)\/?/, '/$1/index.html')
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [staticPages, react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        zoning: 'zoning-maps/index.html',
        development: 'ongoing-development/index.html',
      },
    },
  },
})
