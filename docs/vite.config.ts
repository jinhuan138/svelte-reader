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
        themeColor: {
          light: '#f2f2f2',
          dark: '#18181b',
        },
        preBuildIconifyIcons: {
          'vscode-icons': ['file-type-svelte', 'file-type-markdown', 'file-type-vite'],
          'logos': ['typescript-icon', 'svelte-kit'],
          'emojione': ['artist-palette'],
          'ph': ['smiley', 'layout-duotone'],
          'noto': ['package'],
          'solar': ['chat-square-code-outline', 'reorder-outline'],
          'carbon': ['tree-view-alt', 'import-export'],
          'ic': ['sharp-rocket-launch'],
          'tabler': ['icons'],
          'mdi': ['theme-light-dark'],
        },
      }),
      siteConfig: {
        title: 'svelte-reader',
        description: ' ',
      },
    }),
  ],
})

export default config