import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess()],
  base: "/svelte-reader-docs",
  scope: '/svelte-reader-docs',
  kit: {
    adapter: adapter({
      pages: 'dist',
      fallback: '404.html',
    }),
    files: {
      assets: '../public',
    },
    alias: { '@': './src' },
    paths: {
      base: "/svelte-reader-docs",
    },
    prerender: {
      entries: []
    }
  },
}

export default config
