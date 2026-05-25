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
        server.middlewares.use((req, res, next) => {
          const redirects = {
            '/stories': '/articles',
            '/stories/design-systems-and-portfolio-sites': '/articles/design-systems-and-portfolio-sites',
          }
          if (redirects[req.url]) {
            res.statusCode = 301
            res.setHeader('Location', redirects[req.url])
            res.end()
            return
          }

          const rewrites = {
            '/case-studies': '/src/pages/case-studies.html',
            '/about':   '/src/pages/about.html',
            '/cv':      '/src/pages/cv.html',
            '/articles': '/src/pages/articles/index.html',
            '/get-in-touch': '/src/pages/get-in-touch.html',
            '/case-studies/i-exchange':  '/src/pages/case-studies/i-exchange.html',
            '/case-studies/cassi':       '/src/pages/case-studies/cassi.html',
            '/case-studies/community':   '/src/pages/case-studies/community.html',
            '/articles/design-systems-and-portfolio-sites': '/src/pages/articles/design-systems-and-portfolio-sites.html',
            '/articles/how-i-built-my-portfolio-with-claude-code': '/src/pages/articles/how-i-built-my-portfolio-with-claude-code.html',
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
        getInTouch:  r('./src/pages/get-in-touch.html'),
        iexchange:   r('./src/pages/case-studies/i-exchange.html'),
        cassi:       r('./src/pages/case-studies/cassi.html'),
        community:   r('./src/pages/case-studies/community.html'),
        articlesIndex: r('./src/pages/articles/index.html'),
        articlesPost:  r('./src/pages/articles/design-systems-and-portfolio-sites.html'),
        claudeCodeArticle: r('./src/pages/articles/how-i-built-my-portfolio-with-claude-code.html'),
        caseStudies:  r('./src/pages/case-studies.html'),
        cv:           r('./src/pages/cv.html'),
      },
    },
  },
})
