import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  root: '.',
  publicDir: 'public',

  // 'mpa' disables the SPA index.html fallback — each page is served directly
  appType: 'mpa',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:      r('./index.html'),
        about:     r('./src/pages/about.html'),
        iexchange: r('./src/pages/case-studies/i-exchange.html'),
        cassi:     r('./src/pages/case-studies/cassi.html'),
        community: r('./src/pages/case-studies/community.html'),
      },
    },
  },
})
