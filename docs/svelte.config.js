import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

const dev = process.argv.includes('dev');
/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      pages: 'dist',
      fallback: '404.html',
      assets:'dist'
    }),
    files: {
      assets: '../public',
    },
    alias: { '@': './src' },
    paths: {
      base: '/svelte-reader-docs',
    }
  },
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return;
    }
    handler(warning);
  }
}

export default config
