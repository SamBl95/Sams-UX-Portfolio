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
      },
    },
  },
})
