import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import handlebars from 'vite-plugin-handlebars'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  root: '.',
  publicDir: 'public',

  // 'mpa' disables the SPA index.html fallback — each page is served directly
  appType: 'mpa',

  plugins: [
    handlebars({ partialDirectory: r('./src/components') }),
    {
      name: 'clean-url-rewrite',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const rewrites = {
            '/work':    '/src/pages/work.html',
            '/about':   '/src/pages/about.html',
            '/cv':      '/src/pages/cv.html',
            '/stories': '/src/pages/stories/index.html',
            '/contact': '/src/pages/contact.html',
            '/case-studies/i-exchange':  '/src/pages/case-studies/i-exchange.html',
            '/case-studies/cassi':       '/src/pages/case-studies/cassi.html',
            '/case-studies/community':   '/src/pages/case-studies/community.html',
            '/stories/design-systems-and-portfolio-sites': '/src/pages/stories/design-systems-and-portfolio-sites.html',
          }
          if (rewrites[req.url]) req.url = rewrites[req.url]
          next()
        })
      },
    },
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:        r('./index.html'),
        about:       r('./src/pages/about.html'),
        contact:     r('./src/pages/contact.html'),
        iexchange:   r('./src/pages/case-studies/i-exchange.html'),
        cassi:       r('./src/pages/case-studies/cassi.html'),
        community:   r('./src/pages/case-studies/community.html'),
        storiesIndex: r('./src/pages/stories/index.html'),
        storiesPost:  r('./src/pages/stories/design-systems-and-portfolio-sites.html'),
        work:         r('./src/pages/work.html'),
        cv:           r('./src/pages/cv.html'),
      },
    },
  },
})
