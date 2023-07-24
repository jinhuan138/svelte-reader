import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'
//https://cn.sveltepress.site/guide/introduction/

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar: [
          {
            title: 'docs',
            to: '/docs'
          },
        ],
        sidebar: {
          // Add your sidebar configs here
        },
        github: 'https://github.com/jinhuan138/svelte-reader',
        logo: '/sveltepress.svg',
      }),
      siteConfig: {
        title: 'svelte-reader',
        description: ' ',
      },
    }),
  ],
})

export default config