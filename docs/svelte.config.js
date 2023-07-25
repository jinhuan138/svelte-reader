import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { SERVICE_WORKER_PATH } from '@sveltepress/theme-default' 

const dev = process.argv.includes('dev');
/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess()],
  // base: "/svelte-reader-docs",
  // scope: '/svelte-reader-docs',
  kit: {
    adapter: adapter({
      pages: 'dist',
      fallback: '404.html'
    }),
    // files: { 
    //   serviceWorker: SERVICE_WORKER_PATH, 
    // }, 
    files: {
      assets: '../public',
    },
    alias: { '@': './src' },
    // paths: {
    //   base: '/sveltekit-gh-pages',
    // }
  },
}

export default config
