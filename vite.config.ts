import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/svelte-reader",
  plugins: [svelte()],
  publicDir: 'public',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
    ]
  },
  server: {
    port: 8030,
  }
})
